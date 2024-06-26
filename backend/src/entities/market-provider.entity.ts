import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Asset } from './asset.entity';

@Entity()
export class MarketProvider {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string | null;

    @Column({ nullable: true })
    contract: string | null;

    @Column({ nullable: true })
    signedAt: number | null;

    @Column()
    fee: number;

    @OneToMany(() => Asset, asset => asset.marketProvider)
    assets: Asset[];

    @Column()
    createdAt: number;

    @Column()
    updatedAt: number;

    constructor(name: string, fee: number, description?: string, contract?: string) {
        this.name = name;
        this.fee = fee;
        this.description = description || null;
        this.contract = contract || null;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }

    placeOrder(array: any[]): any[] {
        //
        return [];
    }

    closeOrder(string: string): void {
        //
    }

    updateOrder(string: string, array: any[]): void {
        //
    }
}
