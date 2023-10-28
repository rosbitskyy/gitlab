export interface DynamicResponse {
    class(className: String): Object

    getSingletonName(v: String): String

    withClasses(v: Object): (o: Object) => Object

    pipeline(...methods: Function[]): (defaults: Object) => Function

    withConstructor(c: ObjectConstructor): (o: Object) => (__proto__: Object) => Object
}
