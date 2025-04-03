import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FrequencyService } from './frequency.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@ApiTags('Frequency')
@Controller('frequency')
export class FrequencyController {
  constructor(private readonly frequencyService: FrequencyService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('keywords')
  saveKeywords(@Body('keywords') keywords: string[], @Request() req) {
    return this.frequencyService.saveKeywords(req.user.id, keywords);
  }

  @Get('recommend')
  getRecommendations(@Query('keyword') keyword: string) {
    return this.frequencyService.getRecommendations(keyword);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('favorites')
  addFavorite(@Body('videoId') videoId: number, @Request() req) {
    return this.frequencyService.addFavorite(req.user.id, videoId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('favorites')
  getFavorites(@Request() req) {
    return this.frequencyService.getFavorites(req.user.id);
  }
}
