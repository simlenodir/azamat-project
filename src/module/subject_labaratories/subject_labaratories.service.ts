import { Injectable } from '@nestjs/common';
import { CreateSubjectLabaratoryDto } from './dto/create-subject_labaratory.dto';
import { UpdateSubjectLabaratoryDto } from './dto/update-subject_labaratory.dto';

@Injectable()
export class SubjectLabaratoriesService {
  create(createSubjectLabaratoryDto: CreateSubjectLabaratoryDto) {
    return 'This action adds a new subjectLabaratory';
  }

  findAll() {
    return `This action returns all subjectLabaratories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subjectLabaratory`;
  }

  update(id: number, updateSubjectLabaratoryDto: UpdateSubjectLabaratoryDto) {
    return `This action updates a #${id} subjectLabaratory`;
  }

  remove(id: number) {
    return `This action removes a #${id} subjectLabaratory`;
  }
}
