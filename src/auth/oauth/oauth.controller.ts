import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OauthService } from './oauth.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // 구글 로그인 페이지로 리다이렉트됨
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req: any, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.oauthService.handleOAuthLogin(req.user);

    const redirectUrl = `http://localhost:3008/oauth-callback?accessToken=${accessToken}&refreshToken=${refreshToken}`;

    return res.redirect(redirectUrl);
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin() {
    // GitHub 로그인 리다이렉트
  }

  @Get('github/redirect')
  @UseGuards(AuthGuard('github'))
  async githubRedirect(@Req() req: any, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.oauthService.handleOAuthLogin(req.user);

    const redirectUrl = `http://localhost:3008/oauth-callback?accessToken=${accessToken}&refreshToken=${refreshToken}`;

    return res.redirect(redirectUrl);
  }

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  naverLogin() {
    // Naver 로그인 페이지로 이동
  }

  @Get('naver/redirect')
  @UseGuards(AuthGuard('naver'))
  async naverRedirect(@Req() req: any, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.oauthService.handleOAuthLogin(req.user);

    const redirectUrl = `http://localhost:3008/oauth-callback?accessToken=${accessToken}&refreshToken=${refreshToken}`;

    return res.redirect(redirectUrl);
  }
}
