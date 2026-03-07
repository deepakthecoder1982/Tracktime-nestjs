import { IsString, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrganizationDTO {
  @IsString()
  @IsNotEmpty()
  name: string; // Organization name

  @IsString()
  @IsOptional() // Change this from @IsNotEmpty()
  country?: string; // Add the '?' to mark it optional in TS

  @IsString()
  @IsNotEmpty()
  timeZone: string; // Organization's time zone 

  @IsString()
  @IsOptional()
  logo: string; // Organization's logo URL

  @IsString()
  @IsNotEmpty()
  teamSize: string; // Team size (as string, change to int if needed)

  @IsString()
  @IsNotEmpty()
  type: string; // Organization type

}
