# ๐ป http ๋ชจ๋๋ก ์๋ฒ ๋ง๋ค๊ธฐ-Ch4

## ๐ 4๊ฐ ์ ๋ฆฌ

### ๐โโ๏ธ ์์ 1

```js
const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    res.write("<h1>Hello Node!</h1>");
    res.end("<p>Hello Server</p>");
  })
  .listen(8080, () => {
    console.log("8080๋ฒ ํฌํธ์์ ์๋ฒ ๋๊ธฐ์ค์๋๋ค.");
  });
```

![image](https://user-images.githubusercontent.com/64779472/143277708-d95207d7-22fd-4f9e-8751-f25afbc31f08.png)

- res ๊ฐ์ฒด์๋ `writeHead`์ `write`, `end`๋ฉ์๋๊ฐ ์๋ค.
- writeHead๋ `์๋ต์ ๋ํ ์ ๋ณด๋ฅผ ๊ธฐ๋กํ๋ ๋ฉ์๋์ด๋ค.` ์ฒซ ๋ฒ์งธ ์ธ์๋ก ์ฑ๊ณต์ ์ธ ์์ฒญ์์ ์๋ฏธํ๋ 200, ๋ ๋ฒ์งธ ์ธ์๋ก ์๋ต์ ๋ํ ์ ๋ณด๋ฅผ ๋ณด๋ด๋๋ฐ ์ฝํ์ธ ์ ํ์์ด HTML์์ ์๋ฆฌ๊ณ ์๋ค. ๋ํ ํ๊ธ ํ์๋ฅผ ์ํด charset์ utf-8๋ก ์ง์ ํ๋ค. ์ด์ ๋ณด๊ฐ ๊ธฐ๋ก๋๋ ๋ถ๋ถ์ `ํค๋(Header)`๋ผ๊ณ  ๋ถ๋ฅธ๋ค.
- write ๋ฉ์๋์ ์ฒซ ๋ฒ์งธ ์ธ์๋ `ํด๋ผ์ด์ธํธ๋ก ๋ณด๋ผ ๋ฐ์ดํฐ`์ด๋ค. ์ง๊ธ์ HTML ๋ชจ์์ ๋ฌธ์์ด์ ๋ณด๋์ง๋ง ๋ฒํผ๋ฅผ ๋ณด๋ผ ์๋ ์๋ค. ๋ํ, ์ฌ๋ฌ๋ฒ ํธ์ถํด์ ๋ฐ์ดํฐ๋ฅผ ์ฌ๋ฌ ๊ฐ ๋ณด๋ด๋ ๋๋ค. ๋ฐ์ดํฐ๊ฐ ๊ธฐ๋ก๋๋ ๋ถ๋ถ์ `๋ณธ๋ฌธ(Body)`๋ผ๊ณ  ๋ถ๋ฅธ๋ค.
- end๋ `์๋ต์ ์ข๋ฃํ๋ ๋ฉ์๋์ด๋ค.` ๋ง์ฝ ์ธ์๊ฐ ์๋ค๋ฉด ๊ทธ ๋ฐ์ดํฐ๋ ํด๋ผ์ด์ธํธ์ ๋ณด๋ด๊ณ  ์๋ต์ ์ข๋ฃํ๋ค.

<br />

### ๐โโ๏ธ ์์ 2

```js
// ...

const server = http.createServer((req, res) => {
  // ...
});

server.listen(8080);
server.on("listening", () => {
  console.log("8080๋ฒ ํฌํธ์์ ์๋ฒ ๋๊ธฐ์ค์๋๋ค.");
});
server.on("error", (error) => {
  console.error(error);
});
```

- ์์ 1์ฒ๋ผ listen๋ฉ์๋์ ์ฝ๋ฐฑ ํจ์๋ฅผ ๋ฃ์ ์๋ ์์ง๋ง, ์ ์์ ์ฒ๋ผ ์๋ฒ์ listening ์ด๋ฒคํธ ๋ฆฌ์ค๋๋ฅผ ๋ถ์ฌ๋ ๋๋ค.
- ์ถ๊ฐ๋ก error ์ด๋ฒคํธ ๋ฆฌ์ค๋๋ ๋ถ์ฌ๋ดค๋ค.

<br />

### ๐โโ๏ธ ์์ 3

```js
http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    res.write("<h1>Hello Node!</h1>");
    res.end("<p>Hello Server</p>");
  })
  .listen(8080, () => {
    console.log("8080๋ฒ ํฌํธ์์ ์๋ฒ ๋๊ธฐ์ค์๋๋ค.");
  });

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    res.write("<h1>Hello Node!</h1>");
    res.end("<p>Hello Server</p>");
  })
  .listen(8081, () => {
    console.log("8081๋ฒ ํฌํธ์์ ์๋ฒ ๋๊ธฐ์ค์๋๋ค.");
  });
```

- createServer๋ฅผ ์ํ๋ ๋งํผ ํธ์ถํ๋ฉด ์ฌ๋ฌ ๊ฐ์ ์๋ฒ๋ฅผ ์คํํ  ์๋ ์๋ค.
- ์ด๋ ์ฃผ์ํ  ์ ์ ํฌํธ ๋ฒํธ๊ฐ ๋ฌ๋ผ์ผ ํ๋ค. ํฌํธ ๋ฒํธ๊ฐ ๊ฐ์ผ๋ฉด `EADDRINUSE` ์๋ฌ๊ฐ ๋ฐ์ํ๋ค.
- ๋จ, ์ค๋ฌด์์๋ ์ด๋ฐ ์์ผ๋ก ์๋ฒ๋ฅผ ์ฌ๋ฌ ๊ฐ ๋์ฐ๋ ์ผ์ ๋๋ฌผ๋ค.

<br />

### ๐โโ๏ธ ์์ 4

```js
const http = require("http");
const fs = require("fs").promises;

http
  .createServer(async (req, res) => {
    try {
      const data = await fs.readFile("./server2.html");
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });
      res.end(data);
    } catch (error) {
      console.error(error);
      res.writeHead(500, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      res.end(error.message);
    }
  })
  .listen(8080, () => {
    console.log("8080๋ฒ ํฌํธ์์ ์๋ฒ ๋๊ธฐ์ค์๋๋ค.");
  });
```

- ๋ณดํต res.write๋ res.end๋ก ์ผ์ผ์ด HTML์ ์ ๋ ๊ฒ์ ๋นํจ์จ์ ์ด๋ค. ๋ฏธ๋ฆฌ HTML์ ํ์ผ์ ๋ง๋ค์ด์ฃผ๋ฉด ์ข๋ค. ๊ทธ HTML ํ์ผ์ fs ๋ชจ๋๋ก ์ฝ์ด์ ์ ์กํ  ์ ์๋ค.
- ์ ์์ ์์ ์์ฒญ์ด ๋ค์ด์ค๋ฉด ๋จผ์  fs ๋ชจ๋๋ก HTML ํ์ผ์ ์ฝ๋๋ค. ๊ทธ๋ฆฌ๊ณ  data ๋ณ์์ ์ ์ฅ๋ ๋ฒํผ๋ฅผ ๊ทธ๋๋ก ํด๋ผ์ด์ธํธ์ ๋ณด๋ด๋ฉด ๋๋ค.
- ์๊ธฐ์น ๋ชปํ ์๋ฌ๊ฐ ๋ฐ์ํ ๊ฒฝ์ฐ์๋ ์๋ฌ ๋ฉ์์ง๋ฅผ ์๋ตํ๋ค. ์ด๋ ์๋ฌ ๋ฉ์์ง๋ ์ผ๋ฐ ๋ฌธ์์ด์ด๋ฏ๋ก `text/plain`์ ์ฌ์ฉํ๋ค.

<br />

### ๐โโ๏ธ ์์ 5 (Rest)

```js
if (req.method === "GET") {
  if (req.url === "/") {
    // ...
  } else if (req.url === "/about") {
    // ...
  }
  // ...
}
```

- `req.method`๋ก HTTP ์์ฒญ ๋ฉ์๋๋ฅผ ๊ตฌ๋ถํ๊ณ  ์๋ค. ๋ฉ์๋ GET์ด๋ฉด `req.url`๋ก ์์ฒญ ์ฃผ์๋ฅผ ๊ตฌ๋ถํ๋ค.
- ๋ค์ผ๋ก, res.end ์์ return์ ๋ถ์ด๋ ์ด์ ๋ return์ ๋ถ์ด์ง ์์ผ๋ฉด ํจ์๊ฐ ์ข๋ฃ๋์ง ์๋๋ค. res.end๋ ๋จ์ํ ์๋ต์ ์ข๋ฃํ๋ ๋ฉ์๋์ด๋ค. ๋ฐ๋ผ์, ๋ค์์ ์ฝ๋๊ฐ ์ด์ด์ง๋ ๊ฒฝ์ฐ์๋ return์ ์จ์ ๋ช์์ ์ผ๋ก ํจ์๋ฅผ ์ข๋ฃํด์ผ ํ๋ค.

<br />

```js
if (req.method === "PUT") {
  if (req.url.startsWith("/user/")) {
    const key = req.url.split("/")[2];
    let body = "";

    req.on("data", (data) => {
      body += data;
    });

    return req.on("end", () => {
      console.log("PUT๋ณธ๋ฌธ(BODY)", body);
      users[key] = JSON.parse(body).name;
      return res.end(JSON.stringify(users));
    });
  }
}
```

- POST์์ฒญ๊ณผ PUT ์์ฒญ์ ํ  ๋ `req.on('data')`์ `req.on('end')`์ ์ฌ์ฉํ๋ค. ์์ฒญ์ ๋ณธ๋ฌธ์ ๋ค์ด ์๋ ๋ฐ์ดํฐ๋ฅผ ๊บผ๋ด๊ธฐ ์ํ ์์์ด๋ค.
- req์ res๋ ๋ด๋ถ์ ์ผ๋ก ์คํธ๋ฆผ(๊ฐ๊ฐ `readStream`๊ณผ `writeStream`)์ผ๋ก ๋์ด ์์ผ๋ฏ๋ก ์์ฒญ/์๋ต์ ๋ฐ์ดํฐ๊ฐ ์คํธ๋ฆผ ํ์์ผ๋ก ์ ๋ฌ๋๋ค. ๋ํ on์ ์ด๋ฒคํธ๋ ๋ฌ๋ ค์๋ค.
- ์ด๋ ๋ฐ์ดํฐ๋ ๋ฌธ์์ด์ด๋ฏ๋ก JSON์ผ๋ก ๋ง๋๋ JSON.parse ๊ณผ์ ์ด ํ์ํ๋ค. ์ฐธ๊ณ ๋ก JSON.stringify๋ JSON ํ์ผ์ ๋ฌธ์์ด๋ก ๋ณํํ๋ค.
- `startWith()` ๋ฌธ์์ด ๋ฉ์๋๋ ์ด๋ค ๋ฌธ์์ด์ด ํน์  ๋ฌธ์๋ก ์์ํ๋์ง ํ์ธํ์ฌ ๊ฒฐ๊ณผ๋ true ๋๋ false๋ก ๋ฐํํด์ฃผ๋ ๋ฉ์๋์ด๋ค.

<br />

### ๐โโ๏ธ ์์ 6 (Cookie)

```js
  const http = require("http");
  const url = require("url");
  const fs = require("fs").promises;
  const qs = require("querystring");

  http
  .createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    // ์ฃผ์๊ฐ /login์ผ๋ก ์์ํ๋ ๊ฒฝ์ฐ
    if (req.url.startsWith("/login")) {
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query);
      const expires = new Date();

      expires.setMinutes(expires.getMinutes() + 5);

      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": `name=${encodeURIComponent(
          name
        )};Expires=${expires.toUTCString()};HttpOnly;Path=/`,
      });
      res.end();
    }
  // ...
```

- ์ฟ ํค๋ ์์ฒญ์ ํค๋์ ๋ด๊ฒจ ์ ์ก๋๋ค. ๋ฐ๋ผ์ req.headers.cookie์ ์กด์ฌํ๋ค. req.headers๋ ์์ฒญ์ ํค๋๋ฅผ ์๋ฏธํ๋ค.
- url๊ณผ querystring ๋ชจ๋๋ก ๊ฐ๊ฐ ์ฃผ์์ ์ฃผ์์ ๋ธ๋ผ์ค๋ query๋ฅผ ๋ถ์ํ๋ค. ๊ทธ๋ฆฌ๊ณ  ๋ง๋ฃ์๊ฐ(expires)์ ์ค์ ํ๋ค.
- res.writeHead๋ฅผ ํตํด์ 302 ์๋ต์ฝ๋, ๋ฆฌ๋ค์ด๋ ํธ ์ฃผ์์ ํจ๊ป ์ฟ ํค๋ฅผ ํค๋์ ๋ฃ๋๋ค.
- ์ด๋, ํค๋์๋ ํ๊ธ์ ์ค์ ํ  ์ ์์ผ๋ฏ๋ก name ๋ณ์๋ฅผ encodeURIComponent ๋ฉ์๋๋ก ์ธ์ฝ๋ฉํ๋ค. decodeURIComponent๋ฅผ ํตํด encodeURIComponent ๋ ๋น์ทํ ๋ฐฉ๋ฒ์ผ๋ก ์์ฑ๋ Uniform Resource Identifier(URI) ์ปดํฌ๋ํธ๋ฅผ ํด๋ํ  ์ ์๋ค.
- Set-Cookie์ ๊ฐ์ผ๋ก๋ ์ ํ๋ ASCII ์ฝ๋๋ง ๋ค์ด๊ฐ์ผ ํ๋ฏ๋ก ์ค๋ฐ๊ฟ์ ๋ฃ์ผ๋ฉด ์๋๋ค.

<br />

### ๐โโ๏ธ ์์ 7 (Session)

```js
  const session = {};

  http
  .createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    // ์ฃผ์๊ฐ /login์ผ๋ก ์์ํ๋ ๊ฒฝ์ฐ
    if (req.url.startsWith("/login")) {
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query);
      const expires = new Date();

      expires.setMinutes(expires.getMinutes() + 5);
      const uniqueInt = Date.now();

      session[uniqueInt] = {
        name,
        expires,
      };

      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": `session=${uniqueInt};Expires=${expires.toUTCString()};HttpOnly;Path=/`,
      });
      res.end();
    }
  //...
```

- cookie ์์ ์ ๋ค๋ฅด๊ฒ ์ฟ ํค์ ์ด๋ฆ์ ๋ด์์ ๋ณด๋ด๋ ๋์  uniqueInt ๋ผ๋ ์ซ์ ๊ฐ์ ๋ณด๋๋ค.
- ์ฌ์ฉ์์ ์ด๋ฆ๊ณผ ๋ง๋ฃ ์๊ฐ์ uniqueInt ์์ฑ๋ช ์๋์ ์๋ session์ด๋ผ๋ ๊ฐ์ฒด์ ๋์  ์ ์ฅํ๋ค.
- ์ด์  cookie.session์ด ์๊ณ  ๋ง๋ฃ ๊ธฐํ์ ๋๊ธฐ์ง ์์๋ค๋ฉด session ๋ณ์์์ ์ฌ์ฉ์ ์ ๋ณด๋ฅผ ๊ฐ์ ธ์ ์ฌ์ฉํ๋ค. ๋ค๋ฅธ๋ถ๋ถ์ ๋์ผํ๋ค.
- toUTCString() ๋ฉ์๋๋ UTC ํ์ค ์๊ฐ๋๋ฅผ ์ฌ์ฉํ์ฌ ๋ ์ง๋ฅผ ๋ฌธ์์ด๋ก ๋ณํํฉ๋๋ค. ์) `Wed, 14 Jun 2017 07:00:00 GMT`

