import { IsString, IsNotEmpty,  IsOptional } from "class-validator";
import { IDeliveryInfo, IPersonalInfo } from "models";

export class updateOderDto {
  @IsOptional()
  @IsString()
  public adminId?: string;

  @IsNotEmpty()
  @IsString()
  public orderId?: string;

  @IsOptional()
  @IsString()
  public status?: string;

  @IsOptional()
  @IsString()
  public isPaid?: string;


}
