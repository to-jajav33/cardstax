'use strict';
var expect = require('chai').expect;
var promiseFinally = require('promise.prototype.finally');
promiseFinally.shim();

const api = require('../dist/api').api;
const apiInstance = new api();

class APITest {
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
                        console.log(...args);
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

describe('api', () => {
    // it('needs tests');
    it('needs tests', function() {
        expect(true).to.be.true;
    });
});

testApi.stop();
