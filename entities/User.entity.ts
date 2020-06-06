import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Location } from './Location.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' }) id!: number;
    @Column({ type: 'character varying', nullable: false, length: 255, unique: true }) client_id!: string;
    @Column({ type: 'character varying', nullable: false, length: 255, unique: true }) login!: string;
    @Column({ type: 'character varying', nullable: false, length: 255 }) accessToken: string;
    @Column({ type: 'character varying', nullable: false, length: 255 }) refreshToken: string;
    @Column({ type: 'integer', default: 0 }) sign_in_count!: number;

    @Column({ type: 'timestamp without time zone', nullable: false, default: () => 'CURRENT_TIMESTAMP' }) current_sign_in_at!: Date;
    @Column({ type: 'timestamp without time zone', nullable: false, default: () => 'CURRENT_TIMESTAMP' }) last_sign_in_at!: Date;


    @OneToOne(type => Location)
    @JoinColumn() user!: Location;
}