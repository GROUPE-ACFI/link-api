import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { AddressEntity } from './entities/address.entity';
import { CompanyRepository } from '../company.repository';
import { CompaniesRelationalRepository } from './repositories/company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, AddressEntity])],
  providers: [
    {
      provide: CompanyRepository,
      useClass: CompaniesRelationalRepository,
    },
  ],
  exports: [CompanyRepository],
})
export class RelationalCompanyPersistenceModule {}
