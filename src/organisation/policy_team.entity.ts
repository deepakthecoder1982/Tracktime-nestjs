import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Policy } from "./trackingpolicy.entity";
import { Team } from "./team.entity";

@Entity('policy_teams')
export class PolicyTeams {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Policy, (policy) => policy.policyId)
  @JoinColumn({ name: 'policy_id' })  // Correct foreign key column name
  policy: Policy;

  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn({ name: 'team_id' })  // Correct foreign key column name
  team: Team;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
