import { Body, Controller, Post } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { Organization } from './organisation.entity';
import { DesktopApplication } from './desktop.entity';
import { Team } from './team.entity';
import { CreateOrganizationDto } from './dto/organization.dto';
import { CreateDesktopApplicationDto } from './dto/desktop.dto';
import { CreateTeamDto } from './dto/team.dto';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post('organization')
  async createOrganization(
    @Body() organizationData: CreateOrganizationDto,
  ): Promise<Organization> {
    // console.log(organizationData);
    return this.onboardingService.createOrganization(organizationData);
  }

  @Post('desktop-application')
  async createDesktopApplication(
    @Body() appData: CreateDesktopApplicationDto,
  ): Promise<DesktopApplication> {
    console.log(appData)
    return this.onboardingService.createDesktopApplication(appData);
  }

  @Post('team')
  async createTeam(@Body() teamData: CreateTeamDto): Promise<Team> {
    return this.onboardingService.createTeam(teamData);
  }
}
