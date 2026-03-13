import { Injectable } from '@nestjs/common';
import { FinanceRepository } from '../../domain/repositories/finance.repository';

@Injectable()
export class GetFinanceUseCase {
  constructor(private financeRepository: FinanceRepository) {}

  async execute(userId: string) {
    return this.financeRepository.findByUserId(userId);
  }
}
