import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  //eslint-disable-next-line
  constructor(private prisma: PrismaService) { }

  async create(clientId: string, data: CreateProductDto) {
    //eslint-disable-next-line
    return await this.prisma.product.create({
      data: {
        ...data,
        clientId,
      },
    });
  }

  async findAll(clientId: string) {
    //eslint-disable-next-line
    return await this.prisma.product.findMany({
      where: {
        clientId,
      },
    });
  }
  update(id: string, data: UpdateProductDto) {
    //eslint-disable-next-line
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    //eslint-disable-next-line
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
