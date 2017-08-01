module.exports = function (done) {
  if (!done || typeof done !== 'function') throw new Error('Must provide a callback for content-length');

  return function (req, res, next) {
    var byteLength = 0;
    var end = res.end;
    var write = res.write;

    res.write = function (payload) {
      if (payload) byteLength += Buffer.byteLength(payload.toString(), 'utf8');

      res.write = write;
      res.write.apply(res, arguments);
    };

    res.end = function (payload) {
      res.end = end;
      res.end.apply(res, arguments);

      done(null, byteLength);
    };

    next();
  }
}
