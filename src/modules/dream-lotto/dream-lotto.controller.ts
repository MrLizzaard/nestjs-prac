import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DreamLottoService } from './dream-lotto.service';
import { DreamLottoRequestDto } from './dto/dream-lotto.dto';

@ApiTags('Dream Lotto')
@Controller('dream-lotto')
export class DreamLottoController {
  constructor(private readonly dreamLottoService: DreamLottoService) {}

  @Post('analyze')
  analyzeDream(@Body() body: DreamLottoRequestDto) {
    return this.dreamLottoService.analyzeDream(body.message);
  }
}
