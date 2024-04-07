import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrganizationAdminDto } from './dto/organizationAdmin.dto';
import { Repository } from 'typeorm';
import { CreateOrganizationAdmin } from './OrganizationAdmin.entity';
import { validate } from 'class-validator';

@Injectable()
export class organizationAdminService {
  constructor(
    @InjectRepository(CreateOrganizationAdmin)
    private organizationAdminRepository: Repository<CreateOrganizationAdmin>,
  ) {}
  async validateOrganizationAdmin(email: string): Promise<string> {
    let user = await this.organizationAdminRepository.findOne({
      where: { email },
    });
    if (user) {
      return user?.id;
    }
    return null;
  }
  async createAdminOrganization(
    OrganizationAdmin: Partial<CreateOrganizationAdmin>,
  ): Promise<CreateOrganizationAdmin> {
    try {
      let user = await this.organizationAdminRepository.create({
        ...OrganizationAdmin,
        isAdmin:false,
      });
      const errors = await validate(user);

      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }

      return await this.organizationAdminRepository.save(user);
    } catch (error) {
      console.log({ Error: error?.message });
      return error?.message;
    }
  }
}
