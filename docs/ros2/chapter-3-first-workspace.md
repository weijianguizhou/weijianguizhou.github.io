---
title: 第三章 · 第一个工作空间
description: 跑通小海龟、理解节点与话题、用 colcon 建一个自己的包
---

# 第三章 · 第一个工作空间

**目标**：跑通现成的 demo，搞清节点/话题这两个最基础的概念，然后自己建一个包、写一个能运行的最小节点。

## 3.1 先跑个现成的：小海龟

打开两个终端（都要先 `source /opt/ros/humble/setup.bash`，写进 bashrc 的话新终端自动生效）。

```bash
# 终端 1：海龟仿真器
ros2 run turtlesim turtlesim_node
```

```bash
# 终端 2：键盘控制
ros2 run turtlesim turtle_teleop_key
```

终端 2 里用方向键就能控制海龟移动。

::: tip 没弹出窗口？
WSL 的图形界面（WSLg）需要 Windows 11，或较新的 Windows 10 + 新版 WSL。看不到窗口不影响学习，接着用 3.2 的命令行方式验证，一样能看懂节点和话题。
:::

## 3.2 看懂「节点」和「话题」

再开第三个终端：

```bash
ros2 node list
```

会看到 `/turtlesim`、`/teleop_turtle` 等——每个正在运行的程序都是一个**节点**。

```bash
ros2 topic list
```

会看到 `/turtle1/cmd_vel` 等——节点之间传数据走的是**话题**，本质是“一个有名字的频道”。

看看键盘控制往话题里发了什么：

```bash
ros2 topic echo /turtle1/cmd_vel
```

再按方向键，终端里就会不断打印 `linear`、`angular` 的数值。这就是 ROS 2 的核心模型：**节点发布到话题，其他节点订阅话题**。

## 3.3 建自己的工作空间

工作空间（workspace）就是放你自己代码的地方，约定俗成的名字是 `ros2_ws`：

```bash
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws
colcon build
source install/setup.bash
```

::: tip 为什么每次都要 source
`install/setup.bash` 会把工作空间里新编译的包加进环境变量。可以写进 `~/.bashrc`，但要注意**路径写死**，工作空间换位置了就要改。
:::

## 3.4 建一个 Python 包

```bash
cd ~/ros2_ws/src
ros2 pkg create --build-type ament_python my_first_pkg --dependencies rclpy
```

目录结构会是这样：

```text
my_first_pkg/
├── my_first_pkg/
│   └── __init__.py
├── package.xml
├── setup.py
└── setup.cfg
```

## 3.5 写一个最小节点

在 `~/ros2_ws/src/my_first_pkg/my_first_pkg/` 下新建 `hello.py`：

```python
import rclpy
from rclpy.node import Node


class Hello(Node):
    def __init__(self):
        super().__init__('hello_node')
        self.count = 0
        # 每 1 秒触发一次
        self.create_timer(1.0, self.tick)

    def tick(self):
        self.count += 1
        self.get_logger().info(f'hello ros2: {self.count}')


def main():
    rclpy.init()
    node = Hello()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()
```

## 3.6 注册成可执行命令

打开 `~/ros2_ws/src/my_first_pkg/setup.py`，找到 `entry_points` 那一段，改成：

```python
entry_points={
    'console_scripts': [
        'hello = my_first_pkg.hello:main',
    ],
},
```

## 3.7 编译并运行

```bash
cd ~/ros2_ws
colcon build --packages-select my_first_pkg
source install/setup.bash
ros2 run my_first_pkg hello
```

终端里每秒输出一行 `hello ros2: 1`、`hello ros2: 2`……你的第一个 ROS 2 节点就成功了。

::: tip 改了代码不生效？
改完 Python 代码也要重新 `colcon build`（或至少 `source install/setup.bash`）。忘了这一步是新手最常见的问题。
:::

## 3.8 小结

| 概念 | 一句话解释 | 对应命令 |
| --- | --- | --- |
| 节点 Node | 一个正在运行的进程，做一件具体的事 | `ros2 node list` |
| 话题 Topic | 有名字的数据频道，发布/订阅模式 | `ros2 topic list` |
| 工作空间 Workspace | 放你自己代码的目录 | `colcon build` |
| 包 Package | ROS 2 的代码组织单位 | `ros2 pkg create` |

## 下一步

命令记不住很正常，[附录 · 常用命令与排错](/ros2/appendix-commands.html) 可以当速查表收藏。
