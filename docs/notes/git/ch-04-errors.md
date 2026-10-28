---
title: 第四章 常见报错处理
description: Git 命令笔记 · 第四章 常见报错处理
---

# 第四章 常见报错处理

## 常见报错处理

### 1. 报错：remote origin already exists（远程仓库已存在）

```bash
git remote remove origin
```

执行后重新关联远程仓库即可。

### 2. 报错：fetch first / 远程有新代码冲突

```bash
git pull origin master --allow-unrelated-histories
```

### 3. 换行符 LF/CRLF 警告（Windows 必出现，无害）

```bash
git config core.autocrlf true
```

### 4. 报错：No configured push destination

原因：本地仓库未绑定任何远程推送地址

```bash
git remote add origin 你的仓库地址
git push -u origin master
```

### 5. 报错：当前分支无上游分支（master has no upstream branch）

**报错完整提示**：`fatal: The current branch master has no upstream branch.`

**报错原因**：本地 master 分支已关联远程仓库，但**未绑定推送追踪分支**，Git 不知道代码要推送到远程哪个分支。

**临时解决（单次生效）**

```bash
git push --set-upstream origin master
```

作用：绑定本地 master 与远程 master 分支，本次推送成功，后续可直接用 `git push`。

**永久解决**

```bash
git config --global push.autoSetupRemote true
```

作用：后续所有新分支推送时，自动绑定上游分支，再也不会报此错误。

### 6. 报错：rejected master -> master (fetch first)

**报错完整提示**：`error: failed to push some refs ... rejected master -> master (fetch first)`

**报错原因**：远程仓库（Gitee）自带初始化的 README 文件，**远程代码比本地新**，本地版本落后，Git 禁止直接覆盖推送，防止代码丢失。

**标准安全解决（推荐，保留远程+本地所有代码）**

```bash
# 拉取远程代码并合并，允许新旧仓库无关联合并
git pull origin master --allow-unrelated-histories
# 合并完成后正常推送
git push
```

**强制解决（新手极速用，覆盖远程初始化文件）**

```bash
git push -f origin master
```

注意：强制推送会覆盖远程仓库初始文件，仅全新空项目可用，已有重要代码严禁使用。

### 7. 报错：Your local changes would be overwritten by merge

**报错完整提示**：`error: Your local changes to the following files would be overwritten by merge`

**报错原因**：本地存在**未提交、未暂存的修改**，Git 检测到合并远程代码会覆盖本地改动，为保护数据终止合并。

**安全解决方案（保留本地修改，推荐）**

```bash
# 先保存本地所有修改
git add .
git commit -m "暂存本地修改"
# 再拉取远程合并
git pull origin master --allow-unrelated-histories
git push
```

**快速解决方案**

```bash
# 临时储藏本地改动
git stash
# 拉取远程合并
git pull origin master --allow-unrelated-histories
```

### 8. 合并自动进入 Vim 编辑界面（一堆波浪线）

**现象**：pull 合并后自动进入满屏 ~ 的编辑窗口，无法输入命令

**原因**：Git 需要你确认本次合并记录，属于正常流程不是报错

**退出方法（固定万能操作）**

键盘依次按下：**Esc** → 输入 **:wq** → **回车**

含义：保存合并信息并退出编辑界面

**退出后执行收尾命令**

```bash
git add .
git push
```

### 9. 报错：non-fast-forward 推送被拒

**报错完整提示**：`error: failed to push some refs ... non-fast-forward`

**报错核心原因**：远程仓库存在本地没有的提交记录（Gitee 初始化的 README、配置文件），本地分支版本落后于远程，Git 禁止直接覆盖推送，避免代码丢失。

**标准安全解法**

```bash
# 拉取远程代码并合并，兼容新旧无关联仓库
git pull origin master --allow-unrelated-histories
# 合并完成、解决冲突后，正常推送
git push
```

**全新项目极速解法（仅空仓库使用）**

```bash
# 强制覆盖远程初始化文件，适配全新本地项目
git push -f origin master
```

重要禁忌：仓库已有他人提交、重要远程代码时，**绝对禁止强制推送**，会清空远程代码。

---
