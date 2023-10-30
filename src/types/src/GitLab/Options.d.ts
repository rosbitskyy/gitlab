export = Options;

declare class Options extends AbstractProperties {
    apiUrl: string;
    maxRetries: number;
    privateToken: string;
    projectId: string;
    fetchMethod: any;

    /**
     * @param {object:{}} options
     */
    constructor(options: any);

    get header(): {
        headers: {
            'Content-Type': string;
            'PRIVATE-TOKEN': string;
        };
    };
}

import AbstractProperties = require("./AbstractProperties");
//# sourceMappingURL=Options.d.ts.map