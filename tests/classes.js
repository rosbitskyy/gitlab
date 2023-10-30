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
const {describe, it} = require("node:test");
const {strict: assert} = require("node:assert");
const AbstractProperties = require("../src/GitLab/AbstractProperties");
const Response = require("../src/GitLab/Response");
const Responses = require("../src/GitLab/Responses");
const Method = require("../src/GitLab/Method");
const DynamicResponse = require("../src/GitLab/DynamicResponse");
const GitLab = require("../src/");
const HttpResponse = require("../src/GitLab/HttpResponse");
const JobVariablesAttributes = require("../src/GitLab/JobVariablesAttributes");

(async () => {

    const ap = new AbstractProperties()
    await describe('AbstractProperties class', () => {
        it('properties list len', () => assert.equal(ap.getOwnPropertyOf(ap).length > 8, true))
        it('string result of formatDate', () => assert.equal(typeof ap.formatDate(new Date()), 'string'))
        it('Array result of getOwnPropertyOf', () => assert.equal(ap.getOwnPropertyOf(ap) instanceof Array, true))
    })

    const resp = new Response({test: 'true', date: new Date()})
    await describe('Serializer class', () => {
        const seril = GitLab.Serializer.serialize(resp)
        it('Serialized typeof string', () => assert.strictEqual(typeof seril, 'string'))
        const deser = GitLab.Serializer.deserialize(seril, Response, false)
        it('deserialized instanceof Response', () => assert.strictEqual(deser instanceof Response, true))
        it('deserialized prop test is boolean', () => assert.strictEqual(deser.test, true))
        it('deserialized prop date is Date', () => assert.strictEqual(deser.date instanceof Date, true))
    })

    const jobVariablesAttributes = new JobVariablesAttributes();
    jobVariablesAttributes.add('a', 'b');
    jobVariablesAttributes.push('b', 's')
    await describe('JobVariablesAttributes class', () => {
        it('JobVariablesAttributes', () => assert.equal(typeof jobVariablesAttributes.toString(), 'string'))
    })

    const opts = {method: 'post', headers: {'Content-Type': 'application/json'}}
    const response = await GitLab.Request('https://maps.googleapis.com/maps/api/geocode/json?address=google', opts);
    const json = await response.json()
    console.log(json)
    await describe('GitLab.Request - Node.js 16.x - Replacement of the missing node 16 fetch', () => {
        it('HttpResponse', () => assert.equal(response instanceof HttpResponse, true))
        it('response has json function', () => assert.equal(!!response.json, true))
        it('test Google api key response', () => assert.equal(json.status, 'REQUEST_DENIED'))
        const res = HttpResponse.response({data: 'a'}, {status: 500, rawHeaders: ['a', 'b']})
        it('HttpResponse status 500', () => assert.equal(res.status === 500, true))
        it('HttpResponse is bad', () => assert.equal(HttpResponse.isGood(res), false))
    })

    const gitLab = new GitLab.API(new GitLab.Options({fetchMethod: GitLab.Request}));

    const glerror = new GitLab.Error(gitLab, 'test')
    await describe('GitLabError class', () => {
        it('stack is null', () => assert.strictEqual(glerror.stack, null))
        it('info is string', () => assert.strictEqual(typeof glerror.info, 'object'))
    })

    const names = ['groups', 'Releases'];
    await describe('Dynamic response classes', () => {
        for (let v of names) {
            v = GitLab.DynamicResponse.getSingletonName(v)
            const _classes = DynamicResponse.class(v)
            const singleton = new _classes[DynamicResponse.getSingletonName(v)]({})
            const list = new _classes[DynamicResponse.getSingletonName(v) + 's']([], {})
            it(v + ' has AbstractProperties formatDate', () => assert.strictEqual(!!singleton.formatDate, true))
            it(v + ' has AbstractProperties getOwnPropertyOf', () => assert.strictEqual(!!singleton.formatDate, true))
            it(v + 's has AbstractProperties formatDate', () => assert.strictEqual(!!list.formatDate, true))
            it(v + 's has AbstractProperties getOwnPropertyOf', () => assert.strictEqual(!!list.formatDate, true))
            it(v + ' single response Class', () => assert.strictEqual(_classes[DynamicResponse.getSingletonName(v)].name, DynamicResponse.getSingletonName(v)))
            it(v + ' instanceof GitLab.Response', () => assert.strictEqual(singleton instanceof Response, true))
            it(v + 's list responses Class', () => assert.strictEqual(_classes[DynamicResponse.getSingletonName(v) + 's'].name, DynamicResponse.getSingletonName(v) + 's'))
            it(v + 's instanceof GitLab.Responses', () => assert.strictEqual(list instanceof Responses, true))
        }
    })


    const GroupClasses = DynamicResponse.class('groups')
    gitLab.add('groups').addMethods({
        groups: new Method({method: 'get', class: GroupClasses.Groups, url: () => `groups`})
    })
    const ReleaseClasses = DynamicResponse.class('Releases')
    gitLab.add('Releases').addMethods({
        releases: new Method({
            method: 'get',
            class: ReleaseClasses.Releases,
            url: () => `projects/${gitLab.projectId}/releases`
        })
    })


    for (let a of gitLab.getOwnPropertyNames()) {
        await describe(a + ' API class', () => {
            it('instanceof AbstractProperties', () => assert.strictEqual(gitLab[a] instanceof AbstractProperties, true))
            for (let k of Object.keys(gitLab[a].methods)) {
                it(a + '.' + k, () => assert.strictEqual(gitLab[a].methods[k] instanceof Method, true))
            }
        })
    }

    const jobs = new GitLab.Jobs(variables.jobs)
    const pipelines = new GitLab.Responses(variables.pipelines)


    await describe('Jobs API class', () => {
        it('count 2', () => {
            assert.strictEqual(jobs.list.length, 2);
        })
        it('Jobs has own properties from AbstractList and AbstractProperties', () => {
            const props = new Set(jobs.getOwnPropertyOf(new GitLab.AbstractList())
                .concat(jobs.getOwnPropertyOf(new AbstractProperties())))
            const jp = jobs.getOwnPropertyOf(jobs)
            assert.strictEqual(props.size, jp.length);
        })
        it('Jobs - find and findOne', () => {
            assert.strictEqual(jobs.find({name: "teaspoon"}).id, jobs.findOne({name: "teaspoon"}).id);
        })
        it('Pipelines - find by source', () => {
            assert.strictEqual(pipelines.find({source: variables.pipeline.source}).project_id, variables.pipeline.project_id);
        })
    })


})();
