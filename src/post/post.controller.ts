import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { PostService } from './post.service';
import { UserService } from '../user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entities/post.class';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';

interface CreatePost {
    data: {
        post: {
            id: number,
            title: string,
            content: string,
            authorId: number,
            author: string
        }
    }
}
export interface RequestWithPayload extends Request{
    user: {
        sub: number;
        name: string
    }
}
@Controller('post')
export class PostController {

    constructor(
        private readonly postService: PostService,
        private readonly userService: UserService) { }


    @Get(":id")
    async getPostById(
        @Param("id") id: string): Promise<PostEntity> {
        return this.postService.getPost(+id, { author: false })

    }
    @Get("detail/:id")
    async getPostByIdDetail(
        @Param("id") id: string): Promise<PostEntity> {
        return this.postService.getPost(+id, {// true: pour tout l'objet..
            author: { select: { firstname: true, lastname: true, email: true } }, //select:{title:true}// corresponde à post
        })
    }

    @Get()
    async allPosts(): Promise<PostEntity[]> {
        return this.postService.allPosts({})
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(
        @Body() createPostDto: CreatePostDto,
        @Req() request: RequestWithPayload
    ): Promise<any> {
        console.log("🚀 ~ request.user:", request.user)
        const post = await this.postService.create(createPostDto,request.user.sub);
        console.log("🚀 ~ PostController ~ @Body ~ post:", post);
        return { data: { post } }
        //mon ancien code:
        //@Body() body: CreatePostDto): Promise<any> {    
        // const user = await this.userService.user(body.authorId);
        // //verifier que  authorId est bien un user
        // if (!user) { // if(user === 0 || user == undefined || user === null || user === false)
        //     throw new Error("user doesn't exist");
        // }
        // const post = await this.postService.create(body);
        // console.log("🚀 ~ PostController ~ @Body ~ post:", post)
        // return {
        //     data: {post
        //         : {
        //             ...post,
        //             author: `${user.firstname} ${user.lastname}`

        //         }
        //     }
        // }
    }
    @Patch(":id")
    async edit(

        @Param("id") id: string,
        @Body() up: UpdatePostDto,): Promise<PostEntity> {

        // //const index = await this.postService.findIndexById(+1)
        // if (index === -1) {
        //     throw new Error('User not found')
        // }
        return this.postService.updatePost({
            where: { id: +id },
            data: up,
        })
    }

    @Delete(":id")
    delete(
        @Param("id") id: string
    ) {
        return this.postService.deletePost(+id)
    }
}
