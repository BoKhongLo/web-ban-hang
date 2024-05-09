import { IsString, IsNotEmpty,  IsOptional } from "class-validator";
import { IDeliveryInfo, IPersonalInfo } from "models";

export class createOderDto {
  @IsOptional()
  @IsString()
  public userId?: string;

  @IsNotEmpty()
  public deliveryInfo: IDeliveryInfo;
  
  @IsNotEmpty()
  public personalDetails: IPersonalInfo;

  @IsString()
  @IsNotEmpty()
  public paymentMethods: string;

  @IsString()
  @IsNotEmpty()
  public deliveryType: string;

  @IsOptional()
  @IsString()
  public note?: string;
}
