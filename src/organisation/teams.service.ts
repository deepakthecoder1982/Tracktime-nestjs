import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teams } from './teams.entity';
import { TeamMember } from './teammembers.entity';
import { Repository } from 'typeorm';
import { CreateTeamsDto } from './dto/teams.dto';
import { CreateTeamMembersDto } from './dto/teammembers.dto';
import { UUID } from 'crypto';

@Injectable()
export class teamAndTeamMemberService {
  constructor(
    @InjectRepository(Teams)
    private teamRepository: Repository<Teams>,
    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>,
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
    return await this.teamRepository.delete({ team_uuid });
  }
  async addTeamMembers(
    CreateTeamMembersDto: CreateTeamMembersDto,
  ): Promise<TeamMember> {
    const team = this.teamMemberRepository.create({
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
  async updateTeamMembersById(team_uuid: UUID, dto: CreateTeamMembersDto) {
    await this.teamMemberRepository.update(team_uuid, dto);
    return this.teamMemberRepository.findOne({ where: { team_uuid } });
  }
  async deleteTeamMembersById(team_uuid: UUID) {
    return await this.teamMemberRepository.delete({ team_uuid });
  }
}
