import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from '@contracts/infrastructure/persistence/relational/entities/contract.entity';
import { ContractRepository } from '@contracts/infrastructure/persistence/contract.repository';
import { ContractsRelationalRepository } from '@contracts/infrastructure/persistence/relational/repositories/contract.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity])],
  providers: [
    {
      provide: ContractRepository,
      useClass: ContractsRelationalRepository,
    },
  ],
  exports: [ContractRepository],
})
export class RelationalPersistenceModule {}
