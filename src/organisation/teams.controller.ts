import { CreateTeamsDto } from './dto/teams.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { teamAndTeamMemberService } from './teams.service';
import { Teams } from './teams.entity';
import { CreateTeamMembersDto } from './dto/teammembers.dto';
import { TeamMember } from './teammembers.entity';
import { UUID } from 'crypto';
import { registeredUsersDto } from './dto/registeredusers.dto';
import { RegisteredUser } from './registeredusers.entity';
import { UpdateUserDto } from './dto/UpdateUserDto.dto';
import { updateOrgDto } from './dto/updateorg.dto';
import { SubscriptionDto } from './dto/subscription.dto';
import { Subscription } from './subscription.entity';
import { EmailReportSettingDto } from './dto/emailreportsetting.dto';
import { EmailReportSettings } from './emailreportsetting.entity';
@Controller('team')
export class TeamAndTeamMemberController {
  constructor(
    private readonly teamAndTeamMemberService: teamAndTeamMemberService,
  ) {}

  @Post('/addteam')
  async createTeam(@Body() CreateTeamsDto: CreateTeamsDto): Promise<Teams> {
    return this.teamAndTeamMemberService.createTeam(CreateTeamsDto);
  }
  @Get('/getteam')
  async getTeam(): Promise<Teams[]> {
    return this.teamAndTeamMemberService.getTeam();
  }
  @Put('/updateteam/:id')
  updateById(@Param('id') id: UUID, @Body() dto: CreateTeamsDto) {
    return this.teamAndTeamMemberService.updateById(id, dto);
  }
  @Delete('/deleteteam/:id')
  deleteById(@Param('id') id: UUID) {
    return this.teamAndTeamMemberService.deleteById(id);
  }
  @Get('/getteamdetails/:id') // get team details by team member id
  async getTeamDetails(@Param('id') id: string) {
    return await this.teamAndTeamMemberService.getTeamDetailsByTeamId(id);
  }
  @Post('addteammember')
  async addTeamMembers(
    @Body() CreateTeamMembersDto: CreateTeamMembersDto,
  ): Promise<TeamMember> {
    return await this.teamAndTeamMemberService.addTeamMembers(
      CreateTeamMembersDto,
    );
  }
  @Get('/getteammembers')
  async getTeamMembers(): Promise<TeamMember[]> {
    return this.teamAndTeamMemberService.getTeamMembers();
  }
  @Put('/updateteammembers/:id')
  updateTeamMembersById(
    @Param('id') id: UUID,
    @Body() dto: CreateTeamMembersDto,
  ) {
    return this.teamAndTeamMemberService.updateTeamMembersById(id, dto);
  }
  @Delete('/deleteteammembers/:id')
  deleteTeamMembersById(@Param('id') id: UUID) {
    return this.teamAndTeamMemberService.deleteTeamMembersById(id);
  }
  //users
  @Post('/registeruser')
  async registerUser(
    @Body() registeredUsersDto: registeredUsersDto,
  ): Promise<RegisteredUser> {
    return this.teamAndTeamMemberService.registerUser(registeredUsersDto);
  }
  @Get('/getusers')
  async getUsers(): Promise<RegisteredUser[]> {
    return this.teamAndTeamMemberService.getUsers();
  }
  @Put('/updateusers/:id')
  updateUserById(@Param('id') id: UUID, @Body() dto: UpdateUserDto) {
    return this.teamAndTeamMemberService.updateUserById(id, dto);
  }
  @Delete('/deleteuser/:id')
  deleteUserById(@Param('id') id: UUID) {
    return this.teamAndTeamMemberService.deleteUserById(id);
  }
  //organization
  @Put('/updateorg/:id')
  async updateOrganizationById(
    @Param('id') id: UUID,
    @Body() dto: updateOrgDto,
  ) {
    return this.teamAndTeamMemberService.updateOrganizationById(id, dto);
  }
  @Delete('/deleteorg/:id')
  async deleteOrganizationById(@Param('id') id: UUID) {
    return this.teamAndTeamMemberService.deleteOrganizationById(id);
  }
  //subscription
  @Post('/addsubscription')
  async addSubscription(
    @Body() SubscriptionDto: SubscriptionDto,
  ): Promise<Subscription> {
    return this.teamAndTeamMemberService.addSubscription(SubscriptionDto);
  }
  @Get('/getsubscriptiondetails')
  async getSubscriptionDetail(): Promise<Subscription[]> {
    return this.teamAndTeamMemberService.getSubscriptionDetail();
  }
  @Put('/updatesubsription/:id')
  updateSubscriptionById(@Param('id') id: UUID, @Body() dto: SubscriptionDto) {
    return this.teamAndTeamMemberService.updateSubscriptionById(id, dto);
  }
  @Delete('/deletesubscription/:id')
  deleteSubscriptionById(@Param('id') id: UUID) {
    return this.teamAndTeamMemberService.deleteSubscriptionById(id);
  }
  //email reporting setting
  @Post('/createemailreportsetting')
  async createEmailReportSetting(
    @Body() EmailReportSettingDto: EmailReportSettingDto,
  ): Promise<EmailReportSettings> {
    return this.teamAndTeamMemberService.createEmailReportSetting(
      EmailReportSettingDto,
    );
  }
  @Get('/getreportdetails')
  async getReportDetail(): Promise<EmailReportSettings[]> {
    return this.teamAndTeamMemberService.getReportDetail();
  }
  @Put('/updatereport/:id')
  updateReportById(@Param('id') id: UUID, @Body() dto: EmailReportSettingDto) {
    return this.teamAndTeamMemberService.updateReportById(id, dto);
  }
  @Delete('/deletereport/:id')
  deleteReportById(@Param('id') id: UUID) {
    return this.teamAndTeamMemberService.deleteReportById(id);
  }
}
