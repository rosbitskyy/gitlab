/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */
const GitLab = require("../");
const {describe, it} = require("node:test");
const {strict: assert} = require("node:assert");
const Method = require("../src/GitLab/Method");

(async () => {

    const gitLab = new GitLab.API(new GitLab.Options({
        privateToken: process.env.GIT_TOKEN,
        projectId: process.env.GIT_PID,
    }));
    console.log(gitLab.Jobs.uri)

    const groups = gitLab.add('groups');
    groups.addMethods({
        groups: new Method({method: 'get', class: Object, url: () => `groups`})
    })
    const groupsList = await gitLab.Groups.groups(new GitLab.PaginateParams({page: 2, per_page: 20}));

    describe('New Jobs class', () => {
        it('Jobs instanceof GitLab.Jobs', () => {
            assert.strictEqual(jobs instanceof GitLab.Jobs, true);
        })
        it('Jobs count', () => {
            assert.strictEqual(jobs.list.length > 1, true);
        })
        it('Jobs status is `success`', () => {
            assert.strictEqual(jobs.find({status: 'success'}).status, 'success');
        })
    })
})();