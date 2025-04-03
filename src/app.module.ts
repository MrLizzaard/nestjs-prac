import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ExampleModule } from './example/example.module';
import { UsersModule } from './users/users.module';
import { ChatbotModule } from './modules/chatbot/chatbot.module';
import { DreamLottoModule } from './modules/dream-lotto/dream-lotto.module';
import { FrequencyModule } from './modules/frequency/frequency.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'sqlite/dev.sqlite',
      entities: ['dist/**/*.entity{.ts,.js}'],

      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    }),
    ExampleModule,
    AuthModule,
    UsersModule,
    ChatbotModule,
    DreamLottoModule,
    FrequencyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
