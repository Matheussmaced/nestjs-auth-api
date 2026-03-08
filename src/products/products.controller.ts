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
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('clients/:clientId/products')
export class ProductsController {
  //eslint-disable-next-line
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
    //eslint-disable-next-line
    return this.productsService.update(id, data);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    //eslint-disable-next-line
    return this.productsService.remove(id);
  }
}
