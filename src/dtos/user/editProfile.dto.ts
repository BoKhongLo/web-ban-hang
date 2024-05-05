import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional } from 'class-validator';

export class EditProfileDto {
  @IsNotEmpty()
  @IsString()
  public username?: string;

  @IsNotEmpty()
  @IsString()
  public userId?: string;

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

  @IsOptional()
  public birthday?: Date;

  @IsOptional()
  public imgDisplay?: string;
}
