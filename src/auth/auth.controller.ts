import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dtos/signup.dto';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dtos/signin.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private jwtService: JwtService
    ) { }

    //signUp: l'inscription
    @Post("signup")
    async signup(
        @Body() body: SignUpDto
    ) {
        //est ce que email existe
        const user = await this.userService.getByEmail(body.email)
        //check user existe PAS
        if (user) {
            throw new BadRequestException("Bad Credentials")
        }
        // hash du password: on remplace le password donné par sa version hashé !!!
        body.password = await bcrypt.hash(body.password, 10);
        // create user avec email hashé
        const new_user = await this.userService.create(body)
        // envoi du mail

        //return de tout ça {user}
        return { user: new_user }
        //return {data:{user: new_user}}

    }

    //signIn: connexion
    @Post("signin") // parce qu'on chiffre le Body !!!
    async signin(
        @Body() body: SignInDto
    ) {
        //est ce que email existe
        const user = await this.userService.getByEmail(body.email)
        console.log("🚀 ~ AuthController ~ user:", user)
        //check !user EXISTE !
        if (!user) {
            throw new BadRequestException("Bad Credentials")
        }
        // compare password
        const compare = await bcrypt.compare(body.password, user.password) // boolean
        console.log("🚀 ~ AuthController ~ compare:", compare)
        if(!compare){
            throw new BadRequestException("Bed Credentials")
        }
        //create acces_token
        // renvoie le tout: id obligatoire !!
        //const payload = { sub: user.id, name: user.firstname };
    return {
      access_token: await this.jwtService.signAsync({ sub: user.id, name: user.firstname }),
    };


    }
}
