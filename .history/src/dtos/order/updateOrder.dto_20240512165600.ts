import { IsString, IsNotEmpty,  IsOptional } from "class-validator";
import { IDeliveryInfo, IPersonalInfo } from "models";

export class createOderDto {
  @IsOptional()
  @IsString()
  public userId?: string;

  @IsOptional()
  @IsString()
  public note?: string;
}
