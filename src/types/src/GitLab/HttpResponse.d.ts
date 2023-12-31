export = HttpResponse;

declare class HttpResponse extends AbstractProperties {
    /**
     * @param {{statusCode?:number,status?:number}} res
     * @return {boolean}
     */
    static isGood: (res: {
        statusCode?: number;
        status?: number;
    }) => boolean;
    ok: boolean;
    status: number;
    json: () => {};
    text: () => string;
    data: any;
    headers: {};

    constructor(obj: any);

    /**
     * @param {string|object} v
     * @param {{statusCode?:number,status?:number,rawHeaders?:string[]}} res
     * @return {HttpResponse}
     */
    static response(v: string | object, res: {
        statusCode?: number;
        status?: number;
        rawHeaders?: string[];
    }): HttpResponse;

    static getHeaders(res: any): any;
}

import AbstractProperties = require("./AbstractProperties");
//# sourceMappingURL=HttpResponse.d.ts.map