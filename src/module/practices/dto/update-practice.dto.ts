import { PartialType } from '@nestjs/swagger';
import { CreatePracticeDto } from './create-practice.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdatePracticeDto extends PartialType(CreatePracticeDto) {
    @IsString()
    @Length(1, 250)
    @IsOptional()
    title: string

    @IsString()
    @IsOptional()
    subject_id: string
}
