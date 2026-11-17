---
title: 第一章 · Ubuntu、WSL 与 ROS 简介
description: 从 Linux 与 Ubuntu 讲起，装好 WSL、配好中文与图形界面，最后理清 ROS 1 与 ROS 2 的版本路线。
---

# 第一章 · Ubuntu、WSL 与 ROS 简介

在开始敲第一行命令之前，先用一章的篇幅把几个名字弄清楚：Ubuntu 到底是什么，为什么机器人开发几乎离不开它；WSL 又是什么，为什么它能让 Ubuntu 直接住在 Windows 里；ROS 又是什么，为什么它叫操作系统却不是操作系统。这一章既讲概念，也把环境完整搭起来：装好 WSL、配好中文、跑通图形界面，最后把 ROS 2 的版本路线定下来。读完这一章，后面的每一章就都有了一块可以落脚的地基。

## 1.1 什么是 Ubuntu

### 从 Linux 说起

先纠正一个常见的误解：我们平时说的“Linux”，严格来讲只是操作系统的一个*内核*，也就是负责管理硬件、进程、内存的那部分最核心的程序。光有内核还不足以日常使用，还需要配上图形界面、各类软件和工具，才构成一个完整可用的操作系统。内核加上这些软件的整体，叫作 Linux 的*发行版*。

Ubuntu 就是众多发行版中人气最高、资料最全的一个。它基于另一个老牌发行版 Debian，由英国的 Canonical 公司维护，完全免费、开放源代码。因为用的人多，网上的教程、第三方软件、硬件驱动的支持都最齐全，所以它也是初学者最合适的入门选择。

Ubuntu 的版本号很有规律，形如“年份.月份”。比如 22.04 表示 2022 年 4 月发布。它每年发布两次，其中*偶数年的 4 月*会发布一个特别版本，名字里带 LTS（Long Term Support，长期支持），官方会提供长达五年的维护更新。机器人开发领域几乎清一色使用 LTS 版本，图的就是稳定和长期可用，本文也以 LTS 版本为前提。

### 为什么机器人开发普遍使用 Ubuntu

机器人开发选择 Ubuntu，通常出于几个现实原因：

- **ROS 官方的主战场就是 Ubuntu**。ROS 的安装、文档、示例在 Ubuntu 上支持得最好，很多版本组合甚至只有 Ubuntu 这一条“官方推荐”路线，跟着走最不容易踩坑。

- **免费开源**。机器人项目可以自由使用、修改和分发，不必为许可证操心。

- **生态成熟**。激光雷达、相机、机械臂等硬件厂商大多优先提供 Linux 驱动；论文开源代码、算法库也常在 Ubuntu 上测试。

- **命令行与脚本化能力强**。机器人常常需要远程登录、批量处理、自动运行，Ubuntu 的命令行环境让这些操作非常顺手。这正是第二章要练的基本功。

当然，ROS 并不是只能在 Ubuntu 上跑，其他 Linux 发行版甚至 Windows 也可以。但对新手而言，跟随 ROS 官方支持最好的 Ubuntu，能省下大量和环境搏斗的时间。

![Ubuntu 桌面界面](/ros2/ubuntu-desktop.webp)

## 1.2 在 Windows 上使用 Ubuntu：WSL

我们的目的是让ROS2在电脑上跑起来。至于是虚拟机还是买一台电脑重装系统无所谓。为什么用WSL？因为写这个文档的时候我在和大学的朋友们做科研训练。恺哥说真男人用Linux就应该不用桌面版只用命令行.......

WSL 全称 Windows Subsystem for Linux，中文叫“适用于 Linux 的 Windows 子系统”。一句话解释：让 Linux 直接住在 Windows 里，不必再装一台虚拟机。它开机一两秒就能进系统，能直接读写 Windows 里的文件，图形程序也能开在 Windows 桌面上。

不过这条路上的坑明显更密，几乎每走一步都会撞上一个报错。所以本章后面的环境部分不按教科书的顺序写，而是按照我当时真实的踩坑顺序写。

