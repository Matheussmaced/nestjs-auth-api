import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Website institucional',
    description: 'Nome do produto ou serviço',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 2000,
    description: 'Preço do produto',
  })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Define se o produto está ativo',
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
