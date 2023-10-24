const AbstractProperties = require("./AbstractProperties");
const AbstractList = require("./AbstractList");
const Response = require("./Response");

class Responses extends AbstractProperties {
    /**
     * @type {[AbstractList]}
     */
    #list = new AbstractList()

    /**
     * @param {[]|AbstractList|Jobs} list
     */
    constructor(list) {
        super();
        this.setProperties(new AbstractList(list), this.#list, false, Response)
    }

    /**
     * @param {object} filter
     * @return {Response}
     */
    find(filter) {
        return this.#list.findOne(filter)
    }

    get list() {
        return this.#list
    }
}

module.exports = Responses