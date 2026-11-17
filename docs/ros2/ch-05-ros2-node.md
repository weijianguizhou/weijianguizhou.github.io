---
title: 第五章 · ROS 2 环境配置、节点与话题
description: 配置 ROS 2 环境，理解节点、ROS 图、重映射与话题，掌握 ros2 node / topic 系列命令。
---

# 第五章 · ROS 2 环境配置、节点与话题

在基础篇里，我们已经把 Ubuntu 与 ROS 2 Jazzy 安装妥当，并且初步体验了“你说我听”和小海龟模拟器。从本章开始进入渐进篇，我们将严格对照 ROS 2 Jazzy 官方教程（*Beginner: CLI Tools*），系统掌握 ROS 2 的命令行工具与核心通信机制。本章首先理清 ROS 2 的环境变量配置，然后深入剖析最基础的两个核心概念：**节点（Nodes）**与**话题（Topics）**。

## 5.1 配置 ROS 2 环境

### 加载环境脚本（Sourcing the setup files）

在每一个新打开的终端里，系统默认并不认识 `ros2` 这条命令。要使用 ROS 2，必须先加载（source）它的环境设置脚本：

**在当前终端加载 ROS 2 Jazzy 环境**

```bash
source /opt/ros/jazzy/setup.bash
```
为了避免每次打开新终端都手动输入这行命令，最省事的做法是把它追加进当前用户的 shell 启动脚本 `~/.bashrc` 中：

**将环境加载命令写入 ~/.bashrc**

```bash
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc
source ~/.bashrc
```
### 检查环境变量

加载环境脚本之后，它到底在后台帮我们配了什么？可以用 `printenv` 配合 `grep` 查看当前终端里所有与 ROS 相关的环境变量：

**查看 ROS 相关环境变量**

```bash
printenv | grep -i ROS
```
正常情况下，终端会输出类似下面的内容：

**ROS 2 Jazzy 默认环境变量输出**

```bash
AMENT_PREFIX_PATH=/opt/ros/jazzy
CMAKE_PREFIX_PATH=/opt/ros/jazzy
PYTHONPATH=/opt/ros/jazzy/lib/python3.12/site-packages
ROS_DISTRO=jazzy
ROS_PYTHON_VERSION=3
ROS_VERSION=2
ROS_AUTOMATIC_DISCOVERY_RANGE=SUBNET
```
其中最关键的几个变量含义如下：

- `ROS_VERSION=2`：表明当前使用的是 ROS 2 而非 ROS 1；

- `ROS_DISTRO=jazzy`：表明当前激活的发行版为 Jazzy Jalisco；

- `ROS_PYTHON_VERSION=3`：指定 ROS 2 使用的 Python 大版本为 Python 3；

- `AMENT_PREFIX_PATH` 与 `CMAKE_PREFIX_PATH`：告诉构建系统和运行环境去哪里查找功能包、头文件和库文件。

### 域 ID 与节点发现范围

在第 4 章介绍 DDS 通信模型时提到过，ROS 2 默认使用 DDS 作为底层中间件，同一局域网下的不同电脑只要连在同一个路由器上，里面的节点就会通过 UDP 多播自动互相发现。如果实验室里有好几台机器人同时连在校园网或同一个 Wi-Fi 下，大家的 `/turtle1/cmd_vel` 就会互相串台。

为了解决这个问题，ROS 2 提供了两个核心环境变量：

#### `ROS_DOMAIN_ID`

用于在同一物理网络中划分逻辑隔离的通信域。只有 `ROS_DOMAIN_ID` 相同的节点才能互相发现和通信（默认值为 `0`）。官方建议在 `0` 到 `101` 之间选取整数（避免与操作系统临时端口冲突）：

**设置 ROS_DOMAIN_ID**

```bash
echo "export ROS_DOMAIN_ID=42" >> ~/.bashrc
source ~/.bashrc
```
#### `ROS_AUTOMATIC_DISCOVERY_RANGE`

这是 ROS 2 Jazzy 推荐使用的自动发现范围控制变量（用于替代旧版本中已废弃的 `ROS_LOCALHOST_ONLY`）。它的常用取值如下表所示：

