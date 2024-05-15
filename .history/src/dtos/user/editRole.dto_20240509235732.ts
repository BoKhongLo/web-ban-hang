import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional } from 'class-validator';

export class EditRoleDto {

  @IsNotEmpty()
  @IsString()
  public userId?: string;

  @IsOptional()
  public imgDisplay?: string;
}
