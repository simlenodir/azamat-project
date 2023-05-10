import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from 'src/entities/subjects.entity';

@Injectable()
export class SubjectsService {
  async foundSubject(id: string): Promise<Subject> {
    const foundSubject = await Subject.findOne({
      where: {id},
      relations: {
        subject_detail: true
       }
    }).catch(() => {
      throw new HttpException('Server error', HttpStatus.NOT_FOUND);
    });

    if (!foundSubject) {
      throw new HttpException('Subject is not found', HttpStatus.NOT_FOUND);
    }
    return foundSubject
  }

  async create(createSubjectDto: CreateSubjectDto): Promise<void> {
    await Subject.createQueryBuilder()
    .insert()
    .into(Subject)
    .values({
      title: createSubjectDto.title
    })
    .execute().catch(() => {
      throw new HttpException('Server error', HttpStatus.NOT_FOUND);
    });

  }

  async findAll(): Promise<Subject[]> {
    return Subject.find().catch(() => {
      throw new HttpException('Server error', HttpStatus.NOT_FOUND);
    });
  }

  async findOne(id: string): Promise<Subject> {
    return await this.foundSubject(id)
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<void> {
    const foundSubject =  await this.foundSubject(id)

    await Subject.createQueryBuilder()
    .update(Subject)
    .set({
      title: updateSubjectDto.title || foundSubject.title
    })
    .where({id})
    .execute().catch(() => {
      throw new HttpException('Server error', HttpStatus.NOT_FOUND);
    });
  }

  async remove(id: string): Promise<void> {
    await this.foundSubject(id)
    await Subject.delete(id)
  }
}
