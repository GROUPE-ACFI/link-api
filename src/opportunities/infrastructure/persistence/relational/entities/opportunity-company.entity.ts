import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OpportunityEntity } from './opportunity.entity';
import { EntityRelationalHelper } from '@utils/relational-entity-helper';

@Entity({ name: 'opportunity_company' })
export class OpportunityCompanyEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OpportunityEntity, (o) => o.participants)
  opportunity: OpportunityEntity;

  @Column()
  companyId: string;

  @Column({ type: 'varchar' })
  role: string;

  @Column()
  addedAt: Date;

  @Column({ type: 'varchar', nullable: true })
  participationStatus?: string;

  @Column('simple-array', { nullable: true })
  contactIds?: string[];
}
