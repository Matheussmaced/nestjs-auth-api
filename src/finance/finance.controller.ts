import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { FinanceService } from './finance.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req) {
    return this.financeService.create(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Request() req) {
    return this.financeService.findOne(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string) {
    return this.financeService.update(id, {});
  }

  @Post(':financeId/transactions')
  createTransaction(
    @Param('financeId') financeId: string,
    @Body() data: CreateTransactionDto,
  ) {
    return this.financeService.createTransaction(financeId, data);
  }
}
