import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @Length(1, 200)
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsString()
  link_video: string;

  @IsString()
  subject_id: string;
}
