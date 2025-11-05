/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {

  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) { }

  async create(createPostDto: CreatePostDto): Promise<CreatePostDto> {
    const newPost = { ...createPostDto, created_at: new Date() }
    const post = this.postRepo.create(newPost);
    return this.postRepo.save(post);
  }

  async findAll() {
    const posts = await this.postRepo.find();
    return posts;
  }

  async findOne(id: number): Promise<CreatePostDto> {
    const posts = await this.findAll();
    const post = posts?.find(p => p?.id === id);
    if (!post) throw new NotFoundException('Post not found!')
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const result = await this.postRepo.update(id, updatePostDto)
    if (result.affected === 0) throw new NotFoundException('Post Not Found')
    return this.findOne(id);
  }

  async remove(id: number) {
    const post = await this.findOne(id)
    await this.postRepo.remove(post);
    return { message: `Post with ID ${id} deleted successfully` };
  }
}
