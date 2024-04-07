import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public otpCode: string;

  @IsNotEmpty()
  @IsString()
  public type: string;
}