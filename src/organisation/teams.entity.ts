import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TeamMember } from './teammembers.entity';

@Entity('teams')
export class Teams {
  @PrimaryGeneratedColumn('uuid')
  team_uuid: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  policy_uuid: string;

  @Column()
  name: string;

  @Column()
  status: number;

  @OneToMany(() => TeamMember, (teamMember) => teamMember.team)
  teamMembers: TeamMember[];
}
