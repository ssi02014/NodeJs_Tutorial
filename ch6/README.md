# 💻 Ch6

## 📄 Express Start

```js
const express = require("express");
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 8000);

app.get("/", (req, res) => {
  // res.send("Hello Express");
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번에서 대기중");
});
```

- express 모듈 실행을 위해 app 변수에 할당한다. 익스프레스 내부에 http 모듈이 내장되어 있으므로 서버의 역할이 가능하다.
- `app.set('port', 포트)`로 서버가 실행된다. 또한, app.set(키, 값)을 사용하면 데이터를 저장할 수 있다. 저장된 데이터는 app.get(키)을 통해서 가져올 수 있다.
- `app.get(주소, 라우터)`는 주소에 대한 GET 요청이 들어올 때 어떤 동작을 할지 적는 부분이다.
- express에서는 res.write, res.end 대신 `res.send`를 사용한다. HTML 파일을 갖고 오고 싶으면 `res.sendFile`을 사용하면 된다. 단 파일의 경로를 `path` 모듈을 사용해서 지정해야 한다.
- GET 요청 외도 POST, PUT, PATCH, DELETE, OPTIONS에 대한 라우터를 위한 `app.post, app.put, app.patch, app.delete app.options` 메서드가 존재한다.
- listen을 하는 부분은 http 웹 서버와 동일하다. 포트를 연결하고 서버를 실행한다. 포트는 `app.get('port')`로 가져온다.

<br />

## 📄 app.use

- 미들웨어는 Express에서 핵심개념이다. 요청과 응답의 `중간(middle)`에 위치하여 미들웨어라 불린다.
- 미들웨어는 `요청`과 `응답`을 조작하여 기능을 추가하기도 하고, 나쁜 요청을 걸러내기도 한다.
- `라우터`나 `에러 핸들러` 또한 미들웨어의 일종이다. 따라서 미들웨어가 Express의 전부라고 해도 과언이 아니다.
- 미들웨어는 `app.use`와 함께 사용한다. app.use(미들웨어)꼴이다.

```js
app.use((req, res, next) => {
  console.log("모든 요청에 다 실행");
  next();
});
```

- app.use의 매개변수 `req`, `res`, `next`인 콜백 함수를 넣으면 된다. (이 콜백함수가 미들웨어)
- 미들웨어는 위에서 아래로 순서대로 실행되면서 요청과 응답사이에 `특별한 기능`을 추가한다.
- app.use에서 주소를 첫 번째 인수로 넣지 않으면 모든 요청에서 실행되고, 주소를 넣으면 해당하는 요청에서만 실행된다.
- app.use의 매개변수로 req, res, next를 넣었는데 여기서 3번째 next 함수는 실행하지 않으면 다음 미들웨어가 실행되지 않는다.

```
app.use(미들웨어) : 모든 요청에서 미들웨어 실행
app.use('/abc', 미들웨어): abc로 시작하는 요청에서 미들웨어 실행
app.post('/abc, 미들웨어): abc로 시작하는 POST 요청에서 미들웨어 실행
```

- 참고로 app.use나 app.get 같은 라우터에 미들웨어를 여러 개 장착할 수 있다.

```js
app.get(
  "/",
  (req, res, next) => {
    console.log("GET 요청에서만 실행 됩니다.");
    next();
  },
  (req, res) => {
    throw new Error("에러는 에러 처리 미들웨어로 간다.");
  }
);
```

- 위 예제는 app.get 라우터에 미들웨어가 두 개 연결되어 있다. 다만 이때도 next를 호출해야 다음 미들웨어로 넘어갈 수 있다.
- 또한, 위 예제에서는 지금 두 번째 미들웨어에서 에러가 발생하고 있다. 이 에러는 아래 예제의 에러 처리 미들웨어에 전달 된다.

```js
// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.message);
});
```

- 에러 처리 미들웨어는 매개변수가 `err`, `req`, `res`, `next`로 네 개이다. 모든 매개변수를 사용하지 않더라도 `매개변수가 반드시 네 개여야 한다.`
- err에는 `에러에 관한 정보`가 담겨있다. `res.status` 메서드로 `HTTP 상태 코드`를 지정할 수 있다. 참고로 `기본값은 200(성공)`이다.
- 사실 에러 처리 미들웨어를 직접 연결하지 않아도 기본적으로 Express가 에러를 처리하긴 한다. 하지만 실무에서는 직접 에러 처리 미들웨어를 연결해주는 것이 좋다.
- 에러 처리 미들웨어는 특별한 경우가 아니라면 가장 아래에 위치하도록 하자.

