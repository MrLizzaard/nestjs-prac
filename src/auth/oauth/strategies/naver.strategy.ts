// src/auth/oauth/naver.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-naver-v2';
import { VerifyCallback } from 'passport-oauth2';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const { id, email, name } = profile;

    const user = {
      oauthProvider: 'naver',
      oauthId: id,
      email: email || null,
      name: name || '네이버 사용자',
    };
    done(null, user);
  }
}
