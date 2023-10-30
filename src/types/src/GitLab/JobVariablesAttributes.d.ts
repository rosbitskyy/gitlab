export = JobVariablesAttributes;

declare class JobVariablesAttributes {
    /**
     * @type {AbstractList|Array<any>}
     */
    job_variables_attributes: AbstractList | Array<any>;

    add(key: any, value: any): void;

    push(v: any): void;

    toString(): string;
}

import AbstractList = require("./AbstractList");
//# sourceMappingURL=JobVariablesAttributes.d.ts.map