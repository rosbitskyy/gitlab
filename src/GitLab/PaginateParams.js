/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */


const AbstractProperties = require("./AbstractProperties");
const AbstractList = require("./AbstractList");

/**
 * Represents parameters for pagination with additional customizable options.
 * Extends AbstractProperties to inherit property setting functionality.
 */
class PaginateParams extends AbstractProperties {
    page = 1;
    per_page = 20;
    scope = new AbstractList()
    order_by;
    sort;
    status = new AbstractList();
    source = new AbstractList();

    /**
     * @param {Object} params
     */
    constructor(params) {
        super()
        this.setProperties(params, this, false)
    }

    /**
     * Converts the properties of the current object to a URL query string format.
     * Iterates through the object's keys and appends key-value pairs to the result.
     * Arrays are handled by iterating their values and appending multiple key-value pairs
     * with the same key but indexed with square brackets.
     *
     * @return {string} A URL query string representation of the object's properties.
     */
    toString() {
        let rv = '?';
        const prefix = () => rv.length > 1 ? '&' : '';
        for (let k of Object.keys(this)) {
            if (!(this[k] instanceof Function) && !!this[k])
                if (this[k] instanceof Array) for (let v of this[k]) rv += `${prefix()}${k}[]=${v}`;
                else rv += `${prefix()}${k}=${this[k]}`;
        }
        return rv;
    }
}

module.exports = PaginateParams;
