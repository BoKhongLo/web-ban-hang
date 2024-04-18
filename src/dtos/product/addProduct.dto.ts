import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class addProductDto {
  @IsNotEmpty()
  @IsString()
  public productName: string;

  @IsString()
  @IsNotEmpty()
  public price: string;
  
  @IsString()
  @IsNotEmpty()
  public cost: string;

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
