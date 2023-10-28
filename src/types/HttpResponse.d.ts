import {AbstractProperties} from "./AbstractProperties";

export interface HttpResponse extends AbstractProperties {
    ok: boolean;
    status: Number;
    json: Function;
    text: Function;
    data: Object | String | null;
    headers: Object;

    constructor(obj: Object): HttpResponse;

    response(v: string | object, res: Object): HttpResponse | Object

    isGood(res: Object): boolean

    getHeaders(res: Object): Object
}