---
title: ROS 2 学习记录
description: 在 Windows + WSL 2 上从零配置 ROS 2 Humble 的完整记录
---

# ROS 2 学习记录

这个系列记录我在 **Windows + WSL 2 + Ubuntu 22.04** 上从零学 ROS 2 的过程：从装环境开始，到一个能跑起来的小作品。每章都写成可以直接照着敲的步骤，不是泛泛而谈。

## 为什么用 WSL 2 而不是虚拟机

- ROS 2 在 Linux 上最省心，官方文档、社区方案基本都以 Ubuntu 为准
- WSL 2 是真正的 Linux 内核，比虚拟机轻，开机就能用
- 和 Windows 的文件、VS Code 打通，写代码不用来回传文件
- 不占双系统的坑，也不影响平时用 Windows

## 章节

| 章节 | 内容 | 状态 |
| --- | --- | --- |
| [第一章 · 配置 WSL 2](/ros2/chapter-1-wsl.html) | 装 WSL 2、Ubuntu 22.04、换源、常用设置 | ✅ 已写完 |
| [第二章 · 安装 ROS 2 Humble](/ros2/chapter-2-install-ros2.html) | 加源、密钥、apt 安装、环境变量、验证 | ✅ 已写完 |
| [第三章 · 第一个工作空间](/ros2/chapter-3-first-workspace.html) | 小海龟、节点与话题、colcon 建包 | ✅ 已写完 |
| [附录 · 常用命令与排错](/ros2/appendix-commands.html) | 高频命令、典型报错对照 | ✅ 已写完 |

## 环境

| 项目 | 版本 |
| --- | --- |
| 系统 | Windows 11（Windows 10 需 2004 / 19041+） |
| 子系统 | WSL 2 + Ubuntu 22.04 LTS |
| ROS | ROS 2 Humble Hawksbill（官方支持到 2027 年 5 月） |
| 终端 | Windows Terminal |

::: tip 阅读建议
按章节顺序看。每章末尾都有「下一章」，左栏也能直接跳。
:::

## 这个系列会更新

- [ ] 第四章：话题、服务、动作的区别与选择
- [ ] 第五章：用 URDF 描述一个机器人
- [ ] 第六章：在 Gazebo 里仿真
- [ ] 第七章：把 ROS 2 接到真实硬件
