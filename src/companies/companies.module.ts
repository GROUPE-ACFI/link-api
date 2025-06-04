import { Module } from '@nestjs/common';
import { CompaniesService } from '@companies/companies.service';
import { CompaniesController } from '@companies/companies.controller';
import { RelationalCompanyPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalCompanyPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService, infrastructurePersistenceModule],
})
export class CompaniesModule {}
