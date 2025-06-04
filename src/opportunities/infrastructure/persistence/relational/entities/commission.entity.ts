import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OpportunityEntity } from '@opportunities/infrastructure/persistence/relational/entities/opportunity.entity';
import { EntityRelationalHelper } from '@utils/relational-entity-helper';

@Entity({ name: 'commission' })
export class CommissionEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OpportunityEntity, (o) => o.commissions)
  opportunity: OpportunityEntity;

  @Column()
  introducerCompanyId: string;

  @Column()
  payerCompanyId: string;

  @Column({ type: 'float', nullable: true })
  amountFixed?: number;

  @Column({ type: 'float', nullable: true })
  percentage?: number;

  @Column({ nullable: true })
  conditions?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  paidAt?: Date;

  @Column({ type: 'varchar' })
  status: string;
}
