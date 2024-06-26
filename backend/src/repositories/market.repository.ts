import { DataSource, Repository } from 'typeorm';
import { Market } from '../entities/market.entity';

export class MarketRepository extends Repository<Market> {
    constructor(dataSource: DataSource) {
        super(Market, dataSource.createEntityManager());
    }
}
