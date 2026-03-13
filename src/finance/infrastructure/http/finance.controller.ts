import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTransactionDto } from 'src/finance/application/dto/create-transaction.dto';
import { CreateFinanceUseCase } from 'src/finance/application/use-cases/create-finance.usecase';
import { CreateTransactionUseCase } from 'src/finance/application/use-cases/create-transaction.usecase';
import { GetDashboardUseCase } from 'src/finance/application/use-cases/get-dashboard.usecase';
import { GetFinanceUseCase } from 'src/finance/application/use-cases/get-finance.usecase';

@ApiBearerAuth()
@Controller('finance')
export class FinanceController {
  constructor(
    private createFinance: CreateFinanceUseCase,
    private getFinance: GetFinanceUseCase,
    private createTransaction: CreateTransactionUseCase,
    private getDashboard: GetDashboardUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req) {
    return this.createFinance.execute(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Request() req) {
    return this.getFinance.execute(req.user.userId);
  }

  @Post(':financeId/transactions')
  createTransactionRoute(
    @Param('financeId') financeId: string,
    @Body() data: CreateTransactionDto,
  ) {
    return this.createTransaction.execute(financeId, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  dashboard(@Request() req) {
    return this.getDashboard.execute(req.user.userId);
  }
}
