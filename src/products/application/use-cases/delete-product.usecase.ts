import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../../domain/repositories/products.repository';

@Injectable()
export class DeleteProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(id: string) {
    await this.productsRepository.delete(id);

    return { message: 'Produto removido com sucesso' };
  }
}
