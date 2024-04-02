import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDTO } from 'src/users/dto/returnUser.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email, true);
    if (!(await user?.comparePassword(pass))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id };

    const returnUser = new ReturnUserDTO(user);

    return {
      ...returnUser,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
