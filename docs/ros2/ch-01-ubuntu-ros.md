---
title: 第一章 · Ubuntu、WSL 与 ROS 简介
description: 从 Linux 内核与发行版讲起，弄清 Ubuntu、WSL 与 ROS 的关系，并在 WSLg 里搭好 Ubuntu 24.04 + ROS 2 Jazzy 的地基
---

# 第一章 · Ubuntu、WSL 与 ROS 简介

在开始敲第一行命令之前，先用一章的篇幅把几个名字弄清楚：Ubuntu 到底是什么，为什么机器人开发几乎离不开它；WSL 又是什么，为什么它能让 Ubuntu 直接住在 Windows 里；ROS 又是什么，为什么它叫操作系统却不是操作系统。这一章既讲概念，也把环境完整搭起来：装好 WSL、配好中文、跑通图形界面，最后把 ROS 2 的版本路线定下来。读完这一章，后面的每一章就都有了一块可以落脚的地基。

## 1.1 什么是 Ubuntu

### 从 Linux 说起

先纠正一个常见的误解：我们平时说的“Linux”，严格来讲只是操作系统的一个*内核*，也就是负责管理硬件、进程、内存的那部分最核心的程序。光有内核还不足以日常使用，还需要配上图形界面、各类软件和工具，才构成一个完整可用的操作系统。内核加上这些软件的整体，叫作 Linux 的*发行版*。

Ubuntu 就是众多发行版中人气最高、资料最全的一个。它基于另一个老牌发行版 Debian，由英国的 Canonical 公司维护，完全免费、开放源代码。因为用的人多，网上的教程、第三方软件、硬件驱动的支持都最齐全，所以它也是初学者最合适的入门选择。

Ubuntu 的版本号很有规律，形如“年份.月份”。比如 22.04 表示 2022 年 4 月发布。它每年发布两次，其中*偶数年的 4 月*会发布一个特别版本，名字里带 LTS（Long Term Support，长期支持），官方会提供长达五年的维护更新。机器人开发领域几乎清一色使用 LTS 版本，图的就是稳定和长期可用，本书也以 LTS 版本为前提。

### 为什么机器人开发普遍使用 Ubuntu

机器人开发选择 Ubuntu，通常出于几个现实原因：

- **ROS 官方的主战场就是 Ubuntu**。ROS 的安装、文档、示例在 Ubuntu 上支持得最好，很多版本组合甚至只有 Ubuntu 这一条“官方推荐”路线，跟着走最不容易踩坑。
- **免费开源**。机器人项目可以自由使用、修改和分发，不必为许可证操心。
- **生态成熟**。激光雷达、相机、机械臂等硬件厂商大多优先提供 Linux 驱动；论文开源代码、算法库也常在 Ubuntu 上测试。
- **命令行与脚本化能力强**。机器人常常需要远程登录、批量处理、自动运行，Ubuntu 的命令行环境让这些操作非常顺手。这正是第二章要练的基本功。

当然，ROS 并不是只能在 Ubuntu 上跑，其他 Linux 发行版甚至 Windows 也可以。但对新手而言，跟随 ROS 官方支持最好的 Ubuntu，能省下大量和环境搏斗的时间。

![Ubuntu 桌面界面](/ros2/ubuntu-desktop.webp)

## 1.2 在 Windows 上使用 Ubuntu：WSL

本书的最终目标，是让 ROS 2 在一套 Ubuntu 环境里跑起来。多数读者日常使用的电脑装的是 Windows，直接改装系统代价太大，装双系统又要重启切换，也谈不上方便。更轻的起步方式是：用 Windows 自带的 **WSL**，让 Ubuntu 直接住在 Windows 里。

WSL 全称 Windows Subsystem for Linux，中文叫“适用于 Linux 的 Windows 子系统”。一句话解释：让 Linux 直接住在 Windows 里，不必再装一台虚拟机。它开机一两秒就能进系统，能直接读写 Windows 里的文件，图形程序也能开在 Windows 桌面上。

不过这条路上的坑明显更密，几乎每走一步都会撞上一个报错。所以本章后面的环境部分不按教科书的顺序写，而是按照笔者当时真实的踩坑顺序写：先被什么卡住，屏幕上报了什么样的一段话，最后又是怎么过的。你可以把它当成一份通关记录，遇到同样的报错时直接翻到对应的小节抄命令。

### WSL 是什么

严格说来，WSL 1 只是把 Linux 的系统调用“翻译”成 Windows 能听懂的形式，兼容性一般。从 WSL 2 开始，微软干脆在 Windows 内部塞了一台轻量虚拟机，里面跑的是真正的 Linux 内核。所以今天用的 WSL 2 和 WSL 3，本质上是“一台你看不见、也不用管的虚拟机”。

这句话很重要，因为它提前解释了后面一堆坑的共同来源：你其实是在两套系统之间来回横跳，而两边的命令、路径、权限规则全都不一样。

