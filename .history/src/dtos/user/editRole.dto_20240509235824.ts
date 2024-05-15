import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class EditRoleDto {
  @IsNotEmpty()
  @IsString()
  public userId: string;

  @IsOptional()
  public adminId?: string;

  @IsNotEmpty()
  public role: string[];
}
