import { Transaction } from '../entities/transaction.entity';

export abstract class TransactionRepository {
  abstract create(data: Partial<Transaction>): Promise<Transaction>;

  abstract getRevenue(financeId: string): Promise<number>;

  abstract getExpenses(financeId: string): Promise<number>;
}