![WSL 的分层结构。Windows 里先有一层 WSL 引擎，引擎之下的 Linux 内核跑在轻量虚拟机中，内核之上才是发行版和你的程序；WSLg 负责把图形窗口送回 Windows 桌面](/ros2/wsl-layers.webp)

从图里自上往下看，我们的操作其实分属不同楼层。最塌实的做法，是先记住哪条命令该在哪一层敲：

| 在 Windows 的 PowerShell 里敲 | 在 WSL 的 Ubuntu 里敲 |
| --- | --- |
| `wsl -l -v` | `sudo apt update` |
| `wsl --update --web-download` | `systemctl --user ...` |
| `wsl --install --from-file x.wsl` | `ros2 run turtlesim ...` |
| `wsl --manage Ubuntu --move D:\WSL` | `glxinfo -B` |
| `wsl --shutdown` | `wsl.exe --shutdown`（唯一的特例） |

本章后面反复出现的报错，绝大多数都只是“在错误的楼层敲了正确的命令”而已。

### 和装一台真机 Ubuntu 相比

WSL 并不是唯一的选择，把 Ubuntu 直接装到硬盘上（单系统或双系统）也是一条路。两者差别如下：

| 对比项 | 真机安装 Ubuntu | WSL |
| --- | --- | --- |
| 本质 | 一台完整的电脑 | Windows 里的轻量 Linux 子系统 |
| 磁盘占用 | 几十 GB 起 | 几个 GB 起 |
| 开机速度 | 重启并切换系统 | 一两秒 |
| 和 Windows 传文件 | 靠分区挂载或网络共享 | 直接访问 `/mnt/c` |
| 图形界面 | 完整桌面，装完就有 | 单个程序开箱即用，完整桌面要折腾 |
| 快照回滚 | 可用备份工具整机还原 | 没有，弄坏了只能重装 |

笔者的判断是：只想跟着教程跑通 ROS 2、写几个节点，WSL 完全够用，而且比装双系统顺手得多；如果想要一台“随便怎么折腾都能救回来”的机器，那就得自己养成导出备份的习惯（本章后面会讲 `wsl --export`），或者干脆用一台独立的机器。

## 1.3 安装并配置 WSL

### 先看清楚自己装的是哪一版

一切从两条命令开始。第一条看引擎版本，第二条看装了哪些发行版：

**查看 WSL 版本与已安装的发行版（在 PowerShell 中执行）**

```powershell
wsl -v
wsl -l -v
```

第一条命令会打印一大串版本号，刚看的时候一头雾水。按字段拆开就好理解了：

| 字段 | 含义 |
| --- | --- |
| WSL 版本 | 引擎本身的版本，升级它用 `wsl --update` |
| 内核版本 | 那台轻量虚拟机里跑的 Linux 内核版本 |
| WSLg 版本 | 图形界面组件的版本 |
| MSRDC / Direct3D / DXCore | 图形转发相关的组件 |
| Windows 版本 | 宿主系统版本 |

第二条命令的输出，常常是新手遇到的第一个“惊吓”：

**什么都没装时的提示**

```text
适用于 Linux 的 Windows 子系统没有已安装的分发。
可按照以下说明安装分发来解决此问题:
使用 'wsl.exe --list --online' 列出可用的分发
和 'wsl.exe --install <Distro>' 进行安装。
```

这其实不是报错。前面说过，WSL 引擎只是一个“壳”，Ubuntu、Debian 这些发行版是要另外装的“整车”。引擎升级和装发行版是两件独立的事，先装引擎、后装发行版完全正常。

笔者的经历就是一次典型的时间差：早上敲 `wsl -v`，显示的是 `2.7.8.0`，内核 `6.18.33.1-1`；晚上再敲，已经变成 `3.0.3.0`、内核 `6.18.54.1-1` 了。中间什么都没干，只是 Windows 自动更新顺手把 WSL 推上去了。

### 从 2.7 跳到 3.0：这次升级改了什么

从 2.7.8 一步跨到 3.0.3，看着像一次大改，其实不然。WSL 3 并不是 WSL 1 到 WSL 2 那种底层架构革命，它更像是把原本处于预览状态的容器功能正式转正，顺便把大版本号也抬了一级。

几个值得一提的变化：

- **原生 Linux 容器**。新增 `wslc` 命令行工具（WSL Containers），可以不装 Docker Desktop 就在 Windows 上创建、运行 Linux 容器，一行命令就能起一个 Nginx。容器也不再依赖某个特定的发行版，可以独立运行。
- **文件访问变快**。默认启用 virtiofs 文件系统，取代了沿用多年的 Plan 9 协议，访问 Windows 侧文件的性能官方声称最高可以翻一倍。
- **新的网络模式**。引入了 consomme 模式，Linux 的流量经由 Windows 主机转发，对代理服务器和企业网络策略的兼容性更好。
- **内核换代**。3.0 基于 Linux 6.18，并增加了自动虚拟 NUMA 支持，能在几百个线程的大型多路服务器上稳定跑。
- **实验性稀疏 VHD**。从 3.0.2 开始可以开启稀疏虚拟硬盘，磁盘空间按实际写入量占用，能省不少地方。

