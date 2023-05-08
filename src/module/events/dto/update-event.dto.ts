import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateEventDto extends PartialType(CreateEventDto) {
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
