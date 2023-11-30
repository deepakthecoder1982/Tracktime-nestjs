import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsEmail } from 'class-validator';

export enum TrackTimeStatus {
  Pause = 'Pause',
  Resume = 'Resume',
  StopForever = 'StopForever',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userUUID: string;

  @Column()
  organizationUUID: string;

  @Column()
  @IsNotEmpty()
  userName: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  userType: 'Tracked' | 'Organization'; // Adjust as per your schema

  @Column('json', { nullable: true })
  config: {
    trackTimeStatus: TrackTimeStatus;
    // You can add more configuration options here if needed
  };
  @Column({ default: false })
  isAdmin: boolean;
}
