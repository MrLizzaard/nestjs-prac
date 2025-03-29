import { ExampleService } from './example.service';
import {
  BadGatewayException,
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  GatewayTimeoutException,
  Get,
  GoneException,
  HttpException,
  HttpVersionNotSupportedException,
  ImATeapotException,
  InternalServerErrorException,
  IntrinsicException,
  MethodNotAllowedException,
  MisdirectedException,
  NotAcceptableException,
  NotFoundException,
  NotImplementedException,
  PayloadTooLargeException,
  Post,
  PreconditionFailedException,
  Put,
  Query,
  RequestTimeoutException,
  ServiceUnavailableException,
  UnauthorizedException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateExampleDto } from './dto/create-example.dto';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}
  @Get()
  @ApiOperation({ summary: 'GET API 예시' })
  @ApiQuery({ name: 'name', required: true, description: '이름' })
  getExample(@Query('name') name: string) {
    console.log(name);
    return 'example';
  }

  @Get('error')
  @ApiOperation({ summary: 'GET API 예시' })
  getError() {
    throw new BadGatewayException('게이트웨이 오류가 발생했습니다');
    throw new BadRequestException('잘못된 요청입니다');
    throw new ConflictException('충돌이 발생했습니다');
    throw new ForbiddenException('금지되었습니다');
    throw new GatewayTimeoutException('게이트웨이 시간 초과가 발생했습니다');
    throw new GoneException('이미 사라졌습니다');
    throw new HttpVersionNotSupportedException('HTTP 버전이 지원되지 않습니다');
    throw new HttpException('서버 오류가 발생했습니다', 500);
    throw new ImATeapotException('나는 주전자입니다');
    throw new InternalServerErrorException('내부 서버 오류가 발생했습니다');
    throw new IntrinsicException('내재적인 예외가 발생했습니다');
    throw new MethodNotAllowedException('허용되지 않는 메소드입니다');
    throw new MisdirectedException('잘못된 방향으로 이동했습니다');
    throw new NotAcceptableException('허용되지 않는 요청입니다');
    throw new NotFoundException('찾을 수 없습니다');
    throw new NotImplementedException('구현되지 않았습니다');
    throw new PayloadTooLargeException('페이로드가 너무 큽니다');
    throw new PreconditionFailedException('사전 조건이 실패했습니다');
    throw new RequestTimeoutException('요청 시간 초과가 발생했습니다');
    throw new ServiceUnavailableException('서비스를 사용할 수 없습니다');
    throw new UnauthorizedException('인증되지 않았습니다');
    throw new UnprocessableEntityException('처리할 수 없는 엔티티입니다');
    throw new UnsupportedMediaTypeException('지원되지 않는 미디어 타입입니다');
  }

  @Post()
  @ApiOperation({ summary: 'POST API 예시' })
  postExample(@Body() createExampleDto: CreateExampleDto) {
    console.log(createExampleDto);
    return { key: 'value' };
  }

  @Post('dummy')
  @ApiOperation({ summary: '더미데이터 생성' })
  createDummy() {
    return this.exampleService.createDummy(); // 엔티티를 저장합니다.
  }

  @Put()
  @ApiOperation({ summary: 'PUT API 예시' })
  putExample() {
    return 'example';
  }

  @Delete()
  @ApiOperation({ summary: 'DELETE API 예시' })
  deleteExample() {
    return 'example';
  }
}
