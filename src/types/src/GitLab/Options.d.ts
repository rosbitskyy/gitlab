export = Options;

declare class Options extends AbstractProperties {
    apiUrl: string;
    maxRetries: number;
    privateToken: string;
    projectId: string;
    fetchMethod: object | Function;

    /**
     * @param {object|Options} options
     */
    constructor(options: object | Options);

    get header(): {
        headers: {
            'Content-Type': string;
            'PRIVATE-TOKEN': string;
        };
    };
}

import AbstractProperties = require("./AbstractProperties");
//# sourceMappingURL=Options.d.ts.map