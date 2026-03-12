import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { UpdateFinanceDto } from './dto/update-finance.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) { }

  create(userId: string) {
    return this.prisma.finance.create({
      data: {
        userId,
      },
    });
  }

  findOne(userId: string) {
    return this.prisma.finance.findFirst({
      where: { userId },
      include: {
        transactions: true,
      },
    });
  }

  update(id: string, data: UpdateFinanceDto) {
    return this.prisma.finance.update({
      where: { id },
      data,
    });
  }
  async createTransaction(financeId: string, data: CreateTransactionDto) {
    const transaction = await this.prisma.transaction.create({
      data: {
        ...data,
        financeId,
      },
    });

    if (data.type === 'INCOME') {
      await this.prisma.finance.update({
        where: { id: financeId },
        data: {
          totalBalance: { increment: data.amount },
          monthlyBalance: { increment: data.amount },
        },
      });
    }

    if (data.type === 'EXPENSE') {
      await this.prisma.finance.update({
        where: { id: financeId },
        data: {
          totalBalance: { decrement: data.amount },
          monthlyBalance: { decrement: data.amount },
        },
      });
    }

    return transaction;
  }
}
