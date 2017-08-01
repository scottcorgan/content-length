var contentLength = require('../');
var express = require('express');
var request = require('supertest');
var expect = require('chai').expect;

describe('content length middleware', function () {
  it('gives the content length in a callback', function (done) {
    var app = express();
    var responseLength = 0;

    app.use(contentLength(function (err, len) {
      responseLength = len;
    }));

    app.use(function (req, res) {
      res.send('Hi');
    });

    request(app)
      .get('/')
      .expect(function () {
        expect(responseLength).to.equal(2);
      })
      .end(function (err) {
        process.nextTick(function () {
          done(err);
        });
      });
  });

  it('gives a 0 content length if there is no response', function (done) {
    var app = express();
    var responseLength = 0;

    app.use(contentLength(function (err, len) {
      responseLength = len;
    }));

    app.use(function (req, res) {
      res.send();
    });

    request(app)
      .get('/')
      .expect(function () {
        expect(responseLength).to.equal(0);
      })
      .end(function (err) {
        process.nextTick(function () {
          done(err);
        });
      });
  });

  it('throws an error if no callback is given', function () {
    var app = express();

    expect(function () {
      app.use(contentLength());
    }).to.throw();
  });

  it('throws an error if the callback is not a function', function () {
    var app = express();

    expect(function () {
      app.use(contentLength('test'));
    }).to.throw();
  });
});
