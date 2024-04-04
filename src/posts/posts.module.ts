import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

import { Post } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [JwtModule, UsersModule, TypeOrmModule.forFeature([Post])],
  exports: [PostsService],
})
export class PostsModule {}
