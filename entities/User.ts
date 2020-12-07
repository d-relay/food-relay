import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' }) id!: number;
    @Column({ type: 'character varying', nullable: false, length: 255, unique: true }) email!: string;
    @CreateDateColumn() current_sign_in_at!: Date;
    @UpdateDateColumn() last_sign_in_at!: Date;
}
