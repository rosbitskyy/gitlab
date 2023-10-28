const AbstractProperties = require("./AbstractProperties");
const Serializer = require("./Serializer");

class Response extends AbstractProperties {
    constructor(props = {}) {
        super()
        this.setProperties(Serializer.normalize(props), this, false);
        this.clear()
    }
}

module.exports = Response