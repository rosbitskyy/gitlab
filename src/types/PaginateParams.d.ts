import {AbstractProperties} from "./AbstractProperties";
import {AbstractList} from "./AbstractList";

export interface PaginateParams extends AbstractProperties {
    page: Number | null;
    per_page: Number | null;
    scope: AbstractList | null;
    order_by: String | null;
    sort: String | null;
    status: AbstractList | null;
    source: AbstractList | null;

    constructor(params: Object): PaginateParams

    toString(): String
}