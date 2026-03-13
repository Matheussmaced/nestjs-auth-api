import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductUseCase } from './application/use-cases/create-product.usecase';
import { DeleteProductUseCase } from './application/use-cases/delete-product.usecase';
import { FindProductsUseCase } from './application/use-cases/find-products.usecase';
import { UpdateProductUseCase } from './application/use-cases/update-product.usecase';
import { ProductsRepository } from './domain/repositories/products.repository';
import { PrismaProductsRepository } from './infrastructure/prisma/prisma-products.repository';
import { Module } from '@nestjs/common';
import { ProductsController } from './infrastructure/http/products.controller';

@Module({
  controllers: [ProductsController],
  providers: [
    CreateProductUseCase,
    FindProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    PrismaService,
    {
      provide: ProductsRepository,
      useClass: PrismaProductsRepository,
    },
  ],
})
export class ProductsModule {}
