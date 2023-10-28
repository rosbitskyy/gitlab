import {AbstractProperties} from "./AbstractProperties";
import {API} from "./API";
import {APIRequest} from "./APIRequest";

export interface APICore extends AbstractProperties {
    api: API;
    // @ts-ignore
    #methods: Object;
    request: APIRequest

    get methods(): Object

    get apiUrl(): String

    constructor(api: API): APICore

    addMethods(v: Object): void

    // @ts-ignore
    #makeSpecification(): void
}