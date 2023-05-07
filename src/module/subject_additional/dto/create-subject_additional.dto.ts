import { IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateSubjectAdditionalDto {
  @IsString()
  @Length(1, 200)
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subject_id: string;
}

