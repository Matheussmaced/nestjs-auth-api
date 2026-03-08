import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/CreateClientDto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, data: CreateClientDto) {
    //eslint-disable-next-line
    return await this.prisma.client.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    //eslint-disable-next-line
    return await this.prisma.client.findMany({
      where: { userId },
    });
  }
}
