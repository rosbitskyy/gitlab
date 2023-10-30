/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

class AbstractList extends Array {
    /**
     * @param {Array|null} v
     */
    constructor(v) {
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