import { IsInt, IsString } from 'class-validator';

export class updateOrgDto {
  @IsString()
  organization_logo: string;

  @IsString()
  organization_country: string;

  @IsInt()
  organization_size: number;

  @IsString()
  organization_type: string;
}
