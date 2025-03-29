import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(email: string, password: string) {
    if (email !== 'dhk21512@gmail.com' || password !== '1234') {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    const payload = { email, sub: 1 };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
