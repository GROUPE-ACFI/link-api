import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContractProduct1750000000002 implements MigrationInterface {
  name = 'CreateContractProduct1750000000002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contract_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "contractId" uuid NOT NULL, "productType" character varying NOT NULL, "limitAmount" numeric NOT NULL, "currency" character varying NOT NULL, "feesPercentage" numeric NOT NULL, "metadata" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_contract_product" PRIMARY KEY ("id"), CONSTRAINT "FK_contract_product_contract" FOREIGN KEY ("contractId") REFERENCES "contract"("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "contract_product"`);
  }
}
