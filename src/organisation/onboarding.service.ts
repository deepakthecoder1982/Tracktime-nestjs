import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './organisation.entity';
import { DesktopApplication } from './desktop.entity';
import { Team } from './team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    @InjectRepository(DesktopApplication)
    private desktopAppRepository: Repository<DesktopApplication>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    // Other repositories
  ) {}

  async createOrganization(data: any): Promise<Organization> {
    const organization = new Organization();
    organization.name = data.name;
    organization.type = data.type;
    organization.teamSize = data.teamSize;
    // Don't set 'users' or 'teams' for now
  
    const savedOrganization = await this.organizationRepository.save(organization);
    console.log('Saved Organization:', savedOrganization);
    return savedOrganization;
  }
  

  async createDesktopApplication(data: any): Promise<DesktopApplication> {
    const desktopApp = new DesktopApplication();
    desktopApp.name = data.name;
    desktopApp.logo = data.logo; // Assuming 'logo' is part of your data
  
    const savedDesktopApp = await this.desktopAppRepository.save(desktopApp);
    console.log('Saved Desktop Application:', savedDesktopApp);
    return savedDesktopApp;
  }
  

  async createTeam(data: any): Promise<Team> {
    // const team = this.teamRepository.create(data);
    const team = new Team();
    team.name = data.name;
    team.managerEmail = data.managerEmail;

    const savedTeam = await this.teamRepository.save(team);
    console.log('Saved Team:', savedTeam);
    return savedTeam;
  }
}
