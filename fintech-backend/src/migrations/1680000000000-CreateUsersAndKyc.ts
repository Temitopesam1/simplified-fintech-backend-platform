import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';


export class CreateUsersAndKyc1680000000000 {
public async up(queryRunner) {
await queryRunner.createTable(
new Table({
name: 'users',
columns: [
{ name: 'id', type: 'varchar', length: '36', isPrimary: true },
{ name: 'email', type: 'varchar', isUnique: true },
{ name: 'password', type: 'varchar' },
{ name: 'roles', type: 'text', isNullable: true },
{ name: 'financialPreferences', type: 'json', isNullable: true },
{ name: 'isEmailVerified', type: 'boolean', isNullable: true },
],
}),
);


await queryRunner.createTable(
new Table({
name: 'kyc',
columns: [
{ name: 'id', type: 'varchar', length: '36', isPrimary: true },
{ name: 'fullName', type: 'varchar' },
{ name: 'dob', type: 'date', isNullable: true },
{ name: 'address', type: 'varchar', isNullable: true },
{ name: 'idType', type: 'varchar', isNullable: true },
{ name: 'idNumber', type: 'varchar', isNullable: true },
{ name: 'userId', type: 'varchar', length: '36' },
],
}),
);


await queryRunner.createForeignKey(
'kyc',
new TableForeignKey({
columnNames: ['userId'],
referencedColumnNames: ['id'],
referencedTableName: 'users',
onDelete: 'CASCADE',
}),
);
}


public async down(queryRunner) {
const table = await queryRunner.getTable('kyc');
const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('userId') !== -1);
if (foreignKey) await queryRunner.dropForeignKey('kyc', foreignKey);
await queryRunner.dropTable('kyc');
await queryRunner.dropTable('users');
}
}