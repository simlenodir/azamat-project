import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { Practices } from 'src/entities/practices.entity';

@Injectable()
export class PracticesService {
  async onePractice(id: string): Promise<Practices> {
    const foundPractice = await Practices.findOne({
      where: {id}
    }).catch(() => {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    });
    if (!foundPractice) {
      throw new HttpException('Practice is not found', HttpStatus.NOT_FOUND);
    }
    return foundPractice
  }

  async create(dto: CreatePracticeDto, file: string): Promise<void> {
      await Practices.createQueryBuilder()
      .insert()
      .into(Practices)
      .values({
        title: dto.title,
        detail_id: dto.subject_id as any,
        file: file
      })
      .execute()
      .catch(() => {
        throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async findAll(): Promise<Practices[]> {
    return await Practices.find().catch(() => {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findOne(id: string): Promise<Practices> {
    return await this.onePractice(id)
  }

  async update(id: string, dto: UpdatePracticeDto, file: string): Promise<void> {
    const foundPractice = await this.onePractice(id)
    await Practices.createQueryBuilder()
    .update(Practices)
    .set({
      title: dto.title  || foundPractice.title,
      detail_id: dto.subject_id as any  || foundPractice.detail_id,
      file: file || foundPractice.file
    })
    .where({id})
    .execute()
    .catch(() => {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async remove(id: string): Promise<void> {
    await Practices.delete(id)
  }
}
