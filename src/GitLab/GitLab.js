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

class GitLab {
    static API = API;
    static Error = GitLabError;
    static Options = Options;
    static PaginateParams = PaginateParams;
    static Job = Job;
    static Jobs = Jobs;
    static JobVariablesAttributes = JobVariablesAttributes;
}

module.exports = GitLab;