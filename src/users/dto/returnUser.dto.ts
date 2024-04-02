import { User } from '../entities/user.entity';

export class ReturnUserDTO {
  userId: string;
  username: string;
  email: string;
  name: string;

  constructor(user: User) {
    this.userId = user.id;
    this.email = user.email;
    this.name = user.name;
    this.username = user.username;
  }
}
