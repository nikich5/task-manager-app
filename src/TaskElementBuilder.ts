import {Task} from "./models/Task";

export class TaskElementBuilder {

    static createTaskElement(
        task: Task,
        onDeleteButtonClick: () => void,
        onCheckboxChange: (isChecked: boolean) => void,
    ): HTMLDivElement {
        const taskItem: HTMLDivElement = document.createElement('div');
        taskItem.className = 'card';

        const leftColumnDiv: HTMLDivElement = document.createElement('div');
        leftColumnDiv.className = 'card-left-column';
        taskItem.appendChild(leftColumnDiv);

        const checkbox: HTMLInputElement = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onchange = function (): void {
            onCheckboxChange(checkbox.checked)
        };
        leftColumnDiv.appendChild(checkbox);

        const rightColumnDiv: HTMLDivElement = document.createElement('div');
        rightColumnDiv.className = 'card-right-column';
        taskItem.appendChild(rightColumnDiv);

        const taskTitle: HTMLSpanElement = document.createElement('span');
        taskTitle.textContent = `Название: ${task.name}`;
        rightColumnDiv.appendChild(taskTitle);

        const taskCreateDate: HTMLSpanElement = document.createElement('span');
        taskCreateDate.textContent = `Дата создания: ${task.createDate}`;
        rightColumnDiv.appendChild(taskCreateDate);

        const taskDeadlineDate: HTMLSpanElement = document.createElement('span');
        taskDeadlineDate.textContent = `Срок исполнения: ${task.deadlineDate}`;
        rightColumnDiv.appendChild(taskDeadlineDate);

        const deleteButton: HTMLButtonElement = document.createElement('button');
        deleteButton.className = 'delete-button'
        deleteButton.textContent = 'Удалить';
        deleteButton.onclick = function (): void {
            onDeleteButtonClick();
        };
        rightColumnDiv.appendChild(deleteButton);

        return taskItem
    }
}