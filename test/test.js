/**
 * Created by ligang on 17/2/10.
 */
var mixin = require('../src/mixin');
var expect = require('expect.js');

console.log(mixin)

describe('Test Utility', function () {
    it('throws an error for object cannot be enumerable', function () {
        expect(function () {
            mixin(null, {})
        }).to.throwTypeError;

        expect(function () {
            mixin({}, undefined)
        }).to.throwTypeError;

        expect(function () {
            mixin(0, {})
        }).to.throwTypeError;

        expect(function () {
            mixin({}, "abc")
        }).to.throwTypeError;
    });

    it('the properties defined in des should NOT be override', function () {
        var a = {x: 1, y: 2}, b = {x: 2, z: 3};
        mixin(a, b);
        expect(a.x).to.equal(2);
        expect(a.y).to.equal(2);
        expect(a.z).to.equal(3);
    });

    it('the properties defined in des should be override', function () {
        var a = {x: 1, y: 2}, b = {x: 2, z: 3};
        mixin(a, b);
        expect(a.x).to.equal(2);
        expect(a.y).to.equal(2);
        expect(a.z).to.equal(3);
    });

    it('the deep copy...', function () {
        var a = {x: {y: 1, z: 3}};
        mixin(true, a, {x: {y: 2}, z: 2});

        expect(a.x.y).to.equal(2);
        expect(a.x.z).to.equal(3);
        expect(a.z).to.equal(2);

        mixin(true, a, {x: {y: 2, z: {e: 5}}, z: 2});
        expect(a.x.z.e).to.equal(5);

        mixin(true, a, {x: {y: 2, z: {e: 15}}, z: 2});
        expect(a.x.z.e).to.equal(15);
    });
});
