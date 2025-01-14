import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  exports:[UserService],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
