import {
  IsString,
  IsNotEmpty,
  IsNumber,
} from "class-validator";

export class addProductDto {
  @IsNotEmpty()
  @IsString()
  public productName: string;

  @IsString()
  @IsNotEmpty()
  public description?: string;

  @IsNumber()
  @IsNotEmpty()
  public price: number;

  @IsNotEmpty()
  @IsString()
  public productType: string;

  @IsString()
  @IsNotEmpty()
  public pattern: string;

  @IsString()
  @IsNotEmpty()
  public detail: string;

  
}