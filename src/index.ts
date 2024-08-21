import './styles.scss';
import {Task} from "./models/Task";
import {TaskElementBuilder} from "./TaskElementBuilder";
import {TaskStorageManager} from "./TaskStorageManager";

function startApp() {
    const taskNameInput: HTMLInputElement = document.getElementById('taskNameInput') as HTMLInputElement;
    const taskDeadlineInput: HTMLInputElement = document.getElementById('taskDeadlineInput') as HTMLInputElement;
    const addTaskButton: HTMLButtonElement = document.getElementById('addTaskButton') as HTMLButtonElement;
    const taskList: HTMLDivElement = document.getElementById('taskList') as HTMLDivElement;

    const storageManager: TaskStorageManager = new TaskStorageManager();
    storageManager.getTaskList().forEach((task: Task): void => {
        const taskItem: HTMLDivElement = TaskElementBuilder.createTaskElement(
            task,
            function () {
                taskList.removeChild(taskItem);
            },
            function (isChecked: boolean) {
                console.log(isChecked);
            }
        );
        taskList.appendChild(taskItem);
    })

    addTaskButton.onclick = function (): void {
        const taskName: string = taskNameInput.value;
        const taskDeadline: string = taskDeadlineInput.value;

        const task: Task = new Task(taskName, taskDeadline);
        storageManager.saveTaskList([task]);

        const taskItem: HTMLDivElement = TaskElementBuilder.createTaskElement(
            task,
            function (): void {
                taskList.removeChild(taskItem);
            },
            function (isChecked: boolean): void {
                console.log(isChecked);
            }
        );

        taskList.appendChild(taskItem);
    };
}

startApp();