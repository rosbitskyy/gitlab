import {API} from "./API";
import {HttpResponse} from "./HttpResponse";

export interface APIRequest {
    methods: Array<String>

    withBody(v: String): boolean

    constructor(api: API): APIRequest

    // @ts-ignore
    #validate(): void

    // @ts-ignore
    #makeSpecification(): void

    // @ts-ignore
    #request(url: String, opts: Object): Promise<Object | HttpResponse | null>
}