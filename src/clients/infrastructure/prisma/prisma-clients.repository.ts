import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientsRepository } from '../../domain/repositories/clients.repository';
import { Client } from '../../domain/entities/client.entity';
import { ClientMapper } from './mappers/client.mapper';

@Injectable()
export class PrismaClientsRepository implements ClientsRepository {
  constructor(private prisma: PrismaService) {}

  async create(client: Client): Promise<Client> {
    const created = await this.prisma.client.create({
      data: ClientMapper.toPrisma(client),
    });

    return ClientMapper.toDomain(created);
  }

  async findAll(userId: string): Promise<Client[]> {
    const clients = await this.prisma.client.findMany({
      where: { userId },
    });

    //eslint-disable-next-line
    return clients.map(ClientMapper.toDomain);
  }

  async findById(userId: string, id: string): Promise<Client | null> {
    const client = await this.prisma.client.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!client) return null;

    return ClientMapper.toDomain(client);
  }

  async update(client: Client): Promise<Client> {
    const updated = await this.prisma.client.update({
      where: { id: client.id },
      data: ClientMapper.toPrisma(client),
    });

    return ClientMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.client.delete({
      where: { id },
    });
  }
}
