import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: '여기에 Swagger 설명을 적어주세요' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: '이름',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
