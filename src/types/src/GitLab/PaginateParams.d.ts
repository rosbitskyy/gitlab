export = PaginateParams;

declare class PaginateParams extends AbstractProperties {
    page: number;
    per_page: number;
    scope: AbstractList;
    order_by: any;
    sort: any;
    status: AbstractList;
    source: AbstractList;

    /**
     * @param {Object} params
     */
    constructor(params: any);
}

import AbstractProperties = require("./AbstractProperties");
import AbstractList = require("./AbstractList");
//# sourceMappingURL=PaginateParams.d.ts.map