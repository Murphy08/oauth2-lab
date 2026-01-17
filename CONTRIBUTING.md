# 贡献指南 / Contributing Guide

[中文](#中文) | [English](#english)

---

## 中文

感谢你考虑为 OAuth 2.0 多语言练习平台做出贡献！

### 如何贡献

#### 报告问题

- 使用 GitHub Issues 报告 bug
- 提供详细的复现步骤
- 包含环境信息（操作系统、语言版本等）

#### 提交代码

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

#### Commit 消息格式

使用 Conventional Commits 规范：

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

类型（type）：
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具相关

#### 代码风格

- **Java**: 遵循 Google Java Style Guide
- **Python**: 遵循 PEP 8
- **JavaScript/TypeScript**: 使用 ESLint + Prettier
- **PHP**: 遵循 PSR-12
- **Go**: 使用 gofmt

### 测试要求

- 新功能必须包含单元测试
- 测试覆盖率不低于 80%
- 所有测试必须通过

### 文档要求

- 新功能需要更新相关文档
- 代码注释使用中英文双语
- API 变更需要更新 API 文档

---

## English

Thank you for considering contributing to the OAuth 2.0 Multi-Language Learning Platform!

### How to Contribute

#### Reporting Issues

- Use GitHub Issues to report bugs
- Provide detailed reproduction steps
- Include environment information (OS, language versions, etc.)

#### Submitting Code

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

#### Commit Message Format

Follow Conventional Commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Code formatting
- `refactor`: Code refactoring
- `test`: Testing related
- `chore`: Build/tooling related

#### Code Style

- **Java**: Follow Google Java Style Guide
- **Python**: Follow PEP 8
- **JavaScript/TypeScript**: Use ESLint + Prettier
- **PHP**: Follow PSR-12
- **Go**: Use gofmt

### Testing Requirements

- New features must include unit tests
- Test coverage should be at least 80%
- All tests must pass

### Documentation Requirements

- New features require documentation updates
- Code comments in both Chinese and English
- API changes require API documentation updates
