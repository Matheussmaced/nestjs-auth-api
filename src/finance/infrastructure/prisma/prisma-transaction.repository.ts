import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Partial<Transaction>): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: {
        amount: data.amount ?? 0,
        type: data.type as 'INCOME' | 'EXPENSE',
        description: data.description ?? null,
        financeId: data.financeId as string,
      },
    });

    return transaction as Transaction;
  }

  async getRevenue(financeId: string): Promise<number> {
    const revenue = await this.prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        financeId,
        type: 'INCOME',
      },
    });

    return revenue._sum.amount ?? 0;
  }

  async getExpenses(financeId: string): Promise<number> {
    const expenses = await this.prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        financeId,
        type: 'EXPENSE',
      },
    });

    return expenses._sum.amount ?? 0;
  }
}
