import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateExampleDto {
  @ApiProperty({ example: 'testname' })
  @IsString()
  username: string;

  @ApiPropertyOptional({ example: 25 })
  @IsInt()
  age: number;
}
