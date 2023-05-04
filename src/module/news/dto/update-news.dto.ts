import { IsString, Length } from 'class-validator';

export class UpdateNewsDto {
  @Length(1, 200)
  @IsString()
  title: string;

  @IsString()
  description: string;
}
