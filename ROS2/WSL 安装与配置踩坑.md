# WSL 安装与配置踩坑

## 安装并配置 WSL

### 先看清楚自己装的是哪一版

一切从两条命令开始。第一条看引擎版本，第二条看装了哪些发行版：

**查看 WSL 版本与已安装的发行版（在 PowerShell 中执行）**

```bash
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

```bash
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

```bash
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

```bash
[wsl2]
networkingMode=mirrored
```

mirrored 模式让 WSL 直接“镜像”宿主机的网络接口，能更好地兼容主机上的代理，很多莫名其妙的连接问题会随之消失。如果某个端口在 mirrored 下还是断断续续，可以再试试前面提到的 consomme 模式。

DNS 是另一个高频嫌疑。每个网络请求之前都要先解析域名，解析一慢，整体感觉就是“网卡了”。有两种处理方式：

- **简单做法**：把 Windows 主机的 DNS 换成公共 DNS（比如 8.8.8.8、1.1.1.1），WSL 通常会自动继承。
- **彻底做法**：在 WSL 内部关掉自动生成，手动指定。编辑 `/etc/wsl.conf` 加入 `generateResolvConf = false`，再往 `/etc/resolv.conf` 里写一行 `nameserver 8.8.8.8`。

还有一种比较冷门的原因：WSL 虚拟网卡的“大量发送卸载”（LSO）在个别网络环境下反而拖后腿。用管理员权限的 PowerShell 关掉它：

**禁用 WSL 虚拟网卡的 LSO**

```bash
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

```bash
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

笔者的第一反应很自然：我手里不是有 `ubuntu-26.04.1-desktop-amd64.iso` 吗，直接装不就完了。结果是不行，而且不行得有道理。

桌面版 ISO 是一张“安装光盘”。它的内容是启动环境加一个图形化安装程序，运行起来之后要一步一步问你装到哪块硬盘、要不要格式化。而 WSL 要的东西完全不同：它需要的是一套已经装好、解压即可运行的根文件系统，直接挂起来就开机，中间没有“安装”这个步骤。

所以命令也不一样。WSL 用的是 `--from-file` 或者 `--import`，喂给它的必须是 `.wsl` 镜像或者 rootfs 的 tar 包，不是 ISO。

#### 正确的离线安装方式

Ubuntu 官方为每个 LTS 版本都准备了专门给 WSL 打包的镜像，文件名形如 `ubuntu-26.04.1-wsl-amd64.wsl`，几百 MB，在 `releases.ubuntu.com` 或者国内镜像站都能找到。下载好之后：

**从 .wsl 镜像离线安装（在 PowerShell 中执行）**

```bash
wsl --install --from-file "C:\Users\john\Downloads\ubuntu-26.04.1-wsl-amd64.wsl"
```

安装过程要解包并注册文件系统，会等上一两分钟。完成后会提示你创建一个 UNIX 用户名和密码，跟着走就行。

如果版本不够新、不认 `--from-file` 这个参数，可以改用等价的导入方式（`.wsl` 本质上就是一个 tar 归档）：

**备选方案：手动导入**

```bash
mkdir C:\Users\john\WSL\Ubuntu-26.04
wsl --import Ubuntu-26.04 C:\Users\john\WSL\Ubuntu-26.04 "C:\Users\john\Downloads\ubuntu-26.04.1-wsl-amd64.wsl" --version 2
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
wsl --manage Ubuntu-26.04 --move D:\WSL\Ubuntu-26.04
```

迁移完可以确认一下注册表里记的路径是不是已经改过去了：

**查看发行版的实际存放位置**

```bash
(Get-ChildItem HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss |
  Where-Object { $_.GetValue("DistributionName") -eq 'Ubuntu-26.04' }).GetValue("BasePath")
