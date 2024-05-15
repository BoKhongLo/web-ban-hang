import {  IsString, IsNotEmpty } from 'class-validator';

export class EditRoleDto {
  @IsNotEmpty()
  public role: string[];

  @IsNotEmpty()
  @IsString()
  public userId: string;

}
