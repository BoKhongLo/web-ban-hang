import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class addToCartDto{
  @IsNotEmpty()
  @IsString()
  idCart: string;// id Cart. dcm lần sau đặt rõ ra.

  @IsNotEmpty()
  @IsString()
  idProduct: string;// id Product.

  @IsNotEmpty()
  @IsNumber()
  quantity: number
}