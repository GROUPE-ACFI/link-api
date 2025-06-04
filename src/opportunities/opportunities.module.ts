import { Module } from '@nestjs/common';
import { OpportunitiesService } from '@opportunities/opportunities.service';
import { OpportunitiesController } from '@opportunities/opportunities.controller';
import { RelationalOpportunityPersistenceModule } from '@opportunities/infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalOpportunityPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [OpportunitiesController],
  providers: [OpportunitiesService],
  exports: [OpportunitiesService, infrastructurePersistenceModule],
})
export class OpportunitiesModule {}
