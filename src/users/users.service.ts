import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User, UserDocument} from './entities/user.entity';
import {Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from 'src/tasks/entities/task.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  findAll() {
    return this.userModel.find()
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate({
      _id: id
    },
    {
      $set:{
        ...updateUserDto,
      }
    },
    {
      new:true,
    }
    )
  }

  remove(id: string) {
    return this.userModel.deleteOne({
      _id: id
    }).exec();
  }

  async addTask(id: string,task: any){
    const user = await this.findOne(id);
    new this.taskModel(task).save();
    user.tasks.push(task);
    return this.update(id,user);
  }
}
