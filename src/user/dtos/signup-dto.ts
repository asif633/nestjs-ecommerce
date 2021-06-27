import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Match } from "./match-decorator";

export class SignUpDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Match('password')
    passwordConfirm: string;
}