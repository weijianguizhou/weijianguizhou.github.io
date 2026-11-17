---
title: ROS 2 学习记录
description: 从 Ubuntu、WSL 环境到 ROS 2 架构、节点、话题与通信，一套按顺序读的 ROS 2 入门连载
---

# ROS 2 学习记录

## 前言

第一次接触或者说听说ROS是在2025年12月，那时候还在兵器学科楼340，坐在办公室最东侧的一个小桌子上。刘方鑫师兄还没毕业，帮着师兄审核毕业论文，一起聊天，好不快乐。那时候师兄给我讲讲MPC和WBC，一起去找张老师聊动力学控制，真的觉得这样的日子要能一直持续下去就好了。

眨眼来到师兄毕业去湖南株洲工作前夕，师兄把他电脑上的代码全部移到了我的电脑上，那是我第一次接触Unbuntu，第一次接触ROS。

第二次接触ROS就是这次了，这次得从头开始学了。第一次接触是师兄弟间的闲聊，这一次就是朋友间的承诺了。希望这次可以利用好闲散的时间，好好把ROS2学好，学通。

主要的学习资料没有参考鱼香ROS这个热门的博主，因为实操发现教程比较落后。因为安装的Unbuntu的版本是24.04，对应的ROS2版本是Jazzy，所以主要的参考是Jazzy的官方文档 <https://docs.ros.org/en/jazzy/index.html>

## 路线

先打地基，再进 ROS 2：

1. 搞清楚 **Ubuntu / WSL / ROS** 分别是什么、为什么这么搭
2. 把 **WSL 2 + Ubuntu 24.04** 装好，处理网络、中文、磁盘和桌面这些琐事
3. 补上 **Ubuntu 常用命令**，不然终端里寸步难行
4. 会写一点 **C++ / Python**，能编译能运行
5. 装 **ROS 2 Jazzy**，跑通 talker/listener、turtlesim 和 rqt
6. 理解 ROS 2 的**分层架构、DDS 与 DCPS 通信模型**
7. 配置环境变量，认识**节点、ROS 图、重映射与话题**
8. 用 **colcon** 构建功能包，分别用 **rclcpp / rclpy** 写节点
9. 从通信协议与 IPC 出发，理解 **ROS 2 通信中间件**

## 章节

| 章节 | 内容 | 状态 |
| --- | --- | --- |
| [第一章 · Ubuntu、WSL 与 ROS 简介](/ros2/ch-01-ubuntu-ros.html) | Linux 与 Ubuntu、WSL 安装与迁移、中文与图形界面、ROS 1 与 ROS 2、版本搭配 | ✅ |
| [第二章 · Ubuntu 常用指令](/ros2/ch-02-ubuntu-commands.html) | 文件与目录、文本与权限、进程与系统、鱼香 ROS 一键安装 | ✅ |
| [第三章 · Ubuntu 环境下编程](/ros2/ch-03-ubuntu-programming.html) | C++ 与 Python 的 Hello World、编译执行与解释执行 | ✅ |
| [第四章 · ROS 2 基础](/ros2/ch-04-ros2-fundamentals.html) | 安装 Jazzy、talker/listener、turtlesim、rqt、分层架构、DDS/RMW/DCPS | ✅ |
| [第五章 · ROS 2 环境配置、节点与话题](/ros2/ch-05-ros2-node.html) | 环境变量、域 ID、ROS 图、节点、重映射、话题与命令行工具 | ✅ |
| [第六章 · 构建节点](/ros2/ch-06-colcon.html) | colcon 构建、rclcpp 与 rclpy 节点、CMakeLists / setup.py、面向对象写法 | ✅ |
| [第七章 · ROS 2 通信](/ros2/ch-07-communication.html) | 通信协议、网络通信与 IPC、通信中间件 | 🚧 更新中 |

## 环境

| 项目 | 版本 |
| --- | --- |
| 系统 | Windows 10 2004+ / Windows 11 |
| 子系统 | WSL 2（3.0.3）+ Ubuntu 24.04 |
| ROS | ROS 2 Jazzy（对应 Ubuntu 24.04） |
| 终端 | Windows Terminal |

::: warning 版本一定要配对
ROS 2 和 Ubuntu 是绑死的：**Ubuntu 24.04 → Jazzy，22.04 → Humble，20.04 → Foxy**。
本站命令以 Jazzy 为例；如果你用的是 22.04，把命令里的 `jazzy` 全部换成 `humble`（包名、`/opt/ros/` 路径、环境变量都要换）。
:::

::: tip 怎么读
按顺序读，前一章是后一章的地基；如果已经熟悉 Linux，可以直接从第四章开始，遇到环境问题再回头翻第一章。
:::

## 还会继续写

- [ ] 补完第七章：通信中间件与 DDS 实践
- [ ] 服务、动作与参数
- [ ] 用 URDF 描述一个机器人，在 RViz 里看
- [ ] MuJoCo 仿真
- [ ] 把 ROS 2 接到真实硬件（串口 / CAN / 相机）
