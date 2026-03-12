import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientsRepository } from '../../domain/repositories/clients.repository';
import { UpdateClientDto } from '../DTO/update-client.dto';

@Injectable()
export class UpdateClientUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute(userId: string, clientId: string, data: UpdateClientDto) {
    const client = await this.clientsRepository.findById(userId, clientId);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    if (data.name !== undefined) client.name = data.name;
    if (data.email !== undefined) client.email = data.email;
    if (data.phone !== undefined) client.phone = data.phone;
    if (data.active !== undefined) client.active = data.active;

    return this.clientsRepository.update(client);
  }
}
