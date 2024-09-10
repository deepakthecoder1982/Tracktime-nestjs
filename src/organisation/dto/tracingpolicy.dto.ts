import { IsUUID, IsJSON, IsString, IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class TrackingPolicyDTO {
  @IsUUID()
  organizationId: string; // UUID of the organization creating the policy

  @IsString()
  policyName: string; // Name of the policy

  @IsInt()
  screenshotInterval: number; // Interval for screenshots

  // @IsBoolean()
  // isDefault: boolean; // Boolean to indicate if it's the default policy

  @IsJSON()
  policyContent: any; // JSON object containing additional policy configurations

  @IsUUID()
  teamId: string; // UUID of the team (if applicable)

}
