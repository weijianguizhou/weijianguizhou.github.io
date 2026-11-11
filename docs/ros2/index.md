---
title: ROS 2 学习记录
description: 从 Ubuntu、WSL 环境到 ROS 2 架构与节点，一套按顺序读的 ROS 2 入门连载
---

# ROS 2 学习记录

这个连载记录我从零学 ROS 2 的全过程。和网上很多教程不同，这里的每一步都是自己踩过坑之后写下来的：报错、绕路、最后怎么解决的，都留在正文里，方便以后回头查。

## 路线

先打地基，再进 ROS 2：

1. 搞清楚 **Ubuntu / WSL / ROS** 分别是什么、为什么这么搭
2. 把 **WSL 2 + Ubuntu 24.04** 装好，处理网络、中文、磁盘和桌面这些琐事
3. 补上 **Ubuntu 常用命令**，不然终端里寸步难行
4. 会写一点 **C++ / Python**，能编译能运行
5. 装 **ROS 2 Jazzy**，跑通 talker/listener、turtlesim 和 rqt
6. 理解 ROS 2 的**分层架构、DDS 与 DCPS 通信模型**
7. 最后认识**节点、ROS 图与重映射**

## 章节

| 章节 | 内容 | 状态 |
| --- | --- | --- |
| [第一章 · Ubuntu、WSL 与 ROS 简介](/ros2/ch-01-ubuntu-ros.html) | Linux 与 Ubuntu、WSL 安装与迁移、中文与 GNOME 桌面、ROS 1 与 ROS 2、版本搭配 | ✅ |
| [第二章 · Ubuntu 常用指令](/ros2/ch-02-ubuntu-commands.html) | 文件与目录、文本与权限、进程与系统、鱼香 ROS 一键安装 | ✅ |
| [第三章 · Ubuntu 环境下编程](/ros2/ch-03-ubuntu-programming.html) | C++ 与 Python 的 Hello World、编译执行与解释执行 | ✅ |
| [第四章 · ROS 2 基础](/ros2/ch-04-ros2-fundamentals.html) | 安装 Jazzy、talker/listener、turtlesim、rqt、分层架构、DDS/RMW/DCPS | ✅ |
| [第五章 · ROS 2 节点](/ros2/ch-05-ros2-node.html) | ROS 图、`ros2 node list`、重映射 | 🚧 更新中 |

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

- [ ] 补完第五章：节点、话题、服务与参数
- [ ] 话题、服务、动作的区别与选择
- [ ] 用 URDF 描述一个机器人，在 RViz 里看
- [ ] MuJoCo 仿真
- [ ] 把 ROS 2 接到真实硬件（串口 / CAN / 相机）
