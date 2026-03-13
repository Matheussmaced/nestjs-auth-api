import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../../domain/repositories/products.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private prisma: PrismaService,
  ) {}

  async execute(id: string, dto: UpdateProductDto) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    const wasCompleted = product.completed;

    if (dto.name !== undefined) product.name = dto.name;
    if (dto.price !== undefined) product.price = dto.price;
    if (dto.completed !== undefined) product.completed = dto.completed;

    const updatedProduct = await this.productsRepository.update(product);

    if (!wasCompleted && dto.completed === true) {
      const client = await this.prisma.client.findUnique({
        where: { id: product.clientId },
      });

      const finance = await this.prisma.finance.findFirst({
        where: { userId: client?.userId },
      });

      if (finance) {
        await this.prisma.transaction.create({
          data: {
            amount: product.price,
            type: 'INCOME',
            description: `Pagamento do produto ${product.name}`,
            financeId: finance.id,
          },
        });

        await this.prisma.finance.update({
          where: { id: finance.id },
          data: {
            totalBalance: { increment: product.price },
            monthlyBalance: { increment: product.price },
          },
        });
      }
    }

    return updatedProduct;
  }
}
