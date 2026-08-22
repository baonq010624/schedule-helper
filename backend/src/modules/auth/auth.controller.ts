import { Controller, Post, Body, UseGuards, Get, Put, Param, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: any) {
    const user = await this.authService.validateUser(req.user.sub);
    return {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      teacherId: user.teacherId,
      isActive: user.isActive,
    };
  }

  // ADMIN: danh sách tài khoản để liên kết với giáo viên
  @Get('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getUsers() {
    return this.authService.getAllUsers();
  }

  // ADMIN: liên kết (hoặc gỡ) một tài khoản TEACHER với bản ghi Teacher
  @Put('users/:id/teacher')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async setUserTeacher(
    @Param('id') id: string,
    @Body('teacherId') teacherId: string | null,
  ) {
    return this.authService.setUserTeacher(id, teacherId);
  }
}
