import {AbstractProperties} from "./AbstractProperties";
import {Options} from "./Options";
import {APICore} from "./APICore";

export interface API extends AbstractProperties {
    options: Options

    getOwnPropertyNames(): String[]

    get projectId(): String | Number

    constructor(options: Options): API;

    add(apiName: PropertyKey): APICore;

    // @ts-ignore
    #defautlSpecification(): void;
}