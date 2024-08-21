import {Task} from "./models/Task";

export class TaskStorageManager {

    saveTaskList(taskList: Task[]): void {
        // const convertedList: [string] = taskList.map((task: Task) => {
        //     return JSON.stringify(task);
        // });
        const json = JSON.stringify(taskList);
        localStorage.setItem('taskList', json);
    }

    getTaskList(): Task[] {
        const taskListValue: string = localStorage.getItem('taskList');
        const parseResult = JSON.parse(taskListValue);
        if (parseResult) {
            return parseResult;
        } else {
            return [];
        }
    }

}