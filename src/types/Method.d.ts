export interface Method {
    /**
     * @type {string}
     */
    method: String;
    /**
     * @type {Object}
     */
    class: Object;
    /**
     * @type {Object|Function}
     */
    url: String;

    /**
     * @param {object:{}} props
     */
    constructor(props: Object): Method
}