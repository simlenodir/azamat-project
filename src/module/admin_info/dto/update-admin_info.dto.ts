import { PartialType } from '@nestjs/swagger';
import { CreateAdminInfoDto } from './create-admin_info.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateAdminInfoDto extends PartialType(CreateAdminInfoDto) {
    @IsString()
    @Length(1, 200)
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;
}
