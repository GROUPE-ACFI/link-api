import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { CompanyEntity } from '../companies/infrastructure/persistence/relational/entities/company.entity';

@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'varchar', length: 100 })
  firstname: string;

  @Column({ type: 'varchar', length: 100 })
  lastname: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ type: 'varchar', length: 100 })
  job: string;

  @ManyToMany(() => CompanyEntity, (company) => company.contacts, { nullable: true })
  @JoinTable({
    name: 'contact_company',
    joinColumn: { name: 'contact_id' },
    inverseJoinColumn: { name: 'company_id' },
  })
  companies: CompanyEntity[];
}
