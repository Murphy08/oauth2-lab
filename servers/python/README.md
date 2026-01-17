# Python OAuth2 Server

## 数据库支持

本服务器支持以下数据库:
- SQLite (默认)
- MySQL
- PostgreSQL

## 快速开始

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 配置数据库

复制 `.env.example` 到 `.env` 并修改配置:

```bash
cp .env.example .env
```

### 3. 初始化数据库

```bash
python src/init_db.py
```

### 4. 启动服务器

```bash
uvicorn src.main:app --reload --port 8000
```

## 数据库配置示例

### SQLite (默认)

```env
DB_TYPE=sqlite
DB_PATH=./data/oauth2.db
```

### MySQL

```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=oauth2_lab
```

### PostgreSQL

```env
DB_TYPE=postgresql
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=oauth2_lab
```

## API 端点

- `GET /health` - 健康检查
- `GET /oauth/authorize` - 授权端点
- `POST /oauth/token` - Token 端点
- `GET /api/userinfo` - 用户信息端点
- `GET /.well-known/openid-configuration` - OpenID Connect Discovery

## 测试客户端

初始化数据库后会自动创建测试客户端:

- Client ID: `test-client`
- Client Secret: `test-secret`
- Redirect URI: `http://localhost:3000/callback`
