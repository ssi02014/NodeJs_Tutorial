# 💻 Ch4
## 📄 4강 정리
### 🏃‍♂️ 예제1
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
      console.log("8080번 포트에서 서버 대기중입니다.");
    });
```

![image](https://user-images.githubusercontent.com/64779472/143277708-d95207d7-22fd-4f9e-8751-f25afbc31f08.png)

- res 객체에는 writeHead와 res.write, res.end메서드가 있다.
- writeHead는 응답에 대한 정보를 기록하는 메서드이다. 첫 번째 인수로 성공적인 요청임을 의미하는 200, 두 번째 인수로 응답에 대한 정보를 보내는데 콘텐츠의 형식이 HTML임을 알리고있다. 또한 한글 표시를 위해 charset을 utf-8로 지정했다. 이정보가 기록되는 부분은 헤더(Header)라고 부른다.
- write 메서드의 첫 번째 인수는 클라이언트로 보낼 데이터이다. 지금은 HTML 모양의 문자열을 보냈지만 버퍼를 보낼 수도 있다. 또한, 여러번 호출해서 데이터를 여러 개 보내도 된다. 데이터가 기록되는 부분은 본문(Body)라고 부른다.
- end는 응답을 종료하는 메서드이다. 만약 인수가 있다면 그 데이터도 클라이언트에 보내고 응답을 종료한다.

<br />

### 🏃‍♂️ 예제2
```js
  // ...

  const server = http.createServer((req, res) => {
    // ...
  });

  server.listen(8080);
  server.on("listening", () => {
    console.log("8080번 포트에서 서버 대기중입니다.");
  });
  server.on("error", (error) => {
    console.error(error);
  });
```
- 예제1처럼 listen메서드에 콜백 함수를 넣을 수도 있지만, 위 예제처럼 서버에 listening 이벤트 리스너를 붙여도 된다.
- 추가로 error 이벤트 리스너도 붙여봤다.

<br />

### 🏃‍♂️ 예제3
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
    console.log("8080번 포트에서 서버 대기중입니다.");
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
    console.log("8081번 포트에서 서버 대기중입니다.");
  });
```
- createServer를 원하는 만큼 호출하면 여러 개의 서버를 실행할 수도 있다.
- 이때 주의할 점은 포트 번호가 달라야 한다. 포트 번호가 같으면 `EADDRINUSE` 에러가 발생한다.
- 단, 실무에서는 이런 식으로 서버를 여러 개 띄우는 일은 드물다.

<br />

### 🏃‍♂️ 예제3
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
      console.log("8080번 포트에서 서버 대기중입니다.");
    });
```
- 보통 res.write나 res.end로 일일이 HTML을 적는 것은 비효율적이다. 미리 HTML을 파일을 만들어주면 좋다. 그 HTML 파일을 fs 모듈로 읽어서 전송할 수 있다.
- 위 예제에서 요청이 들어오면 먼저 fs 모듈로 HTML 파일을 읽는다. 그리고 data 변수에 저장된 버퍼를 그대로 클라이언트에 보내면 된다. 
- 예기치 못한 에러가 발생한 경우에는 에러 메시지를 응답한다. 이때 에러 메시지는 일반 문자열이므로 `text/plain`을 사용한다.

<br />