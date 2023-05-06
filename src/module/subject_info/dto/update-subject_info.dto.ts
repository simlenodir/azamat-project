import { PartialType } from '@nestjs/swagger';
import { CreateSubjectInfoDto } from './create-subject_info.dto';

export class UpdateSubjectInfoDto extends PartialType(CreateSubjectInfoDto) {}
