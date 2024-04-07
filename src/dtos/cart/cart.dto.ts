import { IsEmail, IsString, MinLength, IsNotEmpty,isNumber } from 'class-validator';
import { LargeNumberLike } from 'crypto';


export class CartDto{
  @IsNotEmpty()
  @MinLength(1, { message: "Số lượng sản phẩm không hợp lệ" })
  public quantity: number;

  public totalQuantity: number;
  public pricePerProduct: number;
  public totalPrice: number;
  
  @IsString()
  public nameProduct: string;
}