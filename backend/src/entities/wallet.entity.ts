import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Trader } from './trader.entity';

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    currency: string;

    @Column()
    address: string;

    @Column({ type: 'bigint' })
    createdAt: number;

    @ManyToOne(() => Trader, trader => trader.wallets, { cascade: true, onDelete: 'CASCADE' })
    trader: Trader;

    constructor(currency: string, address: string, trader: Trader) {
        this.currency = currency;
        this.address = address;
        this.trader = trader;
        this.createdAt = Date.now();
    }

    cleanDataAndRemove(): void {
        //
    }
}
