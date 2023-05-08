import { IsNotEmpty, IsString, Length } from "class-validator";
export class CreateEventDto {
    @IsString()
    @Length(1, 200)
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @Length(1, 100)
    @IsNotEmpty()
    sub_id: string;
}
