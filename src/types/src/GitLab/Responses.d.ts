import Jobs = require("./Jobs");
import AbstractProperties = require("./AbstractProperties");
import Response = require("./Response");
import AbstractList = require("./AbstractList");

export = Responses;

declare class Responses extends AbstractProperties {
    /**
     * @param {[]|AbstractList|Jobs} list
     * @param {Response} responseClass
     */
    constructor(list: [] | AbstractList | Jobs, responseClass?: Response);

    get list(): [AbstractList];

    /**
     * @param {object} filter
     * @return {Response}
     */
    find(filter: object): Response;
}


//# sourceMappingURL=Responses.d.ts.map