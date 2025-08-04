import { Module } from '@nestjs/common';
import { ContractProductsService } from './contract-products.service';
import { ContractProductsController } from './contract-products.controller';
import { RelationalPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalPersistenceModule],
  controllers: [ContractProductsController],
  providers: [ContractProductsService],
  exports: [ContractProductsService],
})
export class ContractProductsModule {}
