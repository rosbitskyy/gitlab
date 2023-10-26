const Responses = require("./Responses");
const Response = require("./Response");

class DynamicResponse {
    static class(className) {
        const Classes = ({className}) => this.pipeline(
            this.withClasses({className}),
            this.withConstructor(Classes)
        )({});
        return Classes({className});
    }
    static getSingletonName = (v) => {
        v = v.capitalize();
        if (v.endsWith('s')) v = v.substring(0, v.length - 1);
        return v;
    }
    static withClasses = ({className}) => obj => {
        let singleton = this.getSingletonName(className.capitalize());
        const list = singleton + 's';
        obj = {
            ...obj,
            /**
             * @return {Class}
             */
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
     * pipeline
     * @param {function} methods
     * @returns {function(*): *}
     */
    static pipeline = (...methods) => (defaults = {}) => methods.reduce((props, method) => method(props), defaults);

    /**
     * Build a withConstructor mixin to add the .constructor property to all object instances.
     * @param constructor
     * @returns {function(*): *&{__proto__: {constructor: *}}}
     */
    static withConstructor = constructor => o => ({
        __proto__: {
            constructor
        },
        ...o
    });
}

module.exports = DynamicResponse;