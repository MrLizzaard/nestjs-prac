import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(): Promise<User> {
    return this.userRepo.save({
      email: 'dhk21512@gmail.com',
      password: '1234',
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { email } });
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.userRepo.update(userId, { refreshToken });
  }
}
