import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContact1749042588592 implements MigrationInterface {
  name = 'CreateContact1749042588592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "phone" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "birthdate" date, "job" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_2e602634d4ed2e5a5b2018dec31" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact_company" ("contactId" uuid NOT NULL, "companyId" uuid NOT NULL, CONSTRAINT "PK_contact_company" PRIMARY KEY ("contactId","companyId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_contact_company_contact" ON "contact_company" ("contactId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_contact_company_company" ON "contact_company" ("companyId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_company" ADD CONSTRAINT "FK_contact_company_contact" FOREIGN KEY ("contactId") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_company" ADD CONSTRAINT "FK_contact_company_company" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact_company" DROP CONSTRAINT "FK_contact_company_company"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_company" DROP CONSTRAINT "FK_contact_company_contact"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_contact_company_company"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_contact_company_contact"`,
    );
    await queryRunner.query(`DROP TABLE "contact_company"`);
    await queryRunner.query(`DROP TABLE "contact"`);
  }
}
