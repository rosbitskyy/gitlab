import Method = require("./src/GitLab/Method");
import GitLab = require("./src/GitLab/GitLab");
import Options = require("./src/GitLab/Options");
import APICore = require("./src/GitLab/APICore");
import MethodsObjects = require("./src/GitLab/MethodsObjects");
import APIRequest = require("./src/GitLab/APIRequest");
import {expectType} from 'tsd';

let options = new GitLab.Options({})
expectType<Options>(options)
expectType<object | Function>(options.fetchMethod)
let gitLab = new GitLab.API(options);
let MyGroups = gitLab.add('MyGroups');
expectType<APICore>(MyGroups);
expectType<APIRequest>(MyGroups.request);
expectType<any>(gitLab.MyGroups);
const method = new Method({method: 'get', class: GitLab.Responses, url: () => `groups`})
expectType<Method>(method);
expectType<string | object | object[]>(method.url());
MyGroups.addMethods({getGroups: method});
expectType<any>(gitLab.MyGroups.getGroups);
expectType<any>(gitLab.MyGroups.methods);
expectType<MethodsObjects>(MyGroups.methods);
expectType<Function | Object>(MyGroups.request.get);
