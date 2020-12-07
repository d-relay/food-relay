import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Provider } from '.';

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' }) id!: number;
    @Column({ type: 'character varying', nullable: false, length: 255, unique: true }) email!: string;
    @CreateDateColumn() current_sign_in_at!: Date;
    @UpdateDateColumn() last_sign_in_at!: Date;

    @OneToMany(() => Provider, provider => provider.user)
    providers: Provider[];
}
