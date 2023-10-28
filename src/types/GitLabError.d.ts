import {API} from "./API";

export interface GitLabError extends Error {

    // @ts-ignore
    #api: API

    constructor(api: API, message: String, stack: null | String): GitLabError

    debugger(): void

    // @ts-ignore
    #stack(): void
}