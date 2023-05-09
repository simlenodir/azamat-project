import { IsNotEmpty, IsString, Length } from "class-validator";
export class CreateAdminInfoDto {   
     @IsString()
    @Length(1, 200)
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}

