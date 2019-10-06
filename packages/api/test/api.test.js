'use strict';

/**
 * Environment variables for testing (.env)
 * 
 * CARDSTAX_NODE_PORT_NUMBER
 *      e.g. 3000
 * 
 * GAME_CRAFTER_API_KEY_PUB
 * GAME_CRAFTER_API_KEY_PRIV
 * GAME_CRAFTER_LOG_IN_USERNAME
 * GAME_CRAFTER_LOG_IN_PASSWORD
 * 
 * FIGMA_ACCESS_TOKEN
 *      Login to your Figma account.
 *      Head to the Account Settings from the top-left menu inside Figma.
 *      Find the Personal Access Tokens section.
 *      Click Create new token.
 * 
 * FIGMA_TEST_FILE_KEY
 *      The file key can be parsed from any Figma file url: https://www.figma.com/file/:key/:title
 * 
 * FIGMA_TEST_TEAM_ID
 *      To obtain a team id, navigate to a team page of a team you are a part of.
 *      The team id will be present in the URL after the word team and before your team name.
 * 
 */

const requestPromise = require('request-promise');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

var expect = require('chai').expect;
var promiseFinally = require('promise.prototype.finally');
promiseFinally.shim();

const api = require('../dist/api').api;
const apiInstance = new api();
let sessionID;

class APITest {
    constructor () {
        this.__prefixURIAPI = `http://localhost:${process.env.CARDSTAX_NODE_PORT_NUMBER}/api`;
    }

    start () {
        return describe('Starting API', function () {
            it('should start', function (paramDone) {
                let didStart = false;
                apiInstance.start()
                    .then(() => {
                        didStart = true;
                        expect(didStart).to.be.true;
                        paramDone();
                    })
                    .catch((...args) => {
                        console.error(...args);
                        didStart = false;
                        expect(didStart).to.be.true;
                        paramDone();
                    })
            });
        });
    }

    stop () {
        return describe('Stopping API', function () {
            it('should stop', function (paramDone) {
                let didStop = false;
                apiInstance.stop()
                    .then(() => {
                        didStop = true;
                        expect(didStop).to.be.true;
                        paramDone();
                    })
                    .catch(() => {
                        didStop = false;
                        expect(didStop).to.be.true;
                        paramDone();
                    })
            });
        });
    }

    logIn () {
        let uri = `${this.__prefixURIAPI}/session/logIn`;
        describe('log in', () => {
            it('should return user profile', async function () {
                let requestInfo = {
                    uri,
                    method: 'POST',
                    body: {
                        username: process.env.GAME_CRAFTER_LOG_IN_USERNAME,
                        password: process.env.GAME_CRAFTER_LOG_IN_PASSWORD
                    },
                    json: true
                };

                let resp = await requestPromise(requestInfo);

                expect(resp.result).has.property('id');
                sessionID = resp.result.id;
                expect(resp.result).has.property('object_type', 'session');
                expect(resp.result).has.property('object_name', 'Session');
                expect(resp.result).has.property('user_id');
            });
        });
    }

    logOut () {
        let uri = `${this.__prefixURIAPI}/session/logOut`
        describe('log out', () => {
            it('should return success = 1', async function () {
                let requestInfo = {
                    uri,
                    method: 'DELETE',
                    json: true
                };

                let resp = await requestPromise(requestInfo);

                expect(resp.result).has.property('success', 1);
            });
        });
    }

    me () {
        let uri = `${this.__prefixURIAPI}/figma/me`
        describe('figma/me', () => {
            it('should return handle', async function() {
                let requestInfo = {
                    uri,
                    method: 'GET',
                    json: true
                };

                let resp = await requestPromise(requestInfo);

                expect(resp).has.property('handle');
            });
        });
    }

    file () {
        let uri = `${this.__prefixURIAPI}/figma/file`
        describe('figma/file', () => {
            it('should return file document', async function() {
                let requestInfo = {
                    uri,
                    method: 'GET',
                    qs: { key: process.env.FIGMA_TEST_FILE_KEY },
                    json: true
                };

                let resp = await requestPromise(requestInfo);
                
                expect(resp).has.property('document');
            });
        });
    }

    fileNodes () {
        let uri = `${this.__prefixURIAPI}/figma/fileNodes`
        describe('figma/fileNodes', () => {
            it('should return file nodes', async function() {
                let requestInfo = {
                    uri,
                    method: 'GET',
                    qs: { key: process.env.FIGMA_TEST_FILE_KEY, ids: '0:0' },
                    json: true
                };

                let resp = await requestPromise(requestInfo);
                
                expect(resp).has.property('nodes');
            });
        });
    }

