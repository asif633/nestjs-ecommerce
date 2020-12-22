import { IsNotEmpty } from "class-validator";

export class CategoryDto {

    @IsNotEmpty()
    name: string;

    slug: string;

    banner: string;

}