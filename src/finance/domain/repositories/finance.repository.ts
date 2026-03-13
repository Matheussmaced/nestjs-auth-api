import { Finance } from '../entities/finance.entity';

export abstract class FinanceRepository {
  abstract create(userId: string): Promise<Finance>;
  abstract findByUserId(userId: string): Promise<Finance | null>;
  abstract update(id: string, data: Partial<Finance>): Promise<Finance>;
}
