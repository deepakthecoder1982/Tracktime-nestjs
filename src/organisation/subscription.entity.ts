import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('subscription')
export class Subscription {
  @PrimaryColumn({ type: 'uuid' })
  user_uid: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column()
  invoice_status: string;

  @Column()
  invoice_link: string;

  @Column()
  invoice_date: string;
}