<br />

## 📄 express 각종 미들웨어 정리

```js
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 8000);

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

// ...
```

- 위 예제를 보면 설치한 패키지들을 불러온 뒤 app.use에 연결한다 이때 req, res, next같은 것들이 보이지 않는데 미들웨어 내부에 들어있다. next도 내부적으로 호출하기에 자동으로 다음 미들웨어로 넘어갈 수 있다.

<br />

### 🏃‍♂️ morgan

- morgan 미들웨어는 기존 로그 외에 추갖거인 로그를 확인할 수 있다.

```js
const morgan = require("morgan");
app.use(morgan("dev"));
```

<br />

### 🏃‍♂️ static

- static 미들웨어는 `정적인 파일`들을 제공하는 `라우터 역할`을 한다. 기본적으로 제공되기 때문에 설치할 필요 없이 express 객체 안에서 사용하면 된다.

```js
app.use("/", express.static(path.join(__dirname, "public")));
```

- 함수의 인자로 정적 파일들이 담겨 있는 폴더를 지정하면 된다. 현재 public 폴더가 지정되어 있다. 예를 들어 `public/stylesheets/style.css`는 `http://localhost:3000/stylesheets/style.css`로 접근할 수 있다.
- public 폴더를 만들고 css, js, 이미지 파일 등을 public에 넣으면 브라우저에서 접근할 수 있게 된다.
- 이때, 실제 서버의 폴더 경로에는 public이 있지만, 요청 주소에는 public이 없다. 이는 서버의 폴더 경로와 요청 경로가 다르므로 외부인지 서버의 구조를 쉽게 파악할 수 없게 한다. 즉 보안에 큰 도움이 된다.
- 또한 `정적 파일들을 알아서 제공`해주므로 fs.readFile로 파일을 직접 읽어서 전송할 필요가 없다.
- 요청 경로에 해당하는 파일이 없으면 알아서 내부적으로 next를 호출한다. 파일을 발견하면 다음 미들웨어는 실행되지 않는다. 이유는 응답으로 파일을 보내고 next를 호출하지 않기 때문이다.

<br />

### 🏃‍♂️ body-parser

- 요청의 본문에 있는 데이터를 해석해서 `req.body` 객체로 만들어주는 미들웨어이다. 보통 `폼 데이터`나 `ajax 요청`의 데이터를 처리한다.
- 단, `멀티 파트(이미지, 동영상, 파일)` 데이터는 처리하지 못한다. 멀티파트 경우에는 `multer` 모듈을 사용해서 처리한다.

```js
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```

- express 4.16.0 버전 이전에는 `body-parser`를 설치하는 것을 확인할 수 있다. 하지만 4.16.0 버전 이후부터는 body-parser 미들웨어의 일부 기능이 익스프레스에 내장되었으므로 따로 설치할 필요가 없다.
- 단, body-parser를 직접 설치하는 경우도 있는데 `JSON`, `URL-encoded` 형식의 데이터 외에도 `Raw`, `Text` 형식의 데이터를 추가로 해석해야 될 때이다.
- Raw 데이터는 요청의 본문이 버퍼 데이터 일때, Text는 텍스트 데이터일 때 해석하는 미들웨어이다.

```js
const bodyParser = require("body-parser");
app.use(bodyParser.raw());
app.use(bodyParser.text());
```

- 요청 데이터를 간단하게 살펴보면 `JSON`은 `JSON 형식`의 데이터 전달 방식이다. `URL-encoded`는 `주소 형식`으로 데이터를 보내는 방식이다.
- 폼 전송은 URL-encoded 방식을 주로 사용한다. urlencoded 메서드를 보면 `{ extended: false }`라는 옵션이 있다. 이 옵션이 `false`라면 노드의 `querystring` 모듈을 사용하여 쿼리스트링을 해석한다. `true`이면 `qs`모듈을 사용하여 쿼리스트링을 해석한다.
- qs 모듈을 내장 모듈이 아니라 `외부 npm 패키지`이며, querystring 모듈의 기능을 좀 더 확장한 모듈이다.
- 기존에 POST와 PUT 요청의 본문을 전달 받으려면 req.on('data'), req.on('end')로 스트림을 사용해야 했는데, body-parser를 사용하면 그럴 필요가 없다. 패키지 내부적으로 스트림을 처리해 req.body에 추가한다.

