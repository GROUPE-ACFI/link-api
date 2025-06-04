import { Module } from '@nestjs/common';
import { ContactsService } from '@contacts/contacts.service';
import { ContactsController } from '@contacts/contacts.controller';
import { RelationalContactPersistenceModule } from '@contacts/infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalContactPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [ContactsService, infrastructurePersistenceModule],
})
export class ContactsModule {}
