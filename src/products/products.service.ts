import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  //eslint-disable-next-line
  constructor(private prisma: PrismaService) { }

  async create(clientId: string, data: CreateProductDto) {
    return await this.prisma.product.create({
      data: {
        ...data,
        clientId,
      },
    });
  }

  async findAll(clientId: string) {
    return await this.prisma.product.findMany({
      where: {
        clientId,
      },
    });
  }
  c;
  async update(id: string, data: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    // valida se existe
    if (!product) {
      throw new Error('Produto não encontrado');
    }

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data,
    });

    if (!product.completed && data.completed === true) {
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

  remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