| **取值** | **含义与适用场景** |
|:---|:---|
| `SUBNET`（默认） | 允许同一子网内的所有机器自动发现彼此的节点 |
| `LOCALHOST` | 仅限本机内部节点互相发现，彻底与局域网内其他电脑隔离 |
| `OFF` | 关闭自动发现，仅能与通过 `ROS_STATIC_PEERS` 显式指定的节点通信 |
| `SYSTEM_DEFAULT` | 使用底层 DDS 中间件的默认发现配置 |

如果你只在自己电脑的 WSL 里做实验，不希望和局域网里的任何其他设备产生通信干扰，可以将其设为 `LOCALHOST`：

**限制节点仅在本机内部互相发现**

```bash
echo "export ROS_AUTOMATIC_DISCOVERY_RANGE=LOCALHOST" >> ~/.bashrc
source ~/.bashrc
```
## 5.2 理解 ROS 2 节点（Nodes）

### ROS 2 计算图（ROS 2 Graph）

在正式操作节点之前，先建立一个全局视角：**ROS 2 图（ROS 2 Graph）**是一个由众多同时处理数据的 ROS 2 元素组成的计算网络。如果把系统中正在运行的所有可执行程序以及它们之间的连接全部画出来，就构成了一张完整的计算图。

![ROS 2 计算图中的节点、话题与服务关系示意](/ros2/nodes-topics-services.webp)

在 ROS 2 中，每个节点（Node）都遵循“单一职责”原则——只负责一项具体的模块化任务（例如一个节点专门驱动激光雷达、一个节点专门控制车轮电机、另一个节点负责路径规划）。一个完整的机器人系统由许多协同工作的节点组成；而在代码实现层面，一个可执行文件（C++ 程序或 Python 脚本）既可以只包含一个节点，也可以包含多个节点。

### 启动节点：`ros2 run`

`ros2 run` 命令用于从指定的功能包中启动一个可执行节点，基本语法为：

**ros2 run 语法**

```bash
ros2 run <package_name> <executable_name>
```
例如启动 `turtlesim` 功能包中的 `turtlesim_node` 可执行文件：

**启动小海龟仿真器节点**

```bash
ros2 run turtlesim turtlesim_node
```
此时屏幕会弹出小海龟仿真窗口。注意：这里 `turtlesim` 是**功能包名**，`turtlesim_node` 是**可执行文件名**，而运行起来的**节点名**叫什么，还需要用下面的命令查看。

### 查看运行中的节点：`ros2 node list`

`ros2 node list` 会显示当前系统中所有正在运行的节点名称。当你想与某个节点交互，或者系统里跑着一大堆节点需要排查状态时，这条命令尤为实用。

保持 `turtlesim` 运行，再打开一个终端启动键盘控制节点：

**启动键盘控制节点**

```bash
ros2 run turtlesim turtle_teleop_key
```
现在打开第三个终端，输入 `ros2 node list`，终端将返回当前活动的节点名称，效果如下图所示：

**查看当前运行的节点列表**

```bash
ros2 node list
# 输出：
# /teleop_turtle
# /turtlesim
```
![ROS 2 节点列表查询结果](/ros2/node-list.webp)

可以看到，`turtlesim_node` 可执行文件启动后的默认节点名是 `/turtlesim`，而 `turtle_teleop_key` 启动后的默认节点名是 `/teleop_turtle`。

### 重映射（Remapping）

重映射允许我们在启动节点时，将默认的节点属性（例如节点名称、话题名称、服务名称等）动态改写为自定义值，而无需修改源代码。

比如我们想同时运行两个小海龟窗口，如果直接再敲一次 `ros2 run turtlesim turtlesim_node`，系统会因为两个节点都叫 `/turtlesim` 而产生重名冲突。这时可以在新终端中使用 `--ros-args --remap` 将新节点的名称重映射为 `my_turtle`：

**使用重映射修改节点名称**

```bash
ros2 run turtlesim turtlesim_node --ros-args --remap __node:=my_turtle
```
此时再次执行 `ros2 node list`，就会看到系统中同时存在 `/turtlesim`、`/teleop_turtle` 和 `/my_turtle` 三个节点，效果如下图所示。

![节点重映射举例](/ros2/remap-example.webp)

### 查看节点详细信息：`ros2 node info`

知道了节点的名字后，如果想进一步查看某个节点内部的具体连接情况，可以使用 `ros2 node info` 命令：

