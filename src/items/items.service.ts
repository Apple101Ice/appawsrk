import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item'; // Import Item entity

@Injectable()
export class ItemsService {

    constructor (@InjectRepository(Item) private itemRepository: Repository<Item>) { }

    async findAll (): Promise<Item[]> {
        return this.itemRepository.find();
    }

    async create (newItem: Item): Promise<Item> {
        const parsednewItem = this.itemRepository.create(newItem);
        return this.itemRepository.save(parsednewItem);
    }

}