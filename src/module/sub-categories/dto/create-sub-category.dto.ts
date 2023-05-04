import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateSubCategoryDto {
    @IsString()
    @Length(1, 250)
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    category_id: string;
}
