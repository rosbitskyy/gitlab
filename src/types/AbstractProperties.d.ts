import {Job} from "./Job";
import {Response} from "./Response";

export interface AbstractProperties {
    setProperties(source: Object | Array<Object>, target: Object | Array<Object>, ownPropertyOnly: boolean | true,
                  Class: null | Function | Job | Response | Object): void;

    formatDate(d: Date, lang: String | 'en'): String;

    getOwnPropertyOf(obj: Object): String[];

    copyProperties(source: Object): void;

    clear(): AbstractProperties;
}