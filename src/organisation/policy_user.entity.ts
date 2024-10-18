import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Policy } from "./trackingpolicy.entity";
import { User } from "src/users/user.entity";

@Entity('policy_users')
export class PolicyUsers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Policy, (policy) => policy.policyId)
  @JoinColumn({ name: 'policy_id' })  // Ensure the name matches your table schema's `policy_id` column
  policy: Policy;

  @ManyToOne(() => User, (user) => user.policies)
  @JoinColumn({ name: 'user_id' })  // Ensure the name matches your table schema's `user_id` column
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
