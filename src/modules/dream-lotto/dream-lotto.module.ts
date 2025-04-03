import { Module } from '@nestjs/common';
import { DreamLottoService } from './dream-lotto.service';
import { DreamLottoController } from './dream-lotto.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [DreamLottoController],
  providers: [DreamLottoService],
})
export class DreamLottoModule {}
