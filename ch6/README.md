# 💻 Ch6
## 📄 6강 정리
### 🏃‍♂️ 예제1(Express Start)
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
- app.set('port', 포트)로 서버가 실행된다. 또한, app.set(키, 값)을 사용하면 데이터를 저장할 수 있다. 저장된 데이터는 app.get(키)을 통해서 가져올 수 있다.
- app.get(주소, 라우터)는 주소에 대한 GET 요청이 들어올 때 어떤 동작을 할지 적는 부분이다.
- express에서는 res.write, res.end 대신 res.send를 사용한다. HTML 파일을 갖고 오고 싶으면 res.sendFile을 사용하면 된다. 단 파일의 경로를 path 모듈을 사용해서 지정해야 한다.
- listen을 하는 부분은 http 웹 서버와 동일하다.

<br />

### 🏃‍♂️ 예제2(미들웨어1: app.use)
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