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

    const addTaskElement = function(task: Task): void {
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

    storageManager.taskList.forEach((task: Task): void => {
        addTaskElement(task);
    })

    addTaskButton.onclick = function (): void {
        const taskName: string = taskNameInput.value;
        const taskDeadline: string = taskDeadlineInput.value;

        const task: Task = new Task(taskName, taskDeadline);
        storageManager.taskList = [...storageManager.taskList, task];
        addTaskElement(task);
    };
}

startApp();