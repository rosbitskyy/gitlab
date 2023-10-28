export interface Serializer extends BaseSerializer {
    constructor(type: Object): Serializer

    get class(): Object

    parse(object: Object | String): Object
}

interface BaseSerializer extends Normaliser {
    serialize(object: Object, replacer: Function, space: Number): String

    deserialize(serializedJsonString: Object | String, ClassType: Object, ownPropertyOnly: boolean): Object
}

interface Normaliser {
    strBools: Array<String>

    isDate(d: Object): boolean

    normalize(o: Object): Object
}