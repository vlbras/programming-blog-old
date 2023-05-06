import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiForbiddenResponse({ description: 'Forbidden.' })
@Controller('')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post('posts')
  @ApiTags('posts')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get('posts')
  @ApiTags('posts')
  findAll() {
    return this.postsService.findAll();
  }

  @Get('posts/:id')
  @ApiTags('posts')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Patch('posts/:id')
  @ApiTags('posts')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete('posts/:id')
  @ApiTags('posts')
  remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
