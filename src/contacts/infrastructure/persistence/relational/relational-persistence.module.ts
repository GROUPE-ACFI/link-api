import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './entities/contact.entity';
import { CompanyEntity } from '../../../companies/infrastructure/persistence/relational/entities/company.entity';
import { ContactRepository } from '../contact.repository';
import { ContactsRelationalRepository } from './repositories/contact.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity, CompanyEntity])],
  providers: [
    {
      provide: ContactRepository,
      useClass: ContactsRelationalRepository,
    },
  ],
  exports: [ContactRepository],
})
export class RelationalContactPersistenceModule {}