<br />

### ๐โโ๏ธ ์์ 8(cluster)

```js
const http = require("http");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`๋ง์คํฐ ํ๋ก์ธ์ค ์์ด๋: ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // ์์ปค ์ข๋ฃ

  cluster.on("exit", (worker, code, signal) => {
    console.log(`${worker.process.pid}๋ฒ ์์ปค๊ฐ ์ข๋ฃ๋์์ต๋๋ค.`);
    console.log("code", code, "signal", signal);
    cluster.fork();
  });
} else {
  // ์์ปค ๋ค์ด ํฌํธ์์ ๋๊ธฐ
  http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.write("<h1>Hello Node!</h1>");
      res.end("<h1>Hello Cluster</h1>");
      setTimeout(() => {
        process.exit(1);
      }, 3000);
    })
    .listen(8080);

  console.log(`${process.pid}๋ฒ ์์ปค ์คํ`);
}
```

- cluster ๋ชจ๋์ ๊ธฐ๋ณธ์ ์ผ๋ก ์ฑ๊ธ ์ค๋ ๋๋ก ์๋ํ๋ `๋ธ๋๊ฐ CPU ์ฝ์ด๋ฅผ ๋ชจ๋ ์ฌ์ฉํ  ์ ์๊ฒ ํด์ฃผ๋ ๋ชจ๋`์ด๋ค.
- ํฌํธ๋ฅผ ๊ณต์ ํ๋ ๋ธ๋ ํ๋ก์ธ์ค๋ฅผ ์ฌ๋ฌ ๊ฐ ๋ ์๋ ์์ผ๋ฏ๋ก, ์์ฒญ์ด ๋ง์ด ๋ค์ด์์ ๋ ๋ณ๋ ฌ๋ก ์คํ๋ ์๋ฒ์ ๊ฐ์๋งํผ ์์ฒญ์ด ๋ถ์ฐ๋๊ฒ ํ  ์ ์๋ค.
- ์๋ฅผ ๋ค๋ฉด, ์ฝ์ด๊ฐ ์ฌ๋ ๊ฐ์ธ ์๋ฒ๊ฐ ์์ ๋, ๋ธ๋๋ ๋ณดํต ์ฝ์ด๋ฅผ ํ๋๋ง ํ์ฉํ๋ค. ํ์ง๋ง cluster ๋ชจ๋์ ์ค์ ํ์ฌ ์ฝ์ด ํ๋๋น ๋ธ๋ ํ๋ก์ธ์ค ํ๋๊ฐ ๋์๊ฐ๊ฒ ํ  ์ ์๋ค. ์ด๋, ์ฑ๋ฅ์ด ์ฌ๋ ๋ฐฐ๊ฐ ๋๋ ๊ฒ์ ์๋์ง๋ง ์ฝ์ด๋ฅผ ํ๋๋ง ์ฌ์ฉํ  ๋์ ๋นํด ์ฑ๋ฅ์ด ๊ฐ์ ๋๋ค.
- cluster ๋ชจ๋์ ์ฌ์ฉํ๋ ๊ฒ์ด ์ฅ์ ๋ง ์๋ ๊ฒ์ ์๋๋ฉฐ, ๋ฉ๋ชจ๋ฆฌ๋ฅผ ๊ณต์ ํ์ง ๋ชปํ๋ ๋ฑ์ ๋จ์ ๋ ์๋ค. ์ธ์์ ๋ฉ๋ชจ๋ฆฌ์ ์ ์ฅํ๋ ๊ฒฝ์ฐ ๋ฌธ์ ๊ฐ ๋  ์ ์๋ค. ํ์ง๋ง ๋ ๋์ค ๋ฑ์ ์๋ฒ๋ฅผ ๋์ํ์ฌ ํด๊ฒฐ ํ  ์ ์๋ค.

<br />
