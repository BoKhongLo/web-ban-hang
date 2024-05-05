import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class addToCartDto{
  @IsNotEmpty()
  @IsString()
  userId: string;/

  @IsNotEmpty()
  @IsString()
  idProduct: string;// id Product.

  @IsNotEmpty()
  @IsNumber()
  quantity: number

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  size: string;

}