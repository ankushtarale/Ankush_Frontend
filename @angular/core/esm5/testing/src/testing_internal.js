/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { ╔ÁisPromise as isPromise } from '@angular/core';
import { global } from '@angular/core/src/util';
import { AsyncTestCompleter } from './async_test_completer';
import { getTestBed } from './test_bed';
export { AsyncTestCompleter } from './async_test_completer';
export { inject } from './test_bed';
export * from './logger';
export * from './ng_zone_mock';
export var proxy = function (t) { return t; };
var _global = (typeof window === 'undefined' ? global : window);
export var afterEach = _global.afterEach;
export var expect = _global.expect;
var jsmBeforeEach = _global.beforeEach;
var jsmDescribe = _global.describe;
var jsmDDescribe = _global.fdescribe;
var jsmXDescribe = _global.xdescribe;
var jsmIt = _global.it;
var jsmFIt = _global.fit;
var jsmXIt = _global.xit;
var runnerStack = [];
jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;
var globalTimeOut = jasmine.DEFAULT_TIMEOUT_INTERVAL;
var testBed = getTestBed();
/**
 * Mechanism to run `beforeEach()` functions of Angular tests.
 *
 * Note: Jasmine own `beforeEach` is used by this library to handle DI providers.
 */
var BeforeEachRunner = /** @class */ (function () {
    function BeforeEachRunner(_parent) {
        this._parent = _parent;
        this._fns = [];
    }
    BeforeEachRunner.prototype.beforeEach = function (fn) { this._fns.push(fn); };
    BeforeEachRunner.prototype.run = function () {
        if (this._parent)
            this._parent.run();
        this._fns.forEach(function (fn) { fn(); });
    };
    return BeforeEachRunner;
}());
// Reset the test providers before each test
jsmBeforeEach(function () { testBed.resetTestingModule(); });
function _describe(jsmFn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var parentRunner = runnerStack.length === 0 ? null : runnerStack[runnerStack.length - 1];
    var runner = new BeforeEachRunner(parentRunner);
    runnerStack.push(runner);
    var suite = jsmFn.apply(void 0, tslib_1.__spread(args));
    runnerStack.pop();
    return suite;
}
export function describe() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return _describe.apply(void 0, tslib_1.__spread([jsmDescribe], args));
}
export function ddescribe() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return _describe.apply(void 0, tslib_1.__spread([jsmDDescribe], args));
}
export function xdescribe() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return _describe.apply(void 0, tslib_1.__spread([jsmXDescribe], args));
}
export function beforeEach(fn) {
    if (runnerStack.length > 0) {
        // Inside a describe block, beforeEach() uses a BeforeEachRunner
        runnerStack[runnerStack.length - 1].beforeEach(fn);
    }
    else {
        // Top level beforeEach() are delegated to jasmine
        jsmBeforeEach(fn);
    }
}
/**
 * Allows overriding default providers defined in test_injector.js.
 *
 * The given function must return a list of DI providers.
 *
 * Example:
 *
 *   beforeEachProviders(() => [
 *     {provide: Compiler, useClass: MockCompiler},
 *     {provide: SomeToken, useValue: myValue},
 *   ]);
 */
