import { IsString, IsNotEmpty, IsOptional } from "class-validator";
export class CartDto {
  @IsString()
  id: string;

  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsString()
  items: string;

  @IsOptional()
  @IsString()
  totalPrice: string;

  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @IsOptional()
  @IsString()
  totalItemCount: string;
}
