import { Injectable } from '@nestjs/common';
import { FinanceRepository } from '../../domain/repositories/finance.repository';

@Injectable()
export class CreateFinanceUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(userId: string) {
    return this.financeRepository.create(userId);
  }
}
