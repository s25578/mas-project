import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import { Position } from './position.entity';
import { Trader } from './trader.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    isDemo: boolean;

    @OneToMany(() => Position, position => position.account)
    positions: Position[];

    @ManyToOne(() => Trader, trader => trader.accounts, { cascade: true, onDelete: 'CASCADE' })
    trader: Trader;

    @OneToMany(() => Transaction, transaction => transaction.account)
    transactions: Transaction[];

    constructor(trader: Trader, isDemo?: boolean) {
        this.trader = trader;
        this.isDemo = isDemo || false;
    }

    getAvailableBalance(): number {
        //
        return 9999999;
    }

    getLockedBalance(): number {
        //
        return 0;
    }

    getBalance(): number {
        return this.getAvailableBalance() + this.getLockedBalance();
    }
}
