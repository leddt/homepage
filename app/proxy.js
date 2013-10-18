var http = require('http'),
    https = require('https'),
    url = require('url');

var proxy = function(request, response, next) {
  var reqUrl = url.parse(request.url, true);

  if (next && reqUrl.pathname != "/proxy.js") {
    return next();
  }

  var target = reqUrl.query.url;

  if (!target) {
    response.end();
    return;
  }

  var secure = !!target.match(/^https/);

  var parsed = url.parse(target);

  var options = {
    hostname: parsed.hostname,
    port: parsed.port || (secure ? 443 : 80),
    path: parsed.path,
    method: request.method,
    headers: request.headers
  };
  
  if (options.headers.host) delete options.headers.host;
  if (options.headers.connection) delete options.headers.connection;

  console.log("PROXY", request.method, target/*, request.headers*/);
  
  var client = secure ? https : http;
  var req = client.request(options, function (res) {
    response.writeHead(res.statusCode, res.headers);
    res.pipe(response);
  });
  request.pipe(req);
};

if (process.env.PORT) {
  http.createServer(proxy).listen(process.env.PORT);
} else {
  module.exports = proxy;
}