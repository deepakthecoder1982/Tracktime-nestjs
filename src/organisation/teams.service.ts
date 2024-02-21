import { EmailReportSettingDto } from './dto/emailreportsetting.dto';
import { SubscriptionDto } from './dto/subscription.dto';
import { registeredUsersDto } from './dto/registeredusers.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teams } from './teams.entity';
import { TeamMember } from './teammembers.entity';
import { Repository } from 'typeorm';
import { CreateTeamsDto } from './dto/teams.dto';
import { CreateTeamMembersDto } from './dto/teammembers.dto';
import { UUID } from 'crypto';
import { RegisteredUser } from './registeredusers.entity';
import { UpdateUserDto } from './dto/UpdateUserDto.dto';
import { Organizations } from './organization.entity';
import { CreateOrganizationDto } from './dto/organizations.dto';
import { updateOrgDto } from './dto/updateorg.dto';
import { Subscription } from './subscription.entity';
import { EmailReportSettings } from './emailreportsetting.entity';

@Injectable()
export class teamAndTeamMemberService {
  constructor(
    @InjectRepository(Teams)
    private teamRepository: Repository<Teams>,
    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>,
    @InjectRepository(RegisteredUser)
    private registeredUserRepository: Repository<RegisteredUser>,
    @InjectRepository(Organizations)
    private orgRepository: Repository<Organizations>,
    @InjectRepository(Subscription)
    private subsRepository: Repository<Subscription>,
    @InjectRepository(EmailReportSettings)
    private emailreportRepository: Repository<EmailReportSettings>,
  ) {}
  //create team
  async createTeam(createTeamsDto: CreateTeamsDto): Promise<Teams> {
    const team = this.teamRepository.create({
      team_uuid: createTeamsDto.team_uuid,
      organization_id: createTeamsDto.organization_id,
      policy_uuid: createTeamsDto.policy_uuid,
      name: createTeamsDto.name,
      status: createTeamsDto.status,
    });

    const savedTeam = await this.teamRepository.save(team);
    console.log('Saved Team:', savedTeam);
    return savedTeam;
  }
  //get team
  async getTeam(): Promise<Teams[]> {
    return this.teamRepository.find();
  }
  async updateById(team_uuid: UUID, dto: CreateTeamsDto) {
    await this.teamRepository.update(team_uuid, dto);
    return this.teamRepository.findOne({ where: { team_uuid } });
  }
  async deleteById(team_uuid: UUID) {
    this.teamMemberRepository.delete({ team_uuid });
    return await this.teamRepository.delete({ team_uuid });
  }
  async getTeamDetailsByTeamId(team_uuid: string): Promise<Teams[]> {
    console.log(`getTeamDetails called with team_uuid: ${team_uuid}`);
    try {
      const teams = await this.teamRepository
        .createQueryBuilder('team')
        .leftJoinAndSelect('team.teamMembers', 'teammember')
        .where('team.team_uuid = :team_uuid', { team_uuid })
        .getMany();

      console.log(`Found teams for team_uuid ${team_uuid}:`, teams); // Log the result
      return teams; // This will return teams with their team members
    } catch (error) {
      console.error(
        'Error fetching team details for team_uuid:',
        team_uuid,
        error,
      );
      throw new InternalServerErrorException('Error fetching team details');
    }
  }

