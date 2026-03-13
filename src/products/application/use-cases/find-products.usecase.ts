import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../../domain/repositories/products.repository';

@Injectable()
export class FindProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(clientId: string) {
    return this.productsRepository.findAll(clientId);
  }
}
