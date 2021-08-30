import { Task } from "src/tasks/entities/task.entity";

export class CreateUserDto {
    email: string;
    name: string;
    password: string;
    tasks: Task[];
}