### WSL 是什么

严格说来，WSL 1 只是把 Linux 的系统调用“翻译”成 Windows 能听懂的形式，兼容性一般。从 WSL 2 开始，微软干脆在 Windows 内部塞了一台轻量虚拟机，里面跑的是真正的 Linux 内核。所以今天用的 WSL 2 和 WSL 3，本质上是“一台你看不见、也不用管的虚拟机”。

这句话很重要，因为它提前解释了后面一堆坑的共同来源：你其实是在两套系统之间来回横跳，而两边的命令、路径、权限规则全都不一样。

![WSL 的分层结构。Windows 里先有一层 WSL 引擎，引擎之下的 Linux 内核跑在轻量虚拟机中，内核之上才是发行版和你的程序；WSLg 负责把图形窗口送回 Windows 桌面](/ros2/wsl-layers.webp)

从上图往下看，我们的操作其实分属不同楼层。最塌实的做法，是先记住哪条命令该在哪一层敲：

| **在 Windows 的 PowerShell 里敲**   | **在 WSL 的 Ubuntu 里敲**          |
|:------------------------------------|:-----------------------------------|
| `wsl -l -v`                         | `sudo apt update`                  |
| `wsl --update --web-download`       | `systemctl --user ...`             |
| `wsl --install --from-file x.wsl`   | `ros2 run turtlesim ...`           |
| `wsl --manage Ubuntu --move D:\WSL` | `glxinfo -B`                       |
| `wsl --shutdown`                    | `wsl.exe --shutdown`（唯一的特例） |

本章后面反复出现的报错，绝大多数都只是“在错误的楼层敲了正确的命令”而已。

### 和装一台真机 Ubuntu 相比

WSL 并不是唯一的选择，把 Ubuntu 直接装到硬盘上（单系统或双系统）也是一条路。两者差别如下：

| **对比项**        | **真机安装 Ubuntu**  | **WSL**                          |
|:------------------|:---------------------|:---------------------------------|
| 本质              | 一台完整的电脑       | Windows 里的轻量 Linux 子系统    |
| 磁盘占用          | 几十 GB 起           | 几个 GB 起                       |
| 开机速度          | 重启并切换系统       | 一两秒                           |
| 和 Windows 传文件 | 靠分区挂载或网络共享 | 直接访问 `/mnt/c`                |
| 图形界面          | 完整桌面，装完就有   | 单个程序开箱即用，完整桌面要折腾 |
| 快照回滚          | 可用备份工具整机还原 | 没有，弄坏了只能重装             |

## 1.3 安装并配置 WSL

### 先看清楚自己装的是哪一版

一切从两条命令开始。第一条看引擎版本，第二条看装了哪些发行版：

**查看 WSL 版本与已安装的发行版（在 PowerShell 中执行）**

```bash
wsl -v
wsl -l -v
```
第一条命令会打印一大串版本号，刚看的时候一头雾水。按字段拆开就好理解了：

| **字段**                  | **含义**                                |
|:--------------------------|:----------------------------------------|
| WSL 版本                  | 引擎本身的版本，升级它用 `wsl --update` |
| 内核版本                  | 那台轻量虚拟机里跑的 Linux 内核版本     |
| WSLg 版本                 | 图形界面组件的版本                      |
| MSRDC / Direct3D / DXCore | 图形转发相关的组件                      |
| Windows 版本              | 宿主系统版本                            |

第二条命令的输出，常常是新手遇到的第一个“惊吓”：

**什么都没装时的提示**

```bash
适用于 Linux 的 Windows 子系统没有已安装的分发。
可按照以下说明安装分发来解决此问题:
使用 'wsl.exe --list --online' 列出可用的分发
和 'wsl.exe --install <Distro>' 进行安装。
```
这其实不是报错。前面说过，WSL 引擎只是一个“壳”，Ubuntu、Debian 这些发行版是要另外装的“整车”。引擎升级和装发行版是两件独立的事，先装引擎、后装发行版完全正常。

