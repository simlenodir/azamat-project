import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { connectDb } from './ormconfig/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { AuthModule } from './module/auth/auth.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { MiddlewareModule } from './middleware/middleware.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoriesModule } from './module/categories/categories.module';
import { SubCategoriesModule } from './module/sub-categories/sub-categories.module';
import { InfoModule } from './module/info/info.module';
import { SubjectsModule } from './module/subjects/subjects.module';
import { VideosModule } from './module/videos/videos.module';
import { PracticesModule } from './module/practices/practices.module';
import { AdminInfoModule } from './module/admin_info/admin_info.module';
import { TokenMiddleware } from './middleware/middleware.service';
import { SubjectDetailsModule } from './module/subject_details/subject_details.module';
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
    AuthModule,
    CategoriesModule,
    SubCategoriesModule,
    InfoModule,
    SubjectsModule,
    VideosModule,
    PracticesModule,
    AdminInfoModule,
    SubjectDetailsModule,
  ],
})
export class AppModule {}