export function beforeEachProviders(fn) {
    jsmBeforeEach(function () {
        var providers = fn();
        if (!providers)
            return;
        testBed.configureTestingModule({ providers: providers });
    });
}
function _it(jsmFn, testName, testFn, testTimeout) {
    if (testTimeout === void 0) { testTimeout = 0; }
    if (runnerStack.length == 0) {
        // This left here intentionally, as we should never get here, and it aids debugging.
        // tslint:disable-next-line
        debugger;
        throw new Error('Empty Stack!');
    }
    var runner = runnerStack[runnerStack.length - 1];
    var timeout = Math.max(globalTimeOut, testTimeout);
    jsmFn(testName, function (done) {
        var completerProvider = {
            provide: AsyncTestCompleter,
            useFactory: function () {
                // Mark the test as async when an AsyncTestCompleter is injected in an it()
                return new AsyncTestCompleter();
            }
        };
        testBed.configureTestingModule({ providers: [completerProvider] });
        runner.run();
        if (testFn.length === 0) {
            var retVal = testFn();
            if (isPromise(retVal)) {
                // Asynchronous test function that returns a Promise - wait for completion.
                retVal.then(done, done.fail);
            }
            else {
                // Synchronous test function - complete immediately.
                done();
            }
        }
        else {
            // Asynchronous test function that takes in 'done' parameter.
            testFn(done);
        }
    }, timeout);
}
export function it(expectation, assertion, timeout) {
    return _it(jsmIt, expectation, assertion, timeout);
}
export function fit(expectation, assertion, timeout) {
    return _it(jsmFIt, expectation, assertion, timeout);
}
export function xit(expectation, assertion, timeout) {
    return _it(jsmXIt, expectation, assertion, timeout);
}
var SpyObject = /** @class */ (function () {
    function SpyObject(type) {
        if (type) {
            for (var prop in type.prototype) {
                var m = null;
                try {
                    m = type.prototype[prop];
                }
                catch (_a) {
                    // As we are creating spys for abstract classes,
                    // these classes might have getters that throw when they are accessed.
                    // As we are only auto creating spys for methods, this
                    // should not matter.
                }
                if (typeof m === 'function') {
                    this.spy(prop);
                }
            }
        }
    }
    SpyObject.prototype.spy = function (name) {
        if (!this[name]) {
            this[name] = jasmine.createSpy(name);
        }
        return this[name];
    };
    SpyObject.prototype.prop = function (name, value) { this[name] = value; };
    SpyObject.stub = function (object, config, overrides) {
        if (object === void 0) { object = null; }
        if (config === void 0) { config = null; }
        if (overrides === void 0) { overrides = null; }
        if (!(object instanceof SpyObject)) {
            overrides = config;
            config = object;
            object = new SpyObject();
        }
        var m = tslib_1.__assign({}, config, overrides);
        Object.keys(m).forEach(function (key) { object.spy(key).and.returnValue(m[key]); });
        return object;
    };
    return SpyObject;
}());
export { SpyObject };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZ19pbnRlcm5hbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvdGVzdGluZy9zcmMvdGVzdGluZ19pbnRlcm5hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFVBQVUsSUFBSSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRTlDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBQyxVQUFVLEVBQVMsTUFBTSxZQUFZLENBQUM7QUFFOUMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFlBQVksQ0FBQztBQUVsQyxjQUFjLFVBQVUsQ0FBQztBQUN6QixjQUFjLGdCQUFnQixDQUFDO0FBRS9CLE1BQU0sQ0FBQyxJQUFNLEtBQUssR0FBbUIsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLEVBQUQsQ0FBQyxDQUFDO0FBRW5ELElBQU0sT0FBTyxHQUFRLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXZFLE1BQU0sQ0FBQyxJQUFNLFNBQVMsR0FBYSxPQUFPLENBQUMsU0FBUyxDQUFDO0FBQ3JELE1BQU0sQ0FBQyxJQUFNLE1BQU0sR0FBMEMsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUU1RSxJQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3pDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFDckMsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztBQUN2QyxJ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aEIsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQXhDRCxJQXdDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHvJtWlzUHJvbWlzZSBhcyBpc1Byb21pc2V9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtnbG9iYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvc3JjL3V0aWwnO1xuXG5pbXBvcnQge0FzeW5jVGVzdENvbXBsZXRlcn0gZnJvbSAnLi9hc3luY190ZXN0X2NvbXBsZXRlcic7XG5pbXBvcnQge2dldFRlc3RCZWQsIGluamVjdH0gZnJvbSAnLi90ZXN0X2JlZCc7XG5cbmV4cG9ydCB7QXN5bmNUZXN0Q29tcGxldGVyfSBmcm9tICcuL2FzeW5jX3Rlc3RfY29tcGxldGVyJztcbmV4cG9ydCB7aW5qZWN0fSBmcm9tICcuL3Rlc3RfYmVkJztcblxuZXhwb3J0ICogZnJvbSAnLi9sb2dnZXInO1xuZXhwb3J0ICogZnJvbSAnLi9uZ196b25lX21vY2snO1xuXG5leHBvcnQgY29uc3QgcHJveHk6IENsYXNzRGVjb3JhdG9yID0gKHQ6IGFueSkgPT4gdDtcblxuY29uc3QgX2dsb2JhbCA9IDxhbnk+KHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93KTtcblxuZXhwb3J0IGNvbnN0IGFmdGVyRWFjaDogRnVuY3Rpb24gPSBfZ2xvYmFsLmFmdGVyRWFjaDtcbmV4cG9ydCBjb25zdCBleHBlY3Q6IDxUPihhY3R1YWw6IFQpID0+IGphc21pbmUuTWF0Y2hlcnM8VD4gPSBfZ2xvYmFsLmV4cGVjdDtcblxuY29uc3QganNtQmVmb3JlRWFjaCA9IF9nbG9iYWwuYmVmb3JlRWFjaDtcbmNvbnN0IGpzbURlc2NyaWJlID0gX2dsb2JhbC5kZXNjcmliZTtcbmNvbnN0IGpzbUREZXNjcmliZSA9IF9nbG9iYWwuZmRlc2NyaWJlO1xuY29uc3QganNtWERlc2NyaWJlID0gX2dsb2JhbC54ZGVzY3JpYmU7XG5jb25zdCBqc21JdCA9IF9nbG9iYWwuaXQ7XG5jb25zdCBqc21GSXQgPSBfZ2xvYmFsLmZpdDtcbmNvbnN0IGpzbVhJdCA9IF9nbG9iYWwueGl0O1xuXG5jb25zdCBydW5uZXJTdGFjazogQmVmb3JlRWFjaFJ1bm5lcltdID0gW107XG5qYXNtaW5lLkRFRkFVTFRfVElNRU9VVF9JTlRFUlZBTCA9IDMwMDA7XG5jb25zdCBnbG9iYWxUaW1lT3V0ID0gamFzbWluZS5ERUZBVUxUX1RJTUVPVVRfSU5URVJWQUw7XG5cbmNvbnN0IHRlc3RCZWQgPSBnZXRUZXN0QmVkKCk7XG5cbi8qKlxuICogTWVjaGFuaXNtIHRvIHJ1biBgYmVmb3JlRWFjaCgpYCBmdW5jdGlvbnMgb2YgQW5ndWxhciB0ZXN0cy5cbiAqXG4gKiBOb3RlOiBKYXNtaW5lIG93biBgYmVmb3JlRWFjaGAgaXMgdXNlZCBieSB0aGlzIGxpYnJhcnkgdG8gaGFuZGxlIERJIHByb3ZpZGVycy5cbiAqL1xuY2xhc3MgQmVmb3JlRWFjaFJ1bm5lciB7XG4gIHByaXZhdGUgX2ZuczogQXJyYXk8RnVuY3Rpb24+ID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFyZW50OiBCZWZvcmVFYWNoUnVubmVyKSB7fVxuXG4gIGJlZm9yZUVhY2goZm46IEZ1bmN0aW9uKTogdm9pZCB7IHRoaXMuX2Zucy5wdXNoKGZuKTsgfVxuXG4gIHJ1bigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcGFyZW50KSB0aGlzLl9wYXJlbnQucnVuKCk7XG4gICAgdGhpcy5fZm5zLmZvckVhY2goKGZuKSA9PiB7IGZuKCk7IH0pO1xuICB9XG59XG5cbi8vIFJlc2V0IHRoZSB0ZXN0IHByb3ZpZGVycyBiZWZvcmUgZWFjaCB0ZXN0XG5qc21CZWZvcmVFYWNoKCgpID0+IHsgdGVzdEJlZC5yZXNldFRlc3RpbmdNb2R1bGUoKTsgfSk7XG5cbmZ1bmN0aW9uIF9kZXNjcmliZShqc21GbjogRnVuY3Rpb24sIC4uLmFyZ3M6IGFueVtdKSB7XG4gIGNvbnN0IHBhcmVudFJ1bm5lciA9IHJ1bm5lclN0YWNrLmxlbmd0aCA9PT0gMCA/IG51bGwgOiBydW5uZXJTdGFja1tydW5uZXJTdGFjay5sZW5ndGggLSAxXTtcbiAgY29uc3QgcnVubmVyID0gbmV3IEJlZm9yZUVhY2hSdW5uZXIocGFyZW50UnVubmVyICEpO1xuICBydW5uZXJTdGFjay5wdXNoKHJ1bm5lcik7XG4gIGNvbnN0IHN1aXRlID0ganNtRm4oLi4uYXJncyk7XG4gIHJ1bm5lclN0YWNrLnBvcCgpO1xuICByZXR1cm4gc3VpdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXNjcmliZSguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICByZXR1cm4gX2Rlc2NyaWJlKGpzbURlc2NyaWJlLCAuLi5hcmdzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRkZXNjcmliZSguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICByZXR1cm4gX2Rlc2NyaWJlKGpzbUREZXNjcmliZSwgLi4uYXJncyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB4ZGVzY3JpYmUoLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgcmV0dXJuIF9kZXNjcmliZShqc21YRGVzY3JpYmUsIC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmVmb3JlRWFjaChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgaWYgKHJ1bm5lclN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAvLyBJbnNpZGUgYSBkZXNjcmliZSBibG9jaywgYmVmb3JlRWFjaCgpIHVzZXMgYSBCZWZvcmVFYWNoUnVubmVyXG4gICAgcnVubmVyU3RhY2tbcnVubmVyU3RhY2subGVuZ3RoIC0gMV0uYmVmb3JlRWFjaChmbik7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG9wIGxldmVsIGJlZm9yZUVhY2goKSBhcmUgZGVsZWdhdGVkIHRvIGphc21pbmVcbiAgICBqc21CZWZvcmVFYWNoKGZuKTtcbiAgfVxufVxuXG4vKipcbiAqIEFsbG93cyBvdmVycmlkaW5nIGRlZmF1bHQgcHJvdmlkZXJzIGRlZmluZWQgaW4gdGVzdF9pbmplY3Rvci5qcy5cbiAqXG4gKiBUaGUgZ2l2ZW4gZnVuY3Rpb24gbXVzdCByZXR1cm4gYSBsaXN0IG9mIERJIHByb3ZpZGVycy5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgYmVmb3JlRWFjaFByb3ZpZGVycygoKSA9PiBbXG4gKiAgICAge3Byb3ZpZGU6IENvbXBpbGVyLCB1c2VDbGFzczogTW9ja0NvbXBpbGVyfSxcbiAqICAgICB7cHJvdmlkZTogU29tZVRva2VuLCB1c2VWYWx1ZTogbXlWYWx1ZX0sXG4gKiAgIF0pO1xuICovXG5leHBvcnQgZnVuY3Rpb24gYmVmb3JlRWFjaFByb3ZpZGVycyhmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAganNtQmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgY29uc3QgcHJvdmlkZXJzID0gZm4oKTtcbiAgICBpZiAoIXByb3ZpZGVycykgcmV0dXJuO1xuICAgIHRlc3RCZWQuY29uZmlndXJlVGVzdGluZ01vZHVsZSh7cHJvdmlkZXJzOiBwcm92aWRlcnN9KTtcbiAgfSk7XG59XG5cblxuZnVuY3Rpb24gX2l0KFxuICAgIGpzbUZuOiBGdW5jdGlvbiwgdGVzdE5hbWU6IHN0cmluZywgdGVzdEZuOiAoZG9uZT86IERvbmVGbikgPT4gYW55LCB0ZXN0VGltZW91dCA9IDApOiB2b2lkIHtcbiAgaWYgKHJ1bm5lclN0YWNrLmxlbmd0aCA9PSAwKSB7XG4gICAgLy8gVGhpcyBsZWZ0IGhlcmUgaW50ZW50aW9uYWxseSwgYXMgd2Ugc2hvdWxkIG5ldmVyIGdldCBoZXJlLCBhbmQgaXQgYWlkcyBkZWJ1Z2dpbmcuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgZGVidWdnZXI7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFbXB0eSBTdGFjayEnKTtcbiAgfVxuICBjb25zdCBydW5uZXIgPSBydW5uZXJTdGFja1tydW5uZXJTdGFjay5sZW5ndGggLSAxXTtcbiAgY29uc3QgdGltZW91dCA9IE1hdGgubWF4KGdsb2JhbFRpbWVPdXQsIHRlc3RUaW1lb3V0KTtcblxuICBqc21Gbih0ZXN0TmFtZSwgKGRvbmU6IERvbmVGbikgPT4ge1xuICAgIGNvbnN0IGNvbXBsZXRlclByb3ZpZGVyID0ge1xuICAgICAgcHJvdmlkZTogQXN5bmNUZXN0Q29tcGxldGVyLFxuICAgICAgdXNlRmFjdG9yeTogKCkgPT4ge1xuICAgICAgICAvLyBNYXJrIHRoZSB0ZXN0IGFzIGFzeW5jIHdoZW4gYW4gQXN5bmNUZXN0Q29tcGxldGVyIGlzIGluamVjdGVkIGluIGFuIGl0KClcbiAgICAgICAgcmV0dXJuIG5ldyBBc3luY1Rlc3RDb21wbGV0ZXIoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRlc3RCZWQuY29uZmlndXJlVGVzdGluZ01vZHVsZSh7cHJvdmlkZXJzOiBbY29tcGxldGVyUHJvdmlkZXJdfSk7XG4gICAgcnVubmVyLnJ1bigpO1xuXG4gICAgaWYgKHRlc3RGbi5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IHJldFZhbCA9IHRlc3RGbigpO1xuICAgICAgaWYgKGlzUHJvbWlzZShyZXRWYWwpKSB7XG4gICAgICAgIC8vIEFzeW5jaHJvbm91cyB0ZXN0IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIFByb21pc2UgLSB3YWl0IGZvciBjb21wbGV0aW9uLlxuICAgICAgICByZXRWYWwudGhlbihkb25lLCBkb25lLmZhaWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU3luY2hyb25vdXMgdGVzdCBmdW5jdGlvbiAtIGNvbXBsZXRlIGltbWVkaWF0ZWx5LlxuICAgICAgICBkb25lKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFzeW5jaHJvbm91cyB0ZXN0IGZ1bmN0aW9uIHRoYXQgdGFrZXMgaW4gJ2RvbmUnIHBhcmFtZXRlci5cbiAgICAgIHRlc3RGbihkb25lKTtcbiAgICB9XG4gIH0sIHRpbWVvdXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXQoZXhwZWN0YXRpb246IHN0cmluZywgYXNzZXJ0aW9uOiAoZG9uZTogRG9uZUZuKSA9PiBhbnksIHRpbWVvdXQ/OiBudW1iZXIpOiB2b2lkIHtcbiAgcmV0dXJuIF9pdChqc21JdCwgZXhwZWN0YXRpb24sIGFzc2VydGlvbiwgdGltZW91dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXQoZXhwZWN0YXRpb246IHN0cmluZywgYXNzZXJ0aW9uOiAoZG9uZTogRG9uZUZuKSA9PiBhbnksIHRpbWVvdXQ/OiBudW1iZXIpOiB2b2lkIHtcbiAgcmV0dXJuIF9pdChqc21GSXQsIGV4cGVjdGF0aW9uLCBhc3NlcnRpb24sIHRpbWVvdXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geGl0KGV4cGVjdGF0aW9uOiBzdHJpbmcsIGFzc2VydGlvbjogKGRvbmU6IERvbmVGbikgPT4gYW55LCB0aW1lb3V0PzogbnVtYmVyKTogdm9pZCB7XG4gIHJldHVybiBfaXQoanNtWEl0LCBleHBlY3RhdGlvbiwgYXNzZXJ0aW9uLCB0aW1lb3V0KTtcbn1cblxuZXhwb3J0IGNsYXNzIFNweU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKHR5cGU/OiBhbnkpIHtcbiAgICBpZiAodHlwZSkge1xuICAgICAgZm9yIChjb25zdCBwcm9wIGluIHR5cGUucHJvdG90eXBlKSB7XG4gICAgICAgIGxldCBtOiBhbnkgPSBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIG0gPSB0eXBlLnByb3RvdHlwZVtwcm9wXTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLy8gQXMgd2UgYXJlIGNyZWF0aW5nIHNweXMgZm9yIGFic3RyYWN0IGNsYXNzZXMsXG4gICAgICAgICAgLy8gdGhlc2UgY2xhc3NlcyBtaWdodCBoYXZlIGdldHRlcnMgdGhhdCB0aHJvdyB3aGVuIHRoZXkgYXJlIGFjY2Vzc2VkLlxuICAgICAgICAgIC8vIEFzIHdlIGFyZSBvbmx5IGF1dG8gY3JlYXRpbmcgc3B5cyBmb3IgbWV0aG9kcywgdGhpc1xuICAgICAgICAgIC8vIHNob3VsZCBub3QgbWF0dGVyLlxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRoaXMuc3B5KHByb3ApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3B5KG5hbWU6IHN0cmluZykge1xuICAgIGlmICghKHRoaXMgYXMgYW55KVtuYW1lXSkge1xuICAgICAgKHRoaXMgYXMgYW55KVtuYW1lXSA9IGphc21pbmUuY3JlYXRlU3B5KG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gKHRoaXMgYXMgYW55KVtuYW1lXTtcbiAgfVxuXG4gIHByb3AobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7ICh0aGlzIGFzIGFueSlbbmFtZV0gPSB2YWx1ZTsgfVxuXG4gIHN0YXRpYyBzdHViKG9iamVjdDogYW55ID0gbnVsbCwgY29uZmlnOiBhbnkgPSBudWxsLCBvdmVycmlkZXM6IGFueSA9IG51bGwpIHtcbiAgICBpZiAoIShvYmplY3QgaW5zdGFuY2VvZiBTcHlPYmplY3QpKSB7XG4gICAgICBvdmVycmlkZXMgPSBjb25maWc7XG4gICAgICBjb25maWcgPSBvYmplY3Q7XG4gICAgICBvYmplY3QgPSBuZXcgU3B5T2JqZWN0KCk7XG4gICAgfVxuXG4gICAgY29uc3QgbSA9IHsuLi5jb25maWcsIC4uLm92ZXJyaWRlc307XG4gICAgT2JqZWN0LmtleXMobSkuZm9yRWFjaChrZXkgPT4geyBvYmplY3Quc3B5KGtleSkuYW5kLnJldHVyblZhbHVlKG1ba2V5XSk7IH0pO1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbn1cbiJdfQ==