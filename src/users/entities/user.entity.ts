import * as bcrypt from 'bcrypt';
import { AbstractBaseEntity } from 'src/common/entities/base.entity';
import { Post } from 'src/posts/entities/post.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends AbstractBaseEntity {
  @Column({
    unique: true,
  })
  username: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Post, (posts) => posts.user)
  posts: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
