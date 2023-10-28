const AbstractProperties = require("./AbstractProperties");
const Serializer = require("./Serializer");

class Response extends AbstractProperties {
    constructor(props = {}) {
        super()
        this.setProperties(Serializer.normalize(props), this, false);
    }
}

module.exports = Response