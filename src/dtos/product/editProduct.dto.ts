import { IsString, IsNotEmpty, IsOptional,IsBoolean, IsDate } from "class-validator";
export class editProductDto {
  @IsNotEmpty()
  @IsString()
  public id: string;

  @IsString()
  @IsOptional()
  public productName: string;

  @IsBoolean()
  @IsOptional()
  public isDisplay: boolean;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsString()
  @IsOptional()
  public cost : String;

  @IsString()
  @IsOptional()
  public price: String;

  @IsString()
  @IsOptional()
  public stockQuantity: String;

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
