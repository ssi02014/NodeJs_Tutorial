# 💻 Ch6
## 📄 6강 정리
### 🏃‍♂️ Express Start
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
- app.get(주소, 라우터)는 주소에 대한 GET 요청이 들어올 때 어떤 동작을 할지 적는 부분이다.
- express에서는 res.write, res.end 대신 `res.send`를 사용한다. HTML 파일을 갖고 오고 싶으면 res.sendFile을 사용하면 된다. 단 파일의 경로를 path 모듈을 사용해서 지정해야 한다.
- listen을 하는 부분은 http 웹 서버와 동일하다.

<br />

### 🏃‍♂️ app.use
```js
  //...

  app.use((req, res, next) => {
    console.log("모든 요청에 다 실행");
    next();
  });

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

  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err.message);
  });

  app.listen(8000, () => {
    //...
  });
```
- 미들웨어는 익스프레스에서 핵심개념이다. 요청과 응답의 중간에 위치하여 미들웨어라 불린다.
- 미들웨어는 요청과 응답을 조작하여 기능을 추가하기도 하고, 나쁜 요청을 걸러내기도 한다.
- 라우터나 에러 핸들러 또한 미들웨어의 일종이다.
- 미들웨어는 app.use와 함께 사용한다. app.use(미들웨어)꼴이다.
- 미들웨어는 위에어 아래로 순서대로 실행되면서 요청과 응답사이에 특별한 기능을 추가한다.
- app.use에서 주소를 첫 번째 인수로 넣지 않으면 모든 요청에서 실행되고, 주소를 넣으면 해당하는 요청에서만 실행된다.
- app.use의 매개변수로 req, res, next를 넣었는데 여기서 3번째 next 함수는 실행하지 않으면 다음 미들웨어로 넘어가지 않는다. 

<br />

### 🏃‍♂️ 각종 미들웨어
```js
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
```
- 미들웨어는 req, res, next를 매개변수로 가지는 함수로서 app.use나 app.get, app.post 등으로 장착한다.
- 에러처리 미들웨어만 예외적으로 err, req, res, next를 가진다.
- 특정한 주소의 요청에만 미들웨어가 실행되게 하려면 첫 번째 인수로 주소를 넣으면 된다.
- 다음 미들웨어로 넘어가려면 ​next 함수를 호출해야 한다. 위 예제의 미들웨어들은 내부적으로 next를 호출하고 있으므로 연달아 쓸 수 있다. next를 호출하지 않는 미들웨어는 res.send나 res.sendFile 등의 메서드로 응답을 보내야 한다. 만약 next도 호출하지 않고 응답도 보내지 않는다면 클라이언트는 응답을 받지 못해 하염없이 기다리게 된다.

<br />

### 🏃‍♂️ multer
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
- `destination`과 `filename` 함수의 req 매개변수에는 요청에 대한 정보가, file 객체에는 업로드한 파일에 대한 정보가 있다. 
- `done` 매개변수는 함수이다. 첫 번째 인수에는 에러가 있다면 에러를 넣고, 두 번째 인수에는 실제 경로나 파일 이름을 넣어주면 된다. req나 file의 데이터를 가공해서 done으로 넘기는 방식이다.
- 위 예제에서는 uploads라는 폴더에 [파일명+현재시간.확장자]파일명으로 업로드하고 있다. 현재 시간을 넣어주는 이유는 업로드하는 파일명이 겹치는 것을 막기 위함이다.
- limits 속성에는 업로드에 대한 제한 사항을 설정할 수 있다. 파일 사이즈(fileSize, 바이트 단위)는 5MB로 제한했다.

<br />

```js
  try {
    fs.readdirSync("uploads");
  } catch (err) {
    console.log("uploads 폴더가 없어 uploads 폴더를 생성한다.");
    fs.mkdirSync("uploads");
  }
```
- 위에서 multer 설정을 실제로 활용하기 위해서는 서버에 uploads라는 폴더가 꼭 존재해야한다. 없다면 직접 만들거나 fs모듈을 사용해서 서버를 시작할 때 생성한다.

<br />

```js
  app.post('upload', upload.single('image'), (req, res) => {
    console.log(req.file, req.body);
    res.send('ok');
  });
```
- 파일을 하나만 업로드하는 경우 `single` 미들웨어를 사용한다.
- single 미들웨어를 라우터 미들웨어 앞에 넣어두면, multer 설정에 따라 파일 업로드 후 req.file 객체가 생성된다. 인수는 input 태그의 name이나 폼 데이터의 키와 일치하게 넣으면 된다.
- 업로드 성공 시 결과는 req.file 객체 안에 들어 있다. req.body에는 파일이 아닌 데이터인 title이 들어 있다.

<br />

```js
  app.post('upload', upload.array('many'), (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
  });
```
- 여러 파일을 업로드 하는 경우 single대신 `array` 미들웨어로 교체한다.
- 업로드 결과도 req.file대신 req.files 배열에 들어 있다.

<br />

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
- 업로드 결과도 req.files.image1, req.files.image2에 각각 들어 있다.

<br />

```js
  app.post('/upload', upload.none(), (req, res) => {
    console.log(req.body);
    res.send('ok');
  });
```
- 특수한 경우지만 파일을 업로드하지 않고도 멀티파트 형식으로 업로드 하는 경우가 있다. 그럴 때는 `none` 미들웨어를 사용한다.
- 파일을 업로드하지 않았으므로 req.body만 존재한다.

<br />