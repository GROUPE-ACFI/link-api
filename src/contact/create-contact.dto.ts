import { IsEmail, IsOptional, IsString, IsDate, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateContactDto {
  @IsEmail() email: string;
  @IsString() phone: string;
  @IsString() firstname: string;
  @IsString() lastname: string;
  @IsDate() @Type(() => Date) birthdate: Date;
  @IsString() job: string;
  @IsOptional() @IsArray() @ArrayNotEmpty() @ArrayUnique() companies?: number[];
}
