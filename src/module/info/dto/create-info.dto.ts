import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateInfoDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 250)
    title: string
    
    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    sub_id: string

}
