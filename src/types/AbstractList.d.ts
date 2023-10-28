export interface AbstractList extends Array<any> {
    constructor(v: any | null): AbstractList

    findOne(filter: Object): Object
}