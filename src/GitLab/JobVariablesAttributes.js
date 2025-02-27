/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */


const AbstractList = require("./AbstractList");
const AbstractKeyValue = require("./AbstractKeyValue");

/**
 * Represents a collection of job variable attributes.
 * This class provides methods to manage key-value pairs
 * as job variable attributes, including adding and pushing these pairs.
 */
class JobVariablesAttributes {
    /**
     * @type {AbstractList|Array<any>}
     */
    job_variables_attributes = new AbstractList();

    constructor() {
    }

    /**
     * Adds a key-value pair to the job variables attributes list.
     *
     * @param {string} key - The key to associate with the value.
     * @param {*} value - The value to be stored with the specified key.
     * @return {void} This method does not return a value.
     */
    add(key, value) {
        this.job_variables_attributes.push(new AbstractKeyValue(key, value))
    }

    /**
     * Adds a key-value pair or an instance of AbstractKeyValue to the job_variables_attributes array.
     *
     * @param {AbstractKeyValue|Object} v An object representing a key-value pair or an instance of AbstractKeyValue.
     *                                    If it is an object, it must have 'key' and 'value' properties.
     * @return {void} Does not return a value.
     */
    push(v) {
        if (v instanceof AbstractKeyValue) this.job_variables_attributes.push(v)
        else if (v.constructor === {}.constructor && v.key && v.value) this.add(v.key, v.value)
    }

    /**
     * Converts the current object instance to its JSON string representation.
     * @return {string} A string representation of the object in JSON format.
     */
    toString() {
        return JSON.stringify(this)
    }
}

module.exports = JobVariablesAttributes