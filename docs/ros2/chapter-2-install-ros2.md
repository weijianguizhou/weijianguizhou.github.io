---
title: 第二章 · 安装 ROS 2 Humble
description: 在 Ubuntu 22.04 上安装 ROS 2 Humble 并完成验证
---

# 第二章 · 安装 ROS 2 Humble

**目标**：在 Ubuntu 22.04 上装好 ROS 2 Humble，并且 `talker` / `listener` 能跑通。

::: info 版本对应关系
ROS 2 的版本和 Ubuntu 版本是绑定的。**Humble 对应 Ubuntu 22.04**，支持到 2027 年 5 月。如果你用的是 Ubuntu 24.04，对应的是 Jazzy，下面的命令要把 `humble` 换成 `jazzy`。
:::

## 2.1 先配好 locale

ROS 2 对编码有要求，先设置成 UTF-8：

```bash
sudo apt update && sudo apt install locales -y
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8
```

检查一下：

```bash
locale
```

## 2.2 添加 ROS 2 软件源

```bash
sudo apt install software-properties-common -y
sudo add-apt-repository universe -y
sudo apt update && sudo apt install curl -y
```

### 导入密钥

官方地址是 `raw.githubusercontent.com`，国内经常拉不下来。两种方式任选其一：

```bash
# 方式一：官方
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key \
  -o /usr/share/keyrings/ros-archive-keyring.gpg
```

```bash
# 方式二：清华镜像（国内推荐）
sudo curl -sSL https://mirrors.tuna.tsinghua.edu.cn/rosdistro/ros.key \
  -o /usr/share/keyrings/ros-archive-keyring.gpg
```

### 写入源

```bash
# 官方源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```

```bash
# 或者：清华镜像源（国内推荐，把上面那条换成这条）
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] https://mirrors.tuna.tsinghua.edu.cn/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```

::: warning 别把两条都执行
官方源和镜像源选一条。写重了两条并存，apt 会重复下载、还可能报错。
:::

### 刷新索引

```bash
sudo apt update
sudo apt upgrade -y
```

## 2.3 安装

| 版本 | 包名 | 说明 |
| --- | --- | --- |
| 桌面完整版 | `ros-humble-desktop` | 含 RViz、rqt、demo 等，**新手装这个** |
| 基础版 | `ros-humble-ros-base` | 只有通信和核心库，无 GUI 工具 |
| 开发工具 | `ros-dev-tools` | 编译、调试等工具链 |

```bash
sudo apt install ros-humble-desktop -y
sudo apt install ros-dev-tools -y
```

下载大概 1–2 GB，视网络而定。

## 2.4 配置环境变量

每次开终端都要让系统知道 ROS 2 在哪，写进 `~/.bashrc` 一劳永逸：

```bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

检查是否生效：

```bash
env | grep -i ros
```

应该能看到 `ROS_VERSION=2`、`ROS_DISTRO=humble` 这类变量。

## 2.5 验证安装

开**两个**终端：

```bash
# 终端 1：发布者
ros2 run demo_nodes_cpp talker
```

```bash
# 终端 2：订阅者
ros2 run demo_nodes_py listener
```

终端 2 不断打印 `I heard: [Hello World: 1]`、`[Hello World: 2]`……就说明通信、C++/Python 客户端都正常。

再看一眼整体健康度：

```bash
ros2 doctor
```

## 2.6 常见报错

| 报错 | 原因 / 处理 |
| --- | --- |
| `E: Unable to locate package ros-humble-desktop` | 源没配对，或系统不是 22.04（`lsb_release -a` 看 codename 是不是 `jammy`） |
| `NO_PUBKEY` / `GPG error` | 密钥没导入成功，回到 2.2 重新下载 keyring |
| `curl` 卡住不动 | `raw.githubusercontent.com` 不通，改用清华镜像那条 |
| `ros2: command not found` | 没 `source`，或写进 `bashrc` 的路径拼错了 |
| 装到一半断网 | 重新 `sudo apt update` 再 `sudo apt install`，apt 会续传已下载的包 |
| 终端 2 收不到消息 | 两个终端都要 source；确认 `ROS_DOMAIN_ID` 一致（默认 0） |

## 2.7 可选：让 ROS 2 命令更顺手

```bash
# 命令补全
echo "source /usr/share/colcon_argcomplete/hook/colcon-argcomplete.bash" >> ~/.bashrc
sudo apt install python3-colcon-common-extensions -y
```

## 下一步

[第三章 · 第一个工作空间](/ros2/chapter-3-first-workspace.html)，开始跑东西、写自己的节点。
