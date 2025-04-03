// src/auth/oauth/github.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { VerifyCallback } from 'passport-oauth2';
import { OauthProvider } from 'src/constants/oauth-provider';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, username, emails } = profile;
    const user = {
      oauthProvider: OauthProvider.GITHUB,
      oauthId: id,
      email: emails?.[0]?.value || null,
      name: username,
    };
    done(null, user);
  }
}
