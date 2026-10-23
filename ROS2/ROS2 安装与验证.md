# ROS2 安装与验证

## 在 WSL 里安装 ROS 2

终于到了正题。前面说过 ROS 2 和 Ubuntu 是严格配对的，所以第一步永远是确认系统版本。

这一条千万记住：**版本对不上，装是装不上的**。在 26.04 上敲 `apt install ros-humble-desktop`，得到的只会是 `Unable to locate package`，因为软件源里根本没有为这个系统编译的 Humble 包。

### 官方路线：ros2-apt-source

ROS 2 官方现在的推荐做法，是用一个叫 `ros2-apt-source` 的配置包自动帮你把软件源和 GPG 密钥都配好，不用再手工拼源地址：

**自动配置 ROS2 软件源**

```bash
sudo apt install curl -y
export ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F'"' '{print $4}')
curl -L -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"
sudo dpkg -i /tmp/ros2-apt-source.deb
sudo apt update
```

这条路干净利落，但它有一个前提：连得上 GitHub。笔者这里就翻车了：

**连不上 GitHub**

```bash
curl: (7) Failed to connect to github.com port 443 after 3 ms: Could not connect to server
```

那就换国内的镜像源走。

### 国内镜像路线

思路很简单：自己把密钥和源地址写进去，跳过 GitHub。用清华源举例：

**从清华镜像取密钥并转换格式**

```bash
sudo rm -f /usr/share/keyrings/ros-archive-keyring.gpg
sudo rm -f /etc/apt/sources.list.d/ros2.list
curl -sSL https://mirrors.tuna.tsinghua.edu.cn/rosdistro/ros.key | sudo gpg --dearmor -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] https://mirrors.tuna.tsinghua.edu.cn/ros2/ubuntu $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
sudo apt update
```

这里藏着一个非常值得记住的坑。如果只是把 `ros.key` 下载下来直接丢进 `keyrings` 目录，`apt update` 会给你这样一段：

**密钥格式不对时的报错**

```bash
Err:4 https://mirrors.tuna.tsinghua.edu.cn/ros2/ubuntu resolute InRelease
  The following signatures couldn't be verified because the public key is not available:
  NO_PUBKEY F42ED6FBAB17C654
Warning: The key(s) in the keyring /usr/share/keyrings/ros-archive-keyring.gpg
  are ignored as the file has an unsupported filetype.
Error: The repository '...' is not signed.
Error: Unable to locate package ros-lyrical-desktop
```

关键字是 `unsupported filetype`。新版 apt 要求密钥文件必须是二进制格式，而官网给的 `ros.key` 是 ASCII 文本。中间那一步 `gpg --dearmor` 就是干这个转换的，少了它，密钥等于没装。`NO_PUBKEY` 和 `Unable to locate package` 都是它的连锁反应。

### 安装并验证

源通了之后，装桌面版，它包含 RViz2、rqt、demos 等全套工具：

**安装 ROS2 Lyrical 桌面版**

```bash
sudo apt install ros-lyrical-desktop -y
```

这个过程会顺带把 OpenJDK、点云库 PCL、可视化库 VTK 等一大堆依赖一起装上，输出能刷几百行，看到 `Setting up ros-lyrical-desktop` 就说明成了。

然后配环境变量，让每个新终端都认识 `ros2` 命令：

**配置环境变量**

```bash
echo "source /opt/ros/lyrical/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

验证还是老一套的“你说我听”，开两个终端：

**验证安装**

```bash
# 终端 1：发布者
ros2 run demo_nodes_cpp talker

