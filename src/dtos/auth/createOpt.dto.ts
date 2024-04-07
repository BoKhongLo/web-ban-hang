import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateOtpDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  
  @IsNotEmpty()
  @IsString()
  public type: string;
}