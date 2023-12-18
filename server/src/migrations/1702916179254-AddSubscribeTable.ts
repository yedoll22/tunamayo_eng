import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSubscribeTable1702916179254 implements MigrationInterface {
    name = 'AddSubscribeTable1702916179254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`subscribe\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`expirationTime\` datetime NULL, \`p256Key\` varchar(255) NOT NULL, \`authKey\` varchar(255) NOT NULL, \`endpoint\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`subscribeAuthKey\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`subscribeEndPoint\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`subscribeP256dhKey\``);
        await queryRunner.query(`ALTER TABLE \`subscribe\` ADD CONSTRAINT \`FK_78138550e21d8b67790d761148d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subscribe\` DROP FOREIGN KEY \`FK_78138550e21d8b67790d761148d\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`subscribeP256dhKey\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`subscribeEndPoint\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`subscribeAuthKey\` varchar(255) NULL`);
        await queryRunner.query(`DROP TABLE \`subscribe\``);
    }

}