  async addTeamMembers(
    CreateTeamMembersDto: CreateTeamMembersDto,
  ): Promise<TeamMember> {
    const team = this.teamMemberRepository.create({
      member_uuid: CreateTeamMembersDto.member_uuid,
      team_uuid: CreateTeamMembersDto.team_uuid,
      team_name: CreateTeamMembersDto.team_name,
      user_uuid: CreateTeamMembersDto.user_uuid,
      organization_id: CreateTeamMembersDto.organization_id,
      user_name: CreateTeamMembersDto.user_name,
      device_id: CreateTeamMembersDto.device_id,
      user_role: CreateTeamMembersDto.user_role,
      policy_uuid: CreateTeamMembersDto.policy_uuid,
    });

    const savedTeamMembers = await this.teamMemberRepository.save(team);
    console.log('Saved Team Members:', savedTeamMembers);
    return savedTeamMembers;
  }
  async getTeamMembers(): Promise<TeamMember[]> {
    return this.teamMemberRepository.find();
  }
  async updateTeamMembersById(member_uuid: UUID, dto: CreateTeamMembersDto) {
    await this.teamMemberRepository.update(member_uuid, dto);
    return this.teamMemberRepository.findOne({ where: { member_uuid } });
  }
  async deleteTeamMembersById(member_uuid: UUID) {
    return await this.teamMemberRepository.delete({ member_uuid });
  }
  //users
  async registerUser(
    registeredUsersDto: registeredUsersDto,
  ): Promise<RegisteredUser> {
    const user = this.registeredUserRepository.create({
      user_uid: registeredUsersDto.user_uid,
      organization_id: registeredUsersDto.organization_id,
      first_name: registeredUsersDto.first_name,
      last_name: registeredUsersDto.last_name,
      organization_name: registeredUsersDto.organization_name,
      team_id: registeredUsersDto.team_id,
      type: registeredUsersDto.type,
      account_status: registeredUsersDto.account_status,
    });
    const organization_id = registeredUsersDto.organization_id;
    const organization_name = registeredUsersDto.organization_name;

    const org = this.orgRepository.create({
      organization_id: organization_id,
      organization_name: organization_name,
    });
    const savedUser = await this.registeredUserRepository.save(user);
    const savedOrg = await this.orgRepository.save(org);
    console.log('Saved User:', savedUser);
    console.log('Saved Organization:', savedOrg);
    return savedUser;
  }
  async getUsers(): Promise<RegisteredUser[]> {
    return this.registeredUserRepository.find();
  }
  async updateUserById(user_uid: UUID, dto: UpdateUserDto) {
    await this.registeredUserRepository.update(user_uid, dto);
    return this.registeredUserRepository.findOne({ where: { user_uid } });
  }
  async deleteUserById(user_uid: UUID) {
    return await this.registeredUserRepository.delete({ user_uid });
  }
  //organization
  async updateOrganizationById(organization_id: UUID, dto: updateOrgDto) {
    await this.orgRepository.update(organization_id, dto);
    return this.orgRepository.findOne({ where: { organization_id } });
  }
  //delete organization
  async deleteOrganizationById(organization_id: UUID) { 
    return await this.orgRepository.delete({ organization_id });
  }
  //subscription
  async addSubscription(
    SubscriptionDto: SubscriptionDto,
  ): Promise<Subscription> {
    const subscription = this.subsRepository.create({
      user_uid: SubscriptionDto.user_uid,
      organization_id: SubscriptionDto.organization_id,
      invoice_status: SubscriptionDto.invoice_status,
      invoice_link: SubscriptionDto.invoice_link,
      invoice_date: SubscriptionDto.invoice_date,
    });

    const savedSubscription = await this.subsRepository.save(subscription);
    console.log('Saved Team Members:', savedSubscription);
    return savedSubscription;
  }
  async getSubscriptionDetail(): Promise<Subscription[]> {
    return this.subsRepository.find();
  }
  async updateSubscriptionById(user_uid: UUID, dto: SubscriptionDto) {
    await this.subsRepository.update(user_uid, dto);
    return this.subsRepository.findOne({ where: { user_uid } });
  }
  async deleteSubscriptionById(user_uid: UUID) {
    return await this.subsRepository.delete({ user_uid });
  }
  //email report setting
  async createEmailReportSetting(
    EmailReportSettingDto: EmailReportSettingDto,
  ): Promise<EmailReportSettings> {
    const emailreport = this.emailreportRepository.create({
      user_uid: EmailReportSettingDto.user_uid,
      organization_id: EmailReportSettingDto.organization_id,
      monthly: EmailReportSettingDto.monthly,
      weekly: EmailReportSettingDto.weekly,
      daily: EmailReportSettingDto.daily,
      type: EmailReportSettingDto.type,
    });

    const savedReport = await this.emailreportRepository.save(emailreport);
    console.log('Saved Report:', savedReport);
    return savedReport;
  }
  async getReportDetail(): Promise<EmailReportSettings[]> {
    return this.emailreportRepository.find();
  }
  async updateReportById(user_uid: UUID, dto: EmailReportSettingDto) {
    await this.emailreportRepository.update(user_uid, dto);
    return this.emailreportRepository.findOne({ where: { user_uid } });
  }
  async deleteReportById(user_uid: UUID) {
    return await this.emailreportRepository.delete({ user_uid });
  }
}
