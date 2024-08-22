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

    public set taskList(taskList: Task[]) {
        const json: string = JSON.stringify(taskList);
        localStorage.setItem(this.taskListStorageKey, json);
    }

}