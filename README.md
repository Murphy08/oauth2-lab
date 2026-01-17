<div align="center">

# OAuth 2.0 LAB | OAuth 2.0 实验室

[![GitHub stars](https://img.shields.io/github/stars/murphy08/oauth2-lab?style=social)](https://github.com/murphy08/oauth2-lab/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/murphy08/oauth2-lab?style=social)](https://github.com/murphy08/oauth2-lab/network/members)
[![GitHub issues](https://img.shields.io/github/issues/murphy08/oauth2-lab)](https://github.com/murphy08/oauth2-lab/issues)
[![GitHub license](https://img.shields.io/github/license/murphy08/oauth2-lab)](https://github.com/murphy08/oauth2-lab/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/murphy08/oauth2-lab/pulls)

[中文](#中文文档) | [English](#english-documentation)

</div>

---

## 项目尚未完成

部分功能可能存在 Bug，欢迎通过 **Issues** 提交反馈。

### 项目简介

OAuth 2.0 实验室是一个开源的学习项目，旨在帮助开发者深入理解 OAuth 2.0 协议。本项目不是重复造轮子，生产环境请勿使用本项目部署。

#### 本项目提供：

- 🌐 **多语言实现**：Java、Python、Node.js、PHP、Go 五种语言的完整实现
- 🔒 **安全检测工具**：自动化漏洞扫描和安全评估
- 📚 **交互式教程**：可视化流程演示和实战练习
- 🎯 **最佳实践**：遵循 OWASP 安全标准的代码示例

### 快速开始

#### 方式一：使用 CLI 工具（推荐）

```bash
# 1. 克隆项目
git clone https://github.com/murphy08/oauth2-lab.git
cd oauth2-lab

# 2. 安装前端依赖
cd apps/web
npm install

# 3. 启动前端
npm run dev

# 4. 在新终端中，使用 CLI 启动服务器
cd tools/cli
npm install
npm link

# 启动所有服务器
oauth2-lab start --lang=all

# 或启动单个服务器
oauth2-lab start --lang=python
```

#### 方式二：手动启动

**启动 Python 服务器：**

```bash
cd servers/python
pip install -r requirements.txt
python src/init_db.py  # 初始化数据库
uvicorn src.main:app --reload --port 8000
```

**启动前端：**

```bash
cd apps/web
npm install
npm run dev
```

访问 http://localhost:3000 查看前端界面。

#### 环境要求

- Node.js 18+
- 至少一种后端语言环境：
  - Python 3.10+ (推荐新手使用)
  - Java 17+
  - Node.js 18+
  - PHP 8.1+
  - Go 1.21+

### 项目结构

```
oauth2-lab/
├── apps/
│   ├── web/          # Next.js 前端应用
│   └── cli/          # 命令行工具
├── servers/
│   ├── java/         # Spring Boot 实现
│   ├── python/       # FastAPI 实现
│   ├── nodejs/       # Express 实现
│   ├── php/          # Laravel/Slim 实现
│   └── go/           # Gin 实现
├── tools/
│   └── security-scanner/  # 安全检测工具
├── packages/
│   └── shared/       # 共享代码和类型定义
└── docs/
    ├── tutorials/    # 教程文档
    └── api/          # API 文档
```

### 核心功能

#### 🎓 交互式学习

- **可视化流程演示**：通过动画和图表理解 OAuth 2.0 各个流程
- **实时代码对比**：查看同一功能在不同语言中的实现差异
- **模拟授权流程**：在浏览器中模拟完整的 OAuth 2.0 授权过程

#### 🔧 多语言服务器

- **5 种语言实现**：Java、Python、Node.js、PHP、Go
- **统一 API 规范**：所有服务器遵循相同的 API 设计
- **独立运行**：每个服务器都可以独立启动和测试
- **数据库支持**：支持 SQLite、MySQL、PostgreSQL

#### 🛡️ 安全检测

- **自动化扫描**：一键检测 OAuth 2.0 实现中的安全问题
- **安全评分**：根据 OWASP 标准给出安全评分
- **修复建议**：针对每个问题提供详细的修复方案

#### 🚀 CLI 工具

- **快速启动**：一条命令启动所有服务器
- **进程管理**：查看服务器状态、启动、停止
- **健康检查**：自动检测服务器是否正常运行

### 功能特性

#### OAuth 2.0 授权流程

- ✅ Authorization Code Flow
- ✅ Authorization Code Flow with PKCE
- ✅ Client Credentials Flow
- ✅ Refresh Token 机制

#### 安全检测

- ✅ CSRF 攻击检测
- ✅ 重定向 URI 漏洞扫描
- ✅ Token 安全问题检测
- ✅ PKCE 缺失检测
- ✅ 最佳实践检查

### 使用示例

#### 1. 测试 Authorization Code Flow

```bash
# 启动 Python 服务器
oauth2-lab start --lang=python

# 访问授权端点
curl "http://localhost:8000/oauth/authorize?response_type=code&client_id=test-client&redirect_uri=http://localhost:3000/callback&scope=read&state=xyz"

# 使用授权码交换 token
curl -X POST http://localhost:8000/oauth/token \
  -d "grant_type=authorization_code" \
  -d "code=YOUR_AUTH_CODE" \
  -d "client_id=test-client" \
  -d "client_secret=test-secret" \
  -d "redirect_uri=http://localhost:3000/callback"
```

#### 2. 运行安全扫描

```bash
# 使用 CLI 工具扫描
oauth2-lab scan --url=http://localhost:8000

# 或在 Web 界面中使用
# 访问 http://localhost:3000/security
```

#### 3. 对比不同语言实现

访问 http://localhost:3000/compare 查看同一功能在不同语言中的实现对比。

### 友情提醒

**本项目由 AI 辅助制作完成，**内容仅供学习与参考。
在实际使用、部署或提交前，请结合具体需求进行核对与修改，确保其**准确性、合规性与可用性**。
如涉及正式场景或重要决策，建议进行人工复核与测试。

### 贡献指南

欢迎贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详情。

### 开源协议

本项目采用 [MIT License](LICENSE)。