笔者的经历就是一次典型的时间差：早上敲 `wsl -v`，显示的是 `2.7.8.0`，内核 `6.18.33.1-1`；晚上再敲，已经变成 `3.0.3.0`、内核 `6.18.54.1-1` 了。中间什么都没干，只是 Windows 自动更新顺手把 WSL 推上去了。

### 安装 Ubuntu：桌面版 ISO 根本用不上

发行版列表拉不下来，是这条路上第一个真正的拦路虎：

**拉取发行版列表失败**

```bash
wsl --list --online
未能从"https://raw.githubusercontent.com/microsoft/WSL/master/distributions/DistributionInfo.json"
提取分发列表。错误的网关(502)。
错误代码： Wsl/HTTP_E_STATUS_BAD_GATEWAY
```
这个 502 跟 WSL 本身没什么关系。它只是说明：你的电脑去 GitHub 取那份发行版清单时，被中间的网关拦了回来。所以从易到难依次试：

1.  换用 `wsl --update --web-download` 升级一次，有时候顺带就好了；

2.  关掉代理或 VPN 再试，很多时候罪魁祸首正是它；

3.  换 DNS，或者干脆往 `hosts` 文件里手写 `raw.githubusercontent.com` 的 IP；

4.  从微软商店直接搜 Ubuntu 安装，这条路完全绕开 GitHub，最稳；

5.  离线安装，也就是下一小节要讲的办法。

#### 为什么 ISO 不能直接用

我的第一反应很自然：我手里不是有 `ubuntu-24.04.1-desktop-amd64.iso` 吗，直接装不就完了。结果是不行，而且不行得有道理。

桌面版 ISO 是一张“安装光盘”。它的内容是启动环境加一个图形化安装程序，运行起来之后要一步一步问你装到哪块硬盘、要不要格式化。而 WSL 要的东西完全不同：它需要的是一套已经装好、解压即可运行的根文件系统，直接挂起来就开机，中间没有“安装”这个步骤。

所以命令也不一样。WSL 用的是 `--from-file` 或者 `--import`，喂给它的必须是 `.wsl` 镜像或者 rootfs 的 tar 包，不是 ISO。

#### 正确的离线安装方式

Ubuntu 官方为每个 LTS 版本都准备了专门给 WSL 打包的镜像，文件名形如 `ubuntu-24.04.1-wsl-amd64.wsl`，几百 MB，在 `releases.ubuntu.com` 或者国内镜像站都能找到。下载好之后：

**从 .wsl 镜像离线安装（在 PowerShell 中执行）**

```bash
wsl --install --from-file "C:\Users\john\Downloads\ubuntu-24.04.1-wsl-amd64.wsl"
```
安装过程要解包并注册文件系统，会等上一两分钟。完成后会提示你创建一个 UNIX 用户名和密码，跟着走就行。

如果版本不够新、不认 `--from-file` 这个参数，可以改用等价的导入方式（`.wsl` 本质上就是一个 tar 归档）：

**备选方案：手动导入**

```bash
mkdir C:\Users\john\WSL\Ubuntu-24.04
wsl --import Ubuntu-24.04 C:\Users\john\WSL\Ubuntu-24.04 "C:\Users\john\Downloads\ubuntu-24.04.1-wsl-amd64.wsl" --version 2
```
两者有个重要区别：**用 `--import` 装出来的系统默认以 root 登录**，进去之后还得自己建一个普通用户。用 `--from-file` 则会在首次启动时引导你创建用户，省事得多。

装完验证一下，看到版本号为 2 就对了：

**验证安装结果**

```bash
wsl -l -v
```
### 把 WSL 挪到 D 盘

WSL 的磁盘文件（`ext4.vhdx`）默认塞在 C 盘的用户目录深处，用着用着 C 盘就见红了，所以迟早要挪走。先看两种办法。

#### 方法一：直接移动（首选）

新版本的 WSL 提供了官方移动命令，一步到位，不产生中间备份文件：

