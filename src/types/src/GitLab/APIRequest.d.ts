import API = require("./API");

export = APIRequest;

declare class APIRequest {
    methods: string[];
    /**
     * @param {string} v
     * @return {boolean}
     */
    withBody: (v: string) => boolean;
    api: API;

    /**
     * @param {API} api
     */
    constructor(api: API);
}

//# sourceMappingURL=APIRequest.d.ts.map