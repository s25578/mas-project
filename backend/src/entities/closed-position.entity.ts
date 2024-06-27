import {Entity, Column, ChildEntity} from 'typeorm';
import { Position } from './position.entity';
import {PositionType} from "../enums/position-type.enum";
import {Account} from "./account.entity";
import {Asset} from "./asset.entity";
import { OpenedPosition } from './opened-position.entity';

@ChildEntity()
export class ClosedPosition extends Position {
    @Column()
    closedAt: number;

    @Column()
    closePrice: number;

    constructor(openedPosition: OpenedPosition, closePrice: number) {
        super(
            openedPosition.direction, 
            openedPosition.size, 
            openedPosition.leverage, 
            openedPosition.openPrice, 
            openedPosition.fee, 
            openedPosition.type as PositionType, 
            openedPosition.account, 
            openedPosition.asset
        );

        this.type = PositionType.CLOSED;
        this.closedAt = Date.now();
        this.closePrice = closePrice;

        // Not delete, since Single Table Inheritance Strategy is used
        this.updateDatabase();

        openedPosition = null;
    }

    private updateDatabase(): void {
        // await this.repository.save(this);
    }

    getRealizedPnL(): number {
        const priceDifference = this.closePrice - this.openPrice;
        return priceDifference * this.size;
    }

    getPnL(): number {
        return this.getRealizedPnL();
    }

    getDuration(): number {
        return this.closedAt - this.createdAt;
    }
}