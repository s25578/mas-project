import {BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Transaction} from './transaction.entity';
import {PSPRole} from "../enums/psp-role.enum";
import {CardProcessorInterface} from "../interfaces/card-processor.interface";
import {BankTransferProcessorInterface} from "../interfaces/bank-processor.interface";

@Entity()
export class PSP implements CardProcessorInterface, BankTransferProcessorInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('simple-array')
    roles: string[];

    @OneToMany(() => Transaction, (transaction) => transaction.psp)
    transactions: Transaction[];

    @BeforeInsert()
    validateRoles() {
        if (this.roles.length === 0) {
            throw new Error('A PSP must have at least one role.');
        }
    }

    constructor(roles: PSPRole[] = [PSPRole.CARD]) {
        if (roles.length === 0) {
            throw new Error('A PSP must have at least one role.');
        }
        this.roles = roles;
    }

    processCardPayment(amount: number): void {
        if (!this.roles.includes(PSPRole.CARD)) {
            throw new Error('This PSP cannot process card payments.');
        }
        console.log(`Processing card payment of ${amount}`);
    }

    processBankTransfer(amount: number, bankAccount: string): void {
        if (!this.roles.includes(PSPRole.BANK)) {
            throw new Error('This PSP cannot process bank transfers.');
        }
        console.log(`Processing bank transfer of ${amount} to ${bankAccount}`);
    }
}



