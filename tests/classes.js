/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */
const variables = require('./variables');
const GitLab = require("../src");
const {describe, it} = require("node:test");
const {strict: assert} = require("node:assert");
const AbstractProperties = require("../src/GitLab/AbstractProperties");
const Method = require("../src/GitLab/Method");

(async () => {

    const gitLab = new GitLab.API(new GitLab.Options({}));

    gitLab.add('groups').addMethods({
        groups: new Method({method: 'get', class: GitLab.Responses, url: () => `groups`})
    })
    console.log(gitLab.Groups.uri)

    gitLab.add('Releases').addMethods({
        releases: new Method({method: 'get', class: GitLab.Responses, url: () => `projects/${gitLab.projectId}/releases`})
    })
    console.log(gitLab.Releases.uri)

    const jobs = new GitLab.Jobs(variables.jobs)
    const job = jobs.find({name: "rspec:other"})
    console.log(job)

    describe('Jobs API class', () => {
        for(let k of Object.keys(gitLab.Jobs.uri)) {
            it('Jobs.uri ' + k, () => {
                assert.strictEqual(gitLab.Jobs.uri[k] instanceof Method, true);
            })
        }
        it('instanceof GitLab.Jobs', () => {
            assert.strictEqual(jobs instanceof GitLab.Jobs, true);
            assert.strictEqual(jobs instanceof GitLab.Responses, true);
        })
        it('instanceof AbstractProperties', () => {
            assert.strictEqual(jobs instanceof AbstractProperties, true);
        })
        it('count 2', () => {
            assert.strictEqual(jobs.list.length, 2);
        })
        it('Jobs has own properties from AbstractList and AbstractProperties', () => {
            const props = new Set(jobs.getOwnPropertyOf(new GitLab.AbstractList())
                .concat(jobs.getOwnPropertyOf(new AbstractProperties())))
            const jp = jobs.getOwnPropertyOf(jobs)
            assert.strictEqual(props.size, jp.length);
        })
        it('Jobs - find by name (filter) --> AbstractList.findOne(filter)', () => {
            assert.strictEqual(jobs.find({name: "rspec:other"}).id, 6);
        })
        it('Job instanceof GitLab.Response', () => {
            assert.strictEqual(jobs.find({name: "rspec:other"}) instanceof GitLab.Job, true);
        })
    })

    describe('Groups API class', () => {
        it('instanceof AbstractProperties', () => {
            assert.strictEqual(gitLab.Groups instanceof GitLab.AbstractProperties, true);
        })
        it('Groups.uri groups', () => {
            assert.strictEqual(gitLab.Groups.uri.groups instanceof Method, true);
        })
    });

    describe('Releases API class', () => {
        it('instanceof AbstractProperties', () => {
            assert.strictEqual(gitLab.Releases instanceof GitLab.AbstractProperties, true);
        })
        it('Releases.uri releases', () => {
            assert.strictEqual(gitLab.Releases.uri.releases instanceof Method, true);
        })
    });

    describe('Pipelines API class', () => {
        it('instanceof AbstractProperties', () => {
            assert.strictEqual(gitLab.Pipelines instanceof GitLab.AbstractProperties, true);
        })
        for(let k of Object.keys(gitLab.Pipelines.uri)) {
            it('Pipelines.uri ' + k, () => {
                assert.strictEqual(gitLab.Pipelines.uri[k] instanceof Method, true);
            })
        }
    });


})();
