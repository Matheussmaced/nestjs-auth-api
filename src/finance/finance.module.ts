import { Module } from '@nestjs/common';

import { FinanceController } from './infrastructure/http/finance.controller';

import { PrismaFinanceRepository } from './infrastructure/prisma/prisma-finance.repository';
import { PrismaTransactionRepository } from './infrastructure/prisma/prisma-transaction.repository';

import { FinanceRepository } from './domain/repositories/finance.repository';
import { TransactionRepository } from './domain/repositories/transaction.repository';

import { CreateFinanceUseCase } from './application/use-cases/create-finance.usecase';
import { GetFinanceUseCase } from './application/use-cases/get-finance.usecase';
import { CreateTransactionUseCase } from './application/use-cases/create-transaction.usecase';
import { GetDashboardUseCase } from './application/use-cases/get-dashboard.usecase';

@Module({
  controllers: [FinanceController],
  providers: [
    CreateFinanceUseCase,
    GetFinanceUseCase,
    CreateTransactionUseCase,
    GetDashboardUseCase,
    {
      provide: FinanceRepository,
      useClass: PrismaFinanceRepository,
    },
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
  ],
})
export class FinanceModule { }
