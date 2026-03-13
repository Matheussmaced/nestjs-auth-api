import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../../domain/repositories/products.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../../domain/entities/product.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(clientId: string, dto: CreateProductDto) {
    const product = new Product(
      randomUUID(),
      dto.name,
      dto.price,
      false,
      clientId,
    );

    return this.productsRepository.create(product);
  }
}
