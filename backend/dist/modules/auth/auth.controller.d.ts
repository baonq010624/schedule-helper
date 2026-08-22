import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            email: string;
            name: string;
            role: string;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            email: string;
            name: string;
            role: string;
        };
        token: string;
    }>;
    getProfile(req: any): Promise<{
        id: import("mongoose").Types.ObjectId;
        email: string;
        name: string;
        role: string;
        teacherId: import("mongoose").Types.ObjectId | undefined;
        isActive: boolean;
    }>;
    getUsers(): Promise<(import("mongoose").Document<unknown, {}, import("../../schemas").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    setUserTeacher(id: string, teacherId: string | null): Promise<import("mongoose").Document<unknown, {}, import("../../schemas").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
