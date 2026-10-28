---
title: 第五章 .gitignore 配置
description: Git 命令笔记 · 第五章 .gitignore 配置
---

# 第五章 .gitignore 配置

## .gitignore 配置

在项目根目录新建 `.gitignore`，粘贴以下内容，自动忽略缓存、模型、配置文件，仓库整洁不杂乱。

```bash
# Python 缓存文件
__pycache__/
*.pyc
*.pyo

# 模型文件
*.tflite
*.h
*.h5
*.pth

# 编辑器配置
.idea/
.vscode/

# 系统文件 & 日志
build/
*.log
.DS_Store
```

---
