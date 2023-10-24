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

    const jobs = new GitLab.Jobs(variables.jobs)
    const job = jobs.find({name: "rspec:other"})
    console.log(job)

    describe('Jobs API class', () => {
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
            assert.strictEqual(jobs.find({name: "rspec:other"}) instanceof GitLab.Response, true);
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


})();