笔者用的 3.0.3 还是一个预发布（Pre-release）版本，在容器功能转正的基础上，又带了内核升级到 6.18.54.1、修复 `LifetimeManager` 竞态条件、改进 `wslc` 事件过滤器等一批稳定性修补。

升级命令只有一句，建议加上 `--web-download`，因为默认的走法在某些网络环境下会卡住不动：

**升级 WSL（在 PowerShell 中执行）**

```powershell
wsl --update --web-download
```

### 连接要等好久，是哪里慢

装完之后的第一感受往往不是“真快”，而是“怎么这么卡”。笔者当时的原话就是三个字：为啥连接要好久。

这件事不能笼统地问，得先判断慢在哪一环。两类情况，病因完全不同：

- **启动就慢**：敲完 `wsl` 回车，光标要干等十几秒才出现 Linux 提示符。这属于启动初始化问题。
- **启动不慢，联网慢**：很快就进系统了，但是 `ping`、`curl`、`apt update` 一动就卡很久。这基本是网络或者 DNS 的问题。

#### 启动初始化慢

两个容易被忽略的原因：

- **断掉却还挂着的网络驱动器**。如果曾经映射过公司的 SMB 共享盘，而现在并不在同一个网络里，Windows 和 WSL 在启动时会反复尝试连接它，卡顿非常明显。把用不到的网络驱动器映射断开即可。
- **代理软件或 VPN 的虚拟网卡**。某些代理工具的虚拟网卡会和 WSL 的虚拟网络抢占资源，拖慢初始化。可以先把代理关掉试一次，快慢对比一下就清楚了。

#### 联网慢：网络模式与 DNS

WSL 支持几种网络模式，默认的 NAT 模式在国内网络下经常出问题。改写配置文件 `C:\Users\<你的用户名>\.wslconfig`：

**切换为 mirrored 网络模式**

```ini
[wsl2]
networkingMode=mirrored
```

mirrored 模式让 WSL 直接“镜像”宿主机的网络接口，能更好地兼容主机上的代理，很多莫名其妙的连接问题会随之消失。如果某个端口在 mirrored 下还是断断续续，可以再试试前面提到的 consomme 模式。

DNS 是另一个高频嫌疑。每个网络请求之前都要先解析域名，解析一慢，整体感觉就是“网卡了”。有两种处理方式：

- **简单做法**：把 Windows 主机的 DNS 换成公共 DNS（比如 8.8.8.8、1.1.1.1），WSL 通常会自动继承。
- **彻底做法**：在 WSL 内部关掉自动生成，手动指定。编辑 `/etc/wsl.conf` 加入 `generateResolvConf = false`，再往 `/etc/resolv.conf` 里写一行 `nameserver 8.8.8.8`。

还有一种比较冷门的原因：WSL 虚拟网卡的“大量发送卸载”（LSO）在个别网络环境下反而拖后腿。用管理员权限的 PowerShell 关掉它：

**禁用 WSL 虚拟网卡的 LSO**

```powershell
Disable-NetAdapterLso -Name "vEthernet (WSL)" -IncludeHidden
```

如果同时还在用 Docker Desktop，那 WSL 卡顿就更常见了，两者网络栈容易打架。可以到“任务管理器 → 服务”里找到 `WslService` 右键重启，往往立刻见效。

最后一条与网络无关，但几乎是所有人都会犯的：**项目文件别放在 `/mnt/c` 下面**。那是 Windows 的文件系统，在它上面跑 `npm install`、编译、批量读写都会慢得离谱。把项目放在 WSL 自己的家目录（比如 `~/projects`），再用 VS Code 的 WSL 扩展打开，速度完全是两个世界。

| 改了哪个文件 | 生效方式 |
| --- | --- |
| `.wslconfig` | 在 PowerShell 里执行 `wsl --shutdown` |
| `/etc/wsl.conf` | 同上 |
| `/etc/resolv.conf`（手动维护的那种） | 同上 |

### 安装 Ubuntu：桌面版 ISO 根本用不上

发行版列表拉不下来，是这条路上第一个真正的拦路虎：

**拉取发行版列表失败**

```text
wsl --list --online
未能从"https://raw.githubusercontent.com/microsoft/WSL/master/distributions/DistributionInfo.json"
提取分发列表。错误的网关(502)。
错误代码： Wsl/HTTP_E_STATUS_BAD_GATEWAY
```

这个 502 跟 WSL 本身没什么关系。它只是说明：你的电脑去 GitHub 取那份发行版清单时，被中间的网关拦了回来。所以从易到难依次试：

