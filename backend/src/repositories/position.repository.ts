import { DataSource, Repository } from 'typeorm';
import { Position } from '../entities/position.entity';

export class PositionRepository extends Repository<Position> {
    constructor(dataSource: DataSource) {
        super(Position, dataSource.createEntityManager());
    }

    async findAllPositions(): Promise<Position[]> {
        return await this.find();
    }

    async findPositionById(id: string): Promise<Position | undefined> {
        return await this.findOne({ where: { id } });
    }

    async createPosition(position: Position): Promise<Position> {
        return await this.save(position);
    }

    async updatePosition(id: string, updateData: Partial<Position>): Promise<Position> {
        await this.update(id, updateData);
        return this.findOne({ where: { id } });
    }

    async deletePosition(id: string): Promise<void> {
        await this.delete(id);
    }
}
