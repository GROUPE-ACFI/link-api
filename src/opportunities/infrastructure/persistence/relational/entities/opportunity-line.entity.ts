import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OpportunityEntity } from './opportunity.entity';
import { EntityRelationalHelper } from '@utils/relational-entity-helper';

@Entity({ name: 'opportunity_line' })
export class OpportunityLineEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OpportunityEntity, (o) => o.lines)
  opportunity: OpportunityEntity;

  @Column({ type: 'varchar' })
  _type: string;

  @Column({ nullable: true })
  buyerId?: string;

  @Column({ nullable: true })
  supplierId?: string;

  @Column({ nullable: true })
  factorId?: string;

  @Column({ nullable: true })
  insurerId?: string;
}
