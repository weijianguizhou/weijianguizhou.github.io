---
title: 第一章 安装与全局配置
description: Git 命令笔记 · 第一章 安装与全局配置
---

# 第一章 安装与全局配置

## 安装与全局配置

### 1. 官网纯净下载（

Git 官方唯一地址：[https://git-scm.com/](https://git-scm.com/)

1. 打开官网，页面自动识别 Windows 系统，点击 **Download for Windows**

2. 选择 **64-bit Git for Windows Setup** 自动下载最新安装包

3. 下载完成后得到 `Git-xxx-64-bit.exe` 安装程序

### 2. 安装关键步骤

双击安装包启动安装，所有关键配置严格按照以下选择，避免后续报错：

1. 许可证页面：直接 **Next**

2. 安装路径：建议安装到 **D盘**（避免占用C盘空间），路径无中文、无空格，点击 **Next**

3. 组件选择：默认全部勾选，无需修改，**Next**

4. 开始菜单目录：默认即可，**Next**

5. 默认编辑器：推荐选择**Vim 默认** 或自行选择 VS Code，**Next**

6. 仓库默认分支：选择 **Let Git decide**（默认 master 分支，适配国内代码托管平台），**Next**

7. PATH 环境配置：选择 **Git from the command line and also from 3rd-party software**（核心！让CMD、PowerShell、VS Code终端都能识别git命令），**Next**

8. HTTPS 传输配置：默认 OpenSSL 即可，**Next**

9. 换行符配置：选择 **Checkout Windows-style, commit Unix-style line endings**（完美适配Windows开发，杜绝LF/CRLF报错），**Next**

10. 终端模拟器：默认 **MinTTY**（体验更佳），**Next**

11. 其余页面全部默认，最后点击 **Install** 完成安装

### 3. 全局账号配置

安装完成后，打开 Git Bash，执行以下全局配置（替换为自己的用户名和Gitee/注册邮箱），只需配置一次，永久生效

```bash
# 配置全局用户名（自定义，建议和Gitee昵称一致）
git config --global user.name "你的用户名"

# 配置全局邮箱（Gitee/GitHub注册邮箱）
git config --global user.email "你的邮箱@xxx.com"
```

### 4. 校验安装 & 配置是否成功

```bash
# 查看Git版本，验证安装成功
git --version

# 查看全局配置，验证账号配置生效
git config --global --list
```

出现版本号、用户名、邮箱信息，说明安装+配置完全成功。

### 6. 安装后常见问题排查

**问题1：终端提示 git 不是内部或外部命令**

原因：安装时未勾选PATH环境配置，重启终端；若无效重新安装，严格按照上述PATH选型配置。

**问题2：中文文件名乱码、状态显示异常**

执行上方 `core.quotepath false` 优化命令即可修复。

**问题3：推送无上游分支报错**

执行上方 `push.autoSetupRemote true` 永久配置，彻底解决。

---
