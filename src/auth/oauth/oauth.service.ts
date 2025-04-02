import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/interface/token-payload.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OauthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
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
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'OAuth 로그인 성공!',
      accessToken,
      user,
    };
  }
}
