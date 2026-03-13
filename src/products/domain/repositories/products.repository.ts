import { Product } from '../entities/product.entity';

export abstract class ProductsRepository {
  abstract create(product: Product): Promise<Product>;
  abstract findAll(clientId: string): Promise<Product[]>;
  abstract findById(id: string): Promise<Product | null>;
  abstract update(product: Product): Promise<Product>;
  abstract delete(id: string): Promise<void>;
}
