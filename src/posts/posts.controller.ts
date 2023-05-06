import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Redirect } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { Topic } from './entities/topic.entity';

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

  @Get()
  @ApiTags('blog')
  @Redirect('1', 301)
  redirect() { }

  @Get('topics')
  @ApiTags('topic')
  findAllTopics() {
    return this.postsService.findAllTopics()
  }

  @Get(':id')
  @ApiTags('topic')
  @Render('index')
  async findTopic(@Param('id') id: number) {
    const topics: Topic[] = await this.postsService.findAllTopics()
    const menu = []
    for await ( const topic of topics) {
      let posts = await this.postsService.findTopicPosts(topic.id)
      topic.posts = posts
      await menu.push(topic)
    }
    let blog = await this.postsService.findTopicPosts(id)
    return { menu, blog }
  }
}

