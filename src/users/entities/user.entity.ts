import { OauthProvider } from 'src/constants/oauth-provider';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: 'text', nullable: true })
  refreshToken: string | null;

  @Column({ type: 'enum', enum: OauthProvider, nullable: true })
  oauthProvider: string | null;

  @Column({ nullable: true })
  oauthId: string | null;
}
