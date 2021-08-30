import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './entities/user.entity';
import { Task, TaskSchema } from 'src/tasks/entities/task.entity';



@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
