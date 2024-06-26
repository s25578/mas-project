import { DataSource, Repository } from 'typeorm';
import { Trader } from '../entities/trader.entity';

export class TraderRepository extends Repository<Trader> {
    constructor(dataSource: DataSource) {
        super(Trader, dataSource.createEntityManager());
    }
}