1. 换用 `wsl --update --web-download` 升级一次，有时候顺带就好了；
2. 关掉代理或 VPN 再试，很多时候罪魁祸首正是它；
3. 换 DNS，或者干脆往 `hosts` 文件里手写 `raw.githubusercontent.com` 的 IP；
4. 从微软商店直接搜 Ubuntu 安装，这条路完全绕开 GitHub，最稳；
5. 离线安装，也就是下一小节要讲的办法。

#### 为什么 ISO 不能直接用

笔者的第一反应很自然：我手里不是有 `ubuntu-24.04.1-desktop-amd64.iso` 吗，直接装不就完了。结果是不行，而且不行得有道理。

桌面版 ISO 是一张“安装光盘”。它的内容是启动环境加一个图形化安装程序，运行起来之后要一步一步问你装到哪块硬盘、要不要格式化。而 WSL 要的东西完全不同：它需要的是一套已经装好、解压即可运行的根文件系统，直接挂起来就开机，中间没有“安装”这个步骤。

所以命令也不一样。WSL 用的是 `--from-file` 或者 `--import`，喂给它的必须是 `.wsl` 镜像或者 rootfs 的 tar 包，不是 ISO。

#### 正确的离线安装方式

Ubuntu 官方为每个 LTS 版本都准备了专门给 WSL 打包的镜像，文件名形如 `ubuntu-24.04.1-wsl-amd64.wsl`，几百 MB，在 `releases.ubuntu.com` 或者国内镜像站都能找到。下载好之后：

**从 .wsl 镜像离线安装（在 PowerShell 中执行）**

```powershell
wsl --install --from-file "C:\Users\john\Downloads\ubuntu-24.04.1-wsl-amd64.wsl"
```

安装过程要解包并注册文件系统，会等上一两分钟。完成后会提示你创建一个 UNIX 用户名和密码，跟着走就行。

如果版本不够新、不认 `--from-file` 这个参数，可以改用等价的导入方式（`.wsl` 本质上就是一个 tar 归档）：

**备选方案：手动导入**

```powershell
mkdir C:\Users\john\WSL\Ubuntu-24.04
wsl --import Ubuntu-24.04 C:\Users\john\WSL\Ubuntu-24.04 "C:\Users\john\Downloads\ubuntu-24.04.1-wsl-amd64.wsl" --version 2
```

两者有个重要区别：**用 `--import` 装出来的系统默认以 root 登录**，进去之后还得自己建一个普通用户。用 `--from-file` 则会在首次启动时引导你创建用户，省事得多。

装完验证一下，看到版本号为 2 就对了：

**验证安装结果**

```powershell
wsl -l -v
```

### 把 WSL 挪到 D 盘

WSL 的磁盘文件（`ext4.vhdx`）默认塞在 C 盘的用户目录深处，用着用着 C 盘就见红了，所以迟早要挪走。先看两种办法。

#### 方法一：直接移动（首选）

新版本的 WSL 提供了官方移动命令，一步到位，不产生中间备份文件：

**用 --move 迁移发行版（在 PowerShell 中执行）**

```powershell
wsl --shutdown
wsl --manage Ubuntu-24.04 --move D:\WSL\Ubuntu-24.04
```

迁移完可以确认一下注册表里记的路径是不是已经改过去了：

**查看发行版的实际存放位置**

```powershell
(Get-ChildItem HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss |
  Where-Object { $_.GetValue("DistributionName") -eq 'Ubuntu-24.04' }).GetValue("BasePath")
```

返回 `D:\WSL\Ubuntu-24.04` 就说明成功了。如果报 `ERROR_FILE_NOT_FOUND` 之类的错误，说明注册表没更新干净，那就改用方法二。

#### 方法二：导出再导入（最稳）

这个办法的原理是“先打包备份，再解包到新位置”，兼容性最好，也最让人放心：

**导出、注销、再导入**

```powershell
mkdir D:\WSL_Backup
wsl --export Ubuntu-24.04 D:\WSL_Backup\ubuntu-backup.tar
wsl --unregister Ubuntu-24.04
mkdir D:\WSL\Ubuntu-24.04
wsl --import Ubuntu-24.04 D:\WSL\Ubuntu-24.04 D:\WSL_Backup\ubuntu-backup.tar
```

注意中间那一步 `--unregister` 会真的把 C 盘上的原系统删掉，执行之前一定确认备份文件已经生成好了。导入之后同样会变成 root 登录，需要重新配置默认用户。

如果还没装、想一步到位装在 D 盘，安装时直接带上 `--location` 参数即可：

**全新安装并指定位置**

```powershell
wsl --install -d Ubuntu-24.04 --location D:\WSL\Ubuntu-24.04
```

#### 一个特别典型的误会

笔者当时在 WSL 里敲了这么一行，然后被权限拒绝：

**错误示范**

```bash
mkdir /opt/WSL
mkdir: Permission denied
```

