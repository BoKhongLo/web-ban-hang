import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: "Password should be minimum of 8 characters" })
  public password: string;

  @IsNotEmpty()
  @IsString()
  public username: string;

  @IsNotEmpty()
  @IsString()
  public otpId: string;

  @IsOptional()
  @IsString()
  public firstName?: string;

  @IsOptional()
  @IsString()
  public lastName?: string;

  @IsOptional()
  @IsString()
  public phoneNumber?: string;

  @IsOptional()
  @IsString()
  public address?: string;

  @IsOptional()
  @IsString()
  public gender?: string;
}
