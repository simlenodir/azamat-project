import { IsString, Length } from 'class-validator';

export class CreateMatchDto {
  @Length(1, 20)
  @IsString()
  match_time: string;

  @IsString()
  result: string;

  @IsString()
  host_club: string;

  @IsString()
  guess_club: string;
}
