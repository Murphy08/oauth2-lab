<p align="center">
<h1 align="center">OAuth 2.0 LAB</h1>
</p>
<p align="center">
  <a href="https://github.com/murphy08/oauth2-lab/stargazers">
    <img src="https://img.shields.io/github/stars/murphy08/oauth2-lab?style=social" />
  </a>
  <a href="https://github.com/murphy08/oauth2-lab/network/members">
    <img src="https://img.shields.io/github/forks/murphy08/oauth2-lab?style=social" />
  </a>
  <a href="https://github.com/murphy08/oauth2-lab/issues">
    <img src="https://img.shields.io/github/issues/murphy08/oauth2-lab" />
  </a>
  <a href="https://github.com/murphy08/oauth2-lab/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/murphy08/oauth2-lab" />
  </a>
  <a href="https://github.com/murphy08/oauth2-lab/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
  </a>
</p>

<p align="center">

<a href="#">English</a> | <a href="../README.md">中文</a>

</p>

</div>
## The project is not yet complete.

If you encounter bugs in some features, please submit them via **Issues** .

## Introduction

OAuth 2.0 Lab is an open-source learning platform designed to help developers deeply understand the OAuth 2.0 protocol. This project is not intended to reinvent the wheel.Please do not deploy or use this project in a production environment.

#### This project provides:

- 🌐 **Multi-Language Implementation**: Complete implementations in Java, Python, Node.js, PHP, and Go
- 🔒 **Security Scanner**: Automated vulnerability scanning and security assessment
- 📚 **Interactive Tutorials**: Visualized flow demonstrations and hands-on exercises
- 🎯 **Best Practices**: Code examples following OWASP security standards

## Quick Start

### Method 1: Using CLI Tool (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/murphy08/oauth2-lab.git
cd oauth2-lab

# 2. Install frontend dependencies
cd apps/web
npm install

# 3. Start frontend
npm run dev

# 4. In a new terminal, use CLI to start servers
cd tools/cli
npm install
npm link

# Start all servers
oauth2-lab start --lang=all

# Or start a single server
oauth2-lab start --lang=python
```

### Method 2: Manual Start

**Start Python Server:**

```bash
cd servers/python
pip install -r requirements.txt
python src/init_db.py  # Initialize database
uvicorn src.main:app --reload --port 8000
```

**Start Frontend:**

```bash
cd apps/web
npm install
npm run dev
```

Visit http://localhost:3000 to view the frontend interface.

### Requirements

- Node.js 18+
- At least one backend language environment:
  - Python 3.10+ (Recommended for beginners)
  - Java 17+
  - Node.js 18+
  - PHP 8.1+
  - Go 1.21+

## Project Structure

```
oauth2-lab/
├── apps/
│   ├── web/          # Next.js frontend application
│   └── cli/          # Command-line tool
├── servers/
│   ├── java/         # Spring Boot implementation
│   ├── python/       # FastAPI implementation
│   ├── nodejs/       # Express implementation
│   ├── php/          # Slim implementation
│   └── go/           # Gin implementation
├── tools/
│   ├── cli/          # CLI tool
│   └── security-scanner/  # Security detection tool
└── docs/
    └── tutorials/    # Tutorial documentation
```

## Core Features

### 🎓 Interactive Learning

- **Visualized Flow Demonstrations**: Understand OAuth 2.0 flows through animations and diagrams
- **Real-time Code Comparison**: View implementation differences across languages
- **Simulated Authorization Flow**: Simulate complete OAuth 2.0 authorization process in browser

### 🔧 Multi-Language Servers

- **5 Language Implementations**: Java, Python, Node.js, PHP, Go
- **Unified API Specification**: All servers follow the same API design
- **Independent Operation**: Each server can run and test independently
- **Database Support**: Supports SQLite, MySQL, PostgreSQL

### 🛡️ Security Scanner

- **Automated Scanning**: One-click detection of security issues in OAuth 2.0 implementations
- **Security Scoring**: Security scores based on OWASP standards
- **Fix Recommendations**: Detailed fix solutions for each issue

### 🚀 CLI Tool

- **Quick Start**: Start all servers with one command
- **Process Management**: View server status, start, stop
- **Health Check**: Automatically detect if servers are running properly

## Features

### OAuth 2.0 Authorization Flows

- ✅ Authorization Code Flow
- ✅ Authorization Code Flow with PKCE
- ✅ Client Credentials Flow
- ✅ Refresh Token Mechanism
- ✅ OpenID Connect (Python server)

### Security Detection

- ✅ CSRF Attack Detection
- ✅ Redirect URI Vulnerability Scanning
- ✅ Token Security Issue Detection
- ✅ PKCE Missing Detection
- ✅ Best Practice Checks

## Usage Examples

### 1. Test Authorization Code Flow

```bash
# Start Python server
oauth2-lab start --lang=python

# Access authorization endpoint
curl "http://localhost:8000/oauth/authorize?response_type=code&client_id=test-client&redirect_uri=http://localhost:3000/callback&scope=read&state=xyz"
```

### 2. Run Security Scan

```bash
# Use CLI tool to scan
oauth2-lab scan --url=http://localhost:8000

# Or use Web interface
# Visit http://localhost:3000/security
```

### 3. Compare Different Language Implementations

Visit http://localhost:3000/compare to view implementation comparisons across languages.

### Friendly Reminder

**This project was created with the assistance of AI** and is intended for learning and reference purposes only.
Before actual use, deployment, or submission, please review and modify it according to your specific requirements to ensure **accuracy, compliance, and usability**.
For formal scenarios or important decisions, manual review and testing are strongly recommended.

## Contributing

Contributions are welcome! Please check [CONTRIBUTING.md](../CONTRIBUTING.md) for details.

## License

This project is licensed under the [MIT License](../LICENSE).

## Support

- 📖 [Documentation](../docs)
- 🐛 [Report Issues](https://github.com/murphy08/oauth2-lab/issues)
- 💬 [Discussions](https://github.com/murphy08/oauth2-lab/discussions)

## Acknowledgments

Thanks to all contributors who have helped make this project better!