<br />

### 🏃‍♂️ cookie-parser

- cookie-parser는 요청에 동봉된 `쿠키`를 해석해 `req.cookies` 객체로 만든다. `parseCookies` 함수와 기능이 비슷하다.

```js
const cookieParser = require("cookie-parser");

// 기본 문법
app.use(cookieParser("비밀키"));

// 예제
app.use(cookieParser(process.env.COOKIE_SECRET));
```

- 해석된 쿠키들은 `req.cookies` 객체로 들어간다. 예를 들어 `name=minjae` 쿠리를 보냈다면 req.cookies는 `{ name: 'minjae' }`가 된다. 물론, 유효 기간이 지난 쿠키는 알아서 걸러낸다.
- 위 예제를 봤다싶이 첫 번째 인자로 `비밀 키`를 넣어줄 수 있다. 서명된 쿠키가 있는 경우, 제공한 비밀 키를 통해 해당 쿠키가 내 서버가 만든 쿠키임을 `검증`할 수 있다.
- 쿠키는 클라이언트에서 위조하기 쉽기 때문에 비밀 키를 통해 만들어낸 서명을 쿠키 값 뒤에 붙인다. 즉, 서명이 붙은 크키가 `name=minjae.sign`과 같은 모양이 됀다. 서명된 쿠키는 req.cookies 대신 `req.signedCookies` 객체에 들어 있다.
- 참고로, cookie-parser가 쿠키를 생성할 때 쓰이는 것은 아니다. 쿠키를 `생성/제거`하기 위해서는 `res.cookie`, `res.clearCookie` 메서드를 사용해야 한다.

```js
// 기본 문법
res.cookie(key, value, options);

// 예제
res.cookie("name", "minjae", {
  expires: new Date(Date.now() + 90000),
  httpOnly: true,
  secure: true,
});
res.clearCooke("name", "minjae", { httpOnly: true, secure: true });
```

- res.cookie는 위 예제 형식으로 사용한다. 이때 옵션은 `domain, expires, httpOnly, maxAge, path, secure` 등이 있다.
- 쿠키를 지울 때 키와 값 외에 `옵션도 정확히 일치`해야 쿠키가 지워진다. 단 `expires`나 `maxAge` 옵션까지는 일치할 필요가 없다.
- 옵션중에 `signed`라는 옵션이 있는데, 이를 `true`로 설정하면 쿠키 뒤에 서명이 붙는다. 내 서버가 쿠키를 만들었다는 것을 검증할 수 있으므로 대부분의 경우 서명 옵션을 켜두는 것이 좋다. 서명을 위한 비밀 키는 cookieParser 미들웨어 인자로 넣은 `process.env.COOKIE_SECRET`이 된다.

<br />

### 🏃‍♂️ express-session

- 세션 관리용 미들웨어이다. 로그인 등의 이유로 세션을 구현하거나 특정 사용자를 위한 데이터를 임시적으로 저장해둘 때 매우 유용하다.
- 세션은 사용자별로 req.session 객체안에 유지된다.

```js
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);
```

- express-session 1.5 버전 이전에는 내부적으로 cookie-parser를 사용하고 있어 cookie-parser 미들웨어보다 뒤에 위치해야했지만 1.5 버전 이후부터는 사용하지 않게 되서 순서가 상관없어졌다. 그래도 `cookie-parser 미들웨어 뒤에 놓는 것이 안전`하다.
- express-session은 인자로 `세션에 대한 설정`을 받는다.
  1. `resave`는 요청이 올 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 설정하는 것이다.
  2. `saveUninitialized`는 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정하는 것이다.
  3. `secret`은 클라이언트에 쿠키를 보낼 때(세션 쿠키) 안전하게 전송하기 위해 `서명`을 추가해야되는데 이때 서명에 필요한 값을 넣는다. cookie-parser의 secret과 같게 설정하는 것이 좋다.
  4. `name`은 세션 쿠키의 이름이다. 기본 값은 `connect.sid`이다.
