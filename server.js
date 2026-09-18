const http = require('http'), fs = require('fs'), path = require('path');
const port = process.env.PORT || 3000;
const types = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon'};
http.createServer((req, res) => {
  let f = (req.url === '/' ? '/index.html' : req.url).split('?')[0];
  const fp = path.join(__dirname, path.normalize(f));
  fs.readFile(fp, (e, data) => {
    if (e) { fs.readFile(path.join(__dirname,'index.html'), (e2,d2)=>{ res.writeHead(e2?404:200,{'Content-Type':'text/html'}); res.end(e2?'Not found':d2); }); return; }
    res.writeHead(200, {'Content-Type': types[path.extname(fp)] || 'text/plain'});
    res.end(data);
  });
}).listen(port, () => console.log('BridgeX site up on ' + port));
