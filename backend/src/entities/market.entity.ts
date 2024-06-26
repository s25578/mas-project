import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Asset } from './asset.entity';
import {MarketStatus} from "../enums/market-status.enum";

@Entity()
export class Market {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string | null;

    @Column()
    status: string; // MarketStatus

    @OneToMany(() => Asset, asset => asset.market)
    assets: Asset[];

    constructor(name: string, status?: MarketStatus, description?: string) {
        this.name = name;
        this.status = status || MarketStatus.ACTIVE;
        this.description = description || null;
    }

    open(): void {
        //
    }

    close(): void {
        //
    }
}
