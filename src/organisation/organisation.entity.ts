import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Team } from './team.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @OneToMany(() => User, user => user.organization)
  users: User[];

  @Column()
  type: string;

  @Column()
  teamSize: string;

  @OneToMany(() => Team, team => team.organization)
  teams: Team[];
}
