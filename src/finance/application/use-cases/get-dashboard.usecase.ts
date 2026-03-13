import { Injectable } from '@nestjs/common';
import { FinanceRepository } from '../../domain/repositories/finance.repository';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

@Injectable()
export class GetDashboardUseCase {
  constructor(
    private financeRepository: FinanceRepository,
    private transactionRepository: TransactionRepository,
  ) {}

  async execute(userId: string) {
    const finance = await this.financeRepository.findByUserId(userId);

    if (!finance) {
      return {
        totalBalance: 0,
        monthlyRevenue: 0,
        monthlyExpenses: 0,
        profit: 0,
      };
    }

    const revenue = await this.transactionRepository.getRevenue(finance.id);
    const expenses = await this.transactionRepository.getExpenses(finance.id);

    return {
      totalBalance: finance.totalBalance,
      monthlyRevenue: revenue,
      monthlyExpenses: expenses,
      profit: revenue - expenses,
    };
  }
}
