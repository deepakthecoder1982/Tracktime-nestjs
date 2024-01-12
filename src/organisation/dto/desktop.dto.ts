// CreateDesktopApplicationDto
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateDesktopApplicationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  logo: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}
