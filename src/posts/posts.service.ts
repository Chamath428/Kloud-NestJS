import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/posts.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    return await this.postRepository.save(post);
  }

  async findAll() {
    return await this.postRepository.find();
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async update(updatePostDto: UpdatePostDto) {
    const post = this.postRepository.findOne({
      where: { id: updatePostDto.id },
    });
    if (!post) {
      throw new NotFoundException();
    }
    return await this.postRepository.save(updatePostDto);
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException();
    }
    return await this.postRepository.remove(post);
  }
}