表面上是权限问题（`/opt` 是系统目录，普通用户写不进去，需要 `sudo`），但真正的问题是层次搞错了：`/opt/WSL` 是 **Linux 文件系统里**的一个目录，它实际存在 C 盘那个 `ext4.vhdx` 里面，跟 Windows 的 D 盘一点关系都没有。想迁移到 D 盘，必须回到 PowerShell 那边去操作。

判断自己要做哪件事，看这张表就够了：

| 你想做的事 | 在哪敲 | 命令 |
| --- | --- | --- |
| 在 Linux 里建个文件夹 | WSL 的 bash | `sudo mkdir /opt/WSL` |
| 把整个发行版迁到 D 盘 | Windows PowerShell | `wsl --manage ... --move ...` |
| 访问 D 盘上的文件 | WSL 的 bash | 直接进 `/mnt/d/...` |

## 1.4 中文显示和中文输入

系统装好、能进 bash 了，下一步自然是让它能好好显示中文。这件事其实分三层，很多人把三层混在一起，于是装了一堆互相打架的包。

1. **locale**：决定系统用什么语言、什么编码，关系到日期格式、排序、提示信息；
2. **字体**：决定汉字有没有字形可以画出来，缺字体就显示成方块；
3. **输入法**：决定你怎么把中文敲进去。

### 第一课：apt 必须 sudo

拦在第一道的是权限，而且报错信息长得很唬人：

**apt 的权限报错**

```text
Error: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
Error: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), are you root?
```

意思很直白：装软件要动 `/var/lib/dpkg` 这类系统目录，普通用户没有权限，拿不到那把“锁”。命令前面加 `sudo` 就好。

### 第二课：包名对不上，整条命令全废

这条坑很值得单独说。笔者当时一口气装了一串包：

**看起来没问题的命令**

```bash
sudo apt install xfonts-wqy xfonts-unifont fonts-wqy
```

结果只有一句 `Unable to locate package fonts-wqy`。看起来只是少装一个包，其实不是：**apt 只要在一条命令里遇到一个找不到的包，整条命令就会整体失败**。也就是说 `xfonts-wqy` 和 `xfonts-unifont` 一个都没装上。

原因是 Ubuntu 里压根没有叫 `fonts-wqy` 的包，文泉驿字体是拆开成好几个子包的。正确的写法是：

**分两条，先装 X 字体，再装真正有用的字体**

```bash
sudo apt install xfonts-wqy xfonts-unifont
sudo apt install fonts-wqy-zenhei fonts-wqy-microhei fonts-noto-cjk
```

顺带解释一下这两类的区别：`xfonts-*` 是旧式的 X 核心字体，对 gedit 这类现代 GTK 程序帮助很有限；真正起作用的是 fontconfig 体系下的字体，其中 `fonts-noto-cjk` 是显示中文的主力，比文泉驿完整得多。

### 第三课：语言包和 locale

语言包提供的是“语言数据”，管的是菜单、对话框有没有中文翻译：

**安装中文语言包并设定默认 locale**

```bash
sudo apt update
sudo apt install language-pack-gnome-zh-hans language-pack-zh-hans
sudo update-locale LANG=zh_CN.UTF-8
```

有两点要留意。一是 `language-pack-kde-zh-hans` 在 Ubuntu 官方源里通常找不到，它属于 Kubuntu 的源，直接装会报错，用 GNOME 的话压根不需要。二是 `update-locale` 写进的是下次登录才读的配置，当前这个终端不会立刻变，退出重进或者 `wsl --shutdown` 之后才生效，用 `locale` 命令可以确认。

### 第四课：输入法，别装

这是笔者绕得最远的一个弯。当时想当然地装了一整套 fcitx：`fcitx`、`fcitx-config-gtk`、`fcitx-sunpinyin`、`fcitx-googlepinyin`，结果发现是个反方向的努力。

因为 **WSLg 已经把 Windows 的输入法桥接进来了**。在 WSL 里运行的 Linux 图形程序，直接按 Windows 自己的输入法切换键就能打中文，根本不需要在 Linux 内部再养一套输入法。反过来，装了 fcitx 还会跟 WSLg 的桥接机制抢键盘，弄不好两边都失效。

所以结论就一句：*输入法一个都不要装*。要装的只有字体和语言包。

## 1.5 wsl --shutdown 到底敲在哪

改完 locale，按照惯例要重启 WSL 让配置生效。于是笔者在 Ubuntu 的 bash 里敲了：

**一个必然失败的尝试**

```bash
wsl --shutdown
Command 'wsl' not found, but can be installed with:
sudo apt install wsl
```

两个要点。

第一，`wsl` 是 Windows 侧的命令，你现在在 Linux 里，当然找不到。正确做法是在 PowerShell 或 CMD 里敲。

第二，那句“可以 sudo apt install wsl”是个陷阱，**千万别照做**。Ubuntu 软件源里确实有个叫 `wsl` 的包，但它跟微软的 WSL 毫无关系，装上去什么用都没有，只会让以后查问题时多一层混淆。

