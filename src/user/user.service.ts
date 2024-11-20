import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User } from './entities/user.class';
import { CreateUserDto } from './dtos/create-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {

//private users: User[] = [];

constructor(private prismaService: PrismaService) { }

async user(
    id:number
): Promise<User | null> {
    return this.prismaService.user.findUnique({
        where: {id}
    });
}
async getByEmail(email:string) : Promise<User | null>{
    return this.prismaService.user.findUnique({
        where: {email}
    })
}

async allUser(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
}): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
    });
}

async create(data: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
        data
    });
}
async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
}): Promise<User> {
    const { where, data } = params;
    return this.prismaService.user.update(params);
}

async deleteUser(id: number): Promise<User> {
    return this.prismaService.user.delete({
        where: { id },
    });
}


    // checkEmail(email: string): boolean {
    //     return this.users.some((user) => user.email === email)
    // }
}