import {  IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class EditProfileDto {
  @IsNotEmpty()
  public role: string[];

  @IsNotEmpty()
  @IsString()
  public userId: string;

}
