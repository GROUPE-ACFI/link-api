import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractProductEntity } from '@contract-products/infrastructure/persistence/relational/entities/contract-product.entity';
import { ContractProductRepository } from '@contract-products/infrastructure/persistence/contract-product.repository';
import { ContractProductsRelationalRepository } from '@contract-products/infrastructure/persistence/relational/repositories/contract-product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ContractProductEntity])],
  providers: [
    {
      provide: ContractProductRepository,
      useClass: ContractProductsRelationalRepository,
    },
  ],
  exports: [ContractProductRepository],
})
export class RelationalPersistenceModule {}
