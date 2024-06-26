import { DataSource, Repository } from 'typeorm';
import { ClosedPosition } from '../entities/closed-position.entity';

export class ClosedPositionRepository extends Repository<ClosedPosition> {
    constructor(dataSource: DataSource) {
        super(ClosedPosition, dataSource.createEntityManager());
    }
}