```

返回 `D:\WSL\Ubuntu-26.04` 就说明成功了。如果报 `ERROR_FILE_NOT_FOUND` 之类的错误，说明注册表没更新干净，那就改用方法二。

#### 方法二：导出再导入（最稳）

这个办法的原理是“先打包备份，再解包到新位置”，兼容性最好，也最让人放心：

**导出、注销、再导入**

```bash
mkdir D:\WSL_Backup
wsl --export Ubuntu-26.04 D:\WSL_Backup\ubuntu-backup.tar
wsl --unregister Ubuntu-26.04
mkdir D:\WSL\Ubuntu-26.04
wsl --import Ubuntu-26.04 D:\WSL\Ubuntu-26.04 D:\WSL_Backup\ubuntu-backup.tar
```

注意中间那一步 `--unregister` 会真的把 C 盘上的原系统删掉，执行之前一定确认备份文件已经生成好了。导入之后同样会变成 root 登录，需要重新配置默认用户。

如果还没装、想一步到位装在 D 盘，安装时直接带上 `--location` 参数即可：

**全新安装并指定位置**

```bash
wsl --install -d Ubuntu-26.04 --location D:\WSL\Ubuntu-26.04
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

## 中文显示和中文输入

系统装好、能进 bash 了，下一步自然是让它能好好显示中文。这件事其实分三层，很多人把三层混在一起，于是装了一堆互相打架的包。

1. **locale**：决定系统用什么语言、什么编码，关系到日期格式、排序、提示信息；
2. **字体**：决定汉字有没有字形可以画出来，缺字体就显示成方块；
3. **输入法**：决定你怎么把中文敲进去。

### 第一课：apt 必须 sudo

拦在第一道的是权限，而且报错信息长得很唬人：

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

## wsl --shutdown 到底敲在哪

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

## gedit 后面那串奇怪字符

启动 gedit 之后，终端里喷出来一堆这样的东西：

**终端里刷出来的一串控制序列**

