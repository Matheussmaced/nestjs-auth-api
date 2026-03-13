import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateProductDto } from './application/dto/create-product.dto';
import { UpdateProductDto } from './application/dto/update-product.dto';

@ApiBearerAuth()
@Controller('clients/:clientId/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Param('clientId') clientId: string, @Body() data: CreateProductDto) {
    return this.productsService.create(clientId, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Param('clientId') clientId: string) {
    return this.productsService.findAll(clientId);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.productsService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
