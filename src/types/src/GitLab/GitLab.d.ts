export = GitLab;

declare class GitLab {
    static API: typeof API;
    static AbstractList: typeof AbstractList;
    static AbstractKeyValue: typeof AbstractKeyValue;
    static AbstractProperties: typeof AbstractProperties;
    static DynamicResponse: typeof DynamicResponse;
    static Error: typeof GitLabError;
    static Job: typeof Job;
    static Jobs: typeof Jobs;
    static JobVariablesAttributes: typeof JobVariablesAttributes;
    static Method: typeof Method;
    static Options: typeof Options;
    static PaginateParams: typeof PaginateParams;
    static Request: (url: string, options: any) => Promise<{}>;
    static Responses: typeof Responses;
    static Response: typeof Response;
    static Serializer: typeof Serializer;
    static version: {
        readonly node: {
            major: number;
            minor: number;
            patch: number;
        };
    };
}

import API = require("./API");
import AbstractList = require("./AbstractList");
import AbstractKeyValue = require("./AbstractKeyValue");
import AbstractProperties = require("./AbstractProperties");
import DynamicResponse = require("./DynamicResponse");
import GitLabError = require("./GitLabError");
import Job = require("./Job");
import Jobs = require("./Jobs");
import JobVariablesAttributes = require("./JobVariablesAttributes");
import Method = require("./Method");
import Options = require("./Options");
import PaginateParams = require("./PaginateParams");
import Responses = require("./Responses");
import Response = require("./Response");
import Serializer = require("./Serializer");
//# sourceMappingURL=GitLab.d.ts.map