**查询节点的详细信息**

```bash
ros2 node info <node_name>
```
`ros2 node info` 会返回与该节点直接交互的所有订阅者（Subscribers）、发布者（Publishers）、服务端（Service Servers）、服务客户端（Service Clients）、动作服务端（Action Servers）和动作客户端（Action Clients）列表，也就是该节点在 ROS 计算图上的全部对外接口。例如查看 `/my_turtle` 的信息：

**查看 /my_turtle 节点的详情**

```bash
ros2 node info /my_turtle
```
终端输出如下：

**ros2 node info 输出示例**

```bash
/my_turtle
  Subscribers:
    /turtle1/cmd_vel: geometry_msgs/msg/Twist
  Publishers:
    /parameter_events: rcl_interfaces/msg/ParameterEvent
    /rosout: rcl_interfaces/msg/Log
    /turtle1/color_sensor: turtlesim/msg/Color
    /turtle1/pose: turtlesim/msg/Pose
  Service Servers:
    /clear: std_srvs/srv/Empty
    /kill: turtlesim/srv/Kill
    /my_turtle/describe_parameters: rcl_interfaces/srv/DescribeParameters
    /my_turtle/get_parameter_types: rcl_interfaces/srv/GetParameterTypes
    /my_turtle/get_parameters: rcl_interfaces/srv/GetParameters
    /my_turtle/get_type_description: type_description_interfaces/srv/GetTypeDescription
    /my_turtle/list_parameters: rcl_interfaces/srv/ListParameters
    /my_turtle/set_parameters: rcl_interfaces/srv/SetParameters
    /my_turtle/set_parameters_atomically: rcl_interfaces/srv/SetParametersAtomically
    /reset: std_srvs/srv/Empty
    /spawn: turtlesim/srv/Spawn
    /turtle1/set_pen: turtlesim/srv/SetPen
    /turtle1/teleport_absolute: turtlesim/srv/TeleportAbsolute
    /turtle1/teleport_relative: turtlesim/srv/TeleportRelative
  Service Clients:

  Action Servers:
    /turtle1/rotate_absolute: turtlesim/action/RotateAbsolute
  Action Clients:
```
试着再用 `ros2 node info /teleop_turtle` 查看遥控节点，你会发现它的 Publishers 里正好有 `/turtle1/cmd_vel: geometry_msgs/msg/Twist`——这说明两个节点正是通过 `/turtle1/cmd_vel` 这个话题连在一起的。

## 5.3 理解 ROS 2 话题（Topics）

### 发布-订阅模型与 `rqt_graph`

话题（Topic）是 ROS 2 中最核心的异步通信机制， acts as a bus for nodes to exchange messages。节点通过向话题**发布（Publish）**数据，或者从话题**订阅（Subscribe）**数据来实现通信。

话题通信具有一个重要特性：**多对多且解耦**。一个话题可以同时有多个发布者和多个订阅者；发布者只管往话题上发数据，不在乎谁在听；订阅者只管从话题上收数据，也不在乎是谁发的。传感器数据流（如激光雷达点云、相机图像、里程计位姿）以及连续的速度控制指令，几乎全部采用话题通信。

保持 `/turtlesim` 和 `/teleop_turtle` 两个节点运行，在终端中输入 `rqt_graph` 打开计算图可视化工具：

**启动 rqt_graph 可视化计算图**

```bash
rqt_graph
```
在 `rqt_graph` 界面中，椭圆形代表**节点**，矩形框代表**话题**，箭头方向代表数据流动的方向。如果取消勾选工具栏上的 *Hide: Debug*，还能看到日志话题 `/rosout` 和参数事件话题 `/parameter_events`。

### 查看话题列表：`ros2 topic list`

在命令行中查看当前系统里所有活动的话题，使用：

**列出当前所有活动话题**

```bash
ros2 topic list
```
输出如下：

**ros2 topic list 输出**

```bash
/parameter_events
/rosout
/turtle1/cmd_vel
/turtle1/color_sensor
/turtle1/pose
```
如果想知道每个话题传递的数据是什么类型，加上 `-t`（即 `--show-types`）参数，它会在话题名称后面的方括号里附上对应的消息类型：

**列出话题及其消息类型**

