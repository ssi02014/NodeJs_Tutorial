# ๐ป MySQL-Ch7

## ๐ ๋ฐ์ดํฐ๋ฒ ์ด์ค๋?

- `๋ฐ์ดํฐ๋ฒ ์ด์ค`๋ ๊ด๋ จ์ฑ์ ๊ฐ์ง๋ฉฐ ์ค๋ณต์ด ์๋ ๋ฐ์ดํฐ๋ค์ ์งํฉ์ด๋ค. ์ด๋ฌํ ๋ฐ์ดํฐ๋ฒ ์ด์ค๋ฅผ ๊ด๋ฆฌํ๋ ์์คํ์ `DBMS(DataBase Management System)` ๋ฐ์ดํฐ ๋ฒ ์ด์ค ๊ด๋ฆฌ ์์คํ์ด๋ผ๊ณ  ๋ถ๋ฅธ๋ค.
- ๋ณดํต ์๋ฒ์ ํ๋ ๋์คํฌ๋ SSD ๋ฑ์ ์ ์ฅ ๋งค์ฒด์ ๋ฐ์ดํฐ๋ฅผ ์ ์ฅํ๋ค. ์ ์ฅ ๋งค์ฒด๊ฐ ๊ณ ์ฅ๋๊ฑฐ๋ ์ฌ์ฉ์๊ฐ ์ง์  ๋ฐ์ดํฐ๋ฅผ ์ง์ฐ์ง ์๋ ์ด์ ๊ณ์ ๋ฐ์ดํฐ๊ฐ ๋ณด์กด๋๋ฏ๋ก ์๋ฒ ์ข๋ฃ ์ฌ๋ถ์ ์๊ด์์ด ๋ฐ์ดํฐ๋ฅผ ์ง์์ ์ผ๋ก ์ฌ์ฉํ  ์ ์๋ค.
- ๋ํ, ์๋ฒ์ ๋ฐ์ดํฐ๋ฒ ์ด์ค๋ฅผ ์ฌ๋ฆฌ๋ฉด `์ฌ๋ฌ ์ฌ๋์ด ๋์์ ์ฌ์ฉ`ํ  ์ ์๋ค. ์ฌ๋๋ค์๊ฒ `๊ฐ๊ฐ ๋ค๋ฅธ ๊ถํ`์ ์ค์ ์ด๋ค ์ฌ๋์ ์ฝ๊ธฐ๋ง ๊ฐ๋ฅํ๊ณ , ์ด๋ค ์ฌ๋์ ๋ชจ๋  ์์์ ๊ฐ๋ฅํ๊ฒ ํ  ์ ์๋ค.
- ๋ฐ์ดํฐ๋ฒ ์ด์ค๋ฅผ ๊ด๋ฆฌํ๋ DBMS์ค์์ `RDBMS(Relational DBMS)`๋ผ๊ณ  ๋ถ๋ฅด๋ ๊ด๊ณํ DBMS๊ฐ ๋ง์ด ์ฌ์ฉ๋๋ค. ๋ํ์ ์ผ๋ก`(Oracle, MySQL, MSSQL)`๋ฑ์ด ์๋ค. ์ด๋ค์ SQL ์ด๋ผ๋ ์ธ์ด๋ฅผ ์ฌ์ฉํด ๋ฐ์ดํฐ๋ฅผ ๊ด๋ฆฌํ๋ค.

<br />

## ๐ MySQL ์ค์น

- brew๋ก ์ค์น

```
$brew install mysql
$brew services start mysql
$brew_secure_installation
```

- MySQL ์คํ

```
$mysql -h localhost -u root -p
Enter password: (ํจ์ค์๋ ์๋ ฅ)
```

- MySQL ์ข๋ฃ

```sql
mysql> exit
```

<br />

## ๐ ๋ฐ์ดํฐ๋ฒ ์ด์ค ์์ฑ

```sql
-- nodejs ๋ฐ์ดํฐ๋ฒ ์ด์ค ์์ฑ
mysql> CREATE SCHEMA `nodejs` DEFAULT CHARACTER SET utf8

-- nodejs ๋ฐ์ดํฐ๋ฒ ์ด์ค ์ฌ์ฉ
mysql> use nodejs;
```

