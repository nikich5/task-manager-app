import {v4 as uuidv4} from "uuid";

export class Task {
    uuid: string;
    name: string;
    createDate: string;
    deadlineDate: string;
    isComplete: boolean;

    constructor(
        name: string,
        deadlineDate: string
    ) {
        this.uuid = uuidv4();
        this.name = name;
        this.createDate = this.getCurrentDate();
        this.deadlineDate = deadlineDate;
        this.isComplete = false;
    };

    private getCurrentDate(): string {
        const currentDate: Date = new Date();
        const day: string = String(currentDate.getDate()).padStart(2, '0');
        const month: string = String(currentDate.getMonth()).padStart(2, '0');
        const year: number = currentDate.getFullYear();

        return `${day}.${month}.${year}`
    }
}