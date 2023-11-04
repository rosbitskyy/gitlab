import Method = require("./src/GitLab/Method");
import GitLab = require("./src/GitLab/GitLab");
import Options = require("./src/GitLab/Options");
import APICore = require("./src/GitLab/APICore");
import MethodsObjects = require("./src/GitLab/MethodsObjects");
import APIRequest = require("./src/GitLab/APIRequest");
import {expectAssignable, expectNotType, expectType} from 'tsd';

let options = new GitLab.Options({})
expectType<Options>(options)
expectType<object | Function>(options.fetchMethod)
let gitLab = new GitLab.API(options);
expectAssignable<APICore>(gitLab['MyGroups'])
let MyGroups = gitLab.add('MyGroups');
expectType<APICore>(MyGroups);
expectType<APIRequest>(MyGroups.request);
expectType<any>(gitLab.MyGroups);
const method = new Method({method: 'get', class: GitLab.Responses, url: () => `groups`})
expectType<Method>(method);
expectType<string>(method.url());
MyGroups.addMethods({getGroups: method});
expectType<any>(gitLab.MyGroups.getGroups);
expectNotType<MethodsObjects>(gitLab.MyGroups.methods);
expectType<MethodsObjects>(MyGroups.methods);
for (let v of MyGroups.request.methods) expectType<Function | Object>(MyGroups.request[v]);
expectType<boolean>(MyGroups.request.withBody('get'));