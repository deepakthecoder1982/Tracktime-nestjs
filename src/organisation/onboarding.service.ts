import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './organisation.entity';
import { DesktopApplication } from './desktop.entity';
import { Team } from './team.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { CreateTeamDto } from './dto/team.dto';

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    @InjectRepository(DesktopApplication)
    private desktopAppRepository: Repository<DesktopApplication>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(User)
    private userRepository: Repository<User>
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
  

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    const team = this.teamRepository.create({ name: createTeamDto.name });

    if (createTeamDto.organizationId) {
      const organization = await this.organizationRepository.findOne({ where: { id: createTeamDto.organizationId } });
      if (!organization) {
        throw new Error('Organization not found');
      }
      team.organization = organization;
    }

    return this.teamRepository.save(team);
  }
  
  async addUserToTeam(userId: string, teamId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userUUID: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const team = await this.teamRepository.findOne({ where: { id: teamId } });
    if (!team) {
      throw new Error('Team not found');
      }

    user.team = team;
    return this.userRepository.save(user);
  }
}
