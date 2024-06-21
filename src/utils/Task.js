export const TASK_STATUS_PENDING = 0;
export const TASK_STATUS_COMPLETE = 1;

// Not 100% we really need postedBy and datePosted but including them for now anyways
export default class Task {
    /**
     * @param {string} postedBy - The username who posted the task.
     * @param {string} datePosted - The date the task was posted.
     * @param {string} taskBody - The body of the task.
     * @param {number} taskStatus - The status of the task (0 for pending, 1 for complete).
     */
    constructor(postedBy, datePosted, taskBody, taskStatus=TASK_STATUS_PENDING) {
        this.postedBy = postedBy
        this.datePosted = datePosted
        this.taskBody = taskBody
        this.taskStatus = taskStatus
    }
}