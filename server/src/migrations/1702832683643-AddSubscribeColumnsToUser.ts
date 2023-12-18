import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSubscribeColumnsToUser1702832683643 implements MigrationInterface {
    name = 'AddSubscribeColumnsToUser1702832683643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`subscribeEndPoint\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`subscribeP256dhKey\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`subscribeAuthKey\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`subscribeAuthKey\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`subscribeP256dhKey\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`subscribeEndPoint\``);
    }

}
