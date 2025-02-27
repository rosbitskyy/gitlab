/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

class DynamicProperties {
}

/**
 * AbstractProperties is an extension of the DynamicProperties class,
 * providing additional utilities for managing and manipulating object properties.
 */
class AbstractProperties extends DynamicProperties {
    /**
     * Copies properties from a source object to a target object. Optionally restricts to own properties
     * or instantiates new objects of a specified class when working with arrays.
     *
     * @param {Object|Array} source The source object or array from which properties are copied.
     * @param {Object|Array} target The target object or array to which properties are copied.
     * @param {boolean} [ownPropertyOnly=true] If true, only properties that exist on the target object will be copied.
     * @param {Function|null} [Class=null] A constructor function to create new instances when copying elements from source to target arrays.
     * @return {void} This method does not return any value.
     */
    setProperties(source, target, ownPropertyOnly = true, Class = null) {
        if (Class && (source instanceof Array && target instanceof Array)) for (let v of source)
            target.push(new Class(v))
        else for (let key of Object.keys(source)) if (!ownPropertyOnly || target.hasOwnProperty(key)) target[key] = source[key];
        this.copyProperties(target)
    }

    /**
     * Formats a given date into a localized string representation.
     *
     * This function converts a given date to a string that includes
     * both the localized date and time based on the provided language.
     *
     * @param {Date|string|number} d - The date to be formatted. Can be a Date object,
     * a string representing a date, or a timestamp.
     * @param {string} [lang='en'] - Optional. The language code to localize the date
     * and time format. Defaults to 'en'.
     * @returns {string} The formatted date and time string localized to the specified language.
     */
    formatDate = (d, lang = 'en') => {
        const v = new Date(d);
        return v.toLocaleDateString(lang) + ' ' + v.toLocaleTimeString(lang)
    }

    /**
     * Retrieves an array of unique function names that are defined on the given object
     * or its prototype chain, excluding constructors, certain built-in methods, and
     * private methods (those starting with "__").
     *
     * @param {Object} obj - The object whose properties and inherited properties
     *                       are to be inspected.
     * @returns {string[]} An array of method names found on the object and its prototype chain.
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
     * Copies properties from the source object to the current object.
     * Non-overlapping properties from the source object are added as non-writable properties
     * to the current object, where each property is a method that delegates to the source object.
     *
     * @param {Object} source - The source object from which properties will be copied.
     * @return {void} Does not return a value.
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

    /**
     * Clears specific properties from the current object instance.
     *
     * The method iterates through an array of property names and deletes each property from the object.
     *
     * @return {Object} Returns the current object after the specified properties have been removed.
     */
    clear() {
        for (let v of ['getOwnPropertyOf', 'copyProperties', 'getOwnPropertyOf', 'formatDate']) delete this[v];
        return this;
    }
}

module.exports = AbstractProperties;