- `CREATE SCHEMA [๋ฐ์ดํฐ๋ฒ ์ด์ค๋ช]`์ด ๋ฐ์ดํฐ๋ฒ ์ด์ค๋ฅผ ์์ฑํ๋ ๋ช๋ น์ด์ด๋ค.
- `SCHEMA(์คํค๋ง)`๋ผ๊ณ  ๋์ด์๋๋ฐ, MySQL์์ ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์คํค๋ง๋ ๊ฐ์ ๊ฐ๋์ด๋ค.
- ์ ๋ช๋ น์ด `nodejs`๋ผ๋ ์ด๋ฆ์ ๋ฐ์ดํฐ๋ฒ ์ด์ค๋ฅผ ์์ฑํจ์ ์๋ฏธํ๋ค. ๊ทธ ํ `use nodejs;` ๋ช๋ น์ด๋ฅผ ์๋ ฅํด nodejs ๋ฐ์ดํฐ๋ฒ ์ด์ค๋ฅผ ์ฌ์ฉํ๊ฒ ๋ค๋ ๊ฒ์ MySQL์ ์๋ฆฐ๋ค.
- CREATE SCHEMA ๋ค์ `DEFAULT CHARACTER SET utf8`์ ๋ถ์ฌ ํ๊ธ์ ์ฌ์ฉํ  ์ ์๊ฒ ๋ง๋ ๋ค.
- ์ฐธ๊ณ ๋ก SQL ๊ตฌ๋ฌธ์ ์๋ ฅํ  ๋๋ ๋ง์ง๋ง์ `์ธ๋ฏธ์ฝ๋ก (;)`์ ๋ถ์ฌ์ผ ์คํ๋๋ค.
- CREATE SCHEMA์ ๊ฐ์ด MySQL์ด ๊ธฐ๋ณธ์ ์ผ๋ก ์๊ณ  ์๋ ๊ตฌ๋ฌธ์ ์์ฝ์ด๋ผ๊ณ  ํ๋ค. ์์ฝ์ด๋ ์๋ฌธ์๋ก ์จ๋ ๋์ง๋ง, ๋๋ฌธ์๋ก ์ฐ๋๊ฒ ์ข๋ค. ๊ทธ ์ด์ ๋ nodejs์ ๊ฐ์ ์ฌ์ฉ์๊ฐ ์ง์  ๋ง๋  ์ด๋ฆ๊ณผ ๊ตฌ๋ถํ๊ธฐ ์ํด์๋ค.

<br />

## ๐ ํ์ด๋ธ ์์ฑํ๊ธฐ

- ํ์ด๋ธ์ด๋ `๋ฐ์ดํฐ๊ฐ ๋ค์ด๊ฐ ์ ์๋ ํ`์ ์๋ฏธํ๋ฉฐ, ํ์ด๋ธ์ ๋ง๋ ๋ฐ์ดํฐ๋ง ๋ค์ด๊ฐ ์ ์๋ค.
- ์๋ ์์ ๋ ์ฌ์ฉ์์ ์ ๋ณด๋ฅผ ์ ์ฅํ๋ ํ์ด๋ธ์ ๋ง๋๋ ์์ ์ด๋ค. (์ด๋, ํ๊ธ์๋ผ๋ ์๋ชป ์๋ ฅํ๋ฉด ์๋ฌ๊ฐ ๋ฐ์ํ๋ ์กฐ์ฌํด์ผํ๋ค.)

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
    -> COMMENT = '์ฌ์ฉ์ ์ ๋ณด'
    -> DEFAULT CHARACTER SET = utf8
    -> ENGINE = InnoDB;
```

- `CREATE TABLE nodejs.users`๋ฅผ ์๋ ฅํ์ผ๋ฏ๋ก nodejs ๋ฐ์ดํฐ๋ฒ ์ด์ค ๋ด์ users ํ์ด๋ธ์ ์์ฑํ๋ ๊ฒ์ด๋ค.
- ์ ์์ ์์ `use nodejs;` ๋ช๋ น์ด๋ฅผ ์คํํ์ผ๋ `CREATE TABLE users`์ฒ๋ผ ๋ฐ์ดํฐ๋ฒ ์ด์ค๋ช์ ์๋ตํด๋ ๋๋ค.
- ์๋์ ํ ์ค์ ํ๋์ฉ `์ฝค๋ง(,)`๋ก ๊ตฌ๋ถํด `์ปฌ๋ผ(Column)`๋ค์ ๋ง๋ค์๋ค.
- ์์๋๋ก id(๊ณ ์  ์๋ณ์), name(์ด๋ฆ), age(๋์ด), married(๊ฒฐํผ ์ฌ๋ถ), comment(์๊ธฐ์๊ฐ), created_at(๋ก์ฐ ์์ฑ์ผ)์๋๋ค.
- ์ปฌ๋ผ์ ์ ์ํด๋๋ฉด ์์ผ๋ก ๋ฐ์ดํฐ๋ฅผ ๋ฃ์ ๋ ์ปฌ๋ผ ๊ท์น์ ๋ง๋ ์ ๋ณด๋ค๋ง ๋ฃ์ ์ ์๊ฒ ๋๋ค. ์๋์์ผ์ด๋ ๋ชธ๋ฌด๊ฒ์ ๊ฐ์ด ์ปฌ๋ผ์ผ๋ก ๋ง๋ค์ด๋์ง ์์ ์ ๋ณด๋ค์ ์ ์ฅํ  ์ ์๋ค.

<br />

### ๐โโ๏ธ ์ปฌ๋ผ์ ์๋ฃํ

<br />
