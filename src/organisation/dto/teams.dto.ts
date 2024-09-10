import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateTeamDTO {
  @IsUUID()
  organizationId: string; // UUID of the organization this team belongs to

  @IsString()
  name: string; // Team name

  @IsString()
  manager: string; // Team manager's name (optional, can be omitted if not applicable)

  @IsString()
  status: string; // Status of the team (e.g., active/inactive)


}