- cookie 옵션은 세션 쿠키에 대한 설정이다. `domain, expires, httpOnly, maxAge, path, secure, sameSite` 등 일반적인 쿠키 옵션이 모두 제공된다.
- 위 예제에서는 `httpOnly`를 `true`로 설정해 클라이언트에서 쿠키를 확인하지 못하도록 했고, `secure`는 false로 해서 https가 아닌 환경에서도 사용할 수 있게 했다. 배포 시에는 https를 적용하고 secure도 true로 설정하는 것이 좋다.
- 추가적으로 위 예제에는 없지만 `store`라는 옵션도 있다. 현재는 `메모리에 세션을 저장`하도록 되어 있다. 문제는 서버를 재시작하면 메모리가 초기화되서 세션이 모두 사라진다는 것이다. 따라서 이것도 배포 시에는 store에 `DB`를 연결해 세션을 유지하는 것이 좋다. 보통 `Redis(레디스)`가 자주 쓰인다.

```js
req.session.name = "minjae"; // 세션 등록
req.sessionID; // 세션 아이디 확인
req.session.destroy(); // 세션 모두 제거
```

- express-session으로 만들어진 `req.session` 객체에 값을 대입하거나 삭제해서 세션을 변경할 수 있다. 세션을 한 번에 삭제하려면 `req.session.destroy` 메서드를 호출하면 된다.
- 현재의 세션의 아이디는 req.sessionID로 확인할 수 있다.
- 세션을 강제로 저장하기 위해 req.session.sava 메서드도 존재하지만, 일반적으로 요청이 끝날 때 자동 호출되므로 직접 sava 메서드를 호출하는 일은 거의 없다.
- express-session을 통해 전송한 세션 쿠키는 모양이 조금 특이한데, 서명한 쿠키 앞에 `s:`이 붙습니다. 이는 실제로 `encodeURIComponent` 함수가 실행되어 `s%3A`가 됩니다.

<br />

### 🏃‍♂️ 마들웨어 특성 활용 및 알아보기 (중간 정리)

- 미들웨어는 `req, res, next를 매개변수로 가지는 함수`이다. 에러 처리 미들웨어만 예외적으로 err, req, res, next를 가진다.
- 미들웨어는 `app.use`나 `app.get`, `app.post` 등으로 장착한다. 특정한 주소의 요청에만 미들웨어가 실행하게 하려면 첫 번째 인수로 주소를 넣으면 된다.

```js
app.use(
  morgan("dev"),
  express.static("/", path.join(__dirname, "public")),
  express.join(),
  express.urlencoded({ extended: false }),
  cookieParser(process.env.COOKIE_SECRET)
);
```

- 위와 같이 `동시에 여러 개의 미들웨어를 장착`할 수 있으며, 다음 미들웨어로 넘어가려면 `next 함수`를 호출해야 한다. 위 미들웨어들은 내부적으로 next를 호출하고 있으므로 연달아 쓸 수 있다.
- next를 호출하지 않는 미들웨어는 `res.send`나 `res.sendFile` 등의 메서드로 응답을 보내야 한다.
- `express.static`과 같은 미들웨어는 정적 파일을 제공할 때 next 대신 `res.sendFile` 메서드로 응답을 보낸다. 따라서 정적 파일을 제공하는 경우 그 밑에 있는 express.json, express.urlencoded, cookieParser 미들웨어는 실행되지 않는다.
- 미들웨어 장착 순서에 따라 어떤 미들웨어는 실행되지 않을 수도 있다는 것을 꼭 기억해두자.
- 만약 next도 호출하지 않고 응답도 보내지 않는다면 클라이언트는 응답을 받지 못해 하염없이 기다리게 된다.

```js
next(); // 다음 미들웨어로
next("route"); // 다음 라우터로
next(error); // 에러 핸들러로
```

