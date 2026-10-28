---
title: 第六章 Windows 高频踩坑
description: Git 命令笔记 · 第六章 Windows 高频踩坑
---

# 第六章 Windows 高频踩坑

## Windows 高频踩坑

### 1. 致命错误：git add. 报错

**错误写法（必报错）**

```bash
git add.
```

**正确写法（必须有空格）**

```bash
git add .
```

原因：Git 严格区分空格，`add.` 是非法命令，`add .` 才是添加所有文件。

### 2. 提交没效果、commit 提示 no changes

原因：**没有执行 git add**，所有修改未进入暂存区。

解决方案：先 add、再 commit、最后 push

### 3. 报错：fatal: No configured push destination

原因：本地 Git 仓库**未关联远程仓库**

解决方案：

```bash
git remote add origin 你的远程仓库地址
git push -u origin master
```

### 4. 中文文件名乱码 \347\250\240 问题

现象：git status 显示一堆数字编码，看不到中文文件名

解决方案（一键修复中文显示）：

```bash
git config --global core.quotepath false
```

作用：关闭 Git 中文转义，正常显示中文文件名。

### 5. Windows 换行符警告彻底关闭

```bash
git config --global core.autocrlf true
```

---
