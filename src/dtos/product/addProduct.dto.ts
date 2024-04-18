import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class addProductDto {
  @IsNotEmpty()
  @IsString()
  public productName: string;

  @IsNotEmpty()
  @IsString()
  public userId: string;

  @IsNumber()
  @IsNotEmpty()
  public price: number;
  
  @IsNumber()
  @IsNotEmpty()
  public cost: number;

  @IsNumber()
  @IsNotEmpty()
  public stockQuantity: number;

  @IsNotEmpty()
  @IsString()
  public productType: string;

  @IsOptional()
  public pattern?: string[];

  @IsString()
  @IsOptional()
  public detail?: string;

  @IsString()
  @IsOptional()
  public description?: string;
}
