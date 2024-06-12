import { Body, Controller, Delete, Get, Param, Patch, Post,UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    @UseGuards(AuthGuard)
    @Post()
    create (@Body() createPostDto:CreatePostDto){
        return this.postService.create(createPostDto)
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll(){
        return this.postService.findAll()
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id:number){
        return this.postService.findOne(id)
    }

    @UseGuards(AuthGuard)
    @Patch()
    update(@Body() updatePostDto:UpdatePostDto){
        return this.postService.update(updatePostDto)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id:number){
       return this.postService.remove(id)
    }

}
