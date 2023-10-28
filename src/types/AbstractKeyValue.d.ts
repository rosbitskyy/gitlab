export interface AbstractKeyValue {
    /**
     * @type {string}
     */
    key: String;
    /**
     * @type {any}
     */
    value: any;

    /**
     * @param {string} key
     * @param {any} value
     */
    constructor(key: String, value: any): AbstractKeyValue
}