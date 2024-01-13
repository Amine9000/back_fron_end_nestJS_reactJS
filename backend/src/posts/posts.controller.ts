import {
  All,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsPipe } from './posts.pipe';

export type Post = any;

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get('fetch')
  async getAllPosts(): Promise<Post[]> {
    return this.postsService.getAllPosts();
  }
  @Get('fetch/:postid')
  async getOnePost(@Param('postid') postId: number): Promise<Post> {
    return this.postsService.getOnePost(postId);
  }
  @Delete('delete/:postid')
  async deleteOnePost(@Param('postid') postId: number): Promise<Post> {
    return this.postsService.deleteOnePost(postId);
  }
  @Post('create')
  async addPost(@Body(PostsPipe) body: Record<string, any>): Promise<boolean> {
    return this.postsService.addPost(body);
  }
  @Put('update/:postid')
  async updatePost(
    @Param('postid') postId: number,
    @Body(PostsPipe) body: Record<string, any>,
  ): Promise<Post> {
    return this.postsService.updatePost(postId, body);
  }
  @Get('search')
  async search(@Query('s') searchQuery: string): Promise<Post[]> {
    return this.postsService.search(searchQuery);
  }
  @All('*')
  notFoundError() {
    throw new NotFoundException();
  }
}
