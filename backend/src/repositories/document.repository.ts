import { DataSource, Repository } from 'typeorm';
import { Document } from '../entities/document.entity';

export class DocumentRepository extends Repository<Document> {
    constructor(dataSource: DataSource) {
        super(Document, dataSource.createEntityManager());
    }
}
