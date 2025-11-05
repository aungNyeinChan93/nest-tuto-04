/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { AuthorsModule } from './authors/authors.module';
import { Post } from './posts/entities/post.entity';
import { Author } from './authors/entities/author.entity';

@Module({
  imports: [
    UsersModule, PrismaModule, PostsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL!,
      autoLoadEntities: true,
      synchronize: true, // ❗ set false in production
      ssl: {
        rejectUnauthorized: true, // Needed for Neon
      },
      entities: [Post, Author]
    }),
    AuthorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
