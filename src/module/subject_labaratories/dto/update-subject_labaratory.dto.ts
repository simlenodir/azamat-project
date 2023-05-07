import { PartialType } from '@nestjs/swagger';
import { CreateSubjectLabaratoryDto } from './create-subject_labaratory.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateSubjectLabaratoryDto extends PartialType(CreateSubjectLabaratoryDto) {
    @IsString()
    @Length(1, 200)
    @IsOptional()
    title: string;
  
    @IsOptional()
    @IsString()
    subject_id: string;
}
