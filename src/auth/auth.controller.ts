import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenPayload } from 'src/interface/token-payload.interface';

interface AuthenticatedRequest extends Request {
  user: TokenPayload;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshAccessToken(body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    const { user } = req;
    console.log(user);
    return {
      message: '유저 정보',
      user: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('logout')
  async logout(@Request() req: AuthenticatedRequest) {
    return this.authService.logout(req.user.id);
  }
}
