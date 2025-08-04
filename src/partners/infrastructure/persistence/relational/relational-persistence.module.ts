import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerEntity } from '@partners/infrastructure/persistence/relational/entities/partner.entity';
import { PartnerRepository } from '@partners/infrastructure/persistence/partner.repository';
import { PartnersRelationalRepository } from '@partners/infrastructure/persistence/relational/repositories/partner.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerEntity])],
  providers: [
    {
      provide: PartnerRepository,
      useClass: PartnersRelationalRepository,
    },
  ],
  exports: [PartnerRepository],
})
export class RelationalPartnerPersistenceModule {}
