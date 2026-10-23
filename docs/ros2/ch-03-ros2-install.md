---
title: 第三章 · ROS 2 安装与验证
description: 配好 apt 源装上 ROS 2 桌面版，用 talker / listener 验证通信，并解决 rviz2 不出图的坑
---

# 第三章 · ROS 2 安装与验证

前两章把 Ubuntu 装进了 WSL，这一章终于开始装 ROS 2。路线有两条：一条是官方推荐的 `ros2-apt-source` 配置包，一条是绕开 GitHub、走国内镜像手写软件源；后面还有更省事的鱼香 ROS 一键脚本。装完还要过几关：**节点之间能不能通信**、**`rviz2` 能不能出图**、以及冒出来的报错怎么救。

## 3.1 先确认版本：对不上就装不了

ROS 2 和 Ubuntu 是严格配对的，所以第一步永远是确认系统版本。

这条千万记住：**版本对不上，装是装不上的**。在 26.04 上敲 `apt install ros-humble-desktop`，得到的只会是 `Unable to locate package`，因为软件源里根本没有为这个系统编译的 Humble 包。

::: warning 命令里的发行版代号
下面手动安装这一路，命令里用的是 `lyrical`（对应较新的 Ubuntu）。如果你跟着本站前两章在 Ubuntu 22.04 上装 Humble，就把下面所有 `lyrical` 换成 `humble`——**代号换错，源配得再对也装不上**。
:::

## 3.2 官方路线：ros2-apt-source

ROS 2 官方现在的推荐做法，是用一个叫 `ros2-apt-source` 的配置包自动帮你把软件源和 GPG 密钥都配好，不用再手工拼源地址：

```bash
sudo apt install curl -y
export ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F'"' '{print $4}')
curl -L -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"
sudo dpkg -i /tmp/ros2-apt-source.deb
sudo apt update
```

这条路干净利落，但它有一个前提：连得上 GitHub。我就翻车了：

```text
curl: (7) Failed to connect to github.com port 443 after 3 ms: Could not connect to server
```

那就换国内的镜像源走。

## 3.3 国内镜像路线：清华源

思路很简单：自己把密钥和源地址写进去，跳过 GitHub。用清华源举例：

**从清华镜像取密钥并转换格式**

```bash
sudo rm -f /usr/share/keyrings/ros-archive-keyring.gpg
sudo rm -f /etc/apt/sources.list.d/ros2.list
curl -sSL https://mirrors.tuna.tsinghua.edu.cn/rosdistro/ros.key | sudo gpg --dearmor -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] https://mirrors.tuna.tsinghua.edu.cn/ros2/ubuntu $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
sudo apt update
```

这里藏着一个非常值得记住的坑。如果只是把 `ros.key` 下载下来直接丢进 `keyrings` 目录，少做 `gpg --dearmor` 这一步，`apt update` 会给你这样一段：

```text
Err:4 https://mirrors.tuna.tsinghua.edu.cn/ros2/ubuntu resolute InRelease
  The following signatures couldn't be verified because the public key is not available:
  NO_PUBKEY F42ED6FBAB17C654
Warning: The key(s) in the keyring /usr/share/keyrings/ros-archive-keyring.gpg
  are ignored as the file has an unsupported filetype.
Error: The repository '...' is not signed.
Error: Unable to locate package ros-lyrical-desktop
```

关键字是 `unsupported filetype`。新版 apt 要求密钥文件必须是二进制格式，而官网给的 `ros.key` 是 ASCII 文本，中间那一步 `gpg --dearmor` 就是干这个转换的。少了它，密钥等于没装，`NO_PUBKEY` 和 `Unable to locate package` 都是它的连锁反应。

## 3.4 安装桌面版并配置环境变量

源通了之后，装桌面版，它包含 RViz2、rqt、demos 等全套工具：

```bash
sudo apt install ros-lyrical-desktop -y
```

这个过程会顺带把 OpenJDK、点云库 PCL、可视化库 VTK 等一大堆依赖一起装上，输出能刷几百行，看到 `Setting up ros-lyrical-desktop` 就说明成了。

然后配环境变量，让每个新终端都认识 `ros2` 命令：