如果实在不想切窗口，还有个取巧的办法：WSL 支持直接调用 Windows 的可执行文件（这叫 interop），所以带上 `.exe` 后缀就能在 bash 里执行：

**在 Linux 里调用 Windows 命令**

```bash
wsl.exe --shutdown
```

只是这么一来，当前会话会被自己关掉，终端直接退出。另外，如果目的只是让新配置生效，其实用不着 shutdown，把终端窗口关掉再开一个就够了。

## 1.6 gedit 后面那串奇怪字符

启动 gedit 之后，终端里喷出来一堆这样的东西：

**终端里刷出来的一串控制序列**

```text
gedit;28;13;1;32;1_;28;13;0;32;1_;14;8;1;32;1_;14;8;0;32;1_;
```

看着像乱码，其实不是。这些是应用程序发给终端的 **ANSI 控制序列**，本意是控制光标位置、颜色、清屏之类的动作，正常情况下应该被终端“解析并执行”，而不是打印出来。之所以原形毕露，是因为 gedit 察觉到自己接的不是一个真正的交互式终端，于是干脆把原始指令直接输出了。

它既不影响使用，也不说明程序坏了。嫌吵的话，把输出丢掉或者让它脱离当前会话就行：

**两种清静的办法**

```bash
gedit 2>/dev/null
setsid gedit
```

真正需要警惕的是另一种情况：如果 gedit 窗口里的汉字变成了方块，那才是字体没装好，回去补 `fonts-noto-cjk`。

## 1.7 在 WSLg 里跑出一整个 GNOME 桌面

到这里为止，WSL 已经能跑单个图形程序了。但笔者贪心，想要一整个 Ubuntu 桌面，跟真机装完系统那样。这件事能做成，但要做好折腾一下午的心理准备。

先说一个必须绕开的坑：从网上找到项目地址，直接把 URL 粘到终端里回车。

**把网址当命令敲**

```bash
https://github.com/nufeng1999/WSL_GNOME
-bash: https://github.com/nufeng1999/WSL_GNOME: 没有那个文件或目录
```

Shell 不认识 `https://` 开头的东西，网址不是可执行程序。要用它，得先 `git clone` 下来，再执行里面的脚本。

### 两条路，选哪条

| 方案 | 原理 | 维护状态 |
| --- | --- | --- |
| WSL_GNOME | 借助 Cygwin 的 XWin 提供 X 服务 | 2021 年后基本停更 |
| WSLg 原生 | WSLg 的 Wayland 合成器直接跑 GNOME | 社区活跃 |

笔者的 WSL 已经是 3.0.3，自带 WSLg，所以最后走的是右边这条。下面记的就是这条路的完整过程，也算给 Ubuntu 24.04 + WSLg 这个组合留一份记录。

### 准备工作

首先要打开 systemd。GNOME 的会话是 systemd 用户服务，没有 systemd 就无从谈起。编辑 `/etc/wsl.conf`：

**启用 systemd**

```ini
[boot]
systemd=true
```

改完在 PowerShell 里 `wsl --shutdown`，重新进来才会生效。

然后装桌面。Ubuntu 24.04 的软件源里，一条命令就能把 GNOME 桌面装齐：

**安装桌面环境**

```bash
sudo apt update
sudo apt install ubuntu-desktop
```

Ubuntu 24.04 自带的是 GNOME 46，这个版本仍然保留着 `--nested` 参数，可以直接在 WSLg 的 Wayland 会话里启动一个嵌套的 GNOME Shell，不需要再额外安装 `mutter-dev-bin` 之类的开发包。等到 GNOME 49 之后，旧的 `--nested` 才会被 `--devkit` 取代，那是后话了。

还有一步容易被忽略：把 GDM 屏蔽掉。GDM 是 Ubuntu 的登录管理器，在 WSLg 下面无法正常工作，反而会挡住后面手动启动的会话。

**屏蔽 GDM 并降低渲染要求**

```bash
sudo systemctl mask gdm.service
echo 'export GSK_RENDERER=cairo' >> ~/.bashrc
source ~/.bashrc
```

`GSK_RENDERER=cairo` 是给 GTK4 应用用的保险，能避开 WSL 下 GPU 渲染导致的卡死和黑屏。

### 让 GNOME Shell 用正确的方式启动

接下来要覆盖 `gnome-shell` 的启动命令，强制它走 `--nested --wayland` 这条路：

**创建 systemd 覆盖文件**

```bash
sudo mkdir -p /etc/systemd/user/org.gnome.Shell@.service.d/
sudo nano /etc/systemd/user/org.gnome.Shell@.service.d/override.conf
```

文件内容是这样，注意第一行 `ExecStart=` 后面是空的：

**override.conf**

```ini
[Service]
ExecStart=
ExecStart=/usr/bin/gnome-shell --nested --wayland --mode=%i
```

