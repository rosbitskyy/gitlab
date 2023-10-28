import {Responses} from "./Responses";

export interface Jobs extends Responses {
    constructor(v: Array<Object | Response>): Jobs
}