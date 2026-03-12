import { Client as PrismaClient } from '@prisma/client';
import { Client } from '../../../domain/entities/client.entity';

export class ClientMapper {
  static toDomain(prismaClient: PrismaClient): Client {
    return new Client(
      prismaClient.id,
      prismaClient.name,
      prismaClient.email,
      prismaClient.phone,
      prismaClient.userId,
      prismaClient.active,
    );
  }

  static toPrisma(client: Client) {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      userId: client.userId,
      active: client.active,
    };
  }
}
