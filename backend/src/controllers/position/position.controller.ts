import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PositionService } from '../../services/position.service';
import { OpenedPosition } from '../../entities/opened-position.entity';
import { ClosedPosition } from '../../entities/closed-position.entity';
import {AppDataSource} from "../../../data-source";
import {Account} from "../../entities/account.entity";
import {AccountRepository} from "../../repositories/account.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AccountService} from "../../services/account.service";

@Controller('position')
export class PositionController {
    constructor(
        private readonly positionService: PositionService,
        private readonly accountService: AccountService
    ) {}

    @Get()
    async findAll(): Promise<(OpenedPosition | ClosedPosition)[]> {
        return await this.positionService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<OpenedPosition | ClosedPosition> {
        return await this.positionService.findOne(id);
    }

    @Post()
    async create(@Body() openedPosition: OpenedPosition): Promise<OpenedPosition> {
        // get account 1
        //const  accountRepository = AppDataSource.getRepository(Account);
        // update Account assotiation as 1
        // openedPosition.account = await this.accountService.findOne("1");
        return await this.positionService.create(openedPosition);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() openedPosition: OpenedPosition): Promise<OpenedPosition> {
        return await this.positionService.update(id, openedPosition);
    }

    @Delete(':id')
    async cancel(@Param('id') id: string): Promise<ClosedPosition> {
        //return await this.positionService.cancel(id);
        throw new Error("Not implemented");
    }
}
