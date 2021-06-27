import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from './dtos/signup-dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login-dto';
import { UserDto } from './dtos/user-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly jwtService: JwtService,) { }

    async register(signupDto: SignUpDto): Promise<User> {
        const user = new this.userModel();
        user.email = signupDto.email;
        user.password = await bcrypt.hash(signupDto.password, 10);;
        return user.save();
    }

    async findOne(username: string): Promise<User> {
        const user:User = await this.userModel.findOne({email: username}).exec();
        if (!user) {
          throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async login(loginDto: LoginDto): Promise<UserDto> {
        const user:User = await this.userModel.findOne({email: loginDto.email}).select('+password').exec();
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
        }
        const isPasswordMatching = await bcrypt.compare(
            loginDto.password,
            user.password
          );
        if (!isPasswordMatching) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
        }
        const userDto = new UserDto();
        const token = this._createToken(loginDto);
        userDto.email = user.email;
        userDto.token = token;
        return userDto;
    }

    private _createToken({ email }: LoginDto): any {
        const user:any = { email };    
        const accessToken = this.jwtService.sign(user);    
        return {
            expiresIn: '15s',
            accessToken,    
        };  
    }
}
