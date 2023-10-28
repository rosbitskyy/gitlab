import {HttpResponse} from "./HttpResponse";

export interface Request {
    // @ts-ignore
    #instance: Request

    methods: Array<String>

    constructor(): Request

    getInstance(): Request

    // @ts-ignore
    #request(url: String, options: { method: String, headers: Object, body: String }): Promise<{
        ok: boolean,
        json: Function,
        text: Function
    }>

    isGood(): boolean

    response(v: String, res: Object): HttpResponse
}