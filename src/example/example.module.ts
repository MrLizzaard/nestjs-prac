import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Example } from './entities/example.entitiy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Example]), UsersModule],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