- 지금까지는 next에 아무런 인수를 넣지 않았지만 위 예제처럼 next 함수에 인수를 넣을 수도 있다. 단, 인수를 넣는다면 특수한 동작을 한다.
- `route`라는 문자열을 넣으면 다음 라우터의 미들웨어로 바로 이동하고, 그 외의 인수를 넣으면 바로 에러 처리 미들웨어로 이동한다.
- 이때, 인수는 에러 처리 미들웨어의 err 매개변수가 된다. 라우터에서 에러가 발생할 때 에러를 next(err)을 통해 에러 처리 미들웨어로 넘긴다.

```js
app.use(
  (req, res, next) => {
    req.data = "데이터 넣기";
    next();
  },
  (req, res, next) => {
    console.log(req.data); // 데이터 받기
    next();
  }
);
```

- 미들웨어 간에 데이터를 전달하는 방법도 있다. 세션을 사용한다면 `req.session` 객체에 데이터를 넣어도 되지만, 세션이 유지되는 동안에 데이터도 계속 유지된다는 단점이 있다. 만약 요청이 끝날 때까지만 데이터를 유지하고 싶다면 req 객체에 데이터를 넣어두면 된다.
- 위 예제처럼 작성하면 현재 요청이 처리되는 동안 req.data를 통해 `미들웨어 간에 데이터를 공유`할 수 있다. 새로운 요청이 오면 req.data는 초기화된다.
- 참고로 속성명이 꼭 data일 필요는 없지만 다른 미들웨어와 겹치지 않게 조심해야 한다. 예를 들어 body로하면 body-parser 미들웨어와 겹친다.

```
app.set vs app.use

app.set으로 Express 데이터를 저장할 수 있다. app.get 또는 req.app.get으로 어디서든지 데이터를 가져올 수 있다.
하지만 app.set을 사용하지 않고 req 객체에 데이터를 넣어서 다음 미들웨어로 전달하는 이유가 있다.
app.set은 Express에서 전역으로 사용되므로 사용자 개개인의 값을 넣기에는 부적절하며, 앱 전체 설정을 공유할 때 사용된다.
req 객체는 요청을 보낸 사용자 개개인에게 귀속되므로 req 객체를 통해 개인의 데이터를 전달하는 것이 좋다.
```

- 미들웨어를 사용할 때 유용한 패턴 한 가지를 소개한다. 바로 미들웨어 안에 미들웨어를 넣는 방식이다.

```js
app.use(morgan("dev"));

// or

app.use((req, res, next) => {
  morgan("dev")(req, res, next);
});
```

- 위 예제의 두 방식은 같은 기능을 한다. 하지만 미들웨어안에 미들웨어를 넣는 패턴이 유용한 이유는 기존 미들웨어의 기능을 확장할 수 있기 때문이다.

```js
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    morgan("combined")(req, res, next);
  } else {
    morgan("dev")(req, res, next);
  }
});
```

- 위 예제처럼 분기 처리를 할 때도 유용하게 사용할 수 있다.

<br />

### 🏃‍♂️ multer

- multer는 이미지, 동영상 등을 비롯한 여러 가지 파일들을 멀티파트 형식으로 업로드 할 때 사용하는 미들웨어이다.
- 멀티파트 형식이란 `enctype`이 `multipart/form-data`인 폼을 통해 업로드하는 데이터의 형식을 의미한다.

```js
<form id="form" action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="image" />
  <input type="text" name="title" />
  <button type="submit">업로드</button>
</form>
```

- 위와 같이 폼을 통해 업로드하는 파일은 body-parser로는 처리할 수 없고 직접 파싱(해석)하기도 어려우므로 multer 미들웨어를 사용하면 편리하다.

```js
const multer = require("multer");
const fs = require("qs");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
```

- multer 함수의 인수로 설정을 넣는다.
- `storage` 속성에는 어디에(destination) 어떤 이름으로(filename) 저장할지를 넣는다.
- `destination`과 `filename` 함수의 req 매개변수에는 요청에 대한 정보가 있다.
- `file` 객체에는 업로드한 파일에 대한 정보가 있다.
- `done` 매개변수는 함수이다. 첫 번째 인수에는 에러가 있다면 `에러`를 넣고, 두 번째 인수에는 `실제 경로`나 `파일 이름`을 넣어주면 된다. req나 file의 데이터를 가공해서 done으로 넘기는 방식이다.
- 위 예제에서는 uploads라는 폴더에 [파일명+현재시간.확장자]파일명으로 업로드하고 있다. 현재 시간을 넣어주는 이유는 업로드하는 파일명이 겹치는 것을 막기 위함이다.
- limits 속성에는 업로드에 대한 제한 사항을 설정할 수 있다. 파일 사이즈(fileSize, 바이트 단위)는 `5MB`로 제한했다.

