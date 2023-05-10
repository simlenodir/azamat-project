import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubjectDetailDto } from './dto/create-subject_detail.dto';
import { UpdateSubjectDetailDto } from './dto/update-subject_detail.dto';
import { SubjectDetail } from 'src/entities/subject_details.entity';

@Injectable()
export class SubjectDetailsService {
  async oneSubjectDetail(id: string): Promise<SubjectDetail> {
    const found = await SubjectDetail.findOne({
      where: { id },
      relations: {practice: true}
    });
    if (!found) {
      throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }
  async create(dto: CreateSubjectDetailDto): Promise<void> {
    await SubjectDetail.createQueryBuilder()
      .insert()
      .into(SubjectDetail)
      .values({
        title: dto.title,
        subject_id: dto.subject_id as any,
      })
      .execute()
      .catch(() => {
        throw new HttpException(
          'Server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async findAll(): Promise<SubjectDetail[]> {
    return await SubjectDetail.find().catch(() => {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findOne(id: string): Promise<SubjectDetail> {
    return await this.oneSubjectDetail(id);
  }

  async update(id: string, dto: UpdateSubjectDetailDto): Promise<void> {
    await this.oneSubjectDetail(id);
    await SubjectDetail.createQueryBuilder()
      .update(SubjectDetail)
      .set({
        subject_id: dto.subject_id as any,
        title: dto.title,
      })
      .where({ id })
      .execute()
      .catch(() => {
        throw new HttpException(
          'Server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async remove(id: string): Promise<void> {
    await this.oneSubjectDetail(id)
    await SubjectDetail.delete(id )
  }
}
