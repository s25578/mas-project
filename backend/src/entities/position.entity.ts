import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, TableInheritance, BeforeInsert} from 'typeorm';
import { Account } from './account.entity';
import {Asset} from "./asset.entity";
import {PositionType} from "../enums/position-type.enum";

// Single Table Inheritance

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Position {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    direction: string;

    @Column()
    size: number;

    @Column({ default: 0 })
    leverage: number;

    @Column()
    openPrice: number;

    @Column()
    fee: number;

    @Column()
    type: string; // PositionType

    @Column({ default: Date.now() })
    createdAt: number;

    @Column({ default: Date.now() })
    updatedAt: number;

    @ManyToOne(() => Account, (account) => account.positions, { cascade: true, onDelete: 'CASCADE' })
    account: Account;

    @ManyToOne(() => Asset, (asset) => asset.positions)
    asset: Asset;

    // @BeforeInsert()
    // validateLeverage() {
    //     if (this.leverage && this.account.trader.maxLeverage < this.leverage) {
    //         throw new Error(`Leverage exceeds the maximum allowed leverage of ${this.account.trader.maxLeverage}`);
    //     }
    // }

    constructor(
        direction: string,
        size: number,
        leverage: number,
        openPrice: number,
        fee: number,
        type: PositionType,
        account: Account,
        asset: Asset
    ) {

        // if (leverage && account.trader.maxLeverage < leverage) {
        //     throw new Error(`Leverage exceeds the maximum allowed leverage of ${account.trader.maxLeverage}`);
        // }

        this.direction = direction;
        this.size = size;
        this.leverage = leverage;
        this.openPrice = openPrice;
        this.fee = fee;
        this.type = type;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
        this.account = account;
        this.asset = asset;
    }

    abstract getPnL(): number;
    abstract getDuration(): number;
}