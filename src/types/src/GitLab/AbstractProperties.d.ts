import Job = require("./Job");

export = AbstractProperties;

declare class DynamicProperties {
    [s: string]: any
}

declare class AbstractProperties extends DynamicProperties {
    formatDate: (d: any, lang?: string) => string;
    /**
     * @param {object} obj
     * @return {string[]}
     */
    getOwnPropertyOf: (obj: object) => string[];

    /**
     * @param {Object|Array} source
     * @param {Object|Array} target
     * @param {boolean|true} ownPropertyOnly
     * @param {null|Function|Job|Object} Class
     */
    setProperties(source: any | any[], target: any | any[], ownPropertyOnly?: boolean | true, Class?: null | Function | Job | any): void;

    /**
     * @param {any} source
     * @return {void}
     */
    copyProperties(source: any): void;

    clear(): this;
}

//# sourceMappingURL=AbstractProperties.d.ts.map