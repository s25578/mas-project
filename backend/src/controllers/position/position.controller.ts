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

    /**
     * Get all positions
     * GET /position
     * @returns 
     */
    @Get()
    async findAll(): Promise<(OpenedPosition | ClosedPosition)[]> {
        return await this.positionService.findAll();
    }

    /**
     * Get a position by ID
     * GET /position/:id
     * @param id string - ID of the position
     * @returns 
     */
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<OpenedPosition | ClosedPosition> {
        return await this.positionService.findOne(id);
    }

    /**
     * Create a new position
     * POST /position
     * @param openedPosition OpenedPosition - New position to create
     * @returns 
     */
    @Post()
    async create(@Body() openedPosition: OpenedPosition): Promise<OpenedPosition> {
        return await this.positionService.create(openedPosition);
    }

    /**
     * Update a position
     * PUT /position/:id
     * @param id string - ID of the position
     * @param openedPosition OpenedPosition - Updated position
     * @returns 
     */
    @Put(':id')
    async update(@Param('id') id: string, @Body() openedPosition: OpenedPosition): Promise<OpenedPosition> {
        return await this.positionService.update(id, openedPosition);
    }

    /**
     * Cancel a position
     * DELETE /position/:id
     * @param id string - ID of the position
     * @returns 
     */
    @Delete(':id')
    async cancel(@Param('id') id: string): Promise<ClosedPosition> {
        //return await this.positionService.cancel(id);
        throw new Error("Not implemented");
    }
}
