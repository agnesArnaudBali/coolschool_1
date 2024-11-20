import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomException extends HttpException{
    
    //private errorCode: string;
    
    constructor(
        message: string, 
        status: HttpStatus, 
        public errorCode:string
    ){
        
        super(message, status);
        //this.errorCode = errorCode 

    }


}