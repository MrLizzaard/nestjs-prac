import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'dhk21512@gmail.com' })
  @IsString()
  email: string;

  @ApiPropertyOptional({ example: '1234' })
  @IsString()
  password: string;
}
