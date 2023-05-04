import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { SubCategoryInfo } from 'src/entities/category_info.entity';

@Injectable()
export class InfoService {
  async create(createInfoDto: CreateInfoDto, img_link: any): Promise<void> {
    await SubCategoryInfo.createQueryBuilder()
    .insert()
    .into(SubCategoryInfo)
    .values({
      description: createInfoDto.description,
      image: img_link,
      title: createInfoDto.title,
      sub_id: createInfoDto.sub_id as any
    })
    .execute()
    .catch(() => {
      throw new HttpException('Server error', HttpStatus.NOT_FOUND);
    });
  }

  findAll() {
    return `This action returns all info`;
  }

  findOne(id: number) {
    return `This action returns a #${id} info`;
  }

  update(id: number, updateInfoDto: UpdateInfoDto) {
    return `This action updates a #${id} info`;
  }

  remove(id: number) {
    return `This action removes a #${id} info`;
  }
}
