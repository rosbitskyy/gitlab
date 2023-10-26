/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

const GitLabError = require("./GitLabError");
const Options = require("./Options");
const PaginateParams = require("./PaginateParams");
const Job = require("./Job");
const Jobs = require("./Jobs");
const API = require("./API");
const JobVariablesAttributes = require("./JobVariablesAttributes");
const Serializer = require("./Serializer");
const AbstractList = require("./AbstractList");
const AbstractKeyValue = require("./AbstractKeyValue");
const AbstractProperties = require("./AbstractProperties");
const Response = require("./Response");
const Responses = require("./Responses");
const Method = require("./Method");
const DynamicResponse = require("./DynamicResponse");
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

class GitLab {
    static API = API;
    static AbstractList = AbstractList;
    static AbstractKeyValue = AbstractKeyValue;
    static AbstractProperties = AbstractProperties;
    static DynamicResponse = DynamicResponse;
    static Error = GitLabError;
    static Job = Job;
    static Jobs = Jobs;
    static JobVariablesAttributes = JobVariablesAttributes;
    static Method = Method;
    static Options = Options;
    static PaginateParams = PaginateParams;
    static Responses = Responses;
    static Response = Response;
    static Serializer = Serializer;
}

module.exports = GitLab;