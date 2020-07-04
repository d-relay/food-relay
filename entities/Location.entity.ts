import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn({ type: 'bigint' }) id!: number;
    @Column({ type: "point" }) geography!: string;
    @Column({ type: "integer" }) zipcode!: number;
    @Column({ type: "character varying", length: 255 }) country!: string;
    @Column({ type: "character varying", length: 255 }) region!: string;
    @Column({ type: "character varying", length: 255 }) city!: string;
}