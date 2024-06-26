import { DataSource, Repository } from 'typeorm';
import { Manager } from '../entities/manager.entity';

export class ManagerRepository extends Repository<Manager> {
    constructor(dataSource: DataSource) {
        super(Manager, dataSource.createEntityManager());
    }
}
