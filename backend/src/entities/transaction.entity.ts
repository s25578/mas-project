import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from './account.entity';
import { PSP } from './psp.entity';
import {TransactionStatus} from "../enums/transaction-status.enum";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    destinationWallet: string;

    @Column({ nullable: true })
    referenceId: string | null;

    @Column('decimal')
    paymentAmount: number;

    @Column()
    currencyCode: string;

    @Column('decimal')
    fee: number;

    @Column()
    status: string; // TransactionStatus

    @Column()
    type: string;

    @ManyToOne(() => Account, account => account.transactions)
    account: Account;

    @ManyToOne(() => PSP, psp => psp.transactions)
    psp: PSP;

    constructor(destinationWallet: string, paymentAmount: number, currencyCode: string, fee: number, status: TransactionStatus, type: string, account: Account, psp: PSP, referenceId?: string) {
        this.destinationWallet = destinationWallet;
        this.paymentAmount = paymentAmount;
        this.currencyCode = currencyCode;
        this.fee = fee;
        this.status = status;
        this.type = type;
        this.account = account;
        this.psp = psp;
        this.referenceId = referenceId || null;
    }

    submit(): void {
        //
    }

    cancel(): void {
        //
    }

    confirm(): void {
        //
    }

    fail(): void {
        //
    }
}
