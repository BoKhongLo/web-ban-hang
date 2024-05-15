import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class updateOrderDto {
  @IsOptional()
  @IsString()
  public adminId?: string;

  @IsNotEmpty()
  @IsString()
  public orderId: string;

  @IsOptional()
  @IsString()
  public status?: string;

  @IsOptional()
  public isPaid?: boolean;

}
