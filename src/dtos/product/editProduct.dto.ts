import { IsString, IsNotEmpty, IsOptional,IsBoolean, IsDate, IsNumber } from "class-validator";
export class editProductDto {
  @IsNotEmpty()
  @IsString()
  public id: string;
  
  @IsNotEmpty()
  @IsString()
  public userId: string;

  @IsString()
  @IsOptional()
  public productName: string;

  @IsBoolean()
  @IsOptional()
  public isDisplay: boolean;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsNumber()
  @IsOptional()
  public price: number;
  
  @IsNumber()
  @IsOptional()
  public cost: number;

  @IsNumber()
  @IsOptional()
  public stockQuantity: number;

  @IsString()
  @IsOptional()
  public productType: string;

  @IsString()
  @IsOptional()
  public pattern: string[];

  @IsString()
  @IsOptional()
  public detail: string;

  @IsDate()
  @IsOptional()
  public updateAt: Date
}
