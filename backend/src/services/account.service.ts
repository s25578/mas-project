import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpenedPosition } from '../entities/opened-position.entity';
import { ClosedPosition } from '../entities/closed-position.entity';
import {Position} from "../entities/position.entity";
import {PositionType} from "../enums/position-type.enum";
import {Account} from "../entities/account.entity";
import {Trader} from "../entities/trader.entity";

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
    ) {}


    async findOne(id: string): Promise<Account> {
        const num = Number.parseInt(id);
        let account = await this.accountRepository.findOne({ where: { id: num } });
        if (account) {
            return account;
        }
        throw new NotFoundException('Account not found');
    }

    async findPositions(account: Account): Promise<Position[]> {
        return account.positions.sort((a, b) => a.size - b.size);
    }
}
