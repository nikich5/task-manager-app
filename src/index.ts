import './styles.scss';
import {Task} from "./models/Task";
import {TaskElementBuilder} from "./TaskElementBuilder";

function startApp() {
    const taskNameInput: HTMLInputElement = document.getElementById('taskNameInput') as HTMLInputElement;
    const taskDeadlineInput: HTMLInputElement = document.getElementById('taskDeadlineInput') as HTMLInputElement;
    const addTaskButton: HTMLButtonElement = document.getElementById('addTaskButton') as HTMLButtonElement;
    const taskList: HTMLDivElement = document.getElementById('taskList') as HTMLDivElement;

    addTaskButton.onclick = function (): void {
        const taskName: string = taskNameInput.value;
        const taskDeadline: string = taskDeadlineInput.value;

        const task: Task = new Task(taskName, taskDeadline);

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
    };
}

startApp();