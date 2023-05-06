import { PartialType } from '@nestjs/swagger';
import { CreateInfoDto } from './create-info.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateInfoDto extends PartialType(CreateInfoDto) {
    @IsBoolean()
    @IsOptional()
    isPublished: boolean
}
