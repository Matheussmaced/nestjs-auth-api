import { Injectable } from '@nestjs/common';
import { FinanceRepository } from '../../domain/repositories/finance.repository';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private financeRepository: FinanceRepository,
    private transactionRepository: TransactionRepository,
  ) {}

  async execute(financeId: string, data: CreateTransactionDto) {
    const transaction = await this.transactionRepository.create({
      ...data,
      financeId,
    });

    if (data.type === 'INCOME') {
      await this.financeRepository.update(financeId, {
        totalBalance: undefined,
      });
    }

    return transaction;
  }
}
