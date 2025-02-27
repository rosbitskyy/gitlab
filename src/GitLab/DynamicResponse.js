/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

require('./Prototypes');

const Responses = require("./Responses");
const Response = require("./Response");

/**
 * DynamicResponse class provides utility methods for dynamically creating
 * and manipulating class configurations and managing dynamic class generation.
 */
class DynamicResponse {
    /**
     * Defines a static method to create and manipulate a class configuration object.
     *
     * @param {string} className - The name of the class to be processed.
     * @return {Object} Returns a class configuration object processed through the pipeline.
     */
    static class(className) {
        const Classes = ({className}) => this.pipeline(
            this.withClasses({className}),
            this.withConstructor(Classes)
        )({});
        return Classes({className});
    }

    /**
     * Transforms a given string into its singular, capitalized form.
     *
     * The function capitalizes the input string and removes the trailing 's'
     * if it exists, in order to convert plural forms to their singular counterparts.
     *
     * @param {string} v - The input string to be transformed.
     * @returns {string} - The capitalized and singular form of the input string.
     */
    static getSingletonName = (v) => {
        v = v.capitalize();
        if (v.endsWith('s')) v = v.substring(0, v.length - 1);
        return v;
    }
    /**
     * Enhances the given object by adding singleton and list class properties based on the specified class name.
     *
     * @function withClasses
     * @param {Object} params - An object containing the className parameter.
     * @param {string} params.className - The base class name used to generate the singleton and list class names.
     * @returns {Function} A function that takes an object and modifies it by adding dynamically generated properties.
     */
    static withClasses = ({className}) => obj => {
        let singleton = this.getSingletonName(className.capitalize());
        const list = singleton + 's';
        obj = {
            ...obj,
            get [singleton]() {
                return {
                    [singleton]: class extends Response {
                        constructor(v) {
                            super(v);
                        }
                    }
                }[singleton]
            },
        };
        obj = {
            ...obj,
            get [list]() {
                return {
                    [list]: class extends Responses {
                        constructor(v) {
                            super(v, obj[singleton]);
                        }
                    }
                }[list]
            },
        };
        return obj;
    };

    /**
     * Creates a pipeline function that composes an array of methods to be executed sequentially.
     *
     * @function pipeline
     * @param {...Function} methods - A series of functions that will process the input object sequentially.
     * @returns {Function} - A higher-order function that accepts a defaults object and applies the methods in the pipeline to it.
     *
     * The returned function takes an initial object (`defaults`) and passes it through the provided `methods` array in sequence.
     * Each method receives the output of the previous one as input.
     */
    static pipeline = (...methods) => (defaults = {}) => methods.reduce((props, method) => method(props), defaults);

    /**
     * A higher-order function that takes a constructor function and returns a function
     * which adds the specified constructor to an object's prototype chain.
     * The resulting object combines the provided object's properties with the prototype containing the constructor.
     *
     * @param {Function} constructor - The constructor function to be added to the object's prototype.
     * @returns {Function} - A function that takes an object and returns a new object with the constructor in its prototype chain.
     */
    static withConstructor = constructor => o => ({
        __proto__: {
            constructor
        },
        ...o
    });
}

module.exports = DynamicResponse;