```bash
echo "source /opt/ros/lyrical/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

## 3.5 验证：你说我听

验证还是老一套的“你说我听”，开两个终端：

```bash
# 终端 1：发布者
ros2 run demo_nodes_cpp talker
```

```bash
# 终端 2：订阅者
ros2 run demo_nodes_py listener
```

看到一边刷 `Publishing: 'Hello World: 1'`、另一边刷 `I heard: [Hello World: 1]`，就成功了。

## 3.6 两个节点互相听不见

这一步在 WSL 里失败的概率不低，而且现象很迷惑：两个节点都正常跑着，就是收不到消息。

原因出在 WSL 默认的 NAT 网络模式上。ROS 2 底层靠 DDS 通信，节点之间要靠多播互相发现，而 NAT 模式会把这个过程挡住。解决办法还是在 `C:\Users\<你的用户名>\.wslconfig` 里改成镜像模式，然后 `wsl --shutdown` 重启：

```ini
[wsl2]
networkingMode=mirrored
```

重启后再跑一次上面的 talker / listener 验证。另外，本章后面还介绍鱼香 ROS 的一键安装脚本，那是另一种更省事的装法，两条路殊途同归；无论走哪条，验证方式都是上面这段“你说我听”。

## 3.7 让 rviz2 正常出图

最后一个坑，也是我花了最多时间的一个。小海龟能正常跑，说明 WSLg 的图形转发没问题；但一敲 `rviz2`，就是这条：

```text
Invalid parentWindowHandle (wrong server or screen) in GLXWindow::create
```

这个错误的根子在 rviz2 用的 Ogre 渲染引擎和 WSLg 默认的 Wayland 协议之间：Ogre 想按老一套 X11 的方式去创建窗口，结果拿到的窗口句柄“不是它熟悉的那个”。

### 3.7.1 第一招：强制走 XCB

最直接的办法，是让 Qt 程序改用更成熟的 X11 后端，绕开 Wayland 那条路：

```bash
export QT_QPA_PLATFORM=xcb
rviz2
```

有效的话就写进 `~/.bashrc` 长期保留。不过要提醒一句：这个变量是给 rviz2 这类基于 Qt 和 Ogre 的程序用的，**不建议**全局常开，它会影响其他本来就适配良好的 Wayland 应用。

### 3.7.2 第二招：补图形库，并让 Mesa 用上显卡

如果第一招没用，就检查 OpenGL 这一层。我遇到的第一个报错是包名过期：

```text
Error: Package 'libgl1-mesa-glx' has no installation candidate
```

`libgl1-mesa-glx` 这个包从 Ubuntu 23.10 起就被废弃了，现在的对应物是 `libgl1` 和 `libglx-mesa0`：

```bash
sudo apt update
sudo apt install libgl1 libglx-mesa0 libgl1-mesa-dri mesa-utils
```

装完还要多做一步。WSLg 里 Mesa 默认不一定挑中 D3D12 这条通显卡的路，可能悄悄退回 `llvmpipe`，也就是纯 CPU 软件渲染。软件渲染也能画，但帧率会难看得让人怀疑人生，所以显式指定驱动：

```bash
echo 'export GALLIUM_DRIVER=d3d12' >> ~/.bashrc
source ~/.bashrc
```

验证方式是把当前渲染器打出来：

```bash
glxinfo -B | grep -E "OpenGL renderer|Device"
```

我的机器上输出是（显卡型号会随机器不同）：

```text
    Device: D3D12 (NVIDIA GeForce RTX 4060 Laptop GPU) (0xffffffff)
OpenGL renderer string: D3D12 (NVIDIA GeForce RTX 4060 Laptop GPU)
```

看到 `D3D12` 加上自己的显卡型号，就说明 GPU 直通已经工作了。如果这里显示的是 `llvmpipe`，那说明还在软件渲染，回头检查 `GALLIUM_DRIVER` 有没有生效。

### 3.7.3 最后一招：软件渲染兜底

如果显卡这条路怎么都不通，那还有最后的退路，牺牲性能换能用：

```bash
LIBGL_ALWAYS_SOFTWARE=1 rviz2
```

这只适合应急，界面的卡顿会非常明显，别当长期方案。

## 3.8 一键安装：鱼香 ROS

除了上面手动配源安装的路线，还有一条更省事的：鱼香 ROS 的一键安装脚本。这条指令非常重要，是使用 ROS 系统必须要会的：它能把要用的几乎所有工具都装上，极大节省时间。

打开 WSL 里的 Ubuntu 终端，输入：

```bash
wget http://fishros.com/install -O fishros && . fishros
```

效果如下图：

![鱼香 ROS 一键安装脚本](/ros2/fishros-install.webp)

显然，它包含了要用的几乎所有工具。

输入密码后，在选项界面选择 **1 - 一键安装 ROS**；接着按你的情况选择是否更换系统源；再等一会儿，会让你选择要安装的 ROS 2 版本，这里选 humble 版本即可。

接着会问你安装桌面版还是基础版：选桌面版，它包含可视化工具——我就喜欢可视化工具；如果是在树莓派上装，可以用基础版。

安装完成后输入 `ros2`，看到下面的界面就说明装好了：

![ROS 2 安装成功界面](/ros2/ros2-install-success.webp)

## 3.9 卸载与安装位置

要是把 ROS 2 环境弄乱了，删掉重装就好：

```bash
sudo apt remove ros-humble-*
sudo apt autoremove
```

装完之后软件在哪？ROS 的默认安装目录在 `/opt/ros/` 下，按版本名区分。装的是 humble 版本，安装目录就是 `/opt/ros/humble`。

## 3.10 官方文档

官方教程入口是 [docs.ros.org](https://docs.ros.org)。文档结构大致分五块：Installation / Tutorials / Guides / Concepts / Contributing；新手从 Tutorials 里的 **Beginner: CLI tools** 开始。

万一英文读着吃力，鱼香 ROS 社区维护了一份与官方同步的中文文档镜像，可以对照着看。查文档时留意页面顶部的版本标识，跟着自己装的那个版本走，别拿 Lyrical 的教程去操作 Humble 的环境。

## 3.11 常见问题速查

| 现象 | 真正原因 | 一句话解决 |
| --- | --- | --- |
| `NO_PUBKEY` / unsupported filetype | 密钥是文本格式 | `gpg --dearmor` 转二进制 |
| 两个节点互相听不见 | NAT 挡了 DDS 多播 | `networkingMode=mirrored` |
| rviz2 报 Invalid parentWindowHandle | Ogre 与 Wayland 不兼容 | `QT_QPA_PLATFORM=xcb` |
| rviz2 卡成幻灯片 | 退回 llvmpipe 软件渲染 | `GALLIUM_DRIVER=d3d12` |

下一篇：[第四章 · Ubuntu 常用命令](/ros2/ch-04-ubuntu-commands.html)。ROS 2 的命令行工具全在终端里敲，先把文件、权限、进程这些基本功补齐，后面写节点才不至于被 `Permission denied` 之类的小事卡住。
