import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/CreateClientDto';
import { UpdateClientDto } from './dto/UpdateClientDTO';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, data: CreateClientDto) {
    return await this.prisma.client.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.client.findMany({
      where: { userId },
    });
  }

  async update(userId: string, clientId: string, data: UpdateClientDto) {
    const client = await this.prisma.client.findFirst({
      where: {
        id: clientId,
        userId: userId,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return this.prisma.client.update({
      where: { id: clientId },
      data,
    });
  }

  async delete(userId: string, clientId: string) {
    const client = await this.prisma.client.findFirst({
      where: {
        id: clientId,
        userId: userId,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    await this.prisma.client.delete({
      where: { id: clientId },
    });

    return { message: 'Client deleted successfully' };
  }
}
