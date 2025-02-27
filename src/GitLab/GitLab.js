/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2019-2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

require('./Prototypes'); // 2025-02-27 - https://github.com/rosbitskyy/gitlab/issues/1#issue-2010858427

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
const Request = require("./Request");
const Response = require("./Response");
const Responses = require("./Responses");
const Method = require("./Method");
const DynamicResponse = require("./DynamicResponse");

/**
 * The GitLab class acts as a central hub for importing and organizing
 * various GitLab-related modules and utilities. It provides static references
 * to the following components which are essential for interacting with GitLab's
 * API, managing response/requests, and handling data structures.
 *
 * Static Properties:
 * - API: Handles GitLab API interactions and provides methods to interface with GitLab services.
 * - AbstractList: Represents base functionality for handling collections or lists.
 * - AbstractKeyValue: A utility structure for managing key-value pairs.
 * - AbstractProperties: Base class for handling entity properties consistently.
 * - DynamicResponse: Represents dynamic or customizable responses from GitLab.
 * - Error: Represents and handles errors specific to GitLab operations.
 * - Job: Encapsulates functionality and information related to a single job within GitLab.
 * - Jobs: Manages collections of jobs and their interactions with the GitLab API.
 * - JobVariablesAttributes: Handles job-specific variable attributes within GitLab CI/CD pipelines.
 * - Method: Enum or structure for HTTP method constants used in API requests.
 * - Options: Encapsulates configurable options for GitLab API interactions.
 * - PaginateParams: Utility for handling pagination parameters in API responses.
 * - Request: Represents and manages API requests sent to GitLab.
 * - Responses: Represents structured responses returned from GitLab's API.
 * - Response: Handles single API response information such as status codes and data.
 * - Serializer: Utility for handling serialization and deserialization of data regarding GitLab operations.
 *
 * This class consolidates the primary tools required for developing applications
 * or utilities that integrate with the GitLab API, offering developers concise
 * and organized access to key components.
 */
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
    static Request = Request;
    static Responses = Responses;
    static Response = Response;
    static Serializer = Serializer;
}

module.exports = GitLab;