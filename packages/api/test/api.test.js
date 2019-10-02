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

class APITest {
    constructor () {
		let PORT_NUMBER;
		if (!isNaN(parseInt(process.argv[2]))) {
			PORT_NUMBER = parseInt(process.argv[2]);
		} else if (!isNaN(parseInt(process.env.CARDSTAX_NODE_PORT_NUMBER))) {
			PORT_NUMBER = parseInt(process.env.CARDSTAX_NODE_PORT_NUMBER);
		} else {
			PORT_NUMBER = 3000;
		}
        this.__prefixURIAPI = `http://localhost:${PORT_NUMBER}/api`;
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
                expect(resp.result).has.property('object_type', 'session');
                expect(resp.result).has.property('object_name', 'Session');
                expect(resp.result).has.property('user_id');
            });
        });
    }

    logOut () {
        let uri = `${this.__prefixURIAPI}/session/logOut`;
        describe('log out', () => {
            it('should return success = 1', async function () {
                let requestInfo = {
                    uri: uri,
                    method: 'POST',
                    body: {
                        username: process.env.GAME_CRAFTER_LOG_IN_USERNAME,
                        password: process.env.GAME_CRAFTER_LOG_IN_PASSWORD
                    },
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
testApi.logOut();

// describe('api', () => {
//     // it('needs tests');
//     it('needs tests', function() {
//         expect(true).to.be.true;
//     });
// });

testApi.stop();
