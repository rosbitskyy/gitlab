import {AbstractList} from "./AbstractList";
import {AbstractKeyValue} from "./AbstractKeyValue";

export interface JobVariablesAttributes {
    /**
     * @type {AbstractList<AbstractKeyValue>|Array<AbstractKeyValue>}
     */
    job_variables_attributes: AbstractList | Array<AbstractKeyValue>;

    constructor(): JobVariablesAttributes

    add(key: String, value: any): void

    push(v: Object | AbstractKeyValue): void

    toString(): String
}