那行空的 `ExecStart=` 不是笔误，也绝对不能省。systemd 的规则是：同名的 `ExecStart` 会累加执行，只有先写一个空的把默认值清掉，后面这行才会成为唯一的启动命令。

在 nano 里保存退出的手法是：`Ctrl+O` 写入、回车确认文件名，然后 `Ctrl+X` 退出。

### 排错一：snap 卡在 0%，然后把 dpkg 搞坏了

装 `ubuntu-desktop` 的过程中，屏幕卡在了这么一行：

**卡住的 snap 下载**

```text
==> Installing the firefox snap
下载 snap "snapd" (28254)，来自频道 "stable"
进度：[  0%] [
```

原因是 Ubuntu 24.04 里的 `firefox` 已经是一个 snap 过渡包，安装时要去 snap 商店现场下载本体，而 snap 在国内没有官方镜像，速度很不稳定。卡在 0% 通常就是它在等一个永远等不到的连接。

最要命的是后续：下载连接被重置，安装脚本失败，整个 `dpkg` 的配置流程就中断了，此后所有 apt 操作都会报依赖损坏。

修复顺序是这样的：

**修复被中断的 dpkg，并强制移除坏掉的 firefox**

```bash
sudo dpkg --configure -a
sudo apt --fix-broken install
sudo dpkg --force depends -P firefox
```

然后绕开 firefox 重新装桌面。apt 支持在包名后面加一个减号表示“不要装这个”：

**排除 firefox 和 thunderbird 再装桌面**

```bash
sudo apt install ubuntu-desktop firefox- thunderbird-
```

如果确实需要一个能用的 Firefox，可以改用 Mozilla 官方 PPA 提供的传统 deb 版本，这样就完全不走 snap 了：

**用 PPA 安装 deb 版 Firefox**

```bash
sudo add-apt-repository ppa:mozillateam/ppa
sudo apt update
sudo apt install firefox
```

另外几条缓解 snap 卡顿的办法也记在这里：

- 重启 snapd 服务：`sudo systemctl restart snapd snapd.socket`；
- 清掉缓存的 snap 文件：`sudo rm -rf /var/lib/snapd/cache/*`；
- 给 snapd 单独配上代理。

### 排错二：asserts failed

配置都写好了，敲下启动命令，等来的却是这样一句：

**启动桌面失败**

```bash
systemctl --user daemon-reload
systemctl --user start gnome-session@ubuntu.target
A dependency job for gnome-session@ubuntu.target failed. See 'journalctl -xe' for details.
```

先别猜，直接看日志：

**查日志**

```bash
journalctl --user -u gnome-session@ubuntu.target -u org.gnome.Shell@ubuntu.service --no-pager -n 50
```

日志里有价值的是这三行：

**日志里的关键三行**

```text
org.gnome.Shell@ubuntu.service: Starting requested but asserts failed.
Assertion failed for org.gnome.Shell@ubuntu.service - GNOME Shell.
Dependency failed for gnome-session@ubuntu.target - GNOME Session (session: ubuntu).
```

`asserts failed` 的意思是：服务启动前有个前置条件没满足，systemd 干脆不让它启动。GNOME Shell 的服务单元里带着一条断言，要求环境变量 `XDG_SESSION_TYPE` 必须是 `wayland`。而在 WSLg 环境下，这个变量没有被正确送进 systemd 的用户会话里，断言自然就挂了。

补上它就行。systemd 用户会话会在启动时读取 `~/.config/environment.d/` 下面的配置，把变量写进去：

**补上缺失的会话类型变量**

```bash
mkdir -p ~/.config/environment.d/
nano ~/.config/environment.d/gnome-wayland.conf
```

内容：

**gnome-wayland.conf**

```ini
XDG_SESSION_TYPE=wayland
XDG_SESSION_DESKTOP=gnome
XDG_CURRENT_DESKTOP=GNOME
```

然后重载再启动：

**重新拉起桌面**

```bash
systemctl --user daemon-reload
systemctl --user start gnome-session@ubuntu.target
```

这一次桌面就真的出来了。事后回看，卡了半天的只是三个环境变量。

### 桌面跑起来之后

几条经验，都是踩出来的：

- **给它起个别名**。启动命令太长，写进 `~/.bashrc`：`alias startgnome='systemctl --user start gnome-session@ubuntu.target'`，以后一句 `startgnome` 就能呼出桌面。
- **千万别点“注销”或“重启系统”**。WSL 里没有登录管理器接管，桌面窗口一关就再也不会自己弹回来，还得回终端重新敲启动命令。
- **卡死了就 `wsl --shutdown`**。关掉等几秒再进，比在桌面里点什么都管用。
- **平时可以不启动桌面**。纯命令行开发完全不需要它，桌面是要吃 CPU 和内存的。

## 1.8 ROS 是什么

### ROS 不是操作系统

