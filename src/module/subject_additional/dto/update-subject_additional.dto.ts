import { PartialType } from '@nestjs/swagger';
import { CreateSubjectAdditionalDto } from './create-subject_additional.dto';

export class UpdateSubjectAdditionalDto extends PartialType(CreateSubjectAdditionalDto) {}
