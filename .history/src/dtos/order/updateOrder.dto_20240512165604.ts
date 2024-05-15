import { IsString, IsNotEmpty,  IsOptional } from "class-validator";
import { IDeliveryInfo, IPersonalInfo } from "models";

export class updateOderDto {
  @IsOptional()
  @IsString()
  public userId?: string;

  @IsOptional()
  @IsString()
  public note?: string;
}
