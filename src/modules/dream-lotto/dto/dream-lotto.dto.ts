// dto/dream-lotto.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DreamLottoRequestDto {
  @ApiProperty({ example: '어제 호랑이한테 쫓기는 꿈을 꿨어요.' })
  @IsString()
  message: string;
}

export class KeywordMeaning {
  keyword: string;
  meaning: string;
  relatedNumbers: number[];
}

export class DreamLottoResponseDto {
  summary: string;
  recommendations: number[][];
  keywords: KeywordMeaning[];
}
