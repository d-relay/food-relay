import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import jwt from 'jsonwebtoken'

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' }) id!: number;
    @Column({ type: 'character varying', nullable: false, length: 255, unique: true }) client_id!: string;
    @Column({ type: 'character varying', nullable: false, length: 255, unique: true }) email!: string;
    @Column({ type: 'character varying', nullable: false, length: 255, unique: true }) login!: string;
    @Column({ type: 'integer', default: 0 }) sign_in_count!: number;

    @CreateDateColumn() current_sign_in_at!: Date;
    @UpdateDateColumn() last_sign_in_at!: Date;

    getToken () {
    	return jwt.sign({ id: this.client_id }, String(process.env.COOKIE_SECRET), { expiresIn: 60 * 60 })
    }
}
