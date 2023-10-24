/*
 * =========================================================
 *  🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 GitLab API 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦 🇺🇦
 * =========================================================
 * Copyright (c) 2023
 * @Author: Rosbitskyy Ruslan
 * @email: rosbitskyy@gmail.com
 * @license Licensed under the MIT License (MIT)
 */

const jobs = [
    {
        "commit": {
            "author_email": "admin@example.com",
            "author_name": "Administrator",
            "created_at": "2015-12-24T16:51:14.000+01:00",
            "id": "0ff3ae198f8601a285adcf5c0fff204ee6fba5fd",
            "message": "Test the CI integration.",
            "short_id": "0ff3ae19",
            "title": "Test the CI integration."
        },
        "coverage": null,
        "allow_failure": false,
        "created_at": "2015-12-24T15:51:21.802Z",
        "started_at": "2015-12-24T17:54:27.722Z",
        "finished_at": "2015-12-24T17:54:27.895Z",
        "erased_at": null,
        "duration": 0.173,
        "queued_duration": 0.010,
        "artifacts_file": {
            "filename": "artifacts.zip",
            "size": 1000
        },
        "artifacts": [
            {"file_type": "archive", "size": 1000, "filename": "artifacts.zip", "file_format": "zip"},
            {"file_type": "metadata", "size": 186, "filename": "metadata.gz", "file_format": "gzip"},
            {"file_type": "trace", "size": 1500, "filename": "job.log", "file_format": "raw"},
            {"file_type": "junit", "size": 750, "filename": "junit.xml.gz", "file_format": "gzip"}
        ],
        "artifacts_expire_at": "2016-01-23T17:54:27.895Z",
        "tag_list": [
            "docker runner", "ubuntu18"
        ],
        "id": 7,
        "name": "teaspoon",
        "pipeline": {
            "id": 6,
            "project_id": 1,
            "ref": "main",
            "sha": "0ff3ae198f8601a285adcf5c0fff204ee6fba5fd",
            "status": "pending"
        },
        "ref": "main",
        "runner": null,
        "stage": "test",
        "status": "failed",
        "failure_reason": "script_failure",
        "tag": false,
        "web_url": "https://example.com/foo/bar/-/jobs/7",
        "project": {
            "ci_job_token_scope_enabled": false
        },
        "user": {
            "id": 1,
            "name": "Administrator",
            "username": "root",
            "state": "active",
            "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=80&d=identicon",
            "web_url": "http://gitlab.dev/root",
            "created_at": "2015-12-21T13:14:24.077Z",
            "bio": null,
            "location": null,
            "public_email": "",
            "skype": "",
            "linkedin": "",
            "twitter": "",
            "website_url": "",
            "organization": ""
        }
    },
    {
        "commit": {
            "author_email": "admin@example.com",
            "author_name": "Administrator",
            "created_at": "2015-12-24T16:51:14.000+01:00",
            "id": "0ff3ae198f8601a285adcf5c0fff204ee6fba5fd",
            "message": "Test the CI integration.",
            "short_id": "0ff3ae19",
            "title": "Test the CI integration."
        },
        "coverage": null,
        "allow_failure": false,
        "created_at": "2015-12-24T15:51:21.727Z",
        "started_at": "2015-12-24T17:54:24.729Z",
        "finished_at": "2015-12-24T17:54:24.921Z",
        "erased_at": null,
        "duration": 0.192,
        "queued_duration": 0.023,
        "artifacts_expire_at": "2016-01-23T17:54:24.921Z",
        "tag_list": [
            "docker runner", "win10-2004"
        ],
        "id": 6,
        "name": "rspec:other",
        "pipeline": {
            "id": 6,
            "project_id": 1,
            "ref": "main",
            "sha": "0ff3ae198f8601a285adcf5c0fff204ee6fba5fd",
            "status": "pending"
        },
        "ref": "main",
        "artifacts": [],
        "runner": null,
        "stage": "test",
        "status": "failed",
        "failure_reason": "stuck_or_timeout_failure",
        "tag": false,
        "web_url": "https://example.com/foo/bar/-/jobs/6",
        "project": {
            "ci_job_token_scope_enabled": false
        },
        "user": {
            "id": 1,
            "name": "Administrator",
            "username": "root",
            "state": "active",
            "avatar_url": "http://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=80&d=identicon",
            "web_url": "http://gitlab.dev/root",
            "created_at": "2015-12-21T13:14:24.077Z",
            "bio": null,
            "location": null,
            "public_email": "",
            "skype": "",
            "linkedin": "",
            "twitter": "",
            "website_url": "",
            "organization": ""
        }
    }
];
const job = jobs[0];
const pipelines = [
    {
        "id": 47,
        "iid": 12,
        "project_id": 1,
        "status": "pending",
        "source": "push",
        "ref": "new-pipeline",
        "sha": "a91957a858320c0e17f3a0eca7cfacbff50ea29a",
        "name": "Build pipeline",
        "web_url": "https://example.com/foo/bar/pipelines/47",
        "created_at": "2016-08-11T11:28:34.085Z",
        "updated_at": "2016-08-11T11:32:35.169Z"
    },
    {
        "id": 48,
        "iid": 13,
        "project_id": 1,
        "status": "pending",
        "source": "web",
        "ref": "new-pipeline",
        "sha": "eb94b618fb5865b26e80fdd8ae531b7a63ad851a",
        "name": "Build pipeline",
        "web_url": "https://example.com/foo/bar/pipelines/48",
        "created_at": "2016-08-12T10:06:04.561Z",
        "updated_at": "2016-08-12T10:09:56.223Z"
    }
];
const pipeline = pipelines[0];
module.exports = {
    job, jobs,
    pipelines, pipeline
}