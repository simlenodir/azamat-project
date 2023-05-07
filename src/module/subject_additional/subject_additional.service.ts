import { Injectable } from '@nestjs/common';
import { CreateSubjectAdditionalDto } from './dto/create-subject_additional.dto';
import { UpdateSubjectAdditionalDto } from './dto/update-subject_additional.dto';

@Injectable()
export class SubjectAdditionalService {
  create(createSubjectAdditionalDto: CreateSubjectAdditionalDto) {
    return 'This action adds a new subjectAdditional';
  }

  findAll() {
    return `This action returns all subjectAdditional`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subjectAdditional`;
  }

  update(id: number, updateSubjectAdditionalDto: UpdateSubjectAdditionalDto) {
    return `This action updates a #${id} subjectAdditional`;
  }

  remove(id: number) {
    return `This action removes a #${id} subjectAdditional`;
  }
}
