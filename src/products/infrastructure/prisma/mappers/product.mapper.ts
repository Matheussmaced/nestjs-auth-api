import { Product } from '../../../domain/entities/product.entity';

export class ProductMapper {
  static toDomain(raw: any): Product {
    return new Product(
      raw.id,
      raw.name,
      raw.price,
      raw.completed,
      raw.clientId,
    );
  }

  static toPrisma(product: Product) {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      completed: product.completed,
      clientId: product.clientId,
    };
  }
}
