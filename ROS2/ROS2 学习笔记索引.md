# ROS2 学习笔记索引

这套笔记由原来的 LaTeX 书稿 `机器人学/ROS2/ROS学习记录.tex` 拆成，按主题分了若干篇，不再按章节编号。原文里的插图仍留在 `机器人学/ROS2/Figure/` 与 `figures/` 目录下，笔记里用 Obsidian 双链直接嵌入，没有复制图片。

## 前言

第一次接触或者说听说 ROS 是在 2025 年 12 月，那时候还在兵器学科楼 340，坐在办公室最东侧的一个小桌子上。刘方鑫师兄还没毕业，帮着师兄审核毕业论文，一起聊天，好不快乐。那时候师兄给我讲讲 MPC 和 WBC，一起去找张老师聊动力学控制，真的觉得这样的日子要是能一直持续下去就好了。

眨眼来到师兄毕业去湖南株洲工作前夕，师兄把他电脑上的代码全部移到了我的电脑上，那是我第一次接触 Unbuntu，第一次接触 ROS。

第二次接触 ROS 就是这次了，这次得从头开始学了。第一次接触是师兄弟间的闲聊，这一次就是朋友间的承诺了。希望这次可以利用好闲散的时间，好好把 ROS2 学好，学通。

## 笔记目录

建议按下面的顺序读，前一篇是后一篇的地基。

| 顺序 | 笔记 | 内容 |
| --- | --- | --- |
| 1 | [[Ubuntu、WSL 与 ROS 是什么]] | Ubuntu 与 Linux 的关系、WSL 是什么、ROS 是什么、ROS 1 与 ROS 2 的区别、ROS 2 与 Ubuntu 的版本搭配 |
| 2 | [[WSL 安装与配置踩坑]] | 装 WSL、升级 2.7→3.0、连接慢的排查、离线装 Ubuntu、把 WSL 挪到 D 盘、中文与输入法、`wsl --shutdown`、gedit 的怪字符、在 WSLg 里跑 GNOME 桌面，以及一张报错速查表 |
| 3 | [[ROS2 安装与验证]] | 官方 ros2-apt-source 路线、清华镜像、`gpg --dearmor` 的坑、`talker`/`listener` 验证、两个节点互相听不见、rviz2 出图三招、鱼香 ROS 一键安装 |
| 4 | [[Ubuntu 常用命令-文件与目录]] | 打开终端、ls、cd、pwd、mkdir、rm、cp、mv、cat、more、less、head、tail、which/whereis/locate/find |
| 5 | [[Ubuntu 常用命令-文本权限与进程]] | grep、wc、chmod、tar、ps、top、free、df、du、ln、date/cal、kill、用自然语言来使用 Ubuntu |
| 6 | [[Ubuntu 环境下编程]] | C++ 与 Python 的 Hello World、`g++` 与 `python3`、编译执行与解释执行 |
| 7 | [[ROS2 体验与系统架构]] | 你说我听、涂鸦乌龟、rqt、ROS2 分层架构、DDS 与 RMW、DCPS 通信模型、编译链接流程 |
| 8 | [[使用CMake + ament编译ROS2节点]] | 用 CMake + ament 正确构建 ROS2 C++ 节点的完整流程（这篇不在原 LaTeX 书稿里，是另外补的） |

## 原文结构对照

拆的时候尽量按主题走，和原书章节的对应关系如下，方便回去查 LaTeX 源稿。

| 原文件 | 原章节 | 拆到哪篇 |
| --- | --- | --- |
| `ch01-ubuntu-ros.tex` | 什么是 Ubuntu、在 Windows 上使用 Ubuntu：WSL、ROS 是什么、ROS 1 与 ROS 2 的主要区别、ROS 2 与 Ubuntu 版本的搭配 | [[Ubuntu、WSL 与 ROS 是什么]] |
| `ch01-ubuntu-ros.tex` | 安装并配置 WSL、中文显示和中文输入、`wsl --shutdown`、gedit 后面那串奇怪字符、在 WSLg 里跑出一整个 GNOME 桌面、这一路的坑一张表收尾、这条路值不值得 | [[WSL 安装与配置踩坑]] |
| `ch01-ubuntu-ros.tex` | 在 WSL 里安装 ROS 2、让 rviz2 正常出图 | [[ROS2 安装与验证]] |
| `ch04-ros2-fundation.tex` | ROS2 的下载 | [[ROS2 安装与验证]] |
| `ch02-ubuntu-commands.tex` | 鱼香ROS的指令 | [[ROS2 安装与验证]] |
| `ch02-ubuntu-commands.tex` | 打开终端、ls … find | [[Ubuntu 常用命令-文件与目录]] |
| `ch02-ubuntu-commands.tex` | grep … kill、用自然语言来使用Unbuntu | [[Ubuntu 常用命令-文本权限与进程]] |
| `ch03-ubuntu-program.tex` | 整章 | [[Ubuntu 环境下编程]] |
| `ch04-ros2-fundation.tex` | ROS2体验、ROS2系统架构、ROS2中间件DDS架构、DDS和ROS2架构、DDS 通信模型、ROS2的节点 | [[ROS2 体验与系统架构]] |

## 阅读路线

原文结尾给的学习路线，按现在的分篇改一下就是：

- **环境篇** [[Ubuntu、WSL 与 ROS 是什么]] → [[WSL 安装与配置踩坑]] → [[ROS2 安装与验证]]：把 Ubuntu、WSL、ROS 2 这三样东西装明白，后面才有地方落脚；
- **基本功篇** [[Ubuntu 常用命令-文件与目录]] → [[Ubuntu 常用命令-文本权限与进程]]：学会打开终端，掌握文件、目录、权限、进程这些最常用的命令，这是之后所有操作的地基；
- **编程篇** [[Ubuntu 环境下编程]]：看看 C++ 和 Python 程序在 Linux 里怎么编译、怎么运行，和 Windows 下有什么不同；
- **ROS2 篇** [[ROS2 体验与系统架构]] → [[使用CMake + ament编译ROS2节点]]：从节点、话题、服务这些核心概念开始，配合小例子逐个验证，最后把节点真正构建出来；
- 最后把各部分串起来，完成小型机器人程序，体会完整的工作流。

如果你现在对 “Ubuntu 到底是什么、WSL 怎么用、ROS 能干什么” 已经有了大致印象，那环境篇的任务就完成了。

## 两个小提醒

- **ROS 2 版本对不上就装不上。** 原稿里 `ch01` 用的是 Ubuntu 26.04 + ROS 2 Lyrical，`ch04` 记录一键安装时选的是 Humble。两处都按原样保留，没有统一改版本号——装之前先 `lsb_release -a` 看一眼自己的系统，再决定装哪一版。
- **报错先分清楼层。** 命令该在哪边敲（PowerShell 还是 WSL 里的 bash）、路径属于哪个文件系统（`/mnt/c` 还是 ext4.vhdx）、包名是哪个系统里的，这三件事分清楚，一半的坑根本不会踩。速查表在 [[WSL 安装与配置踩坑]] 文末。
