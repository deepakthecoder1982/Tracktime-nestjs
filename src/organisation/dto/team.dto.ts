import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUID()
  organizationId: string; // Include this if you want to associate the team with an organization
}
