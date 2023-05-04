import { PartialType } from '@nestjs/swagger';
import { CreateMatchDto } from './create-match.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateMatchDto extends PartialType(CreateMatchDto) {
  @Length(1, 20)
  @IsString()
  @IsOptional()
  match_time: string;

  @IsString()
  @IsOptional()
  result: string;

  @IsOptional()
  @IsString()
  host_club: string;

  @IsOptional()
  @IsString()
  guess_club: string;
}
