import API = require("./API");

export = APIRequest;

declare class RequestMethods {
    [s: string]: Function | Object
}

declare class APIRequest extends RequestMethods {
    methods: string[];
    withBody: (v: string) => boolean;
    api: API;
    constructor(api: API);
}

//# sourceMappingURL=APIRequest.d.ts.map