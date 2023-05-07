import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubjectLabaratoryDto } from './dto/create-subject_labaratory.dto';
import { UpdateSubjectLabaratoryDto } from './dto/update-subject_labaratory.dto';
import { Labaratories } from 'src/entities/labaratories.entity';

@Injectable()
export class SubjectLabaratoriesService {
  async OneLabaratories(id: string): Promise<Labaratories> {
    const foundLabaratory = await Labaratories.findOne({
      where: {id}
    }).catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });

    if (!foundLabaratory) {
      throw new HttpException(
        'Labaratory is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return foundLabaratory
  }

  async create(dto: CreateSubjectLabaratoryDto, file: string): Promise<void> {
    await Labaratories.createQueryBuilder()
    .insert()
    .into(Labaratories)
    .values({
      title: dto.title,
      subject_id: dto.subject_id as any,
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

  async findAll(): Promise<Labaratories[]> {
    return await Labaratories.find()
  }

  async findOne(id: string): Promise<Labaratories> {
    return await this.OneLabaratories(id)
  }

  async update(id: string, dto: UpdateSubjectLabaratoryDto, file: string): Promise<void> {
    const foundLabaratory = await this.OneLabaratories(id)
    await Labaratories.createQueryBuilder()
    .update(Labaratories)
    .set({
      title: dto.title || foundLabaratory.title,
      subject_id: dto.subject_id || foundLabaratory.subject_id as any,
      link: file
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
      await this.OneLabaratories(id)
      await Labaratories.delete(id)
  }
}