<br />

```js
try {
  fs.readdirSync("uploads");
} catch (err) {
  console.log("uploads 폴더가 없어 uploads 폴더를 생성한다.");
  fs.mkdirSync("uploads");
}
```

- 위에서 multer 설정을 실제로 활용하기 위해서는 서버에 `uploads`라는 폴더가 꼭 존재해야한다. 없다면 직접 만들거나 `fs모듈`을 사용해서 서버를 시작할 때 생성한다.
- 설정이 끝나면 `upload` 변수가 생기는데, 여기에 다양한 종류의 미들웨어가 들어있다.

<br />

```js
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file, req.body);
  res.send("ok");
});
```

- 파일을 하나만 업로드하는 경우 `single` 미들웨어를 사용한다.
- single 미들웨어를 라우터 미들웨어 `앞에` 넣어두면, multer 설정에 따라 파일 업로드 후 req.file 객체가 생성된다. 인수는 `input` 태그의 `name`이나 `폼 데이터`의 `key`와 일치하게 넣으면 된다.
- 업로드 성공 시 결과는 `req.file` 객체 안에 들어 있다. `req.body`에는 파일이 아닌 데이터인 `title`이 들어 있다.

```js
<form id="form" action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="image" multiple />
  <input type="text" name="title" />
  <button type="submit">업로드</button>
</form>
```

```js
app.post("upload", upload.array("many"), (req, res) => {
  console.log(req.files, req.body);
  res.send("ok");
});
```

- 여러 파일을 업로드 하는 경우 HTML의 input 태그에는 `multiple` 속성을 추가한다. 또한, single대신 `array` 미들웨어로 교체한다.
- 업로드 결과도 req.file대신 `req.files` 배열에 들어 있다.

```js
<form id="form" action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="image1" />
  <input type="file" name="image2" />
  <input type="text" name="title" />
  <button type="submit">업로드</button>
</form>
```

```js
app.post(
  "/upload",
  upload.fields([{ name: "image1" }, { name: "image2" }]),
  (req, res) => {
    console.log(req.files, req.body);
    res.send("ok");
  }
);
```

- 파일을 여러 개 업로드하지만 input 태그나 폼 데이터의 키가 다른 경우에는 `fields `미들웨어를 사용한다.
- 업로드 결과도 `req.files.image1`, `req.files.image2`에 각각 들어 있다.

```js
<form id="form" action="/upload" method="post" enctype="multipart/form-data">
  <input type="text" name="title" />
  <button type="submit">업로드</button>
</form>
```

```js
app.post("/upload", upload.none(), (req, res) => {
  console.log(req.body);
  res.send("ok");
});
```

- 특수한 경우지만 파일을 업로드하지 않고도 멀티파트 형식으로 업로드 하는 경우가 있다. 그럴 때는 `none` 미들웨어를 사용한다.
- 파일을 업로드하지 않았으므로 `req.body`만 존재한다.

<br />

## 📄 Router 객체로 라우팅 분리하기

- 기존에는 라우터를 만들 때 요청 메서드와 주소별로 분기 처리를 하느라 코드가 매우 복잡했다. 하지만 익스프레스를 사용하면 라우팅을 깔끔하게 관리할 수 있다.
- app.js에서 app.get같은 메서드가 라우터 부분이다. 라우터를 많이 연결하면 app.js 코드가 매우 길어지므로 익스프레스에서는 라우터를 분리할 수 잇는 방법을 제공한다.

```js
// routers/index.js
const express = require("express");

const router = express.Router();

// GET / 라우터
router.get("/", (req, res) => {
  res.send("Hello, Express");
});

module.exports = router;
```

```js
// routers/user.js
const express = require("express");

const router = express.Router();

// GET /user 라우터
router.get("/", (req, res) => {
  res.send("Hello, User");
});

module.exports = router;
```

- 위와 같이 만든 index.js와 user.js를 app.use를 통해 app.js에 연결한다. 또한, 에러 처리 미들웨어 위에 404상태 코드를 응답하는 미들웨어를 추가한다.

