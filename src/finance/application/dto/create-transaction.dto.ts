import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export class CreateTransactionDto {
  @ApiProperty({
    example: 2000,
    description: 'Valor da transação',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'INCOME',
    enum: TransactionType,
  })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiPropertyOptional({
    example: 'Pagamento do produto Website institucional',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