**用 --move 迁移发行版（在 PowerShell 中执行）**

```bash
wsl --shutdown
wsl --manage Ubuntu-24.04 --move D:\WSL\Ubuntu-24.04
```
迁移完可以确认一下注册表里记的路径是不是已经改过去了：

**查看发行版的实际存放位置**

```bash
(Get-ChildItem HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss |
  Where-Object { $_.GetValue("DistributionName") -eq 'Ubuntu-24.04' }).GetValue("BasePath")
```
返回 `D:\WSL\Ubuntu-24.04` 就说明成功了。如果报 `ERROR_FILE_NOT_FOUND` 之类的错误，说明注册表没更新干净，那就改用方法二。

#### 方法二：导出再导入（最稳）

这个办法的原理是“先打包备份，再解包到新位置”，兼容性最好，也最让人放心：

**导出、注销、再导入**

```bash
mkdir D:\WSL_Backup
wsl --export Ubuntu-24.04 D:\WSL_Backup\ubuntu-backup.tar
wsl --unregister Ubuntu-24.04
mkdir D:\WSL\Ubuntu-24.04
wsl --import Ubuntu-24.04 D:\WSL\Ubuntu-24.04 D:\WSL_Backup\ubuntu-backup.tar
```
注意中间那一步 `--unregister` 会真的把 C 盘上的原系统删掉，执行之前一定确认备份文件已经生成好了。导入之后同样会变成 root 登录，需要重新配置默认用户。

如果还没装、想一步到位装在 D 盘，安装时直接带上 `--location` 参数即可：

**全新安装并指定位置**

```bash
wsl --install -d Ubuntu-24.04 --location D:\WSL\Ubuntu-24.04
```
## 1.4 中文显示和中文输入

系统装好、能进 bash 了，下一步自然是让它能好好显示中文。这件事其实分三层，很多人把三层混在一起，于是装了一堆互相打架的包。

1.  **locale**：决定系统用什么语言、什么编码，关系到日期格式、排序、提示信息；

2.  **字体**：决定汉字有没有字形可以画出来，缺字体就显示成方块；

3.  **输入法**：决定你怎么把中文敲进去。

### 第一课：apt 必须 sudo

拦在第一道的是权限，而且报错信息长得过于唬人：

**apt 的权限报错**

