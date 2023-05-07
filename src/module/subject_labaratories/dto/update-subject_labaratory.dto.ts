import { PartialType } from '@nestjs/swagger';
import { CreateSubjectLabaratoryDto } from './create-subject_labaratory.dto';

export class UpdateSubjectLabaratoryDto extends PartialType(CreateSubjectLabaratoryDto) {}
