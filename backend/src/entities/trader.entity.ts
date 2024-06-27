import {Entity, Column, OneToMany, ChildEntity} from 'typeorm';
import { User } from './user.entity';
import { UserRole } from '../enums/user-role.enum';
import { KYCStatus } from '../enums/kyc-status.enum';
import { Document } from './document.entity';
import { Wallet } from './wallet.entity';
import { AllowedAsset } from './allowed-asset.entity';
import { Account } from './account.entity';

/**
 * Trader entity represents a trader of the application.
 */
@Entity()
export class Trader extends User {
    @Column({ nullable: true })
    contactNumber: number | null;

    @Column()
    countryCode: string;

    @Column({ default: 0 })
    experienceLevel: number;

    @Column({ default: KYCStatus.PENDING })
    kycStatus: string; // KYCStatus

    @Column({ default: 1 })
    maxLeverage: number;

    @Column({ default: 100 })
    positionLimit: number;

    @OneToMany(() => Document, document => document.trader)
    documents: Document[];

    @OneToMany(() => Wallet, wallet => wallet.trader)
    wallets: Wallet[];

    @OneToMany(() => AllowedAsset, allowedAsset => allowedAsset.trader)
    allowedAssets: AllowedAsset[];

    @OneToMany(() => Account, account => account.trader)
    accounts: Account[];

    /**
     * Create a new trader
     * @param id number - ID of the trader
     * @param name string - Name of the trader
     * @param email string - Email of the trader
     * @param password string - Password of the trader
     * @param countryCode string - Country code of the trader
     * @param experienceLevel number - Experience level of the trader
     * @param maxLeverage number - Maximum leverage allowed for the trader
     * @param positionLimit number - Position limit of the trader
     * @param contactNumber number - Contact number of the trader
     */
    constructor(id: number, name: string, email: string, password: string, countryCode: string, experienceLevel?: number, maxLeverage?: number, positionLimit?: number, contactNumber?: number) {
        super(id, name, email, password, UserRole.TRADER);
        this.contactNumber = contactNumber;
        this.countryCode = countryCode;
        this.experienceLevel = experienceLevel || 0;
        this.kycStatus = KYCStatus.PENDING;
        this.maxLeverage = maxLeverage || 1;
        this.positionLimit = positionLimit || 100;
    }

    auth(): void {
        //
    }

    logout(): void {
        //
    }

    deposit(amount: number): void {
        //
    }

    withdraw(amount: number, wallet: Wallet): void {
        //
    }

    getTotalAvailableBalance(): number {
        //
        return 9999999;
    }

    getTotalLockedBalance(): number {
        //
        return 0;
    }
}
