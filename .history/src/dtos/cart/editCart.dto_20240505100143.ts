import { IsString, IsNotEmpty, IsNumber,IsBoolean, IsOptional } from "class-validator";

export class editCartDto{
  @IsNotEmpty()
  @IsString()
  idCart: string;// id Cart. dcm lần sau đặt rõ ra.

  @IsNotEmpty()
  @IsString()
  idProduct: string;// id Product.

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  editChoice: string;
}