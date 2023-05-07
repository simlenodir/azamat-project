import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePracticeDto {
    @IsString()
    @Length(1, 250)
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    subject_id: string
}
