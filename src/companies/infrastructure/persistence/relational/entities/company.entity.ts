import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import { EntityRelationalHelper } from '@utils/relational-entity-helper';
import { ContactEntity } from '@contacts/infrastructure/persistence/relational/entities/contact.entity';

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

  @ManyToMany(() => ContactEntity, (contact) => contact.companies)
  contacts?: ContactEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