ROS 的全称是 Robot Operating System，中文常译作“机器人操作系统”。这个叫法很有迷惑性：*ROS 并不是一个操作系统*，它不能独立安装在裸机上，而是运行在操作系统（通常是 Ubuntu）之上的一套*开源机器人软件开发框架*。ROS 本身并不是一个操作系统，而是可以安装在现在已有的操作系统上（Linux、Windows、Mac）的软件库和工具集。

为什么机器人软件需要这样一套框架？因为一个稍微像样的机器人程序，往往由很多独立的部分组成：读取激光雷达和相机数据、处理感知、做运动规划、控制电机、与人交互……如果每个模块都自己写一套和别人通信的办法，整个系统会迅速变成一团乱麻。ROS 要解决的正是这个问题：它规定了一套统一的通信机制，并提供了大量现成的工具和功能包，让开发者可以专心写自己的那一部分，其余交给生态。

### 核心概念：节点与通信

ROS 里有两个必须最先建立印象的概念：

- **节点（node）**：一个可以独立运行的程序模块。整个机器人系统可以看作许多节点协作组成的“网络”。
- **通信方式**：节点之间通过*话题（topic）*、*服务（service）*、*动作（action）*等方式交换*消息（message）*，消息就是节点间传递的数据包。

打个比方：传感器节点像是不断播报路况的广播电台（话题），导航节点像是收听广播的司机；而当你需要打车时那种“一问一答”的交互（服务），又和广播完全不同。这套通信机制的细节会在后面的章节展开，这里先记住“节点 + 通信”这个总框架即可。

### 从 ROS 1 到 ROS 2

ROS 起源于 2007 年斯坦福大学的一个机器人项目，随后由 Willow Garage 公司推动，逐渐发展成全球机器人研究界的事实标准，积累了庞大的生态。不过随着机器人应用走向工业化和复杂化，ROS 1 的一些先天设计问题开始暴露：

- 通信依赖一个中心节点 `roscore`，它一旦宕机，整个系统就瘫痪；
- 以单机为主，多机分布式和实时性支持不足；
- 几乎没有安全机制，难以满足工业级要求。

于是社区从 2014 年前后开始重新设计，2017 年发布了 ROS 2 的第一个正式发行版。ROS 2 不是 ROS 1 的小修小补，而是一次架构级的重写。今天，ROS 1 已经停止维护（最后一个发行版是 2020 年的 Noetic），新项目都应当基于 ROS 2。本书讲的也是 ROS 2。

## 1.9 ROS 1 与 ROS 2 的主要区别

把上面的要点归纳成一张对比表，方便查阅：

| 对比项 | ROS 1 | ROS 2 |
| --- | --- | --- |
| 通信机制 | 自研 TCPROS/UDPROS | 基于 DDS 标准 |
| 中心节点 | 依赖 `roscore` | 去中心化，无需主节点 |
| 实时性 | 不支持 | 可通过 DDS 配置支持 |
| 多机分布式 | 支持较弱 | 原生良好支持 |
| 安全机制 | 几乎没有 | 内置（如 SROS2） |
| 支持平台 | 主要 Linux | Linux/Windows/macOS 等 |

对学习者而言，这些区别并不需要现在就全部弄懂。你只需要记住一个大方向：*学 ROS 2*。后面章节里出现的所有命令和示例，都默认运行在 ROS 2 之上。

## 1.10 ROS 2 与 Ubuntu 版本的搭配

ROS 2 和 Ubuntu 一样，也有发行版的概念，而且两者高度绑定：官方每两年发布一个 ROS 2 的 LTS 版本，与当年度 Ubuntu 的 LTS 版本一一对应。最常用的组合如下：

| Ubuntu 版本 | ROS 2 发行版 | 说明 |
| --- | --- | --- |
| 20.04（2020 LTS） | Foxy（2020 LTS） | 较旧，已停止维护 |
| 22.04（2022 LTS） | Humble（2022 LTS） | 目前最主流，教程最多 |
| 24.04（2024 LTS） | Jazzy（2024 LTS） | 本书使用的组合，适合新硬件 |

给初学者的建议很明确：*Ubuntu 24.04 + ROS 2 Jazzy* 是本书使用的组合，也是目前新装环境最省心的选择——24.04 是一个长期支持的 LTS，Jazzy 与它一一对应，官方支持一直延续到 2029 年。如果手头的电脑较旧，或者更看重网上现成的教程数量，22.04 + Humble 依然可用，社区资料也最丰富；但不建议为了追新去混搭，比如在 24.04 上硬装 Humble，或者在 22.04 上装 Jazzy，往往会遇到一堆莫名其妙的编译错误，而问题根源只是版本不对。版本搭配对了，后面能少走一半弯路。等你在第二章学会打开终端之后，可以用 `lsb_release -a` 这条命令随时查看自己系统的 Ubuntu 版本。

如果你现在对“Ubuntu 到底是什么、WSL 怎么用、ROS 能干什么”已经有了大致印象，那这一章的任务就完成了。翻开第二章，我们从打开终端开始。
