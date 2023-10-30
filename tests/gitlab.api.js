/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */
const GitLab = require("../src/");
const {describe, it} = require("node:test");
const {strict: assert} = require("node:assert");
const Method = require("../src/GitLab/Method");
require('dotenv').config();

(async () => {

    const [major, minor, patch] = process.versions.node.split('.').map(Number)
    console.log('node', major, minor, patch);

    let gitLab = new GitLab.API(new GitLab.Options({
        privateToken: process.env.GIT_TOKEN,
        projectId: process.env.GIT_PID,
        fetchMethod: GitLab.Request // axios, fetch, node-fetch, etc...
    }));


    const releases = await gitLab.Releases.releases(new GitLab.PaginateParams({page: 1, per_page: 20}));
    console.log(releases.list)
    await describe('New dynamic Releases class', () => {
        it('Releases instanceof GitLab.Responses', () => {
            assert.strictEqual(releases instanceof GitLab.Responses, true);
        })
        it('Groups count', () => {
            assert.strictEqual(releases.list.length > 0, true);
        })
    })

    gitLab.add('groups').addMethods({
        groups: new Method({method: 'get', class: GitLab.Responses, url: () => `groups`})
    })
    console.log(gitLab.Groups.methods)
    const groups = await gitLab.Groups.groups(new GitLab.PaginateParams({page: 1, per_page: 20}));
    await describe('New dynamic Groups class', () => {
        it('Groups instanceof GitLab.Responses', () => {
            assert.strictEqual(groups instanceof GitLab.Responses, true);
        })
        it('Groups count', () => {
            assert.strictEqual(groups.list.length === 0, true);
        })
    })

    console.log(gitLab.Pipelines.methods)
    const pipelines = await gitLab.Pipelines.pipelines(new GitLab.PaginateParams({
        page: 1, per_page: 20, status: 'success', source: 'push',
    }));
    await describe('New dynamic Pipelines class', () => {
        it('Pipelines instanceof GitLab.Responses', () => {
            assert.strictEqual(pipelines instanceof GitLab.Responses, true);
        })
        it('Pipelines count 20', () => {
            assert.strictEqual(pipelines.list.length, 20);
        })
    });

    const pipelinelatest = await gitLab.Pipelines.latest();
    await describe('New dynamic Pipelines class', () => {
        it('Pipeline instanceof GitLab.Response', () => {
            assert.strictEqual(pipelinelatest instanceof GitLab.Response, true);
        })
    })

    gitLab = new GitLab.API(new GitLab.Options({
        privateToken: 'test',
        projectId: process.env.GIT_PID,
        fetchMethod: GitLab.Request
    }));
    const apimethods = gitLab.getOwnPropertyNames();
    for (let am of apimethods) {
        const coremethods = gitLab[am].methods;
        for (let m of Object.keys(coremethods)) {
            await describe('Statement ' + am + ' of API', () => {
                it(am + 'core method ' + m, () => {
                    assert.strictEqual(gitLab[am][m] instanceof Object, true);
                })
            })
        }
    }


})();