const express = require('express');
const busboy = require('busboy');
const fs = require('fs');
const proxy = require('express-http-proxy');
const app = express()
const port = 8001
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')

app.use(cookieParser())
app.use(bodyParser.json())
app.get('/browser/*', proxy('http://localhost:7474', {
  // 自定义响应头
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    userRes.setHeader('Content-Security-Policy', "frame-ancestors 'self' http://localhost:8080");
    // 可以返回原始响应数据，也可以返回修改后的数据
    return proxyResData;
  }
}))
app.use((req, res, next) => {
  console.log('req.path', req.path)
  if (req.path.startsWith('/home/inspur/CyberKG')) {
    req.url = req.url.replace('/home/inspur/CyberKG', '');
    console.log('req.url', req.url)
  }
  next();
});
const downloadDir = path.resolve(__dirname, '../../../')
console.log('downloadDir', downloadDir)
app.get('/test/*', express.static(downloadDir))
const staticDir = path.resolve(__dirname, '../../platform/dist')
app.use(express.static(staticDir));

app.post('/expressapi/dealdata', (req, res) => {
  const bb = busboy({ headers: req.headers });
  const params = {};
  bb.on('field', (name, val) => {
    params[name] = val;
  });
  bb.on('file', (name, file, info) => {
    const fileName = Buffer.from(info.filename, "latin1").toString(
      "utf8"
    );
    const dir = path.join(__dirname, `../../../file`)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const saveTo = path.join(dir, fileName);
    file.pipe(fs.createWriteStream(saveTo));
    file.on('end', async () => {
      const { type, actionType } = params
      const preMap = {
        1: 'wlzc',
        2: 'kyqb',
        3: 'sgqb'
      }
      let pre = preMap[type]
      const actionMao = {
        1: 'process',
        2: 'reconstruct',
        3: 'extract'
      }
      const after = actionMao[actionType]
      const origin = `http://localhost`
      const url = `${origin}:8000/${pre}_${after}?file_path=${saveTo}`
      console.log('请求url', url)
      const response = await fetch(url)
      const data = await response.text()
      res.end(data);
    });


  });
  // bb.on('close', () => {
  //   res.writeHead(200, { 'Connection': 'close' });
  //   res.end(`That's all folks!`);
  // });
  req.pipe(bb);
  return;
})

app.listen(port, '0.0.0.0', () => {
  console.log(`app listening on port ${port}`)
})
