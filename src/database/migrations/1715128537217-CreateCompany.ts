import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCompany1715128537217 implements MigrationInterface {
  name = 'CreateCompany1715128537217';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "legalForm" character varying NOT NULL, "siren" character varying NOT NULL, "siret" character varying NOT NULL, "tvaNumber" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL, "isActive" boolean NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "website" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_a76b2182f40a4659e6fbc30791e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "postalCode" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "type" character varying NOT NULL, "companyId" uuid, CONSTRAINT "PK_9e4e2cde5dcdc83be0f45e5cbe1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_address_company" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_address_company"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "company"`);
  }
}
