import { IsEmail, IsString, MinLength, IsNotEmpty, } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: "Password should be minimum of 8 characters" })
  public password: string;
}