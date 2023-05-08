import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePoliticalDto } from './dto/create-political.dto';
import { UpdatePoliticalDto } from './dto/update-political.dto';
import { Political } from 'src/entities/political.entity';

@Injectable()
export class PoliticalService {
  async onePolitical(id: string): Promise<Political>{
    const foundPolitical = await Political.findOne({
      where: {id}
    }).catch(() => {
      throw new HttpException(
        'Political is not found',
        HttpStatus.NOT_FOUND,
      );
    });
    if (!foundPolitical) {
      throw new HttpException('Lecture is not found', HttpStatus.NOT_FOUND);
    }
    return foundPolitical
  }

  async create(dto: CreatePoliticalDto, file: string): Promise<void> {
     await Political.createQueryBuilder()
     .insert()
     .into(Political)
     .values({
      title: dto.title,
      description: dto.description,
      sub_id:  dto.sub_id as any,
      link: file
     })
     .execute()
     .catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  async findAll(): Promise<Political[]> {
    return await Political.find().catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  async findOne(id: string): Promise<Political> {
    return await this.onePolitical(id)
  }

  async update(id: string, dto: UpdatePoliticalDto, file: string): Promise<void> {
    const foundPolitical = await this.onePolitical(id)
    await Political.createQueryBuilder()
    .update(Political)
    .set({
      title: dto.title || foundPolitical.title,
      description: dto.description || foundPolitical.description,
      sub_id: dto.sub_id as any || foundPolitical.sub_id,
      link: file || foundPolitical.link
    })
    .where({id})
    .execute()
    .catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  async remove(id: string): Promise<void> {
     await this.onePolitical(id)
     await Political.delete(id)
  }
}
