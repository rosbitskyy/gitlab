export = API;

declare class API extends AbstractProperties {
    options: Options;
    debugger: {
        frame: string[];
        line: string;
    };

    /**
     * @param {Object|Options} options
     */
    constructor(options: any | Options);

    get projectId(): string;

    getOwnPropertyNames(): string[];

    /**
     * @param {PropertyKey} apiName
     * @return {APICore}
     */
    add(apiName: PropertyKey): APICore;
}

import AbstractProperties = require("./AbstractProperties");
import Options = require("./Options");
import APICore = require("./APICore");
//# sourceMappingURL=API.d.ts.map