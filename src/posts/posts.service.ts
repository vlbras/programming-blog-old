import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Topic } from './entities/topic.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>
  ) { }

  async create(createPostDto: CreatePostDto) {
    const topic = await this.preloadTopic(createPostDto.topic)
    const post = this.postRepository.create({
      ...createPostDto,
      topic
    })
    return this.postRepository.save(post)
  }

  findAll() {
    return this.postRepository.find({
      relations: ['topic']
    })
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: {
        id,
      }, relations: ['topic']
    })
    if (post) {
      return post
    }
    throw new NotFoundException(`Post #${id} is not found`)
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.findOne(id)
    const topic = updatePostDto.topic && (await this.preloadTopic(updatePostDto.topic))
    const post = await this.postRepository.preload({
      id,
      ...updatePostDto,
      topic
    })
    return this.postRepository.save(post);
  }

  async remove(id: number) {
    const post = await this.findOne(id)
    return this.postRepository.remove(post)
  }

  private async preloadTopic(name: string): Promise<Topic> {
    const topic = await this.topicRepository.findOneBy({ name })
    if (topic) {
      return topic
    }
    return this.topicRepository.create({ name })
  }
}
