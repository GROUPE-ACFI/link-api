import { Module } from '@nestjs/common';
import { PartnersService } from '@partners/partners.service';
import { PartnersController } from '@partners/partners.controller';
import { RelationalPartnerPersistenceModule } from '@partners/infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalPartnerPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [PartnersController],
  providers: [PartnersService],
  exports: [PartnersService, infrastructurePersistenceModule],
})
export class PartnersModule {}
