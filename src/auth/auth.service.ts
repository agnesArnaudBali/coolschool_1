import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//const bcrypt = require('bcrypt');
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService
      ) {}

    // async hash(password:string):Promise<string>{
    //     return await bcrypt.hash(password,10)
    // }
    // async compare(password:string, hashed_password:string):Promise<boolean>{
    //     return await bcrypt.compare(password,hashed_password)
    // }


}
