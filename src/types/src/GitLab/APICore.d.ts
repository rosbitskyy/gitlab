import API = require("./API");
import AbstractProperties = require("./AbstractProperties");
import APIRequest = require("./APIRequest");

export = APICore;

declare class APICore extends AbstractProperties {
    /**
     * @type {API}
     */
    api: API;
    /**
     * @type {APIRequest}
     */
    request: APIRequest;

    /**
     * @param {API} api
     */
    constructor(api: API);

    get methods(): any;

    /**
     * @deprecated
     * @return {Object}
     */
    get uri(): any;

    get apiUrl(): any;

    /**
     * Add your own method that is not yet implemented by this api
     * @param {Object} v
     */
    addMethods(v: any): void;
}


//# sourceMappingURL=APICore.d.ts.map