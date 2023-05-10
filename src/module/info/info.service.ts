import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { SubCategoryInfo } from 'src/entities/category_info.entity';
import moment from 'moment';

@Injectable()
export class InfoService {
  async foundInfo(id: string): Promise<SubCategoryInfo> {
    const foundInfo = await SubCategoryInfo.findOne({
      where: { id },
    }).catch(() => {
      throw new HttpException('Server error', HttpStatus.NOT_FOUND);
    });

    if (!foundInfo) {
      throw new HttpException(
        'Sub Category Info not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return foundInfo;
  }

  async create(createInfoDto: CreateInfoDto, img_link: string): Promise<void> {
    await SubCategoryInfo.createQueryBuilder()
      .insert()
      .into(SubCategoryInfo)
      .values({
        description: createInfoDto.description,
        image: img_link,
        title: createInfoDto.title,
        sub_id: createInfoDto.sub_id as any,
      })
      .execute()
      .catch(() => {
        throw new HttpException('Server error', HttpStatus.NOT_FOUND);
      });
  }

  async findAll(ofset: number, limit: number): Promise<SubCategoryInfo[]> {
    const allInfo = await SubCategoryInfo.find({
      order: {
        create_date: 'DESC',
        views: 'DESC'
      },
    }).catch(() => {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    });
    const filteredInfos = allInfo.slice(ofset, limit);
    filteredInfos?.map((e) => {
      // const minute = moment(e?.create_date)
      //   .locale('')
      //   .startOf('minute')
      //   .fromNow()
      //   .split(' ')[2];
      // const isHour = moment(e.create_date)
      //   .locale('uz')
      //   .startOf('minute')
      //   .fromNow()
      //   .split(' ')[3];
      // const date = moment(e.create_date).format('L').split('/').join('.');
      // const time = moment(e.create_date).locale('uz').format('LT');
      // e.timeHour =
      //   +minute < 60 && isHour != 'соат'
      //     ? `${minute} minut oldin`
      //     : `${minute == 'бир' ? '1' : minute} soat oldin`;
      // e.dateTime = `${date} ${time}`;
    });
    return filteredInfos;
  }

  async searchAll(query: string): Promise<SubCategoryInfo[]> {
    const searchQuery = query;

     return SubCategoryInfo.createQueryBuilder().select()
       .where('title ILIKE :searchQuery', {searchQuery: `%${searchQuery}%`})
      //  .orWhere('username ILIKE :searchQuery', {searchQuery: `%${searchQuery}%`})
      //  .orWhere('description ILIKE :searchQuery', {searchQuery: `%${searchQuery}%`})
       .getMany().catch(() => {
      throw new HttpException('Server error', HttpStatus.NOT_FOUND);
    });
  }

  async findOne(id: string): Promise<SubCategoryInfo> {
    const foundInfo = await this.foundInfo(id);
    
      await SubCategoryInfo.createQueryBuilder()
      .update(SubCategoryInfo)
      .set({
        views: foundInfo.views + 1
      })
      .where({ id })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
    return foundInfo
  }

  async update(
    id: string,
    dto: UpdateInfoDto,
    file_link: string | boolean,
  ): Promise<void> {
    
    const foundInfo = await this.foundInfo(id);
    await SubCategoryInfo.createQueryBuilder()
      .update(SubCategoryInfo)
      .set({
        description: dto.description || foundInfo.description,
        image: file_link as any,
        sub_id: dto.sub_id || (foundInfo.sub_id as any),
        title: dto.title,
        isPublished: dto.isPublished || foundInfo.isPublished,
      })
      .where({ id })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id)

    await SubCategoryInfo.delete(id)
  }
}
