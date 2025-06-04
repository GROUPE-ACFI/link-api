import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { RelationalContactPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

const infrastructurePersistenceModule = RelationalContactPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [ContactsService, infrastructurePersistenceModule],
})
export class ContactsModule {}
