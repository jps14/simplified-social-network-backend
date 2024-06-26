import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.usersRepository.insert(
      this.usersRepository.create(createUserDto),
    );
    return result.identifiers[0].id;
  }

  async update(user: User) {
    return this.usersRepository.save(user);
  }

  async findOneById(id: string, selectPassword: boolean = false) {
    try {
      return await this.usersRepository.findOne({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          password: selectPassword,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async findOneByEmail(email: string, selectPassword: boolean = false) {
    return await this.usersRepository.findOne({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: selectPassword,
      },
    });
  }
}
