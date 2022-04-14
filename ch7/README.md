# 💻 MySQL-Ch7

## 📄 데이터베이스란?

- `데이터베이스`는 관련성을 가지며 중복이 없는 데이터들의 집합이다. 이러한 데이터베이스를 관리하는 시스템을 `DBMS(DataBase Management System)` 데이터 베이스 관리 시스템이라고 부른다.
- 보통 서버의 하드 디스크나 SSD 등의 저장 매체에 데이터를 저장한다. 저장 매체가 고장나거나 사용자가 직접 데이터를 지우지 않는 이상 계속 데이터가 보존되므로 서버 종료 여부와 상관없이 데이터를 지속적으로 사용할 수 있다.
- 또한, 서버에 데이터베이스를 올리면 `여러 사람이 동시에 사용`할 수 있다. 사람들에게 `각각 다른 권한`을 줘서 어떤 사람은 읽기만 가능하고, 어떤 사람은 모든 작업을 가능하게 할 수 있다.
- 데이터베이스를 관리하는 DBMS중에서 `RDBMS(Relational DBMS)`라고 부르는 관계형 DBMS가 많이 사용된다. 대표적으로`(Oracle, MySQL, MSSQL)`등이 있다. 이들은 SQL 이라는 언어를 사용해 데이터를 관리한다.

<br />

## 📄 MySQL 설치

- brew로 설치

```
$brew install mysql
$brew services start mysql
$brew_secure_installation
```

- MySQL 실행

```
$mysql -h localhost -u root -p
Enter password: (패스워드 입력)
```

- MySQL 종료

```sql
mysql> exit
```

<br />

## 📄 데이터베이스 생성

```sql
-- nodejs 데이터베이스 생성
mysql> CREATE SCHEMA `nodejs` DEFAULT CHARACTER SET utf8

-- nodejs 데이터베이스 사용
mysql> use nodejs;
```

- `CREATE SCHEMA [데이터베이스명]`이 데이터베이스를 생성하는 명령어이다.
- `SCHEMA(스키마)`라고 되어있는데, MySQL에서 데이터베이스와 스키마는 같은 개념이다.
- 위 명령어 `nodejs`라는 이름의 데이터베이스를 생성함을 의미한다. 그 후 `use nodejs;` 명령어를 입력해 nodejs 데이터베이스를 사용하겠다는 것을 MySQL에 알린다.
- CREATE SCHEMA 뒤에 `DEFAULT CHARACTER SET utf8`을 붙여 한글을 사용할 수 있게 만든다.
- 참고로 SQL 구문을 입력할 때는 마지막에 `세미콜론(;)`을 붙여야 실행된다.
- CREATE SCHEMA와 같이 MySQL이 기본적으로 알고 있는 구문을 예약어라고 한다. 예약어는 소문자로 써도 되지만, 대문자로 쓰는게 좋다. 그 이유는 nodejs와 같은 사용자가 직접 만든 이름과 구분하기 위해서다.

<br />

## 📄 테이블 생성하기

- 테이블이란 `데이터가 들어갈 수 있는 틀`을 의미하며, 테이블에 맞는 데이터만 들어갈 수 있다.
- 아래 예제는 사용자의 정보를 저장하는 테이블을 만드는 예제이다. (이때, 한글자라도 잘못 입력하면 에러가 발생하니 조심해야한다.)

```sql
mysql> CREATE TABLE nodejs.users (
    -> id INT NOT NULL AUTO_INCREMENT,
    -> name VARCHAR(20) NOT NULL,
    -> age INT UNSIGNED NOT NULL,
    -> married TINYINT NOT NULL,
    -> comment TEXT NULL,
    -> created_at DATETIME NOT NULL DEFAULT now(),
    -> PRIMARY KEY(id),
    -> UNIQUE INDEX name_UNIQUE (name ASC))
    -> COMMENT = '사용자 정보'
    -> DEFAULT CHARACTER SET = utf8
    -> ENGINE = InnoDB;
```

- `CREATE TABLE nodejs.users`를 입력했으므로 nodejs 데이터베이스 내에 users 테이블을 생성하는 것이다.
- 위 예제에서 `use nodejs;` 명령어를 실행했으니 `CREATE TABLE users`처럼 데이터베이스명은 생략해도 된다.
- 아래에 한 줄에 하나씩 `콤마(,)`로 구분해 `컬럼(Column)`들을 만들었다.
- 순서대로 id(고유 식별자), name(이름), age(나이), married(결혼 여부), comment(자기소개), created_at(로우 생성일)입니다.
- 컬럼을 정의해두면 앞으로 데이터를 넣을 때 컬럼 규칙에 맞는 정보들만 넣을 수 있게 된다. 생년월일이나 몸무게와 같이 컬럼으로 만들어두지 않은 정보들은 저장할 수 없다.

<br />

### 🏃‍♂️ 컬럼의 자료형

<br />
