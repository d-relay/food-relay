import { Entity, Generated, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Alert {
    @Column() @Generated("uuid")
    alert_token: string;
    @PrimaryGeneratedColumn({ type: "bigint" }) id: number;

    @Column({ type: "character varying", length: 7, default: '#000000' }) color: string;

    @Column({ type: "smallint", default: 0 }) font_size: string;
    @Column({ type: "smallint", default: 0 }) shadow: string;
    @Column({ type: "smallint", default: 0 }) stroke: string;

    @Column({ type: "smallint", default: 5 }) duration: string;
    @Column({ type: "smallint", default: 10 }) interval: string;

    @OneToOne(type => User)
    @JoinColumn() user: User;
}