import { PartialType } from '@nestjs/swagger';
import { CreateEducationDto } from './create-education.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateEducationDto extends PartialType(CreateEducationDto) {
    @IsString()
    @Length(1, 200)
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    sub_id: string;
}
