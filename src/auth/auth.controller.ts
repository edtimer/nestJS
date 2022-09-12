import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
constructor(private readonly authService:AuthService){

}

@Post('signUp')
signUp(){
    return "Im signing up"
}
@Post('signIn')
signIn(){
return "Im signing in"
}

}