import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  rolesId: number[] | string[];
}
