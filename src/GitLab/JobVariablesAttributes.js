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

class JobVariablesAttributes {
    /**
     * @type {AbstractList<AbstractKeyValue>}
     */
    job_variables_attributes = new AbstractList();

    constructor() {
    }

    add(key, value) {
        this.job_variables_attributes.push(new AbstractKeyValue(key, value))
    }

    push(v) {
        if (v instanceof AbstractKeyValue) this.job_variables_attributes.push(v)
        else if (v.constructor === {}.constructor && v.key && v.value) this.add(v.key, v.value)
    }

    toString() {
        return JSON.stringify(this)
    }
}

module.exports = JobVariablesAttributes