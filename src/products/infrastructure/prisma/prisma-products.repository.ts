import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsRepository } from '../../domain/repositories/products.repository';
import { Product } from '../../domain/entities/product.entity';
import { ProductMapper } from './mappers/product.mapper';

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const created = await this.prisma.product.create({
      data: ProductMapper.toPrisma(product),
    });

    return ProductMapper.toDomain(created);
  }

  async findAll(clientId: string): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { clientId },
    });

    return products.map(ProductMapper.toDomain);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) return null;

    return ProductMapper.toDomain(product);
  }

  async update(product: Product): Promise<Product> {
    const updated = await this.prisma.product.update({
      where: { id: product.id },
      data: ProductMapper.toPrisma(product),
    });

    return ProductMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}
