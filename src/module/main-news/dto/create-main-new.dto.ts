import { IsNotEmpty, IsString } from 'class-validator';
export class CreateMainNewDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
