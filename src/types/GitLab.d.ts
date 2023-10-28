import {API} from "./API";
import {GitLabError} from "./GitLabError";
import {DynamicResponse} from "./DynamicResponse";
import {AbstractProperties} from "./AbstractProperties";
import {AbstractKeyValue} from "./AbstractKeyValue";
import {AbstractList} from "./AbstractList";
import {Job} from "./Job";
import {Jobs} from "./Jobs";
import {JobVariablesAttributes} from "./JobVariablesAttributes";
import {Method} from "./Method";
import {Options} from "./Options";
import {PaginateParams} from "./PaginateParams";
import {Request} from "./Request";
import {Responses} from "./Responses";
import {Response} from "./Response";
import {Serializer} from "./Serializer";

export interface GitLab {
    API: API
    AbstractList: AbstractList
    AbstractKeyValue: AbstractKeyValue
    AbstractProperties: AbstractProperties
    DynamicResponse: DynamicResponse
    Error: GitLabError
    Job: Job
    Jobs: Jobs
    JobVariablesAttributes: JobVariablesAttributes
    Method: Method
    Options: Options
    PaginateParams: PaginateParams
    Request: Request
    Responses: Responses
    Response: Response
    Serializer: Serializer
    version: {
        get node(): { major: Number, minor: Number, patch: Number }
    }
}