```bash
ros2 topic list -t
```
输出如下：

**带类型的 ros2 topic list -t 输出**

```bash
/parameter_events [rcl_interfaces/msg/ParameterEvent]
/rosout [rcl_interfaces/msg/Log]
/turtle1/cmd_vel [geometry_msgs/msg/Twist]
/turtle1/color_sensor [turtlesim/msg/Color]
/turtle1/pose [turtlesim/msg/Pose]
```
### 实时查看话题数据：`ros2 topic echo`

要查看某个话题上正在发布的具体数据内容，使用 `ros2 topic echo <topic_name>`：

**监听 /turtle1/cmd_vel 话题的数据**

```bash
ros2 topic echo /turtle1/cmd_vel
```
一开始，这条命令不会返回任何数据，因为它正在等待 `/teleop_turtle` 发布消息。切回运行 `turtle_teleop_key` 的终端，按方向键移动海龟，同时观察 `echo` 所在的终端，你会看到每次按下方向键都会打印出一条速度指令消息：

**ros2 topic echo 输出的速度消息数据**

```yaml
linear:
  x: 2.0
  y: 0.0
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: 0.0
---
```
如果此时再看一眼 `rqt_graph`（点左上角刷新按钮，并取消勾选 *Hide: Debug*），你会发现图中多出了一个名为 `/_ros2cli_...` 的节点，它正在订阅 `/turtle1/cmd_vel`——原来 `ros2 topic echo` 本身在底层也是通过创建一个临时订阅者节点来接收数据的。

### 查看话题详情：`ros2 topic info`

使用 `ros2 topic info` 可以查看某个话题的消息类型、发布者数量和订阅者数量：

**查看话题基本信息**

```bash
ros2 topic info /turtle1/cmd_vel
```
输出：

**ros2 topic info 输出**

```bash
Type: geometry_msgs/msg/Twist
Publisher count: 1
Subscription count: 2
```
如果想进一步查看每个发布者和订阅者的节点名、命名空间以及服务质量（QoS）配置，可以加上 `-v`（或 `--verbose`）参数：

**查看话题详细端点与 QoS 信息**

```bash
ros2 topic info /turtle1/cmd_vel --verbose
```
### 查看消息结构定义：`ros2 interface show`

前面我们看到 `/turtle1/cmd_vel` 的消息类型是 `geometry_msgs/msg/Twist`。这个字符串按三段理解：

- `geometry_msgs`：接口所在的功能包名；

- `msg`：表示这是一个话题消息（Message）类型；

- `Twist`：具体的消息结构名称。

那 `Twist` 里面到底有哪些字段？我们可以用 `ros2 interface show` 命令直接查看它的定义：

**查看 geometry_msgs/msg/Twist 的数据结构定义**

```bash
ros2 interface show geometry_msgs/msg/Twist
```
输出如下：

**Twist 消息定义内容**

```text
# This expresses velocity in free space broken into its linear and angular parts.

Vector3  linear
    float64 x
    float64 y
    float64 z
Vector3  angular
    float64 x
    float64 y
    float64 z
```
一目了然：`Twist` 包含两个三维向量 `linear`（线速度）和 `angular`（角速度），每个向量下面各有 `x`、`y`、`z` 三个双精度浮点数（`float64`）。这正好对应前面 `ros2 topic echo` 打印出来的层级结构。

### 从命令行发布话题消息：`ros2 topic pub`

弄清楚了消息的内部结构之后，我们甚至不需要运行 `turtle_teleop_key`，直接用 `ros2 topic pub` 命令就能在终端里手写消息发给小海龟。其基本语法为：

**ros2 topic pub 语法**

```bash
ros2 topic pub <topic_name> <msg_type> '<args>'
```
其中 `'<args>'` 采用 YAML 字典格式书写。根据发送频次的不同，最常用的是以下两种方式：

#### 单次发布（`--once`）

如果只想发一条指令让小海龟动一下就停，加上 `--once` 参数：

**向海龟发送单次速度指令**

```bash
ros2 topic pub --once /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 1.8}}"
```
终端会打印：

**单次发布输出**

```text
publisher: beginning loop
publishing #1: geometry_msgs.msg.Twist(linear=geometry_msgs.msg.Vector3(x=2.0, y=0.0, z=0.0), angular=geometry_msgs.msg.Vector3(x=0.0, y=0.0, z=1.8))
```
小海龟会沿着一段圆弧走完约一秒钟的行程，随后停下。

