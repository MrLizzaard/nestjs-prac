import { Module } from '@nestjs/common';
import { FrequencyService } from './frequency.service';
import { FrequencyController } from './frequency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keyword } from './entities/keyword.entity';
import { Video } from './entities/video.entity';
import { Favorite } from './entities/favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Keyword, Video, Favorite])],
  controllers: [FrequencyController],
  providers: [FrequencyService],
})
export class FrequencyModule {}
