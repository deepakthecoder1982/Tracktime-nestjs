// CreateTeamDto
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  managerEmail: string;
}
