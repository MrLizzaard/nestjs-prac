import { ConflictException, Injectable } from '@nestjs/common';
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
      // 동일 이메일로 로컬 가입한 계정이 있는지 확인
      const existingUser = await this.usersService.findByEmail(oauthUser.email);

      if (existingUser) {
        // 👉 이미 로컬 계정 존재 → 병합 or 안내
        // 1. 병합: oauth 정보 추가 (자동 병합)
        existingUser.oauthProvider = oauthUser.oauthProvider;
        existingUser.oauthId = oauthUser.oauthId;
        user = await this.usersService.save(existingUser);

        // ❗ or 안내 메시지: '이미 존재하는 이메일입니다. 기존 로그인 방식으로 로그인해주세요.'
        throw new ConflictException('이미 존재하는 이메일입니다.');
      } else {
        // 처음 보는 사용자면 새로 생성
        user = await this.usersService.createOAuthUser(oauthUser);
      }
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
