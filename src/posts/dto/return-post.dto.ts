import { ReturnUserDTO } from 'src/users/dto/return-user.dto';

import { Post } from '../entities/post.entity';

export class ReturnPostDTO {
  id: string;
  post: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  user: ReturnUserDTO;

  constructor(post: Post) {
    this.id = post.id;
    this.post = post.post;
    this.likes = post.likes;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.user = new ReturnUserDTO(post.user);
  }
}
