import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyEntity } from '../../../../companies/infrastructure/persistence/relational/entities/company.entity';
import { EntityRelationalHelper } from '../../../../utils/relational-entity-helper';

@Entity({ name: 'contact' })
export class ContactEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ type: 'date', nullable: true })
  birthdate?: Date;

  @Column()
  job: string;

  @ManyToMany(() => CompanyEntity, (company) => company.contacts, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'contact_company',
    joinColumn: { name: 'contactId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'companyId', referencedColumnName: 'id' },
  })
  companies?: CompanyEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
