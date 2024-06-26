import {Entity, Column, ChildEntity} from 'typeorm';
import { Position } from './position.entity';
import {PositionType} from "../enums/position-type.enum";
import {Account} from "./account.entity";
import {Asset} from "./asset.entity";

@ChildEntity()
export class ClosedPosition extends Position {
    @Column({ nullable: true })
    closedAt: number | null;

    @Column({ nullable: true })
    closePrice: number | null;

    constructor(
        direction: string,
        size: number,
        leverage: number,
        openPrice: number,
        fee: number,
        type: PositionType,
        closePrice: number | null,
        account: Account,
        asset: Asset
    ) {
        super(direction, size, leverage, openPrice, fee, type, account, asset);
        this.closedAt = Date.now();
        this.closePrice = closePrice;
    }

    getRealizedPnL(): number {
        //
        return 0;
    }

    getPnL(): number {
        return this.getRealizedPnL();
    }

    getDuration(): number {
        if (this.closedAt) {
            return this.closedAt - this.createdAt;
        }
        return 0;
    }
}