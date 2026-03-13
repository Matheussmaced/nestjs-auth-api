import { PartialType } from '@nestjs/swagger';

import { IsNumber, IsOptional } from 'class-validator';
import { CreateFinanceDto } from './create-finance.dto';

export class UpdateFinanceDto extends PartialType(CreateFinanceDto) {
  @IsOptional()
  @IsNumber()
  totalBalance?: number;

  @IsOptional()
  @IsNumber()
  monthlyBalance?: number;
}
