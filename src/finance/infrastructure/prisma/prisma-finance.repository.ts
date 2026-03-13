import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { FinanceRepository } from '../../domain/repositories/finance.repository';
import { Finance } from '../../domain/entities/finance.entity';

@Injectable()
export class PrismaFinanceRepository implements FinanceRepository {
  constructor(private prisma: PrismaService) {}

  async create(userId: string): Promise<Finance> {
    const finance = await this.prisma.finance.create({
      data: {
        userId,
      },
    });

    return finance;
  }

  async findByUserId(userId: string): Promise<Finance | null> {
    const finance = await this.prisma.finance.findFirst({
      where: { userId },
    });

    return finance;
  }

  async update(id: string, data: Partial<Finance>): Promise<Finance> {
    const finance = await this.prisma.finance.update({
      where: { id },
      data,
    });

    return finance;
  }
}