```bash
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

## 1.6 ROS 是什么

### ROS 不是操作系统

ROS 的全称是 Robot Operating System，中文常译作“机器人操作系统”。这个叫法很有迷惑性：*ROS 并不是一个操作系统*，它不能独立安装在裸机上，而是运行在操作系统（通常是 Ubuntu）之上的一套*开源机器人软件开发框架*。ROS本身并不是一个操作系统，而是可以安装在现在已有的操作系统上（Linux、Windows、Mac）上的 软件库和工具集 。

为什么机器人软件需要这样一套框架？因为一个稍微像样的机器人程序，往往由很多独立的部分组成：读取激光雷达和相机数据、处理感知、做运动规划、控制电机、与人交互……如果每个模块都自己写一套和别人通信的办法，整个系统会迅速变成一团乱麻。ROS 要解决的正是这个问题：它规定了一套统一的通信机制，并提供了大量现成的工具和功能包，让开发者可以专心写自己的那一部分，其余交给生态。

### 核心概念：节点与通信

ROS 里有两个必须最先建立印象的概念：

- **节点（node）**：一个可以独立运行的程序模块。整个机器人系统可以看作许多节点协作组成的 “网络”。

- **通信方式**：节点之间通过*话题（topic）*、*服务（service）*、*动作（action）*等方式交换*消息（message）*，消息就是节点间传递的数据包。

打个比方：传感器节点像是不断播报路况的广播电台（话题），导航节点像是收听广播的司机；而当你需要打车时那种“一问一答”的交互（服务），又和广播完全不同。这套通信机制的细节会在后面的章节展开，这里先记住“节点 + 通信”这个总框架即可。

### 从 ROS 1 到 ROS 2

ROS 起源于 2007 年斯坦福大学的一个机器人项目，随后由 Willow Garage 公司推动，逐渐发展成全球机器人研究界的事实标准，积累了庞大的生态。不过随着机器人应用走向工业化和复杂化，ROS 1 的一些先天设计问题开始暴露：

- 通信依赖一个中心节点 `roscore`，它一旦宕机，整个系统就瘫痪；

- 以单机为主，多机分布式和实时性支持不足；

- 几乎没有安全机制，难以满足工业级要求。

于是社区从 2014 年前后开始重新设计，2017 年发布了 ROS 2 的第一个正式发行版。ROS 2 不是 ROS 1 的小修小补，而是一次架构级的重写。今天，ROS 1 已经停止维护（最后一个发行版是 2020 年的 Noetic），新项目都应当基于 ROS 2。本书讲的也是 ROS 2。

## 1.7 ROS 1 与 ROS 2 的主要区别

把上面的要点归纳成一张对比表，方便查阅：

| **对比项** | **ROS 1**          | **ROS 2**              |
|:-----------|:-------------------|:-----------------------|
| 通信机制   | 自研 TCPROS/UDPROS | 基于 DDS 标准          |
| 中心节点   | 依赖 `roscore`     | 去中心化，无需主节点   |
| 实时性     | 不支持             | 可通过 DDS 配置支持    |
| 多机分布式 | 支持较弱           | 原生良好支持           |
| 安全机制   | 几乎没有           | 内置（如 SROS2）       |
| 支持平台   | 主要 Linux         | Linux/Windows/macOS 等 |

对学习者而言，这些区别并不需要现在就全部弄懂。你只需要记住一个大方向：*学 ROS 2*。后面章节里出现的所有命令和示例，都默认运行在 ROS 2 之上。

## 1.8 ROS 2 与 Ubuntu 版本的搭配

ROS 2 和 Ubuntu 一样，也有发行版的概念，而且两者高度绑定：官方每两年发布一个 ROS 2 的 LTS 版本，与当年度 Ubuntu 的 LTS 版本一一对应。最常用的组合如下：

| **Ubuntu 版本**   | **ROS 2 发行版**   | **说明**                   |
|:------------------|:-------------------|:---------------------------|
| 20.04（2020 LTS） | Foxy（2020 LTS）   | 较旧，已停止维护           |
| 22.04（2022 LTS） | Humble（2022 LTS） | 目前最主流，教程最多       |
| 24.04（2024 LTS） | Jazzy（2024 LTS）  | 本书使用的组合，适合新硬件 |

给初学者的建议很明确：*Ubuntu 24.04 + ROS 2 Jazzy* 是本书使用的组合，也是目前新装环境最省心的选择——24.04 是一个长期支持的 LTS，Jazzy 与它一一对应，官方支持一直延续到 2029 年。如果手头的电脑较旧，或者更看重网上现成的教程数量，22.04 + Humble 依然可用，社区资料也最丰富；但不建议为了追新去混搭，比如在 24.04 上硬装 Humble，或者在 22.04 上装 Jazzy，往往会遇到一堆莫名其妙的编译错误，而问题根源只是版本不对。版本搭配对了，后面能少走一半弯路。等你在第二章学会打开终端之后，可以用 `lsb_release -a` 这条命令随时查看自己系统的 Ubuntu 版本。

这里有一条最重要的原则：*不要混搭*。比如在 Ubuntu 20.04 上硬装 Humble，或在 22.04 上装 Foxy，往往会遇到一堆莫名其妙的编译错误，而问题根源只是版本不对。版本搭配对了，后面能少走一半弯路。等你在第二章学会打开终端之后，可以用 `lsb_release -a` 这条命令随时查看自己系统的 Ubuntu 版本。

如果你现在对 “Ubuntu 到底是什么、WSL 怎么用、ROS 能干什么” 已经有了大致印象，那这一章的任务就完成了。翻开第二章，我们从打开终端开始。
