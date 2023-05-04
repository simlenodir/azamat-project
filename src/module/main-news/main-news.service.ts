import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMainNewDto } from './dto/create-main-new.dto';
import { UpdateMainNewDto } from './dto/update-main-new.dto';
// import { MainNews } from 'src/entities/main_news.entity';

@Injectable()
export class MainNewsService {
  async create(dto: CreateMainNewDto): Promise<void> {
    // await MainNews.createQueryBuilder()
    //   .insert()
    //   .into(MainNews)
    //   .values({
    //     title: dto.title,
    //   })
    //   .execute()
    //   .catch(() => {
    //     throw new HttpException('Internal server error', HttpStatus.NOT_FOUND);
    //   });
  }

  async findAll() {
    // const news: any = await MainNews.find().catch(() => {
    //   throw new HttpException('Internal server error', HttpStatus.NOT_FOUND);
    // });
    // for (let i = 0; i < news.length; i++) {
    //   news[i].count = Math.floor(Math.random() * 100);
    // }

    // const result = news
    //   .sort((a, b) => a.count - b.count)
    //   .map((e) => (delete e.count ? e : e));

    // return result;
  }

  async update(id: string, dto: UpdateMainNewDto): Promise<void> {
    // const foundMainNews = await MainNews.findOne({ where: { id } });
    // if (foundMainNews) {
    //   await MainNews.createQueryBuilder()
    //     .update()
    //     .set({
    //       title: dto.title || foundMainNews.title,
    //     })
    //     .where({ id })
    //     .execute()
    //     .catch(() => {
    //       throw new HttpException(
    //         'Internal server error',
    //         HttpStatus.NOT_FOUND,
    //       );
    //     });
    // } else {
    //   throw new HttpException('Main news not found', HttpStatus.NOT_FOUND);
    // }
  }

  async remove(id: string) {
    // const foundMainNews = await MainNews.findOne({ where: { id } });
    // if (foundMainNews) {
    //   await MainNews.delete(id);
    // } else {
    //   throw new HttpException('Main news not found', HttpStatus.NOT_FOUND);
    // }
  }
}
