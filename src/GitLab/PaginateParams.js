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

class PaginateParams extends AbstractProperties {
    page = 1;
    per_page = 20;
    scope = new AbstractList()

    constructor(params) {
        super()
        this.setProperties(params, this)
    }

    toString() {
        let rv = '?';
        const prefix = () => rv.length > 1 ? '&' : '';
        for (let k of Object.keys(this)) {
            if (!(this[k] instanceof Function))
                if (this[k] instanceof Array) for (let v of this[k]) rv += `${prefix()}${k}[]=${v}`;
                else rv += `${prefix()}${k}=${this[k]}`;
        }
        return rv;
    }
}

module.exports = PaginateParams;
