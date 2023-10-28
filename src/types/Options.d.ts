import {AbstractProperties} from "./AbstractProperties";

export interface Options extends AbstractProperties {
    apiUrl: String;
    maxRetries: Number;
    privateToken: String;
    projectId: String | Number;
    // default for node 18.x internal 'node:fetch' or src/GitLab/Request.js
    fetchMethod: Function | Object; // <= global['fetch'];
    constructor(options: Object): Options;

    get header(): Object
}