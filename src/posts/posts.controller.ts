import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    @Post()
    create (@Body() createPostDto:CreatePostDto){
        return this.postService.create(createPostDto)
    }

    @Get()
    findAll(){
        return this.postService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id:number){
        return this.postService.findOne(id)
    }

    @Patch()
    update(@Body() updatePostDto:UpdatePostDto){
        return this.update(updatePostDto)
    }

    @Delete(':id')
    remove(@Param('id') id:number){
        this.postService.remove(id)
    }

}
