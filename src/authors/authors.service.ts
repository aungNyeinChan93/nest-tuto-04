/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(@InjectRepository(Author) private authorRepo: Repository<Author>) { };

  async create(createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepo.create({ ...createAuthorDto, created_at: new Date() })
    return this.authorRepo.save(author);
  }

  async findAll() {
    return this.authorRepo.find();
  }

  async findOne(id: number) {
    const author = await this.authorRepo.findOne({ where: { id } });
    if (!author) throw new NotFoundException('author not found!')
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const result = await this.authorRepo.update(id, updateAuthorDto);
    if (result?.affected === 0) throw new Error('Author is not found!')
    return this.findOne(id)
  }

  async remove(id: number) {
    const author = await this.findOne(id);
    await this.authorRepo.remove(author);
    return `Author - ${author?.id} was succesfully deleted!`;
  }
}
