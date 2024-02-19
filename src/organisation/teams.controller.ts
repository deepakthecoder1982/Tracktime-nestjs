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
}
