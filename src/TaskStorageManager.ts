import {Task} from "./models/Task";

export class TaskStorageManager {

    private taskListStorageKey: string = 'taskListKey'

    public get taskList(): Task[] {
        const taskListValue: string = localStorage.getItem(this.taskListStorageKey);
        const parseResult = JSON.parse(taskListValue);
        if (parseResult) {
            return parseResult;
        } else {
            return [];
        }
    }

    private set _taskList(taskList: Task[]) {
        const json: string = JSON.stringify(taskList);
        localStorage.setItem(this.taskListStorageKey, json);
    }

    public addTask(task: Task): void {
        const taskList: Task[] = this.taskList;
        taskList.push(task);
        this._taskList = taskList;
    }

    public deleteTask(uuid: string): void {
        const taskList: Task[] = this.taskList;
        const index: number = taskList.findIndex((task: Task): boolean => {
            return task.uuid === uuid;
        });
        if (index !== -1) {
            taskList.splice(index, 1);
            this._taskList = taskList;
        }
    }

    public updateTaskStatus(uuid: string, isComplete: boolean): void {
        const taskList: Task[] = this.taskList;
        const task: Task = taskList.find((task: Task): boolean => {
            return task.uuid === uuid;
        });
        if (task) {
            task.isComplete = isComplete;
            this._taskList = taskList;
        }
    }

}