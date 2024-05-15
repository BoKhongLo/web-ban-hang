import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional } from 'class-validator';

export class EditProfileDto {
  @IsNotEmpty()
  @IsString()
  public rold: string;

  @IsNotEmpty()
  @IsString()
  public userId: string;

}
