import { MigrationInterface, QueryRunner, Table, } from 'typeorm'

export class createReportsTable1547584848827 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'reports',
            columns: [
                { name: 'id', type: 'uuid', isNullable: false, isUnique: true, default: 'uuid_generate_v4()' },
                { name: 'url', type: 'text', isNullable: false },
                { name: 'best_practices_score', type: 'smallint', isNullable: false, default: 0 },
                { name: 'accessibility_score', type: 'smallint', isNullable: false, default: 0 },
                { name: 'performance_score', type: 'smallint', isNullable: false, default: 0 },
                { name: 'pwa_score', type: 'smallint', isNullable: false, default: 0 },
                { name: 'seo_score', type: 'smallint', isNullable: false, default: 0 },
                { name: 'estimated_input_latency', type: 'smallint', isNullable: false, default: 0 },
                { name: 'errors_in_console', type: 'smallint', isNullable: false, default: 0 },
                { name: 'first_cpu_idle', type: 'smallint', isNullable: false, default: 0 },
                { name: 'first_contentful_paint', type: 'smallint', isNullable: false, default: 0 },
                { name: 'first_meaningful_paint', type: 'smallint', isNullable: false, default: 0 },
                { name: 'interactive', type: 'decimal', isNullable: false, default: 0 },
                { name: 'redirects', type: 'smallint', isNullable: false, default: 0 },
                { name: 'speed_index', type: 'smallint', isNullable: false, default: 0 },
                { name: 'time_to_first_byte', type: 'smallint', isNullable: false, default: 0 },
                { name: 'app_version', type: 'text', isNullable: false, default: 0 },
                { name: 'created_at', type: 'timestamp without time zone', default: 'now()' }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('reports')
    }

}
