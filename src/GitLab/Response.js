const AbstractProperties = require("./AbstractProperties");
const Serializer = require("./Serializer");

/**
 * The Response class extends AbstractProperties and provides a mechanism
 * for initializing and managing structured data properties. It integrates
 * with a Serializer to normalize the input data and establish object properties.
 *
 * The class is primarily used to encapsulate and manage data properties
 * in a structured and consistent manner.
 *
 * @extends AbstractProperties
 * @class
 *
 * @param {Object} props - An optional parameter representing an object
 * containing properties to initialize. These properties are normalized
 * through the Serializer before being assigned.
 *
 * @throws {TypeError} If the input properties are not in the expected format
 * post normalization.
 */
class Response extends AbstractProperties {
    constructor(props = {}) {
        super()
        this.setProperties(Serializer.normalize(props), this, false);
    }
}

module.exports = Response