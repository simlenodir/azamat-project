import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { connectDb } from './ormconfig/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { AuthModule } from './module/auth/auth.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { MiddlewareModule } from './middleware/middleware.module';
import { NewsModule } from './module/news/news.module';
import { ClubModule } from './module/club/club.module';
import { MatchesModule } from './module/matches/matches.module';
import { TokenMiddleware } from './middleware/middleware.service';
import { MainNewsModule } from './module/main-news/main-news.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoriesModule } from './module/categories/categories.module';
import { SubCategoriesModule } from './module/sub-categories/sub-categories.module';
import { InfoModule } from './module/info/info.module';
import { SubjectsModule } from './module/subjects/subjects.module';
dotenv.config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'src', 'uploads'),
    }),
    ConfigModule.forRoot(config),
    TypeOrmModule.forRoot(connectDb),
    MiddlewareModule,
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
        password: '',
      },
    }),
    TokenMiddleware,
    ClubModule,
    AuthModule,
    NewsModule,
    MatchesModule,
    MainNewsModule,
    CategoriesModule,
    SubCategoriesModule,
    InfoModule,
    SubjectsModule,
  ],
})
export class AppModule {}
