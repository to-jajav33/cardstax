'use strict';

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
        describe('log out', () => {
            it('should return success = 1', async function () {
                let requestInfo = {
                    uri: `http://localhost:${process.env.CARDSTAX_NODE_PORT_NUMBER}/api/session/logOut`,
                    method: 'DELETE',
                    json: true
                };

                let resp = await requestPromise(requestInfo);

                expect(resp.result).has.property('success', 1);
            });
        });
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
}

const testApi = new APITest();
testApi.start();
testApi.logIn();
testApi.logOut(sessionID);

// describe('api', () => {
//     // it('needs tests');
//     it('needs tests', function() {
//         expect(true).to.be.true;
//     });
// });

testApi.stop();
