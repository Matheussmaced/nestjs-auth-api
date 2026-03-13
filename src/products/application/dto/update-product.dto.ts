import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({
    example: 'Landing Page',
    description: 'Nome do produto ou serviço',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 1500,
    description: 'Preço do produto',
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Define se o produto está ativo',
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional({
    example: true,
    description: 'Define se o produto foi concluído',
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
