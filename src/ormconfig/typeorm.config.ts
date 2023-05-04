import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { SubCategory } from 'src/entities/sub_category.entity';
import { SubCategoryInfo } from 'src/entities/category_info.entity';
import { Subject } from 'src/entities/subjects.entity';
import { Videos } from 'src/entities/videos.entity';
import { SubjectInfo } from 'src/entities/subject_info.entity';
dotenv.config();

export const connectDb: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  password: String(process.env.DB_PASSWORD),
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  entities: [Category, SubCategory, SubCategoryInfo, SubjectInfo, Subject, Videos],
  autoLoadEntities: true,
  synchronize: true,
};
