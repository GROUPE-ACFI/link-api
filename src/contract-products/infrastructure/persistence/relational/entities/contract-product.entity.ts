import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '@utils/relational-entity-helper';
import { ContractEntity } from '../../../../contracts/infrastructure/persistence/relational/entities/contract.entity';

@Entity({ name: 'contract_product' })
export class ContractProductEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contractId: string;

  @ManyToOne(() => ContractEntity, (contract) => contract.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contractId' })
  contract: ContractEntity;

  @Column({ type: 'varchar' })
  productType: string;

  @Column({ type: 'numeric' })
  limitAmount: number;

  @Column({ type: 'varchar' })
  currency: string;

  @Column({ type: 'numeric' })
  feesPercentage: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
