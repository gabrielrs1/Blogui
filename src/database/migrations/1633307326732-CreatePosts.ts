import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePosts1633307326732 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "posts",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
