import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('teams')
export class Teams {
  @PrimaryColumn({ type: 'uuid' })
  team_uuid: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'uuid' })
  policy_uuid: string;

  @Column()
  name: string;

  @Column()
  status: number;
}
