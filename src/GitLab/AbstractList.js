/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

/**
 * The AbstractList class extends the native Array class, providing additional
 * functionality for managing and querying elements. It can be initialized
 * optionally with an array or remain empty.
 */
class AbstractList extends Array {
    /**
     * @param {Array|null} v
     */
    constructor(v = null) {
        if (v instanceof Array) super(...v); else super();
    }

    /**
     * @param {object} filter
     * @return {object}
     */
    findOne(filter) {
        return this.find(it => filter instanceof Object ? (Object.keys(filter).map(k => filter[k] === it[k]).every(b => b)) : it === filter)
    }
}

module.exports = AbstractList;