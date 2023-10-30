export = Job;

/**
 * Just example of response: https://docs.gitlab.com/ee/api/jobs.html#list-project-jobs
 */
declare class Job extends Response {
    /**
     * @param {Job|Object} props
     */
    constructor(props?: Job | any);

    get statuses(): string[];

    get isSuccess(): boolean;

    get isWaiting(): any;

    get isFailed(): any;

    get message(): "" | "⛔️Виправте помилки, збережіть зміни, та спробуйте ще раз" | "🚨Чекайте завершення завдання";

    get statusImage(): any;
}

import Response = require("./Response");
//# sourceMappingURL=Job.d.ts.map