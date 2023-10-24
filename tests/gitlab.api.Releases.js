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

    // https://docs.gitlab.com/ee/api/releases/
    gitLab.add('Releases').addMethods({
        releases: new Method({method: 'get', class: GitLab.Responses, url: () => `projects/${gitLab.projectId}/releases`})
    })
    console.log(gitLab.Releases.uri)

    const releases = await gitLab.Releases.releases(new GitLab.PaginateParams({page: 2, per_page: 20}));
    console.log(releases.list)

    describe('New dynamic Releases class', () => {
        it('Releases instanceof GitLab.API', () => {
            assert.strictEqual(releases instanceof GitLab.Responses, true);
        })
        it('Groups count', () => {
            assert.strictEqual(releases.list.length === 0, true);
        })
    })
})();