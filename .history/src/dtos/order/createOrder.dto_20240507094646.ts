import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { IDetail, IImage } from "models";

export class createOderDto {


  @IsOptional()
  @IsString()
  public userId?: string;

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
  public color?: string[];

  @IsOptional()
  public size?: string[];

  @IsOptional()
  public detail?: IDetail;

  @IsOptional()
  public imgDisplay?: IImage[];

  @IsString()
  @IsOptional()
  public description?: string;
}
