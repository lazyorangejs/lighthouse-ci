import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'reports' })
export class Report {
    @PrimaryColumn()
    @Column({ primary: true, type: 'uuid', nullable: false, default: 'uuid_generate_v4()' })
    @PrimaryGeneratedColumn('uuid')
    public readonly id: string

    @Column({ nullable: false, readonly: true })
    public url: string

    @Column({ name: 'best_practices_score', nullable: false, readonly: true })
    public bestPracticesScore: number

    @Column({ name: 'accessibility_score' })
    public accessibilityScore: number

    @Column({ name: 'performance_score' })
    public performanceScore: number

    @Column({ name: 'pwa_score' })
    public pwaScore: number

    @Column({ name: 'seo_score' })
    public seoScore: number

    @Column({ name: 'estimated_input_latency' })
    public estimatedInputLatency: number

    @Column({ name: 'errors_in_console' })
    public errorsInConsole: number

    @Column({ name: 'first_cpu_idle' })
    public firstCpuIdle: number

    @Column({ name: 'first_contentful_paint' })
    public firstContentfulPaint: number

    @Column({ name: 'first_meaningful_paint' })
    public firstMeaningfulPaint: number

    public toJSON() {
        return {
            accessibility_score: this.accessibilityScore,
            best_practices_score: this.bestPracticesScore,
            performance_score: this.performanceScore,
            pwa_score: this.pwaScore,
            seo_score: this.seoScore,
            url: this.url,
        }
    }
}
