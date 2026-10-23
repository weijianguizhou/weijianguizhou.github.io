---
title: ROS 2 学习记录
description: 从 Ubuntu、WSL 环境到 ROS 2 架构与编译，一套按顺序读的 ROS 2 入门连载
---

# ROS 2 学习记录

这个连载记录我从零学 ROS 2 的全过程。和网上很多教程不同，这里的每一步都是自己踩过坑之后写下来的：报错、绕路、最后怎么解决的，都留在正文里，方便以后回头查。

## 路线

先打地基，再进 ROS 2：

1. 搞清楚 **Ubuntu / WSL / ROS** 分别是什么、为什么这么搭
2. 把 **WSL 2 + Ubuntu** 装好，处理网络、中文、磁盘这些琐事
3. 装 **ROS 2 Humble** 并跑通第一个节点
4. 补上 **Ubuntu 常用命令**，不然终端里寸步难行
5. 会写一点 **C++ / Python**，能编译能运行
6. 理解 ROS 2 的**节点、话题、DDS 与分层架构**
7. 最后用 **CMake + ament** 自己建包、编译节点

## 章节

| 章节 | 内容 | 状态 |
| --- | --- | --- |
| [第一章 · Ubuntu、WSL 与 ROS 是什么](/ros2/ch-01-ubuntu-wsl-ros.html) | Linux 与 Ubuntu、WSL 是什么、ROS 1 与 ROS 2、版本搭配 | ✅ |
| [第二章 · WSL 安装与配置踩坑](/ros2/ch-02-wsl-install.html) | 安装与升级、连接慢、离线装、迁到 D 盘、中文输入法、WSLg | ✅ |
| [第三章 · ROS 2 安装与验证](/ros2/ch-03-ros2-install.html) | apt 源与清华镜像、gpg 的坑、talker/listener、rviz2、一键脚本 | ✅ |
| [第四章 · Ubuntu 常用命令](/ros2/ch-04-ubuntu-commands.html) | 文件与目录、文本与权限、进程与系统、常用速查 | ✅ |
| [第五章 · Ubuntu 环境下编程](/ros2/ch-05-ubuntu-programming.html) | C++ 与 Python 的 Hello World、编译 vs 解释 | ✅ |
| [第六章 · ROS 2 体验与系统架构](/ros2/ch-06-ros2-experience.html) | 节点与话题、rqt、分层架构、DDS/RMW/DCPS、编译链接 | ✅ |
| [第七章 · 用 CMake + ament 编译节点](/ros2/ch-07-cmake-ament.html) | 包结构、CMakeLists、编译与运行 | ✅ |

## 环境

| 项目 | 版本 |
| --- | --- |
| 系统 | Windows 10 2004+ / Windows 11 |
| 子系统 | WSL 2 + Ubuntu 22.04 LTS |
| ROS | ROS 2 Humble Hawksbill（官方支持到 2027 年 5 月） |
| 终端 | Windows Terminal |

::: tip 怎么读
按顺序读，前一章是后一章的地基；赶时间可以直接从第三章开始，遇到不懂的概念再回头翻第一章。
:::

## 还会继续写

- [ ] 话题、服务、动作的区别与选择
- [ ] 用 URDF 描述一个机器人，在 RViz 里看
- [ ] Gazebo 仿真
- [ ] 把 ROS 2 接到真实硬件（串口 / CAN / 相机）
