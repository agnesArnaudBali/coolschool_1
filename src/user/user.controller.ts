import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.class';
import { UserService } from './user.service';
import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Req } from '@nestjs/common';


@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async allUser() : Promise<User[]> {
        return this.userService.allUser({})
    }

    @Get(":id")
    async getById(
        @Param("id") id: string) : Promise<User>  {
        return this.userService.user(+id)
    }   

    @Get(':email') // Expose une route GET /users/:email
    async getByEmail(@Param('email') email: string): Promise<User> {
        const user = await this.userService.getByEmail(email);
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    @Post()
    creatUser(
        @Body() body: CreateUserDto,
    ) {  
        // const userExist = this.userService.checkEmail(body.email)
        // if(userExist){
        //     throw new BadRequestException('Cet email existe déjà!')
        // }
        return this.userService.create(body);
    }
    @Patch(":id")
    update(
        @Param('id') id: string,
        @Body() up: UpdateUserDto
    ): Promise<User> {
        /*const index = this.userService.findIndexById(+1)
        if (index === -1) {
            throw new Error('User not found')
        }
        const updateUser = this.userService.update(+id, body)*/
        return this.userService.updateUser({
            where: { id: +id },
            data: up,
        })
    }

    @Delete(':id')
    async deleteUser(
        @Param("id") id: string) {
        const user = await this.userService.user(+id)
        if (!user) {
            throw new Error('User not found')
        }
        console.log('Delete function !!!')
        return this.userService.deleteUser(+id)
    }

    
}