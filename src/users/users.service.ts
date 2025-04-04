import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateOAuthUserDto } from './dto/create-oauth-user.dto';

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

  async updateRefreshToken(userId: number, refreshToken: string | null) {
    try {
      if (!refreshToken) {
        await this.userRepo.update(userId, { refreshToken: null });
      } else {
        const hashedToken = await bcrypt.hash(refreshToken, 10);
        await this.userRepo.update(userId, { refreshToken: hashedToken });
      }

      // 비교할때 사용
      // const isValid = await bcrypt.compare(incomingRefreshToken, user.refreshToken);
    } catch (error) {
      console.log('Error updating refresh token:', error);
    }
  }

  async findByOauth(provider: string, oauthId: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { oauthProvider: provider, oauthId },
    });
  }

  async createOAuthUser(userdto: CreateOAuthUserDto) {
    const user = this.userRepo.create(userdto);
    return this.userRepo.save(user);
  }

  async save(user: User) {
    return this.userRepo.save(user);
  }
}
