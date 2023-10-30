/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */
const GitLab = require("../index");
const {describe, it} = require("node:test");
const {strict: assert} = require("node:assert");
const Method = require("../src/GitLab/Method");

(async () => {

    const gitLab = new GitLab.API(new GitLab.Options({
        privateToken: process.env.GIT_TOKEN,
        projectId: process.env.GIT_PID,
    }));

    gitLab.add('groups').addMethods({
        groups: new Method({method: 'get', class: GitLab.Responses, url: () => `groups`})
    })
    console.log(gitLab.Groups.uri)

    const groups = await gitLab.Groups.groups(new GitLab.PaginateParams({page: 2, per_page: 20}));

    describe('New dynamic Groups class', () => {
        it('Groups instanceof GitLab.API', () => {
            assert.strictEqual(groups instanceof GitLab.Responses, true);
        })
        it('Groups count', () => {
            assert.strictEqual(groups.list.length === 0, true);
        })
    })
})();