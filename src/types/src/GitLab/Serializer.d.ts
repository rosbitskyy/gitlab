export = Serializer;

declare class Serializer extends BaseSerializer {
    type: any;

    /**
     * @param {object} type
     *
     *@example:
     *  let serializer = new Serializer(MyClass);
     *  const myClass = new MyClass();
     *  const serialized = serializer.serialize(myClass).value;
     *  const normalized = serializer.parse(serialized).value;
     */
    constructor(type: object);

    get class(): any;

    /**
     * @param {string|object} object
     * @return {Object}
     */
    parse(object: string | object): any;

    /**
     * @param {object} object
     * @param {function(key:string,value:object)} replacer
     * @param {number} space
     * @return {string}
     */
    serialize(object: object, replacer?: any, space?: number): string;
}

declare class BaseSerializer extends Normaliser {
    /**
     * @param {object} object
     * @param {function(key:string,value:object)} replacer
     * @param {number} space
     * @return {string}
     */
    static serialize(object: object, replacer?: any, space?: number): string;

    /**
     * @param {string|object} serializedJsonString
     * @param {Object} ClassType
     * @param {boolean} ownPropertyOnly
     * @return {object}
     */
    static deserialize(serializedJsonString: string | object, ClassType?: any, ownPropertyOnly?: boolean): object;
}

declare class Normaliser {
    static strBools: string[];

    /**
     * @param {object} d
     * @return {boolean}
     */
    static isDate(d: object): boolean;

    /**
     * @param {object} object
     * @return {object}
     */
    static normalize(object: object): object;
}

//# sourceMappingURL=Serializer.d.ts.map