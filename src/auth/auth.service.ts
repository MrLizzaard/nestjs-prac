import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/interface/token-payload.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
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

  async login(email: string, password: string) {
    if (email !== 'dhk21512@gmail.com' || password !== '1234') {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    const payload: TokenPayload = { email, id: 1 };
    const accessToken = this.jwtService.sign(payload, this.accessTokenOptions); // 15분 만료
    const refreshToken = this.jwtService.sign(
      payload,
      this.refreshTokenOptions,
    ); // 7일 만료

    // ✅ UserService 이용해서 refreshToken 저장
    await this.usersService.updateRefreshToken(1, refreshToken); // 유저 ID: 1 기준

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<TokenPayload>(refreshToken);

      const user = await this.usersService.findByEmail(payload.email);
      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('리프레시 토큰이 유효하지 않습니다');
      }

      const newAccessToken = this.jwtService.sign(
        { email: user.email, id: user.id },
        this.accessTokenOptions,
      );

      return { accessToken: newAccessToken };
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('토큰이 만료되었거나 유효하지 않습니다');
    }
  }

  async logout(userId: number) {
    await this.usersService.updateRefreshToken(userId, null);
    return { message: '로그아웃 완료되었습니다.' };
  }
}
