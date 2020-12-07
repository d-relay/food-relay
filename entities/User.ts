import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' }) id!: number;

    @Column({ type: 'character varying', length: 6, default: '' }) provider!: 'twitch' | 'google';
    @Column({ type: 'character varying', nullable: false, length: 255, unique: true }) client_id!: string;
    @Column({ type: 'character varying', nullable: false, length: 255, unique: true }) email!: string;
    @Column({ type: 'character varying', length: 50, default: ''  }) login!: string;

    @Column({ type: 'integer', default: 0 }) sign_in_count!: number;
    @CreateDateColumn() current_sign_in_at!: Date;
    @UpdateDateColumn() last_sign_in_at!: Date;
}
