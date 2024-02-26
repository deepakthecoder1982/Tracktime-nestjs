import { DesktopAppDTO } from './dto/desktopapp.dto';
import { CreateUniqueAppsDto } from './dto/uniqueapps.dto';
import { CreateCategoryDto } from './dto/category.dto';
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
import { Category } from './category.entity';
import { UniqueApps } from './uniqueapps.entity';
import { v4 as uuidv4 } from 'uuid';
import { DesktopAppEntity } from './desktopapp.entity';
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
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(UniqueApps)
    private UniqueAppsRepository: Repository<UniqueApps>,
    @InjectRepository(DesktopAppEntity)
    private desktopAppsRepository: Repository<DesktopAppEntity>,
  ) {}
  //create team
  async createTeam(createTeamsDto: CreateTeamsDto): Promise<Teams> {
    const team = this.teamRepository.create({
      team_uuid: uuidv4(),
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
      member_uuid: uuidv4(),
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
      user_uid: uuidv4(),
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
  //category
  async createCategory(
    CreateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = this.categoryRepository.create({
      category_uuid: uuidv4(),
      parent_category: CreateCategoryDto.parent_category,
      category_name: CreateCategoryDto.category_name,
    });

    const savedCategory = await this.categoryRepository.save(category);
    console.log('Saved Report:', savedCategory);
    return savedCategory;
  }
  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
  async updateCategoryById(category_uuid: string, dto: CreateCategoryDto) {
    await this.categoryRepository.update(category_uuid, dto);
    return this.categoryRepository.findOne({ where: { category_uuid } });
  }
  async deleteCategoryById(category_uuid: string) {
    return await this.categoryRepository.delete({ category_uuid });
  }
  //unique apps
  async findCategoryByName(category_name: string) {
    return await this.categoryRepository.findOne({ where: { category_name } });
  }
  async createApps(
    CreateUniqueAppsDto: CreateUniqueAppsDto,
  ): Promise<UniqueApps> {
    const obj = this.findCategoryByName(CreateUniqueAppsDto.category_name); //function call to get category_name and parent_category on the basis of uuid

    const categoryId = (await obj).category_uuid;
    const parentcategory = (await obj).parent_category;

    console.log((await obj).category_uuid);
    console.log((await obj).parent_category);

    const apps = this.UniqueAppsRepository.create({
      u_apps_uuid: uuidv4(),
      app_name: CreateUniqueAppsDto.app_name,
      description: CreateUniqueAppsDto.description,
      type: CreateUniqueAppsDto.type,
      category_uuid: categoryId,
      category_name: CreateUniqueAppsDto.category_name,
      parent_category: parentcategory,
    });

    const savedApp = await this.UniqueAppsRepository.save(apps);
    console.log('Saved Apps:', savedApp);
    return savedApp;
  }
  async getApps(): Promise<UniqueApps[]> {
    return this.UniqueAppsRepository.find();
  }
  async updateAppById(u_apps_uuid: string, dto: CreateUniqueAppsDto) {
    await this.UniqueAppsRepository.update(u_apps_uuid, dto);
    return this.UniqueAppsRepository.findOne({ where: { u_apps_uuid } });
  }
  async deleteAppById(u_apps_uuid: string) {
    return await this.UniqueAppsRepository.delete({ u_apps_uuid });
  }
  async getCategoryAppsByNameOrParent(
    categoryName?: string,
    parentCategory?: string,
  ) {
    const whereCondition = parentCategory
      ? [{ category_name: categoryName }, { parent_category: parentCategory }]
      : { category_name: categoryName };

    return await this.UniqueAppsRepository.find({
      where: whereCondition,
    });
  }
  //desktop app
  async createDesktopApp(
    DesktopAppDTO: DesktopAppDTO,
  ): Promise<DesktopAppEntity> {
    const desktopapp = this.desktopAppsRepository.create({
      team_uid: DesktopAppDTO.team_uid,
      user_uuid: DesktopAppDTO.user_uuid,
      organization_id: DesktopAppDTO.organization_id,
      policy_content: DesktopAppDTO.policy_content,
      policy_uuid: DesktopAppDTO.policy_uuid,
    });
    const savedDesktopApp = await this.desktopAppsRepository.save(desktopapp);
    console.log('Saved Desktop App:', savedDesktopApp);
    return savedDesktopApp;
  }
  async getDesktopApp(): Promise<DesktopAppEntity[]> {
    const apps = await this.desktopAppsRepository.find();

    // Parse the policy_content if it is a string
    const parsedApps = apps.map((app) => {
      if (typeof app.policy_content === 'string') {
        return {
          ...app,
          policy_content: JSON.parse(app.policy_content),
        };
      }
      return app;
    });

    console.log(parsedApps);
    return parsedApps;
  }
  async updateDesktopApp(team_uid: UUID, dto: DesktopAppDTO) {
    await this.desktopAppsRepository.update(team_uid, dto);
    return this.desktopAppsRepository.findOne({ where: { team_uid } });
  }
  async deleteDesktopAppById(team_uid: UUID) {
    return await this.desktopAppsRepository.delete({ team_uid });
  }
}
