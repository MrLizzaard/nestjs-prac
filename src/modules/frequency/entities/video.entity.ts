import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keyword: string;

  @Column()
  youtubeId: string;

  @Column()
  title: string;

  @Column()
  thumbnailUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}
