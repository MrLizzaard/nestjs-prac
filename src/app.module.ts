import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
