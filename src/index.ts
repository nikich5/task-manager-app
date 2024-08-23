import './styles.scss';
import {Task} from './models/Task';
import {TaskElementBuilder} from './TaskElementBuilder';
import {TaskStorageManager} from './TaskStorageManager';

function startApp(): void {
    const taskNameInput: HTMLInputElement = document.getElementById('taskNameInput') as HTMLInputElement;
    const taskDeadlineInput: HTMLInputElement = document.getElementById('taskDeadlineInput') as HTMLInputElement;
    const addTaskButton: HTMLButtonElement = document.getElementById('addTaskButton') as HTMLButtonElement;
    const taskSearchInput: HTMLInputElement = document.getElementById('taskSearchInput') as HTMLInputElement;
    const taskList: HTMLDivElement = document.getElementById('taskList') as HTMLDivElement;

    const storageManager: TaskStorageManager = new TaskStorageManager();

    const addTaskElement = (task: Task): void => {
        const taskItem: HTMLDivElement = TaskElementBuilder.createTaskElement(
            task,
            function (): void {
                storageManager.deleteTask(task.uuid);
                taskList.removeChild(taskItem);
            },
            function (isChecked: boolean): void {
                storageManager.updateTaskStatus(task.uuid, isChecked);
            }
        );
        taskList.appendChild(taskItem);
    };

    const filterTaskList = (searchText: string): void => {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        const filteredTaskList: Task[] = storageManager.taskList.filter((task: Task): boolean => {
            return task.name.toLowerCase().includes(searchText);
        });
        filteredTaskList.forEach((task: Task): void => {
            addTaskElement(task);
        })
    };

    storageManager.taskList.forEach((task: Task): void => {
        addTaskElement(task);
    })

    taskSearchInput.addEventListener('input', (): void => {
        const searchText: string = taskSearchInput.value.toLowerCase();
        filterTaskList(searchText);
    });

    addTaskButton.addEventListener('click', (): void => {
        const taskName: string = taskNameInput.value;
        const taskDeadline: string = taskDeadlineInput.value;

        if (!taskName || taskName.length === 0) {
            alert('Не заполнено название задачи');
            return;
        }
        if (!taskDeadline || taskDeadline.length === 0) {
            alert('Не заполнен срок выполнения задачи');
            return;
        }

        const task: Task = new Task(taskName, taskDeadline);
        storageManager.addTask(task);
        addTaskElement(task);

        taskDeadlineInput.value = '';
        taskNameInput.value = '';
    });
}

startApp();