import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/interface/token-payload.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OauthService {
  private readonly accessTokenOptions;
  private readonly refreshTokenOptions;

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.accessTokenOptions = {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
    };
    this.refreshTokenOptions = {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    };
  }
  async handleOAuthLogin(oauthUser: {
    oauthProvider: string;
    oauthId: string;
    email: string;
    name: string;
  }) {
    // 1. 기존 사용자 찾기 or 생성
    let user = await this.usersService.findByOauth(
      oauthUser.oauthProvider,
      oauthUser.oauthId,
    );

    if (!user) {
      user = await this.usersService.createOAuthUser(oauthUser);
    }

    // 2. JWT payload 구성
    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
    };

    // 3. JWT 발급
    const accessToken = this.jwtService.sign(payload, this.accessTokenOptions);
    const refreshToken = this.jwtService.sign(
      payload,
      this.refreshTokenOptions,
    ); // 7일 만료

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
