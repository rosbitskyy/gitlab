import {AbstractProperties} from "./AbstractProperties";
import {Jobs} from "./Jobs";
import {AbstractList} from "./AbstractList";
import {Response} from "./Response";

export interface Responses extends AbstractProperties {

    /**
     * @type {[AbstractList]}
     */
    // @ts-ignore
    #list: AbstractList

    constructor(list: [] | AbstractList | Jobs, responseClass: Response): Responses

    find(filter: Object): Response
}