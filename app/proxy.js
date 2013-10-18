var http = require('http'),
    https = require('https'),
    url = require('url');

http.createServer(function(request, response) {

  var target = url.parse(request.url, true).query.url;

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
  
  var client = secure ? https : http;
  var req = client.request(options, function (res) {
    response.writeHead(res.statusCode, res.headers);
    res.pipe(response);
  });
  request.pipe(req);

}).listen(process.env.PORT || 8888);