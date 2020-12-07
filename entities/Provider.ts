import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from 'typeorm'
import { User } from './User'

export enum ProviderType {
    TWITCH = "twitch",
    GOOGLE = "google"
}

@Entity()
export class Provider {
    @PrimaryGeneratedColumn({ type: 'bigint' }) id?: number;

    @Column({ type: 'enum', enum: ProviderType, nullable: false }) provider!: ProviderType;
    @Column({ type: 'character varying', nullable: false, length: 255, unique: true }) provider_id!: string;
    @Column({ type: 'character varying', length: 255 }) display_name: string;

    @ManyToOne(() => User, user => user.providers)
    @JoinColumn() user: User;
}
