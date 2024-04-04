import { AbstractBaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Post extends AbstractBaseEntity {
  @Column()
  post: string;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
