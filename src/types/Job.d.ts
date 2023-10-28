import {Response} from "./Response";

export interface Job extends Response {
    // @ts-ignore
    #statuses: Object

    get statuses(): String[]

    constructor(props: Job | Object): Job

    get isSuccess(): boolean

    get isWaiting(): boolean

    get isFailed(): boolean

    get message(): String

    get statusImage(): String
}