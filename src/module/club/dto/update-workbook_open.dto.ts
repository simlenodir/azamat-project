import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { CreateClubDto } from './create-workbook_open.dto';

export class UpdateClubDto extends PartialType(CreateClubDto) {
  @IsString()
  @IsOptional()
  title: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  point: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  goals: number;

  @IsString()
  @IsOptional()
  liga_id: string;
}
