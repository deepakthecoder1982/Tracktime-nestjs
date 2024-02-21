import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('registeredusers')
export class RegisteredUser {
  @PrimaryColumn({ type: 'uuid' })
  user_uid: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column()
  first_name: string;

  @Column({ type: 'uuid' })
  last_name: string;

  @Column({ type: 'uuid' })
  organization_name: string;

  @Column()
  team_id: string;

  @Column({ type: 'uuid' })
  type: number;

  @Column()
  account_status: boolean;
}
