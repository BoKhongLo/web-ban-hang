import { IsString, IsNotEmpty, IsOptional,IsBoolean, IsDate, IsNumber } from "class-validator";
import { IDetail, IImage } from "models";

export class editProductDto {
  @IsNotEmpty()
  @IsString()
  public productId: string;

  @IsOptional()
  @IsString()
  public userId?: string;

  @IsString()
  @IsOptional()
  public productName?: string;

  @IsBoolean()
  @IsOptional()
  public isDisplay?: boolean;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsNumber()
  @IsOptional()
  public price?: number;
  
  @IsNumber()
  @IsOptional()
  public cost?: number;

  @IsNumber()
  @IsOptional()
  public stockQuantity?: number;

  @IsString()
  @IsOptional()
  public productType?: string;

  @IsOptional()
  public color?: string[];

  @IsOptional()
  public size?: string[];

  @IsOptional()
  public detail?: IDetail;

  @IsOptional()
  public imgDisplay?: IImage[];

}
