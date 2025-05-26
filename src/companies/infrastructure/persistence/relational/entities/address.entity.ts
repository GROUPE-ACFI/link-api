import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { AddressType } from '../../../../domain/address-type.enum';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({ name: 'address' })
export class AddressEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  street: string;

  @Column()
  postalCode: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ type: 'varchar' })
  type: AddressType;

  @ManyToOne(() => CompanyEntity, (company) => company.addresses)
  company: CompanyEntity;
}
