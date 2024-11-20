import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [UserModule,PrismaModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
