export = AbstractList

declare class AbstractList extends Array<any> {

    constructor(v?: Array<any> | null);

    /**
     * @param {object} filter
     * @return {object}
     */
    findOne(filter: object): object;
}

//# sourceMappingURL=AbstractList.d.ts.map