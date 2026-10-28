---
title: 第二章 首次初始化与日常流程
description: Git 命令笔记 · 第二章 首次初始化与日常流程
---

# 第二章 首次初始化与日常流程

## 首次项目初始化

用于**本地文件夹首次关联远程 Git 仓库**

```bash
# 1. 初始化本地 Git 仓库
git init

# 2. 关联远程 Gitee 仓库
git remote add origin https://gitee.com/aichisha/machine-learning.git

# 3. 拉取远程仓库文件（解决新旧仓库不关联冲突）
git pull origin master --allow-unrelated-histories
```

---

## 日常开发标准工作流

**每次改完代码必执行**，完成一次版本存档+云端备份

```bash
# 1. 查看当前文件状态（可选，建议养成习惯）
git status

# 2. 将所有修改加入暂存区
git add .

# 3. 生成本地版本（打快照，务必写清楚更新内容）
git commit -m "更新：新增特征训练代码、模型文件"

# 4. 推送至云端 Gitee
git push
```

#### 命令作用详解

- `git status`：查看哪些文件修改、新增、未提交
    
- `git add .`：暂存**全部**改动文件
    
- `git commit`：生成本地版本记录，相当于**游戏存档**
    
- `git push`：把本地存档同步到云端，防止代码丢失
    

---

## 极简总结

```bash
git status
git add .
git commit -m "更新说明"
git push
```

---

## 完整首次上传流程

```bash
git init
git remote add origin https://gitee.com/aichisha/machine-learning.git
git pull origin master --allow-unrelated-histories
git add .
git commit -m "初次提交：完整机器学习项目代码"
git push
```

---
