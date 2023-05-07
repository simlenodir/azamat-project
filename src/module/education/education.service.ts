import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Education } from 'src/entities/education.entity';

@Injectable()
export class EducationService {
  async oneEducation(id: string): Promise<Education> {
    const foundEducation = await Education.findOne({
      where: { id },
    }).catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
    if (!foundEducation) {
      throw new HttpException('Lecture is not found', HttpStatus.NOT_FOUND);
    }
    return foundEducation;
  }
  async create(dto: CreateEducationDto, file: string): Promise<void> {
    console.log(dto, file);

    await Education.createQueryBuilder()
      .insert()
      .into(Education)
      .values({
        description: dto.description,
        sub_id: dto.sub_id as any,
        title: dto.title,
        link: file,
      })
      .execute()
      .catch(() => {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async findAll(): Promise<Education[]> {
    return await Education.find().catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  async findOne(id: string): Promise<Education> {
    return await this.oneEducation(id)
  }

  async update(
    id: string,
    dto: UpdateEducationDto, file: string,
  ): Promise<void> {
    const foundEducation = await this.oneEducation(id)
    await Education.createQueryBuilder()
    .update(Education)
    .set({
      title: dto.title  || foundEducation.title,
      description: dto.description  || foundEducation.description,
      sub_id: dto.sub_id as any  || foundEducation.sub_id,
      link: file || foundEducation.link
    })
    .where({id})
    .execute().catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  async remove(id: string): Promise<void> {
    await this.oneEducation(id)
    await Education.delete(id)
  }
}
