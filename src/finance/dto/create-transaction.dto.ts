import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    example: 2000,
    description: 'Valor da transação',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'INCOME',
    description: 'Tipo da transação (entrada ou saída)',
    enum: ['INCOME', 'EXPENSE'],
  })
  @IsEnum(['INCOME', 'EXPENSE'])
  type: 'INCOME' | 'EXPENSE';

  @ApiPropertyOptional({
    example: 'Pagamento do produto Website institucional',
    description: 'Descrição da transação',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
