import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() request: Request, @Body() createPostDto: CreatePostDto) {
    const userId = request['user'].sub;
    const user = await this.usersService.findOneById(userId);
    return (await this.postsService.create(createPostDto, user)).identifiers[0];
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() request: Request,
  ) {
    const post = await this.postsService.findOne(id);
    if (!post) throw new NotFoundException('Post not found');
    const userId = request['user'].sub;
    if (post.user.id !== userId)
      throw new UnauthorizedException('You are not the author of this post');
    return this.postsService.update(post, updatePostDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request) {
    const post = await this.postsService.findOne(id);
    if (!post) throw new NotFoundException('Post not found');
    const userId = request['user'].sub;
    if (post.user.id !== userId)
      throw new UnauthorizedException('You are not the author of this post');
    return this.postsService.remove(id);
  }
}