# 终端 2：订阅者
ros2 run demo_nodes_py listener
```

看到一边刷 `Publishing: 'Hello World: 1'`、另一边刷 `I heard: [Hello World: 1]`，就成功了。

### 如果两个节点互相听不见

这一步在 WSL 里失败的概率不低，而且现象很迷惑：两个节点都正常跑着，就是收不到消息。

原因出在 WSL 默认的 NAT 网络模式上。ROS 2 底层靠 DDS 通信，节点之间要靠多播互相发现，而 NAT 模式会把这个过程挡住。解决办法还是那条：在 `C:\Users\<你的用户名>\.wslconfig` 里改成镜像模式，然后 `wsl --shutdown` 重启。

**.wslconfig**

```bash
[wsl2]
networkingMode=mirrored
```

下面还会介绍鱼香 ROS 的一键安装脚本，那是另一种更省事的装法，两条路殊途同归；无论走哪条，验证方式都是上面这段“你说我听”。

## 让 rviz2 正常出图

最后一个坑，也是笔者花了最多时间的一个。小海龟能正常跑，说明 WSLg 的图形转发没问题；但一敲 `rviz2`，就是这条：

**rviz2 启动失败**

```bash
Invalid parentWindowHandle (wrong server or screen) in GLXWindow::create
```

这个错误的根子在 rviz2 用的 Ogre 渲染引擎和 WSLg 默认的 Wayland 协议之间。Ogre 想按老一套 X11 的方式去创建窗口，结果拿到的窗口句柄“不是它熟悉的那个”。

### 第一招：强制走 XCB

最直接的办法，是让 Qt 程序改用更成熟的 X11 后端，绕开 Wayland 那条路：

**强制使用 XCB 后端**

```bash
export QT_QPA_PLATFORM=xcb
rviz2
```

有效的话就写进 `~/.bashrc` 长期保留。不过要提醒一句，这个变量是给 rviz2 这类基于 Qt 和 Ogre 的程序用的，**不建议**全局常开，它会影响其他本来就适配良好的 Wayland 应用。

### 第二招：补图形库，并让 Mesa 用上显卡

如果第一招没用，就检查 OpenGL 这一层。这里遇到的第一个报错是包名过期：

**libgl1-mesa-glx 已经不存在了**

```bash
Error: Package 'libgl1-mesa-glx' has no installation candidate
```

`libgl1-mesa-glx` 这个包从 Ubuntu 23.10 起就被废弃了，现在的对应物是 `libgl1` 和 `libglx-mesa0`：

**正确的包名**

```bash
sudo apt update
sudo apt install libgl1 libglx-mesa0 libgl1-mesa-dri mesa-utils
```

装完还要多做一步。WSLg 里 Mesa 默认不一定挑中 D3D12 这条通显卡的路，可能悄悄退回 `llvmpipe`，也就是纯 CPU 软件渲染。软件渲染也能画，但帧率会难看得让人怀疑人生，所以显式指定驱动：

**让 Mesa 走 D3D12**

```bash
echo 'export GALLIUM_DRIVER=d3d12' >> ~/.bashrc
source ~/.bashrc
```

验证方式是把当前渲染器打出来：

**查看当前使用的 OpenGL 渲染器**

```bash
glxinfo -B | grep -E "OpenGL renderer|Device"
```

笔者的机器上输出是：

**硬件加速已生效**

```bash
    Device: D3D12 (NVIDIA GeForce RTX 4060 Laptop GPU) (0xffffffff)
OpenGL renderer string: D3D12 (NVIDIA GeForce RTX 4060 Laptop GPU)
```

看到 `D3D12` 加上自己的显卡型号，就说明 GPU 直通已经工作了。如果这里显示的是 `llvmpipe`，那说明还在软件渲染，回头检查 `GALLIUM_DRIVER` 有没有生效。

### 最后一招：软件渲染兜底

如果显卡这条路怎么都不通，那还有最后的退路，牺牲性能换能用：

**强制软件渲染**

```bash
LIBGL_ALWAYS_SOFTWARE=1 rviz2
```

这只适合应急，界面的卡顿会非常明显，别当长期方案。

## 一键安装（鱼香ROS）

除了上面手动配源安装的路线，还有一条更省事的：鱼香 ROS 的一键安装脚本。这一条指令非常重要，是咱们使用 ROS 系统必须要会的指令，能把咱们要用的几乎所有工具都装上，极大节省时间。它来自我关注的博主“鱼香ROS”，非常好用。

首先启动 WSL 中的 Ubuntu，打开终端，输入下面的指令：

**一键安装指令**

```bash
wget http://fishros.com/install -O fishros && . fishros
```

效果如下图：

![[小鱼的一键安装命令.png]]
*图：小鱼的一键安装命令*

显然，包含了咱们要用的几乎所有工具。

输入密码，在选项界面选择 1-一键安装ROS，接着根据你的情况选择是否更换系统源，接着等待一会就会让你选择要安装的 ROS2 版本了。这里选择 humble 版本的 ROS2 即可。

接着会问你安装桌面版还是基础版，我们选择桌面版，包含可视化工具，嗯，我就喜欢可视化工具，如果是在树莓派上装可以使用基础版。

安装完成后输入 ros2 如果看到下面的界面则安装成功。

![[ROS2成功安装界面.png]]
*图：ROS2成功安装界面*

那要是我瞎玩，给 ROS2 环境弄乱了。该怎么办呢？删掉重装就好了呀。

**一键卸载ROS2**

```bash
sudo apt remove ros-humble-*
sudo apt autoremove
```

我们都知道安装软件要设置安装目录。那么 ROS2 装在哪里了呢？ROS 安装的默认目录在 /opt/ros/ 下，根据版本的名字进行区分。安装的是 humble 版本的 ROS，所以安装目录在 /opt/ros/humble 下。

## 官方文档

**ROS2 官方教程入口**

```bash
https://docs.ros.org
# 文档结构：Installation / Tutorials / Guides / Concepts / Contributing
# 新手从 Tutorials 里的 Beginner: CLI tools 开始
```

万一英文读着吃力，鱼香 ROS 社区维护了一份与官方同步的中文文档镜像，可以对照着看。查文档时留意页面顶部的版本标识，跟着自己装的那个版本走，别拿 Lyrical 的教程去操作 Humble 的环境。

## ROS2 常见问题速查

| 现象 | 真正原因 | 一句话解决 |
| --- | --- | --- |
| `NO_PUBKEY` / unsupported filetype | 密钥是文本格式 | `gpg --dearmor` 转二进制 |
| 两个节点互相听不见 | NAT 挡了 DDS 多播 | `networkingMode=mirrored` |
| rviz2 报 Invalid parentWindowHandle | Ogre 与 Wayland 不兼容 | `QT_QPA_PLATFORM=xcb` |
| rviz2 卡成幻灯片 | 退回 llvmpipe 软件渲染 | `GALLIUM_DRIVER=d3d12` |
