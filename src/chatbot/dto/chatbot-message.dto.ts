import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChatbotMessageDto {
  @ApiProperty({ example: '안녕' })
  @IsString()
  message: string;
}
