import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item';
import { AwsAuthGuard } from 'src/auth/aws-auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('items')
export class ItemsController {
    constructor (private readonly itemsService: ItemsService) { }

    @Get()
    async findAll (): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    @Post()
    @UseGuards(AwsAuthGuard)
    @Roles('Admin')
    async create (@Body('item') item: Item): Promise<Item> {
        return this.itemsService.create(item);
    }
}