```js
const indexRouter = require("./routes");
const userRouter = require("./routes/user");

const app = express();

// 다른 미들웨어...

app.use("/", indexRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});
```

- index.js와 user.js는 모양이 거의 비슷하지만, 다른 주소의 라우터 역할을 하고 있다. `app.use로 연결할 때의 차이` 때문이다.
- indexRouter는 `app.use('/')`에 연결했고, useRouter는 `app.use('/user')`에 연결했다.
- indexRouter는 use의 `'/'`와 get의 `'/'`가 합쳐져 `GET / 라우터`가 됬다.
- userRouter는 use의 `'/user'`와 get의 `'/'`가 합쳐져 `GET /user 라우터`가 됬다.
- 이렇게 app.use로 연결할 때 `주소가 합쳐진다는 것`을 염두해 두면 된다.

<br />

- 이전에 next 함수에 다음 라우터로 넘어가는 기능이 있다고 소개했다. 바로 next('route')이며, 라우터에 연결된 나머지 미들웨어를 건너뛰고 싶을 때 사용한다.

```js
router.get(
  "/",
  function (req, res, next) {
    next("route");
  },
  function (req, res, next) {
    console.log("실행x");
    next();
  },
  function (req, res, next) {
    console.log("실행x");
    next();
  }
);

router.get("/", function (req, res, next) {
  console.log("실행된다");
  res.send("Hello, Express");
});
```

- 위 예제처럼 같은 주소의 라우터를 여러 개 만들어도 된다. 라우터가 몇 개든 간에 next()를 호출하면 다음 미들웨어가 실행된다.
- 첫 번째 라우터의 첫 번째 미들웨어에서 next() 대신 next('route')를 호출했다. 이 경우 2, 3번째 미들웨어는 실행되지 않는다. 대신 주소와 일치하는 다음 라우터로 넘어간다.
- 이때 유용한 팁이, 라우터 주소에는 정규표현식을 비롯한 특수 패턴을 사용할 수 있다. 여러가지 패턴이 있는데 자주 쓰이는 패턴만 알아보자.

<br />

### 🏃‍♂️ 파라미터, 쿼리스트링

```js
router.get("/user/:id", function (req, res) {
  console.log(req.params, req.query);
  res.send(`Hello, ${req.params.id}`);
});
```

- 지금 주소에 `:id`가 있다. 이는 문자 그대로 :id를 의미하는 것이 아니다. 이 부분에는 다른 값을 넣을 수 있다.
- `user/1`이나 `user/123` 등의 요청도 이 라우터가 처리하게 된다. 이 방식의 장점은 `:id`에 해당하는 1이나 123을 조회할 수 있다는 점이며, req.params 객체 안에 들어 있다.
- :id면 `req.params.id`로, :type이면 `req.params.type`으로 조회할 수 있다.
- 단, 이 패턴의 주의점은 `일반 라우터보다 뒤에 위치`해야 한다는 점이다. 다양한 라우터를 아우르는 와일드 카드 역할을 하므로 일반 라우터보다는 뒤에 위치해야 다른 라우터를 방해하지 않는다.

```js
router.get("/user/:id", function (req, res) {
  console.log("이놈만 실행됩니다.");
});
router.get("/user/like", function (req, res) {
  console.log("전혀 실행되지 않는다.");
});
```

- `/user/like` 같은 라우터는 `/user/:id` 같은 라우트 매개변수를 쓰는 라우터보다 위에 위치해야 한다.
- 추가적으로, 주소에 `쿼리스트링`을 쓸 때도 있다. 쿼리스트링의 키-값 정보는 req.query 객체 안에 들어 있다.
- 예를 들어 `/user/123?limit=5&skip=10` 이라는 주소의 요청이 들어오면 req.params와 req.query 객체는 다음과 같다.

```js
{ id: '123' } // req.params
{ limit: '5', skip: '10' } // req.query
```

<br />

### 🏃‍♂️ 404 미들웨어

