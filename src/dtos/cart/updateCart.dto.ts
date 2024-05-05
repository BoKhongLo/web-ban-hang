import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class updateCartDto{
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  size: string;

}