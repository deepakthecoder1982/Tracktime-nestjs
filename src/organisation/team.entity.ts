import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Organization } from './organisation.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // @Column()
  // organizationId:string

  @OneToMany(() => User, user => user.team)
  users: User[];

  @ManyToOne(() => Organization, organization => organization.teams)
  organization: Organization;
}
