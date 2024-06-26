import { DataSource, Repository } from 'typeorm';
import { OpenedPosition } from '../entities/opened-position.entity';

export class OpenedPositionRepository extends Repository<OpenedPosition> {
    constructor(dataSource: DataSource) {
        super(OpenedPosition, dataSource.createEntityManager());
    }
}
