import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Organization } from './organisation.entity';
import { Team } from './team.entity';
import { TrackingWeekdays } from './tracking_weekdays.entity';
import { TrackingHolidays } from './tracking_holidays.entity';
import { User } from 'src/users/user.entity';
import { ScreenshotSettings } from './screenshot_settings.entity';

@Entity('policies')
export class Policy {
  @PrimaryGeneratedColumn('uuid')
  policyId: string;

  @Column()
  policyName: string;

  @Column('int')
  screenshotInterval: number;
  
  @OneToMany(()=> ScreenshotSettings, (screenshotSett)=>screenshotSett.policy)
  ScreenshotSettings:ScreenshotSettings; 

  @OneToMany(() => TrackingWeekdays, (weekdays) => weekdays.policy)
  weekdays: TrackingWeekdays[]; // Use `OneToMany` relationship for multiple weekdays

  @OneToMany(() => TrackingHolidays, (holidays) => holidays.policy)
  holidays: TrackingHolidays[]; // Use `OneToMany` relationship for multiple holidays

  @ManyToOne(() => Organization, (organization) => organization.policy, { cascade: true, eager: true })
  @JoinColumn({ name: 'organizationId' }) // Explicitly define the join column name
  organization: Organization;

  @ManyToMany(() => Team, (team) => team.policies)
  @JoinTable({
    name: 'policy_teams',
    joinColumn: { name: 'policy_id', referencedColumnName: 'policyId' },
    inverseJoinColumn: { name: 'team_id', referencedColumnName: 'id' }
  })
  assignedTeams: Team[];

  @ManyToMany(() => User, (user) => user.policies)
  @JoinTable({
    name: 'policy_users',
    joinColumn: { name: 'policy_id', referencedColumnName: 'policyId' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'userUUID' }
  })
  assignedUsers: User[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
