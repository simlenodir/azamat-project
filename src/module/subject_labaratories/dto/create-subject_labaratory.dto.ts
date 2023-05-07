import { IsNotEmpty, IsString, Length } from "class-validator";
export class CreateSubjectLabaratoryDto {
    @IsString()
    @Length(1, 200)
    @IsNotEmpty()
    title: string;

    @IsString()
    @Length(1, 100)
    @IsNotEmpty()
    subject_id: string;
}