```bash
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

## 在 WSLg 里跑出一整个 GNOME 桌面

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

笔者的 WSL 已经是 3.0.3，自带 WSLg，所以最后走的是右边这条。下面记的就是这条路的完整过程，也算给 Ubuntu 26.04 这个比较新的组合留一份记录。

### 准备工作

首先要打开 systemd。GNOME 的会话是 systemd 用户服务，没有 systemd 就无从谈起。编辑 `/etc/wsl.conf`：

**启用 systemd**

```bash
[boot]
systemd=true
```

改完在 PowerShell 里 `wsl --shutdown`，重新进来才会生效。

然后装桌面。这里有个关键包 `mutter-dev-bin`，不能漏：

**安装桌面环境**

```bash
sudo apt update
sudo apt install ubuntu-desktop mutter-dev-bin
```

`mutter-dev-bin` 之所以关键，是因为 Ubuntu 26.04 带的是 GNOME 50，而 GNOME 从 49 之后彻底移除了旧的 `--nested` 参数，改用 `--devkit` 模式来启动嵌套桌面，这个参数正是由 `mutter-dev-bin` 提供的。少装它，后面的启动命令一定失败。

还有一步容易被忽略：把 GDM 屏蔽掉。GDM 是 Ubuntu 的登录管理器，在 WSLg 下面无法正常工作，反而会挡住后面手动启动的会话。

**屏蔽 GDM 并降低渲染要求**

```bash
sudo systemctl mask gdm.service
echo 'export GSK_RENDERER=cairo' >> ~/.bashrc
source ~/.bashrc
```

`GSK_RENDERER=cairo` 是给 GTK4 应用用的保险，能避开 WSL 下 GPU 渲染导致的卡死和黑屏。

### 让 GNOME Shell 用正确的方式启动

接下来要覆盖 `gnome-shell` 的启动命令，强制它走 `--devkit --no-x11` 这条路：

**创建 systemd 覆盖文件**

```bash
sudo mkdir -p /etc/systemd/user/org.gnome.Shell@.service.d/
sudo nano /etc/systemd/user/org.gnome.Shell@.service.d/override.conf
```

文件内容是这样，注意第一行 `ExecStart=` 后面是空的：

**override.conf**

```bash
[Service]
ExecStart=
ExecStart=/usr/bin/gnome-shell --devkit --no-x11 --mode=%i
```

那行空的 `ExecStart=` 不是笔误，也绝对不能省。systemd 的规则是：同名的 `ExecStart` 会累加执行，只有先写一个空的把默认值清掉，后面这行才会成为唯一的启动命令。

在 nano 里保存退出的手法是：`Ctrl+O` 写入、回车确认文件名，然后 `Ctrl+X` 退出。

### 排错一：snap 卡在 0%，然后把 dpkg 搞坏了

装 `ubuntu-desktop` 的过程中，屏幕卡在了这么一行：

**卡住的 snap 下载**

```bash
==> Installing the firefox snap
下载 snap "snapd" (28254)，来自频道 "stable"
进度：[  0%] [
```

原因是 Ubuntu 26.04 里的 `firefox` 已经是一个 snap 过渡包，安装时要去 snap 商店现场下载本体，而 snap 在国内没有官方镜像，速度很不稳定。卡在 0% 通常就是它在等一个永远等不到的连接。

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

```bash
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

```bash
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

## 这一路的坑，一张表收尾

把上面所有的报错和原因压缩成一张速查表，下次遇到直接查：

| 现象 | 真正原因 | 一句话解决 |
| --- | --- | --- |
| `wsl --list --online` 报 502 | 连不上 GitHub | 关代理，或直接离线装 |
| 桌面版 ISO 装不进 WSL | ISO 是安装程序，不是根文件系统 | 下 `.wsl` 镜像，用 `--from-file` |
| `mkdir /opt` 权限拒绝 | 没 sudo；且路径与 D 盘无关 | 加 sudo，迁移回 PowerShell 做 |
| apt 报 `dpkg lock` 权限错 | 没加 sudo | 命令前加 sudo |
| 一条 apt 命令什么都没装上 | 其中有个包名不存在，整条失败 | 拆开逐条装，先确认包名 |
| 中文显示成方块 | 缺字体 | 装 `fonts-noto-cjk` |
| 装了 fcitx 打不出中文 | 与 WSLg 的输入法桥接冲突 | 卸掉，直接用 Windows 输入法 |
| `wsl --shutdown` 找不到命令 | 在 Linux 侧敲了 Windows 命令 | 去 PowerShell，或敲 `wsl.exe` |
| `gedit` 后面一串分号数字 | ANSI 控制序列被原样打印 | 无需处理，或 `2>/dev/null` |
| 终端里敲网址报“没有那个文件或目录” | 把网址当命令了 | 先 `git clone` |
| snap 卡在 0% | 国内访问 snap 商店不稳定 | 重启 snapd，或用 PPA 装 deb 版 |
| 桌面起不来，日志写 asserts failed | 缺 `XDG_SESSION_TYPE` | 写进 `environment.d` |

## 这条路值不值得走

写到这里，笔者对 WSL 的看法是这样的。

它的好处很实在：不用装虚拟机，开机两秒进系统；`/mnt/c` 让 Windows 和 Ubuntu 共用一套文件；WSLg 让 rviz2、小海龟这些图形工具的窗口直接摆在 Windows 桌面上，截图往笔记里一贴就行；再加上它和 VS Code 的 WSL 扩展配合得很好，写代码的体验比装双系统强。

它的代价也很实在：没有快照，弄坏了只能重装（或者靠 `wsl --export` 自己备份）；图形相关的坑特别多，因为多了一层 WSLg 中转；版本非常新的时候（比如 26.04 配 GNOME 50），社区方案还没跟上，得自己看日志一点点试。

所以笔者的建议是：日常学习和写代码就用 WSL，轻快省事；等到项目真的需要实时性、需要接真实的机器人硬件，再考虑把它搬到一台独立的 Ubuntu 机器上。

最后回到正题。如果你只是想把 ROS 2 跑起来，其实根本不用折腾桌面那一大段。按这一篇的顺序，装好发行版、配好字体、装完 ROS 2、解决 rviz2 的渲染问题，就足够开始 [[ROS2 体验与系统架构]] 那一篇的内容了。至于 GNOME 桌面，那属于“我想让它更好看”的部分，和学 ROS 2 没有关系。

另外一个不该被忽略的收获：这一整篇的报错，几乎全部来自同一个根源，就是在两套系统之间搞混了层次。命令该在哪边敲、路径属于哪个文件系统、包名是哪个系统里的，把这三件事分清楚，一半的坑根本不会踩。

ROS2 官方的教程入口、中文文档镜像，以及一路上的报错速查，都整理在 [[ROS2 安装与验证]] 那一篇里。
