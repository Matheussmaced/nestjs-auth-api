import { Client } from '../entities/client.entity';

export abstract class ClientsRepository {
  abstract create(client: Client): Promise<Client>;
  abstract findAll(userId: string): Promise<Client[]>;
  abstract findById(userId: string, id: string): Promise<Client | null>;
  abstract update(client: Client): Promise<Client>;
  abstract delete(id: string): Promise<void>;
}
