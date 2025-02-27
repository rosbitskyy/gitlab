/**
 * Represents an abstract key-value pair.
 * This class stores a key and its corresponding value, which can be of various data types.
 */


class AbstractKeyValue {
    /**
     * @type {string}
     */
    key;
    /**
     * @type {object|string|number|null|Date}
     */
    value;

    /**
     * @param {string} k
     * @param {object|string|number|null|Date} v
     */
    constructor(k, v) {
        /* istanbul ignore next */
        this.key = k;
        /* istanbul ignore next */
        this.value = v;
    }

    /* istanbul ignore next */
    /**
     * Retrieves an object with a single key-value pair based on the instance's key and value.
     *
     * @return {Object} An object containing the key-value pair where the key is derived from `this.key` and the value is derived from `this.value`.
     */
    get() {
        return {[this.key]: this.value};
    }
}

module.exports = AbstractKeyValue;