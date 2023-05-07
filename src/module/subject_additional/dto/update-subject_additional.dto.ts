import { PartialType } from '@nestjs/swagger';
import { CreateSubjectAdditionalDto } from './create-subject_additional.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateSubjectAdditionalDto extends PartialType(CreateSubjectAdditionalDto) {
    @IsString()
    @Length(1, 200)
    @IsOptional()
    title: string;
  
    @IsOptional()
    @IsString()
    subject_id: string;
}
