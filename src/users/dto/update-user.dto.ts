import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'João Silva',
    description: 'Nome do usuário',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'joao@email.com',
    description: 'Email do usuário',
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}
