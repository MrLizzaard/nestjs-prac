import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Keyword } from './entities/keyword.entity';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FrequencyService {
  constructor(
    @InjectRepository(Keyword)
    private readonly keywordRepo: Repository<Keyword>,
    @InjectRepository(Video)
    private readonly videoRepo: Repository<Video>,
    @InjectRepository(Favorite)
    private readonly favoriteRepo: Repository<Favorite>,
  ) {}

  async saveKeywords(userId: number, keywords: string[]) {
    await this.keywordRepo.delete({ userId });
    const entities = keywords.map((k) =>
      this.keywordRepo.create({ userId, keyword: k }),
    );
    return this.keywordRepo.save(entities);
  }

  async getRecommendations(keyword: string) {
    return this.videoRepo.find({
      where: { keyword },
      order: { createdAt: 'DESC' },
    });
  }

  async addFavorite(userId: number, videoId: number) {
    const favorite = this.favoriteRepo.create({ userId, videoId });
    return this.favoriteRepo.save(favorite);
  }

  async getFavorites(userId: number) {
    return this.favoriteRepo.find({ where: { userId }, relations: ['video'] });
  }
}
