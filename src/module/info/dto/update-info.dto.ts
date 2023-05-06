import { PartialType } from '@nestjs/swagger';
import { CreateInfoDto } from './create-info.dto';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateInfoDto extends PartialType(CreateInfoDto) {
    // @IsBoolean()
    // @IsOptional()
    isPublished: boolean

    @IsString()
    @Length(1, 250)
    @IsOptional()
    title: string
    
    @IsString()
    @IsOptional()
    description: string

    @IsString()
    @IsOptional()
    sub_id: string
}
