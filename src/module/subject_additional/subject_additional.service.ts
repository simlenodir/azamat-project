import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubjectAdditionalDto } from './dto/create-subject_additional.dto';
import { UpdateSubjectAdditionalDto } from './dto/update-subject_additional.dto';
import { SubjectAdditional } from 'src/entities/subject_additional.entity';

@Injectable()
export class SubjectAdditionalService {
  async oneSubjectAdditional(id: string): Promise<SubjectAdditional> {
    const foundSubjectAdditional = await SubjectAdditional.findOne({
      where: { id },
    });
    if (!foundSubjectAdditional) {
      throw new HttpException(
        'Additional is not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return foundSubjectAdditional;
  }
  async create(dto: CreateSubjectAdditionalDto, file: string): Promise<void> {
    await SubjectAdditional.createQueryBuilder()
      .insert()
      .into(SubjectAdditional)
      .values({
        title: dto.title,
        subject_id: dto.subject_id as any,
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

  async findAll(): Promise<SubjectAdditional[]> {
    return await SubjectAdditional.find().catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  async findOne(id: string): Promise<SubjectAdditional> {
    return await this.oneSubjectAdditional(id);
  }

  async update(
    id: string,
    dto: UpdateSubjectAdditionalDto,
    file: string,
  ): Promise<void> {
    const foundSubjectAdditional = await this.oneSubjectAdditional(id);

    await SubjectAdditional.createQueryBuilder()
      .update(SubjectAdditional)
      .set({
        title: dto.title || foundSubjectAdditional.title,
        subject_id:
          dto.subject_id || (foundSubjectAdditional.subject_id as any),
        link: file || foundSubjectAdditional.link,
      })
      .where({ id })
      .execute()
      .catch(() => {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async remove(id: string): Promise<void> {
    await this.oneSubjectAdditional(id);
    await SubjectAdditional.delete(id).catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }
}
