import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { Post } from 'src/posts/entities/posts.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post;
}
