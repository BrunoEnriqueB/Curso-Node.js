  import fs from 'fs';
  import url from 'url';
  import http from 'http';

  const port = 3000;
  const server = http.createServer((req, res) => {
      let urlInfo = url.parse(req.url, true);
      const name = urlInfo.query.name;
      
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
          if(!name) {
              fs.readFile('index.html', (err, data) => {
                  res.writeHead(200, {'Content-Type' : 'text/html'});
                  res.write(data);
                  return res.end();
              });
          } else {
              fs.writeFile("arquivo.txt", name, (err, data) => {
                  res.writeHead(302, {
                      location: '/',
                  });
                  return res.end();
              });
          };
      });

  server.listen(port, () => {
      console.log(`Server rodando na porta: ${port}`)
  })