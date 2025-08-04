import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartnerEntity } from '@partners/infrastructure/persistence/relational/entities/partner.entity';
import { PartnerType } from '@partners/domain/partner';

@Injectable()
export class PartnerSeedService {
  constructor(
    @InjectRepository(PartnerEntity)
    private repository: Repository<PartnerEntity>,
  ) {}

  async run() {
    const partners = [
      { name: 'Coface', type: PartnerType.INSURER },
      { name: 'BNP Factor', type: PartnerType.BANK },
    ];

    for (const p of partners) {
      const count = await this.repository.count({ where: { name: p.name } });
      if (!count) {
        await this.repository.save(this.repository.create(p));
      }
    }
  }
}
