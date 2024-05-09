import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { IDeliveryInfo, IDetail, IImage, IPersonalInfo } from "models";

export class createOderDto {
  @IsOptional()
  @IsString()
  public userId?: string;

  @IsNumber()
  @IsNotEmpty()
  public deliveryInfo: IDeliveryInfo;
  
  @IsNumber()
  @IsNotEmpty()
  public personalDetails: IPersonalInfo;

  @IsString()
  @IsNotEmpty()
  public paymentMethods: string;
}
