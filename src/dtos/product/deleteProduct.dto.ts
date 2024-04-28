import { IsString, IsNotEmpty,IsOptional } from "class-validator";

export class deleteProductDto {
  @IsNotEmpty()
  @IsString()
  public productId : string;

  @IsString()
  @IsOptional()
  public userId : string;
}