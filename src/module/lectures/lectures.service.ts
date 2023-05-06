import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { Lectures } from 'src/entities/lectures.entity';

@Injectable()
export class LecturesService {
  async foundLecture(id: string): Promise<Lectures> {
    const foundLecture = await Lectures.findOne({
      where: { id },
    });
    if (!foundLecture) {
      throw new HttpException('Lecture is not found', HttpStatus.NOT_FOUND);
    }
    return foundLecture;
  }

  async create(createLectureDto: CreateLectureDto, file: any): Promise<void> {
    await Lectures.createQueryBuilder()
      .insert()
      .into(Lectures)
      .values({
        title: createLectureDto.title,
        subject_id: createLectureDto.subject_id as any,
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

  async findAll(): Promise<Lectures[]> {
    return Lectures.find();
  }

  async findOne(id: string): Promise<Lectures> {
    const foundLecture = await this.foundLecture(id);
    return foundLecture;
  }

  async update(id: string, dto: UpdateLectureDto, file: any): Promise<void> {
    const foundLecture = await this.foundLecture(id);

    await Lectures.createQueryBuilder()
      .update(Lectures)
      .set({
        title: dto.title || foundLecture.title,
        subject_id: dto.subject_id || (foundLecture.subject_id as any),
        link: file || foundLecture.link,
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
    await this.foundLecture(id);
    await Lectures.delete(id).catch(() => {
      throw new HttpException('Internal server error', HttpStatus.NOT_FOUND);
    });
  }
}
