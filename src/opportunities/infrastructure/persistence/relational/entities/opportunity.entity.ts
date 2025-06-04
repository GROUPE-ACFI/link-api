import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OpportunityCompanyEntity } from './opportunity-company.entity';
import { OpportunityLineEntity } from './opportunity-line.entity';
import { CommissionEntity } from './commission.entity';
import { EntityRelationalHelper } from '@utils/relational-entity-helper';

@Entity({ name: 'opportunity' })
export class OpportunityEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  signedAt?: Date;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'float', nullable: true })
  totalEstimatedAmount?: number;

  @OneToMany(() => OpportunityCompanyEntity, (c) => c.opportunity, {
    cascade: true,
    eager: true,
  })
  participants: OpportunityCompanyEntity[];

  @OneToMany(() => OpportunityLineEntity, (l) => l.opportunity, {
    cascade: true,
    eager: true,
  })
  lines: OpportunityLineEntity[];

  @OneToMany(() => CommissionEntity, (c) => c.opportunity, {
    cascade: true,
    eager: true,
  })
  commissions: CommissionEntity[];

  @DeleteDateColumn()
  deletedAt: Date;
}
