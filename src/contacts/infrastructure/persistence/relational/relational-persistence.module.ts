import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from '@contacts/infrastructure/persistence/relational/entities/contact.entity';
import { CompanyEntity } from '@companies/infrastructure/persistence/relational/entities/company.entity';
import { ContactRepository } from '@contacts/infrastructure/persistence/contact.repository';
import { ContactsRelationalRepository } from '@contacts/infrastructure/persistence/relational/repositories/contact.repository';

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