#### 周期持续发布（`--rate`）

如果想让小海龟一直转圈画圆，就需要以固定频率持续发送速度指令。把 `--once` 换成 `--rate 1`（代表以 1 Hz 的频率持续发布）：

**以 1 Hz 频率持续发布速度指令**

```bash
ros2 topic pub --rate 1 /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 1.8}}"
```
此时小海龟会在窗口里不间断地画圆，直到你在终端里按下 `Ctrl+C` 停止发布。

#### 自动填充时间戳（`now` 与 `auto`）

在实际机器人开发中，很多消息带有 `std_msgs/msg/Header` 消息头（如 `geometry_msgs/msg/TwistStamped` 或 ` geometry_msgs/msg/PoseStamped`），其中包含时间戳 `stamp`。在 ROS 2 Jazzy 中，使用 `ros2 topic pub` 发布此类消息时，无需手写复杂的秒和纳秒数值，直接把 `header` 写成 `"auto"` 或把 `stamp` 写成 `"now"`，CLI 工具就会自动填入当前系统时间：

**自动填充时间戳与 Header**

```bash
ros2 topic pub /pose geometry_msgs/msg/PoseStamped '{header: "auto", pose: {position: {x: 1.0, y: 2.0, z: 3.0}}}'
```
### 测量话题频率与带宽：`hz`、`bw` 与 `find`

在调试传感器驱动或控制回路时，我们常常需要确认某个话题的发布频率是否稳定、占用了多少网络带宽。

- **测量发布频率（`ros2 topic hz`）**：统计某个话题每秒发布多少条消息。例如查看小海龟位姿话题 `/turtle1/pose` 的发布频率（默认约为 60 Hz）：

**统计 /turtle1/pose 的消息发布频率**

```bash
ros2 topic hz /turtle1/pose
```
终端会持续滚动输出平均频率、最小/最大间隔与标准差：

**ros2 topic hz 输出示例**

```text
average rate: 62.502
    min: 0.015s max: 0.017s std dev: 0.00045s window: 64
```
- **测量话题带宽（`ros2 topic bw`）**：统计某个话题每秒传输的数据量字节数：

**统计 /turtle1/pose 占用的带宽**

```bash
ros2 topic bw /turtle1/pose
```
- **按消息类型查找话题（`ros2 topic find`）**：当你想知道当前系统中哪些话题使用了某种特定消息类型时，可以用：

**查找所有使用 Twist 类型的话题**

```bash
ros2 topic find geometry_msgs/msg/Twist
# 输出：
# /turtle1/cmd_vel
```
## 5.4 本章命令小结

将本章涉及的环境、节点与话题命令归纳如下表，方便日常速查：

| **命令** | **功能说明** |
|:---|:---|
| `source /opt/ros/jazzy/setup.bash` | 在当前终端激活 ROS 2 Jazzy 环境 |
| `printenv \| grep -i ROS` | 查看当前生效的 ROS 环境变量 |
| `ros2 run <pkg> <exec>` | 启动指定功能包中的可执行节点 |
| `ros2 node list` | 列出当前所有正在运行的节点名称 |
| `ros2 node info <node>` | 查看指定节点的订阅、发布、服务和动作连接 |
| `--ros-args --remap __node:=<new>` | 在启动时重映射节点名称 |
| `rqt_graph` | 图形化显示当前系统的节点与话题连接图 |
| `ros2 topic list [-t]` | 列出当前所有活动话题（`-t` 同时显示消息类型） |
| `ros2 topic echo <topic>` | 在终端实时打印指定话题上发布的数据 |
| `ros2 topic info <topic> [-v]` | 查看话题的类型及发布者/订阅者数量（`-v` 显示详情） |
| `ros2 interface show <msg_type>` | 查看消息、服务或动作接口的数据字段定义 |
| `ros2 topic pub [--once\|--rate N] ...` | 从命令行直接向指定话题发布消息 |
| `ros2 topic hz <topic>` | 统计指定话题的消息发布频率（Hz） |
| `ros2 topic bw <topic>` | 统计指定话题占用的数据传输带宽 |
