# node-web-server-blog

## front-end-project 启动

直接安装启动：

```bash
npm i

npm run start
```

## server-project 启动

- 1、[安装 MySQL](https://dev.mysql.com/downloads/mysql/)

- 2、连接 MySQL

- 3、安装 Redis

```bash
brew install redis
```

- 4、启动 Redis 服务

```bash
redis-server
```

- 5、启动 Server

server-project 下运行：

```bash
npm i

npm run dev
```

通过 Nginx 反向代理联调
