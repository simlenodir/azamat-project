import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateSubjectDto {
    @IsString()
    @Length(0, 250)
    @IsNotEmpty()
    title: string
}
