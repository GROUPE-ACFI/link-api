import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import { EntityRelationalHelper } from '@utils/relational-entity-helper';

@Entity({ name: 'company' })
export class CompanyEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  legalForm: string;

  @Column()
  siren: string;

  @Column()
  siret: string;

  @Column()
  tvaNumber: string;

  @Column()
  creationDate: Date;

  @Column()
  isActive: boolean;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  website?: string | null;

  @OneToMany(() => AddressEntity, (address) => address.company, {
    cascade: true,
    eager: true,
  })
  addresses?: AddressEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
