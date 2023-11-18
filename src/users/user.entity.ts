import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsEmail } from 'class-validator';
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
}
