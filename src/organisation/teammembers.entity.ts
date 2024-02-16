import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('teammembers')
export class TeamMember {
  @PrimaryColumn({ type: 'uuid' })
  team_uuid: string;

  @Column()
  team_name: string;

  @Column({ type: 'uuid' })
  user_uuid: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column()
  user_name: string;

  @Column({ type: 'uuid' })
  device_id: string;

  @Column()
  user_role: string;

  @Column({ type: 'uuid' })
  policy_uuid: string;

  @CreateDateColumn({ name: 'timestamp' }) // Specifies the column name as 'timestamp'
  timestamp: Date;
}
