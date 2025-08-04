import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PartnerSeedService } from './partner-seed.service';
import { PartnerEntity } from '../../../../partners/infrastructure/persistence/relational/entities/partner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerEntity])],
  providers: [PartnerSeedService],
  exports: [PartnerSeedService],
})
export class PartnerSeedModule {}
