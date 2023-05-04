import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
// import { News } from 'src/entities/news.entity';
import { UpdateNewsDto } from './dto/update-news.dto';
import * as moment from 'moment';

@Injectable()
export class NewsServise {
  async news(ofset: number = 0, limit: number) {
    // const allnews: any[] = await News.find({
    //   order: {
    //     create_date: 'DESC',
    //   },
    // }).catch(() => {
    //   throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    // });
    // const filteredNews = allnews?.slice(ofset, limit);

    // filteredNews?.map((e) => {
    //   const minute = moment(e.create_date)
    //     .locale('uz')
    //     .startOf('minute')
    //     .fromNow()
    //     .split(' ')[2];
    //   const isHour = moment(e.create_date)
    //     .locale('uz')
    //     .startOf('minute')
    //     .fromNow()
    //     .split(' ')[3];
    //   const date = moment(e.create_date).format('L').split('/').join('.');
    //   const time = moment(e.create_date).locale('uz').format('LT');
    //   e.timeHour =
    //     +minute < 60 && isHour != 'соат'
    //       ? `${minute} minut oldin`
    //       : `${minute == 'бир' ? '1' : minute} soat oldin`;
    //   e.datetime = `${date} ${time}`;
    // });
    // return filteredNews;
  }

  async one(id: string) {
    // const findNews: any = await News.findOne({
    //   order: {
    //     create_date: 'DESC',
    //   },
    //   where: {
    //     id,
    //   },
    // }).catch(() => {
    //   throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    // });

    // if (!findNews) {
    //   throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    // }

    // const filteredNews = [findNews];

    // filteredNews?.map((e) => {
    //   const minute = moment(e.create_date)
    //     .locale('uz')
    //     .startOf('minute')
    //     .fromNow()
    //     .split(' ')[2];
    //   const isHour = moment(e.create_date)
    //     .locale('uz')
    //     .startOf('minute')
    //     .fromNow()
    //     .split(' ')[3];
    //   const date = moment(e.create_date).format('L').split('/').join('.');
    //   const time = moment(e.create_date).locale('uz').format('LT');
    //   e.timeHour =
    //     +minute < 60 && isHour != 'соат'
    //       ? `${minute} minut oldin`
    //       : `${minute == 'бир' ? '1' : minute} soat oldin`;
    //   e.datetime = `${date} ${time}`;
    // });
    // return filteredNews;

    // return findNews;
  }

  async create(createNewsDto: CreateNewsDto, imgLink) {
    // const create = await News.createQueryBuilder()
    //   .insert()
    //   .into(News)
    //   .values({
    //     title: createNewsDto.title,
    //     description: createNewsDto.description,
    //     img: imgLink,
    //   })
    //   .execute()
    //   .catch(() => {
    //     throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    //   });
  }

  async update(id: string, updateNewsDto: UpdateNewsDto, imgLink) {
    // const findPost = await News.findOne({
    //   where: {
    //     id: id,
    //   },
    // }).catch(() => {
    //   throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    // });

    // if (!findPost) {
    //   throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    // }

    // await News.createQueryBuilder()
    //   .update()
    //   .set({
    //     title: updateNewsDto.title || findPost.title,
    //     img: imgLink || findPost.img,
    //     description: updateNewsDto.description || findPost.description,
    //   })
    //   .where({ id: id })
    //   .execute()
    //   .catch(() => {
    //     throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    //   });
  }

  async delete(id: string) {
    // const findNews = await News.findOne({
    //   where: { id: id },
    // }).catch(() => {
    //   throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    // });

    // if (!findNews) {
    //   throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    // }

    // await News.createQueryBuilder()
    //   .delete()
    //   .from(News)
    //   .where({ id: id })
    //   .execute();
  }
}
