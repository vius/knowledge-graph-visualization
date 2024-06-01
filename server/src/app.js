// const express = require('express')
// const path = require('path')
// const staticDir = path.resolve(__dirname,'../../platform/dist')
// const misStaticDir = path.resolve(__dirname,'../../admin/dist')
// console.log('staticDir====>>>>>', staticDir)
// console.log('misStaticDir====>>>>', misStaticDir)
// app.use(express.static(staticDir));

// app.use('/api/platform', platformRouter);
// app.use('/api/admin', adminRouter);

const express = require('express');
const busboy = require('busboy');
const proxy = require('express-http-proxy');
const app = express()
const port = 8080
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' trustedscripts.example.com; style-src 'self' trustedstyles.example.com; img-src 'self' trustedimages.example.com; frame-ancestors '*'");
  next();
});
app.get('/browser', proxy('http://112.31.213.24:7474', {
  // 自定义响应头
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    userRes.setHeader('Content-Security-Policy', "frame-ancestors 'self' http://localhost:8081");
    // 可以返回原始响应数据，也可以返回修改后的数据
    return proxyResData;
  }
}))
app.get('/*', proxy('http://112.31.213.24:7474', {
  // 自定义响应头
  userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
    userRes.setHeader('Content-Security-Policy', "frame-ancestors 'self' http://localhost:8081");
    // 可以返回原始响应数据，也可以返回修改后的数据
    return proxyResData;
  }
}))

// app.post('/mockauction', proxy('http://localhost:8000'))

app.post('/uploadHeaderImages', (req, res) => {
  const bb = busboy({ headers: req.headers });
  bb.on('file', (name, file, info) => {
    const fileName = Buffer.from(info.filename, "latin1").toString(
      "utf8"
    );
    const saveTo = path.join(__dirname, `../../header_imgs/${fileName}`);
    file.pipe(fs.createWriteStream(saveTo));
  });
  bb.on('close', () => {
    res.writeHead(200, { 'Connection': 'close' });
    res.end(`That's all folks!`);
  });
  req.pipe(bb);
  return;
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
