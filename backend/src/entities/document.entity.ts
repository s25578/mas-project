import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Trader } from './trader.entity';
import { DocumentType } from '../enums/document-type.enum';

/**
 * Document entity represents a document uploaded by a trader for KYC verification.
 */
@Entity()
export class Document {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uri: string;

    @Column()
    type: string; // DocumentType

    @ManyToOne(() => Trader, trader => trader.documents, { cascade: true, onDelete: 'CASCADE' })
    trader: Trader;

    @Column({ type: 'bigint' })
    createdAt: number;

    @Column({ type: 'bigint' })
    updatedAt: number;

    @Column({ type: 'bigint', nullable: true })
    verifiedAt: number | null;

    /**
     * Create a new document
     * @param uri string - URI of the document
     * @param type DocumentType - Type of the document
     * @param trader Trader - Trader who uploaded the document
     */
    constructor(uri: string, type: DocumentType, trader: Trader) {
        this.uri = uri;
        this.type = type;
        this.trader = trader;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
        this.verifiedAt = null;
    }

    /**
     * Get the status of the document (derived attribute)
     */
    getStatus(): string {
        return this.verifiedAt ? 'Verified' : 'Pending';
    }

    /**
     * Verify the document
     */
    verify(): void {
        this.verifiedAt = Date.now();
    }
}
