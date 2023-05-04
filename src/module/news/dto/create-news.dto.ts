import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateNewsDto {
  @Length(1, 200)
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
