import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '@utils/relational-entity-helper';
import { ContractProductEntity } from '../../../../contract-products/infrastructure/persistence/relational/entities/contract-product.entity';

@Entity({ name: 'contract' })
export class ContractEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyId: string;

  @Column()
  partnerId: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate?: Date;

  @Column({ nullable: true })
  originalOpportunityId?: string;

  @OneToMany(() => ContractProductEntity, (product) => product.contract, {
    cascade: true,
  })
  products: ContractProductEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
