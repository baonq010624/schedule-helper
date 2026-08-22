import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../../schemas/user.schema';
import { Teacher, TeacherDocument } from '../../schemas/teacher.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await this.userModel.create({
      email,
      passwordHash,
      name,
      role: 'VIEWER', // Default role
      isActive: true,
    });

    // Generate JWT token
    const token = this.jwtService.sign({
      sub: newUser._id,
      email: newUser.email,
      role: newUser.role,
      teacherId: newUser.teacherId,
    });

    return {
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token
    const token = this.jwtService.sign({
      sub: user._id,
      email: user.email,
      role: user.role,
      teacherId: user.teacherId,
    });

    return {
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  }

  async validateUser(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  // ADMIN: list all accounts, e.g. to link a TEACHER account to its Teacher record
  async getAllUsers() {
    return this.userModel.find().select('-passwordHash');
  }

  async setUserTeacher(userId: string, teacherId: string | null) {
    if (teacherId) {
      const exists = await this.teacherModel.exists({ _id: teacherId });
      if (!exists) {
        throw new BadRequestException('Giáo viên không tồn tại');
      }
    }
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      teacherId ? { teacherId } : { $unset: { teacherId: '' } },
      { new: true },
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
