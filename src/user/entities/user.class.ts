import { CreateUserDto } from "../dtos/create-user.dto";

export type UserTypeWithoutId = Omit<User, "id">

export class User {
    readonly id:number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;

    static countUsers:number = 0

constructor(data: CreateUserDto
    //firstname: string, lastname: string, email: string, password: string
){
    this.id= ++User.countUsers;
    Object.assign(this, data)
//    this.firstname= data.firstname;
//    this.lastname= data.lastname;
//    this.email= data.email;
//    this.password= data.password
}
}