---
title: 第一章 · 配置 WSL 2
description: 在 Windows 上装好 WSL 2 和 Ubuntu 22.04
---

# 第一章 · 配置 WSL 2

**目标**：在 Windows 上得到一个能用的 Ubuntu 22.04（WSL 2），并且能用国内镜像正常装软件。

## 1.1 先确认前提

| 检查项 | 怎么查 | 要求 |
| --- | --- | --- |
| Windows 版本 | `Win + R` 输入 `winver` | Windows 10 2004（内部版本 19041）以上，或 Windows 11 |
| CPU 虚拟化 | 任务管理器 → 性能 → CPU → 「虚拟化」 | 已启用（显示“已启用”） |
| 管理员权限 | — | 后面装 WSL 需要管理员 PowerShell |

如果虚拟化显示“已禁用”，得先进 BIOS/UEFI 把 Intel VT-x 或 AMD-V 打开。

## 1.2 一条命令装上

用**管理员**身份打开 PowerShell（开始菜单右键 → 终端(管理员)）：

```powershell
wsl --install
```

这条命令会启用所需组件、装 WSL 2、并默认安装 Ubuntu。想指定版本：

```powershell
wsl --install -d Ubuntu-22.04
```

装完**重启一次**电脑。

::: warning 已经装过 WSL 的老机器
如果之前装过 WSL 1，先更新一下组件，避免版本混乱：

```powershell
wsl --update
```
:::

## 1.3 确认版本是 2

```powershell
wsl -l -v
```

正常输出类似：

```text
  NAME            STATE           VERSION
* Ubuntu-22.04    Running         2
```

如果 `VERSION` 是 `1`，转成 2：

```powershell
wsl --set-version Ubuntu-22.04 2
```

（转换可能要几分钟，期间别关窗口。）

## 1.4 第一次进入 Ubuntu

开始菜单搜 **Ubuntu 22.04** 打开，第一次会让你设置：

- **用户名**：小写英文，别用中文、别用大写
- **密码**：输入时屏幕上不显示任何字符，这是正常的，盲打回车即可

看到类似 `wei@DESKTOP-XXX:~$` 的提示符就成功了。

## 1.5 换成国内镜像源（强烈建议）

默认源在国外，`apt update` 会慢到怀疑人生。先备份，再换成清华源：

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
sudo sed -i 's|http://.*archive.ubuntu.com|https://mirrors.tuna.tsinghua.edu.cn|g; s|http://security.ubuntu.com|https://mirrors.tuna.tsinghua.edu.cn|g' /etc/apt/sources.list
sudo apt update && sudo apt upgrade -y
```

::: tip 校验一下
`apt update` 的输出里应该出现 `mirrors.tuna.tsinghua.edu.cn`。如果还是 `archive.ubuntu.com`，说明替换没生效，手动打开 `/etc/apt/sources.list` 看一眼。
:::

## 1.6 基础工具补一下

```bash
sudo apt install -y build-essential git curl wget vim
```

## 1.7 几个常用的 WSL 命令（在 PowerShell 里用）

| 想做什么 | 命令 |
| --- | --- |
| 进入默认发行版 | `wsl` |
| 列出已装发行版和版本 | `wsl -l -v` |
| 关闭所有 WSL 实例 | `wsl --shutdown` |
| 更新 WSL 内核 | `wsl --update` |
| 设置默认发行版 | `wsl --set-default Ubuntu-22.04` |

## 1.8 限制 WSL 的资源占用（可选）

WSL 2 默认会吃掉很多内存。在 Windows 用户目录下新建 `C:\Users\<你的用户名>\.wslconfig`：

```ini
[wsl2]
memory=8GB
processors=4
swap=2GB
```

保存后执行 `wsl --shutdown`，再重新打开 Ubuntu 生效。

## 1.9 和 Windows 怎么互传文件

- **Linux 里访问 Windows**：C 盘在 `/mnt/c/`，比如 `cd /mnt/c/Users/你的用户名/Desktop`
- **Windows 里访问 Linux**：资源管理器地址栏输入 `\\wsl$` 就能看到 Ubuntu 的文件
- **VS Code**：Windows 上装 `WSL` 扩展，然后在 Ubuntu 终端里 `code .`，直接打开当前目录，编辑器在 Windows、运行在 Linux，体验很顺

::: tip 建议把项目放在 Linux 侧
放在 `~/` 下面（比如 `~/ros2_ws`）比放在 `/mnt/c/` 快很多，跨文件系统的 I/O 很慢。
:::

## 1.10 常见问题

| 现象 | 原因 / 处理 |
| --- | --- |
| `wsl --install` 报错 0x80370102 | BIOS 没开虚拟化，或“虚拟机平台”功能没启用 |
| 安装卡住不动 | 先 `wsl --update`；确认网络；关掉代理再试 |
| 忘记 Linux 密码 | PowerShell 里 `wsl -u root` 进去，再 `passwd 你的用户名` 改 |
| 磁盘越用越大 | 新版 WSL 支持 `wsl --manage Ubuntu-22.04 --set-sparse true` 自动回收 |
| `apt update` 很慢 | 回到 1.5 换源 |
| 中文乱码 | 用 Windows Terminal，并确认 locale 设置（下一章会配） |

## 下一步

环境好了，[第二章 · 安装 ROS 2 Humble](/ros2/chapter-2-install-ros2.html) 开始装 ROS 2。
