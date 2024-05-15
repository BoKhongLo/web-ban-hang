import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional } from 'class-validator';

export class EditProfileDto {
  @IsNotEmpty()
  @IsString()
  public role: string;

  @IsNotEmpty()
  @IsString()
  public userId: string;

}
