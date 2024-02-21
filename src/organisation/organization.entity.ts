import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('organizations')
export class Organizations {
  @PrimaryColumn({ type: 'uuid' })
  organization_id: string;

  @Column()
  organization_name: string;

  @Column()
  organization_logo: string;

  @Column()
  organization_country: string;

  @Column({ type: 'int' })
  organization_size: number;

  @Column()
  organization_type: string;
}
