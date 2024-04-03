import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/users/entities/user.entity';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {
    return this.postsRepository.insert(
      this.postsRepository.create({
        ...createPostDto,
        user,
      }),
    );
  }

  findAll() {
    return this.postsRepository.find();
  }

  async findOne(id: string) {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(post: Post, updatePostDto: UpdatePostDto) {
    if (updatePostDto.post) {
      post.post = updatePostDto.post;
    }
    return this.postsRepository.save(post);
  }

  remove(id: string) {
    return this.postsRepository.delete(id);
  }
}
