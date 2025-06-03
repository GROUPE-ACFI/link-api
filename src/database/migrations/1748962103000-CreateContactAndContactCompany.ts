import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateContactAndContactCompany1748962103000 implements MigrationInterface {
  name = 'CreateContactAndContactCompany1748962103000';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contact',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'email', type: 'varchar', length: '255', isNullable: false },
          { name: 'phone', type: 'varchar', length: '50', isNullable: false },
          { name: 'firstname', type: 'varchar', length: '100', isNullable: false },
          { name: 'lastname', type: 'varchar', length: '100', isNullable: false },
          { name: 'birthdate', type: 'date', isNullable: true },
          { name: 'job', type: 'varchar', length: '100', isNullable: false },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'contact_company',
        columns: [
          { name: 'contact_id', type: 'integer', isPrimary: true },
          { name: 'company_id', type: 'integer', isPrimary: true },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('contact_company', [
      new TableForeignKey({
        columnNames: ['contact_id'],
        referencedTableName: 'contact',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedTableName: 'company',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contact_company');
    await queryRunner.dropTable('contact');
  }
}
