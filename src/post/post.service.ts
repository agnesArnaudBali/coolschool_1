import { Injectable } from '@nestjs/common';
import { PostEntity } from './entities/post.class';
import { Prisma } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { UpdatePostDto } from './dto/update-post.dto';


@Injectable()
export class PostService {

    //posts: PostEntity[] = []
    constructor(
        private prismaService: PrismaService) { }


    async getPost(id: number, params: {
        author?: boolean | Prisma.Post$authorArgs,
        select?: Prisma.PostSelect // ???
    }
    ): Promise<PostEntity | null> {
        return this.prismaService.post.findUnique({
            where: { id },
            include: { author: params.author } // select ??
        });
    }

    include: {
        author: {
            select: { firstname: true, lastname: true, email: true }
        }
    }

    async allPosts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PostWhereUniqueInput;
        where?: Prisma.PostWhereInput;
        orderBy?: Prisma.PostOrderByWithRelationInput;
    }): Promise<PostEntity[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prismaService.post.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                author: {
                    select: { firstname: true, lastname: true, email: true }
                }
            }
        });
    }

    async create(data: CreatePostDto, authorId: number): Promise<any> {
            
   // const { data.title,  } = data
    return this.prismaService.post.create({
        data: {
            ...data,
            author: {
                connect: { id: authorId }
            }
        }
    })

     
    }




    async updatePost(params: {
        where: Prisma.PostWhereUniqueInput;
        data: Prisma.PostUpdateInput;
    }): Promise<PostEntity> {
        const { where, data } = params;
        return this.prismaService.post.update(params);
    }


    async deletePost(id: number): Promise<PostEntity> {
        return this.prismaService.post.delete({
            where: { id },
        });
    }
}
// async getPost(
//     id: number,
//     params: {
//         author?: boolean | Prisma.Post$authorArgs,
//         select?: Prisma.PostSelect
//     }
// ): Promise<PostEntity | null> {
//     return this.prismaService.post.findUnique({
//         where: { id },
//         select: {
//             ...params.select,  // Ajoute les sélections de champs spécifiés
//             author: params.author ?? false, // Ajoute l’auteur s’il est requis
//         },
//     });
// }

// create(data) {
//     const post = new Post(data)
//     console.log(post)
//     this.posts.push(post)
//     console.log(post)
//     return post
// }

// allPosts(){
//     return this.posts
// }



/*
    edit(id:number, postModifed: PostTypeWithoutId){
        let post = this.findById(id)
        //post = {...post, ...postModifed}
        return Object.assign(post, postModifed)
    }
        
    getById(id: number): Post {
        return this.posts.find((user) => {
            return user.id === id
        })
    }
 
    
 
    delete(id: number) {
        return this.posts = this.posts.filter((user) => user.id !== id)
    }
 
    findIndexById(id: number) {
        return this.posts.findIndex((user) => user.id === id)
    }
    findById(id:number) {
            return this.posts.find((post) => post.id ===id)
        }*/
