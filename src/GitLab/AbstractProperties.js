/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

class AbstractProperties {
    /**
     * @param {Object|Array} source
     * @param {Object|Array} target
     * @param {boolean|true} ownPropertyOnly
     * @param {null|Function|Job|Object} Class
     */
    setProperties(source, target, ownPropertyOnly = true, Class = null) {
        if (Class && (source instanceof Array && target instanceof Array)) for (let v of source)
            target.push(new Class(v))
        else for (let key of Object.keys(source)) if (!ownPropertyOnly || target.hasOwnProperty(key)) target[key] = source[key];
        this.copyProperties(target)
    }

    formatDate = (d, lang = 'en') => {
        const v = new Date(d);
        return v.toLocaleDateString(lang) + ' ' + v.toLocaleTimeString(lang)
    }

    /**
     * @param {object} obj
     * @return {string[]}
     */
    getOwnPropertyOf = (obj) => {
        let properties = new Set()
        let currentObj = obj
        do {
            Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
        } while ((currentObj = Object.getPrototypeOf(currentObj)))
        const rv = [];
        for (let item of [...properties.keys()]) {
            try {
                if (item && typeof obj[item] === 'function' &&
                    !['constructor', 'hasOwnProperty', 'isPrototypeOf']
                        .includes(item) && !item.startsWith("__"))
                    rv.push(item)
            } catch (e) {
                // do nothing
            }
        }
        return rv;
    }

    /**
     * @param {any} source
     * @return {void}
     */
    copyProperties(source) {
        const ownProperties = this.getOwnPropertyOf(this)
        this.getOwnPropertyOf(source).filter(it => !ownProperties.includes(it)).map(it => {
            Object.defineProperty(this, it, {
                writable: false,
                value: function (...args) {
                    return source[it](...args);
                }
            })
        })
    }

    clear() {
        for (let v of ['getOwnPropertyOf', 'copyProperties', 'getOwnPropertyOf', 'formatDate']) delete this[v];
        return this;
    }
}

module.exports = AbstractProperties;