import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from 'src/products/application/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/application/dto/update-product.dto';
import { CreateProductUseCase } from 'src/products/application/use-cases/create-product.usecase';
import { DeleteProductUseCase } from 'src/products/application/use-cases/delete-product.usecase';
import { FindProductsUseCase } from 'src/products/application/use-cases/find-products.usecase';
import { UpdateProductUseCase } from 'src/products/application/use-cases/update-product.usecase';

@ApiBearerAuth()
@Controller('clients/:clientId/products')
export class ProductsController {
  constructor(
    private createProduct: CreateProductUseCase,
    private findProducts: FindProductsUseCase,
    private updateProduct: UpdateProductUseCase,
    private deleteProduct: DeleteProductUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Param('clientId') clientId: string, @Body() dto: CreateProductDto) {
    return this.createProduct.execute(clientId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Param('clientId') clientId: string) {
    return this.findProducts.execute(clientId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.updateProduct.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteProduct.execute(id);
  }
}
