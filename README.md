# content-length

Express/Connect middleware to calculate the response payload size

## Install

```
npm install content-length --save
```


## Usage

```js
var express = require('express');
var contentLength = require('content-length');

app.use(contentLength(function (err, len) {
  console.log(len);
}));

app.listen(3000, function () {
  
});
```

### API

#### contentLength(callback)

* `callback` - a callback function called when response has ended. Typical Nodejs callback style `callback(err, len)`.

## Run Tests

```
npm install
npm test
```
