import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    console.log(process.env.NODE_ENV);
    console.log(this.configService.get('JWT_ACCESS_SECRET'));
    return 'Hello World!';
  }
}
