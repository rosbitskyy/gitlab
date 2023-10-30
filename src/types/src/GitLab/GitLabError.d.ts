import API = require("./API");

export = GitLabError;

declare class GitLabError extends Error {
    stack: string;
    info: string[];

    /**
     * @param {API} api
     * @param {string} message
     * @param {string} stack
     */
    constructor(api: API, message: string, stack?: string);

    static debugger(): {
        frame: string[];
        line: string;
    };
}

//# sourceMappingURL=GitLabError.d.ts.map