- app.js에서 에러 처리 미들웨어 위에 넣어둔 미들웨어는 일치하는 라우터가 없을 때 404상태 코드를 응답하는 역할을 한다.
- 미들웨어가 존재하지 않아도 익스프레스가 자체적으로 404 에러를 처리해주기는 하지만, 웬만하면 404 응답 미들웨어가 에러 처리 미들웨어를 연결해주는 것이 좋다.

```js
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});
```

- 해당 미들웨어를 제거하면 404 상태 코드와 함께 Cannot GET /abc 메시지가 응답된다.

<br />

### 🏃‍♂️ 라우터 활용법/팁

- 라우터에서 자주 쓰이는 활용법으로 app.route나 router.route가 있다.

```js
router.get("/abc", (req, res) => {
  res.send("GET /abc");
});

router.post("/abc", (req, res) => {
  res.send("POST /abc");
});
```

- 위 예제처럼 주소는 같지만 메서드가 다른 코드가 있을 대 이를 하나의 덩어리로 줄일 수 있다.

```js
router
  .route("/abc")
  .get((req, res) => {
    res.send("GET /abc");
  })
  .post((req, res) => {
    res.send("POST /abc");
  });
```

- 다시 위에 처럼 수정하면 관련있는 코드끼리 묶어 더 보기 좋게 만들 수 있다.

<br />

## 📄 req, res 객체 살펴보기

- 익스프레스 req, res 객체는 http 모듈의 req, res 객체를 `확장`한 것이다. 기존 http 모듈의 메서드도 사용할 수 있고, 익스프레스가 추가한 메서드나 속성을 사용할 수도 있다.
- 예를 들어, `res.writeHead`, `res.write`, `res.end` 메서드를 그대로 사용할 수 있으면서 `res.send`나 `res.sendFile` 같은 메서드도 사용할 수 있다.
- 익스프레스가 많은 속성과 메서드를 추가했지만, 자주 쓰이는 것 위주로만 알아보자.

<br />

### 🏃‍♂️ 자주쓰이는 req 객체 속성

- req.app: req 객체를 통해 `app` 객체에 접근할 수 있다. `req.app.get('port')`와 같은 식으로 사용 할 수 있다.
- req.body: `body-parser` 미들웨어가 만드는 요청의 본문을 해석한 객체이다.
- req.cookies: `cookie-parser` 미들웨어가 만드는 요청의 쿠키를 해석한 객체이다.
- req.signedCookies: `서명된 쿠키`들은 req.cookies 대신 여기에 담겨있다.
- req.ip: 요청의 `ip 주소`가 담겨있다.
- req.params: `라우트 매개변수(파라미터)`에 대한 정보가 담긴 객체이다.
- req.query: `쿼리스트링`에 대한 정보가 담긴 객체이다.
- req.get(헤더 이름): `헤더의 값`을 가져오고 싶을 때 사용하는 메서드이다.

<br />

### 🏃‍♂️ 자주쓰이는 res 객체 속성

- res.app: req.app처럼 res 객체를 통해 `app` 객체에 접근할 수 있다.
- res.cookie(키, 값, 옵션): `쿠키를 설정`하는 메서드이다.
- res.clearCookie(키, 값, 옵션): `쿠키를 제거`하는 메서드이다.
- res.end(): `데이터 없이 응답`을 보낸다.
- res.json(JSON): `JSON 형식의 응답`을 보낸다.
- res.redirect(주소): `리다이렉트할 주소`와 함께 응답을 보낸다.
- res.render(뷰, 데이터): `템플릿 엔진`을 렌더링해서 응답할 때 사용하는 메서드이다.
- res.send(데이터): `데이터와 함께 응답`을 보낸다. 데이터는 `문자열`일 수도 있고 `HTML` 일 수도 있고, `버퍼`일 수도 있고 `객체나 배열`일 수도 있다.
- res.sendFile(경로): `경로에 위치한 파일을 응답`한다.
- res.set(헤더, 값): `응답의 헤더를 설정`한다.
- res.status(코드): 응답 시의 `HTTP 상태 코드`를 지정한다.

<br />

```js
res.status(201).cookie("test", "test").redirect("/admin");
```

- 위 예제처럼 req나 res 객체의 메서드는 다음과 같이 메서드 체이닝을 지원하는 경우가 많다. 메서드 체이닝을 활용하면 코드양을 줄일 수 있다.

<br />

## 📄 템플릿 엔진 사용하기
