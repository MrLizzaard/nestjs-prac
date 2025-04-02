import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OauthController } from './oauth/oauth.controller';
import { OauthService } from './oauth/oauth.service';
import { GoogleStrategy } from './oauth/strategies/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GithubStrategy } from './oauth/strategies/github.strategy';
import { NaverStrategy } from './oauth/strategies/naver.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1d',
        },
      }),
    }),
    JwtModule,
    UsersModule,
  ],
  controllers: [AuthController, OauthController],
  providers: [
    AuthService,
    JwtStrategy,
    OauthService,
    GoogleStrategy,
    GithubStrategy,
    NaverStrategy,
  ],
})
export class AuthModule {}
