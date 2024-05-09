import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { IDetail, IImage } from "models";

export class createOderDto {
  @IsOptional()
  @IsString()
  public userId?: string;

  @IsNumber()
  @IsNotEmpty()
  public price: number;
  
  @IsNumber()
  @IsNotEmpty()
  public personalDetails: IPer;

  @IsString()
  @IsNotEmpty()
  public paymentMethods: string;
}
