import { PartialType } from '@nestjs/swagger';
import { CreatePoliticalDto } from './create-political.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdatePoliticalDto extends PartialType(CreatePoliticalDto) {
    @IsString()
    @Length(1, 200)
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsOptional()
    @IsString()
    sub_id: string;
}
