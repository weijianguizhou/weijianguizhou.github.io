---
title: 附录 · 常用命令与排错
description: ROS 2 Humble 高频命令速查，以及新手最常踩的坑
---

# 附录 · 常用命令与排错

不用背，收藏这一页，用到的时候搜。

## 环境

```bash
source /opt/ros/humble/setup.bash   # 每次新终端都要（或写进 ~/.bashrc）
source ~/ros2_ws/install/setup.bash # 用自己工作空间的包时
env | grep -i ros                   # 看环境变量是否生效
echo $ROS_DISTRO                    # 应该是 humble
```

## 包（package）

```bash
ros2 pkg list                       # 已安装的所有包
ros2 pkg executables turtlesim      # 某个包有哪些可执行程序
ros2 pkg create --build-type ament_python my_pkg --dependencies rclpy
```

## 节点（node）

```bash
ros2 node list                      # 正在运行的节点
ros2 node info /turtlesim           # 某个节点订阅了哪些话题、提供了哪些服务
```

## 话题（topic）

```bash
ros2 topic list                     # 所有话题
ros2 topic list -t                  # 带消息类型
ros2 topic info /turtle1/cmd_vel    # 发布/订阅者数量与类型
ros2 topic echo /turtle1/cmd_vel    # 实时打印内容
ros2 topic hz /turtle1/cmd_vel      # 发布频率
ros2 topic pub /turtle1/cmd_vel geometry_msgs/msg/Twist \
  "{linear: {x: 1.0}, angular: {z: 1.0}}" --once
```

## 服务与参数

```bash
ros2 service list
ros2 service call /clear std_srvs/srv/Empty
ros2 param list
ros2 param get /turtlesim background_r
ros2 param set /turtlesim background_r 200
```

## 消息类型

```bash
ros2 interface list
ros2 interface show geometry_msgs/msg/Twist
```

## 录制与回放

```bash
ros2 bag record -o my_bag /turtle1/cmd_vel
ros2 bag info my_bag
ros2 bag play my_bag
```

## launch 文件

```bash
ros2 launch my_pkg my_launch.py
```

## 编译（colcon）

```bash
cd ~/ros2_ws
colcon build                                   # 全部编译
colcon build --packages-select my_first_pkg    # 只编译一个
colcon build --symlink-install                 # Python 包推荐，改代码不用重编
colcon test && colcon test-result --verbose    # 跑测试
```

工作空间里的编译产物都乱了的时候，最粗暴也最有效的办法：

```bash
cd ~/ros2_ws
rm -rf build install log
colcon build
```

## 图形工具

```bash
ros2 run rviz2 rviz2     # 三维可视化
ros2 run rqt_graph rqt_graph  # 看节点和话题的连接图
rqt                      # 综合工具集
```

## 系统诊断

```bash
ros2 doctor           # 环境检查
ros2 doctor --report  # 详细报告
```

---

## 新手最常见的 6 个坑

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| `ros2: command not found` | 新终端没 source | `source /opt/ros/humble/setup.bash`，或写进 `~/.bashrc` |
| 两个终端互相看不到节点 | 一个 source 了一个没 source，或 `ROS_DOMAIN_ID` 不同 | 都 source，`echo $ROS_DOMAIN_ID` 对比 |
| 改完代码没变化 | 忘了 `colcon build`，或用 `--symlink-install` 时改错了路径 | 重新编译 / 确认改的是 `src/` 里的文件 |
| 编译报 `ModuleNotFoundError` | 包内目录结构和包名不一致 | Python 包内层目录必须和包名同名 |
| WSL 里没有图形窗口 | 系统/驱动不支持 WSLg | 用命令行验证为主；或升级到 Windows 11 |
| `apt` 报 GPG / NO_PUBKEY | 密钥没导好 | 重做第二章 2.2 的 keyring 步骤 |

## 学完这三章之后

按这个顺序往下走比较顺：

1. **话题 / 服务 / 动作** 三种通信方式分别适合什么场景
2. **URDF**：用 XML 描述一个机器人
3. **Gazebo / Isaac Sim**：把模型放进仿真世界
4. **真机**：串口、CAN、相机的实际接入

---

::: tip 回到开头
[ROS 2 学习记录目录](/ros2/)
:::