    images () {
        let uri = `${this.__prefixURIAPI}/figma/images`
        describe('figma/images', () => {
            it('should return image', async function() {
                let requestInfo = {
                    uri,
                    method: 'GET',
                    qs: { key: process.env.FIGMA_TEST_FILE_KEY, ids: '0:0', format: 'png' },
                    json: true
                };

                let resp = await requestPromise(requestInfo);
                
                expect(resp).has.property('images');
            });
        });
    }

    imageFills () {
        let uri = `${this.__prefixURIAPI}/figma/imageFills`
        describe('figma/imageFills', () => {
            it('should return image fills', async function() {
                let requestInfo = {
                    uri,
                    method: 'GET',
                    qs: { key: process.env.FIGMA_TEST_FILE_KEY },
                    json: true
                };

                let resp = await requestPromise(requestInfo);
                
                expect(resp).has.property('meta');
            });
        });
    }

    comments () {
        let uri = `${this.__prefixURIAPI}/figma/comments`
        describe('figma/comments', () => {
            it('should return comments', async function() {
                let requestInfo = {
                    uri,
                    method: 'GET',
                    qs: { key: process.env.FIGMA_TEST_FILE_KEY },
                    json: true
                };

                let resp = await requestPromise(requestInfo);

                expect(resp).has.property('comments');
            });
        });
    }

    versions () {
        let uri = `${this.__prefixURIAPI}/figma/versions`
        describe('figma/versions', () => {
            it('should return versions', async function() {
                let requestInfo = {
                    uri,
                    method: 'GET',
                    qs: { key: process.env.FIGMA_TEST_FILE_KEY },
                    json: true
                };

                let resp = await requestPromise(requestInfo);

                expect(resp).has.property('versions');
            });
        });
    }

    projects () {
        let uri = `${this.__prefixURIAPI}/figma/projects`
        describe('figma/projects', () => {
            it('should return projects', async function() {
                let requestInfo = {
                    uri,
                    method: 'GET',
                    qs: { team_id: process.env.FIGMA_TEST_TEAM_ID },
                    json: true
                };

                let resp = await requestPromise(requestInfo);

                expect(resp).has.property('projects');
            });
        });
    }

    projectFiles () {
        let uri1 = `${this.__prefixURIAPI}/figma/projects`
        let uri2 = `${this.__prefixURIAPI}/figma/projectFiles`
        describe('figma/projectFiles', () => {
            it('should return project files', async function() {
                let requestInfo = {
                    uri: uri1,
                    method: 'GET',
                    qs: { team_id: process.env.FIGMA_TEST_TEAM_ID },
                    json: true
                };
                let projectResp = await requestPromise(requestInfo);

                requestInfo = {
                    uri: uri2,
                    method: 'GET',
                    qs: { project_id: projectResp.projects[0].id },
                    json: true
                };

                let resp = await requestPromise(requestInfo);

                expect(resp).has.property('files');
            });
        });
    }

    components () {
        let uri = `${this.__prefixURIAPI}/figma/components`
        describe('figma/components', () => {
            it('should return components', async function() {
                let requestInfo = {
                    uri,
                    method: 'GET',
                    qs: { team_id: process.env.FIGMA_TEST_TEAM_ID },
                    json: true
                };

                let resp = await requestPromise(requestInfo);

                expect(resp).has.property('meta');
            });
        });
    }

    styles () {
        let uri = `${this.__prefixURIAPI}/figma/styles`
        describe('figma/styles', () => {
            it('should return styles', async function() {
                let requestInfo = {
                    uri,
                    method: 'GET',
                    qs: { team_id: process.env.FIGMA_TEST_TEAM_ID },
                    json: true
                };

                let resp = await requestPromise(requestInfo);

                expect(resp).has.property('meta');
            });
        });
    }
}

const testApi = new APITest();
testApi.start();

// Game Crafter
testApi.logIn();
testApi.logOut(sessionID);

// Figma
testApi.me();
testApi.file();
testApi.fileNodes();
testApi.images();
testApi.imageFills();
testApi.comments();
testApi.versions();
testApi.projects();
testApi.projectFiles();
testApi.components();
testApi.styles();

// describe('api', () => {
//     // it('needs tests');
//     it('needs tests', function() {
//         expect(true).to.be.true;
//     });
// });

testApi.stop();
