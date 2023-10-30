export = DynamicResponse;

declare class DynamicResponse {
    static getSingletonName: (v: any) => any;
    static withClasses: ({className}: {
        className: any;
    }) => (obj: any) => any;
    /**
     * pipeline
     * @param {function} methods
     * @returns {function(*): *}
     */
    static pipeline: (...methods: Function[]) => (arg0: any) => any;
    /**
     * Build a withConstructor mixin to add the .constructor property to all object instances.
     * @param constructor
     * @returns {function(*): *&{__proto__: {constructor: *}}}
     */
    static withConstructor: (constructor: any) => (arg0: any) => any & {
        __proto__: {
            constructor: any;
        };
    };

    /**
     * @return {Object}
     */
    static class(className: any): any;
}

//# sourceMappingURL=DynamicResponse.d.ts.map