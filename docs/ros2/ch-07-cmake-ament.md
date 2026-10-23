---
title: 第七章 · 用 CMake + ament 编译节点
description: 从第一个 C++ 节点出发，说明为什么不能直接用 g++，以及如何用 CMake + ament 建包、编译并运行
---

# 第七章 · 用 CMake + ament 编译节点

上一章结尾留下了一个问题：ROS 2 的 C++ 节点为什么不能直接用 `g++` 编译？答案是它必须以 **ament 包**的形式交给 CMake 构建。这一章就从零建一个最小包，把节点代码写进去，配好 `CMakeLists.txt` 和 `package.xml`，最后用命令行和 VS Code 两种方式编译、运行；新手最容易踩的几个坑也整理成表放在最后。

## 7.1 编写节点

编写一个 ROS 2 的 C++ 节点非常简单，只需几行代码。打开终端，创建 `chapt2/basic` 目录，再用 VS Code 打开 `d2lros2` 目录：

```bash
mkdir -p d2lros2/chapt2/basic/
code d2lros2
```

接着在左侧 `chapt2/basic` 下新建 `src/firstnode.cpp`，然后在 `firstnode.cpp` 中输入下面的代码：

```cpp
#include "rclcpp/rclcpp.hpp"
int main(int argc, char **argv)
{
    // 调用rclcpp的初始化函数
    rclcpp::init(argc, argv);
    // 调用rclcpp的循环运行我们创建的first_node节点
    rclcpp::spin(std::make_shared<rclcpp::Node>("first_node"));
    return 0;
}
```

整个节点就三件事：初始化 rclcpp、创建一个名为 `first_node` 的节点、进入循环让它一直运行。

## 7.2 初学误区：直接拿 g++ 编译

看到这么短的 `.cpp` 文件，很容易顺手就拿 g++ 去编。在 VS Code 里按 `Ctrl+Shift+B`，选择 **C/C++: gcc 生成活动文件**，实际执行的命令是：

```bash
/usr/bin/gcc -fdiagnostics-color=always -g firstnode.cpp -o firstnode
```

结果直接报错：

```text
firstnode.cpp:1:10: fatal error: rclcpp/rclcpp.hpp: 没有那个文件或目录
    1 | #include "rclcpp/rclcpp.hpp"
      |          ^~~~~~~~~~~~~~~~~~~
compilation terminated.
```

“没有那个文件或目录”是最常见的一种报错，原因是 g++ 编译器没有找到 `rclcpp/rclcpp.hpp` 这个头文件。

于是有人会想到“告诉编译器头文件的位置”：找到 `/opt/ros/lyrical/include/rclcpp/rclcpp/rclcpp.hpp`，然后给编译命令加上 `-I` 参数。但这样仍然会继续报出几十个缺失的头文件、链接错误，改到最后基本没法收场。

::: warning 根本原因
ROS 2 的 C++ 包（rclcpp）依赖 ament/CMake 提供的完整头文件路径、依赖库和 `RMW_IMPLEMENTATION` 等宏定义。这些信息不是加一两个 `-I` 就能补齐的，单文件 g++ 编译是行不通的。
:::

## 7.3 正确做法：构建一个 ament 包

ROS 2 的 C++ 节点必须以标准 ament 包的形式用 CMake 构建。

### 7.3.1 目录结构

一个最小的包只需要三个文件：

```text
chapt2/basic/
├── CMakeLists.txt
├── package.xml
└── src/
    └── firstnode.cpp
```

其中 `CMakeLists.txt` 告诉 CMake 怎么构建，`package.xml` 向 ROS 2 声明这是一个什么包、依赖了谁。

### 7.3.2 CMakeLists.txt

在 `basic` 目录下新建 **CMakeLists.txt**：

```cmake
cmake_minimum_required(VERSION 3.8)
project(firstnode)

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

find_package(ament_cmake REQUIRED)
find_package(rclcpp REQUIRED)

add_executable(firstnode src/firstnode.cpp)
target_link_libraries(firstnode rclcpp::rclcpp)

install(TARGETS
  firstnode
  DESTINATION lib/${PROJECT_NAME})

ament_package()
```

几个关键点：

- `find_package(ament_cmake REQUIRED)` 和 `find_package(rclcpp REQUIRED)` 负责把 ament 和 rclcpp 的头文件路径、依赖库、宏定义全部准备好——这正是 7.2 节里 g++ 做不到的事；
- `add_executable` 生成名为 `firstnode` 的可执行文件；
- `target_link_libraries(firstnode rclcpp::rclcpp)` 把它和 rclcpp 库链接起来；
- `ament_package()` 声明这是一个 ament 包，必须放在文件末尾。

### 7.3.3 package.xml

再新建 **package.xml**：

```xml
<?xml version="1.0"?>
<package format="3">
  <name>firstnode</name>
  <version>0.0.1</version>
  <description>ROS2 first node example</description>
  <maintainer email="your_name@todo.todo">your_name</maintainer>
  <license>Apache-2.0</license>

  <buildtool_depend>ament_cmake</buildtool_depend>
  <depend>rclcpp</depend>

  <export>
    <build_type>ament_cmake</build_type>
  </export>
</package>
```

`<name>` 要和 `CMakeLists.txt` 里的 `project()` 保持一致，`<depend>rclcpp</depend>` 声明了包对 rclcpp 的依赖。

### 7.3.4 配置 VS Code 构建任务

打开 `/home/<用户名>/d2lros2/.vscode/tasks.json`，把默认的 *gcc 生成活动文件*替换为 CMake 构建任务：

```json
{
    "tasks": [
        {
            "type": "shell",
            "label": "CMake 构建 (ROS2)",
            "command": "/usr/bin/cmake -B build -DCMAKE_INSTALL_PREFIX=install -DCMAKE_PREFIX_PATH=/opt/ros/lyrical -DPython3_EXECUTABLE=/usr/bin/python3 -DPython_EXECUTABLE=/usr/bin/python3 -DCMAKE_EXPORT_COMPILE_COMMANDS=ON && /usr/bin/cmake --build build",
            "options": {
                "cwd": "${fileDirname}"
            },
            "problemMatcher": [ "$gcc" ],
            "group": { "kind": "build", "isDefault": true },
            "detail": "配置并构建当前目录下的 ament 包"
        }
    ],
    "version": "2.0.0"
}
```

配置好之后，在 `firstnode.cpp` 里按 **Ctrl+Shift+B** 即可编译，成功后生成 `build/firstnode`。

同时配置 `.vscode/c_cpp_properties.json`，让 IntelliSense 识别 ROS 2 头文件、消除编辑器里的红波浪线：

```json
{
    "configurations": [
        {
            "name": "ROS2 Lyrical",
            "includePath": [
                "/opt/ros/lyrical/include/**",
                "${workspaceFolder}/**"
            ],
            "cStandard": "c17",
            "cppStandard": "c++17",
            "intelliSenseMode": "linux-gcc-x64",
            "compileCommands": "${fileDirname}/build/compile_commands.json"
        }
    ],
    "version": 4
}
```

注意最后一行 `compileCommands`：它依赖构建任务里那个 `-DCMAKE_EXPORT_COMPILE_COMMANDS=ON` 生成的 `compile_commands.json`，所以要先成功构建一次，IntelliSense 才有完整的头文件路径可用。

### 7.3.5 命令行编译

不想依赖 VS Code 的话，在终端里手动执行同样的两步：

```bash
cd d2lros2/chapt2/basic
cmake -B build -DCMAKE_INSTALL_PREFIX=install \
      -DCMAKE_PREFIX_PATH=/opt/ros/lyrical \
      -DPython3_EXECUTABLE=/usr/bin/python3 \
      -DPython_EXECUTABLE=/usr/bin/python3 \
      -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
cmake --build build
```

第一条命令做配置（在 `build` 目录生成构建系统），第二条命令才真正编译。

## 7.4 运行节点

编译成功后，先加载 ROS 2 环境，再运行可执行文件：

```bash
source /opt/ros/lyrical/setup.bash
export PATH=/usr/bin:$PATH
./build/firstnode
```

节点启动后会一直运行，按 `Ctrl+C` 结束，输出：

```text
[INFO] ... [rclcpp]: signal_handler(signum=15)
```

::: warning 注意发行版和安装路径
本机 ROS 2 发行版是 **lyrical**，安装目录是 `/opt/ros/lyrical`。如果换到别的发行版（比如 Humble 或 Jazzy），`-DCMAKE_PREFIX_PATH`、`includePath` 和 `source` 的路径里都要换成对应版本名，否则会找不到 rclcpp。
:::

## 7.5 常见坑汇总

| 报错 | 原因 | 解决 |
| --- | --- | --- |
| `fatal error: rclcpp/rclcpp.hpp: 没有那个文件或目录` | 用 gcc 单文件编译，缺 ament 提供的 include 路径 | 改用 CMake/ament 构建（本章方案） |
| `Unknown CMake command "ament_target_dependencies"` | 新版 ament_cmake 移除了该函数 | 改用 `target_link_libraries(firstnode rclcpp::rclcpp)` |
| `File .../package.xml does not exist` | ament 包缺少 package.xml | 补上 package.xml |
| `ModuleNotFoundError: No module named 'catkin_pkg'` | Anaconda 的 Python 抢占 PATH | 指定 `-DPython3_EXECUTABLE=/usr/bin/python3 -DPython_EXECUTABLE=/usr/bin/python3` |

## 7.6 小结

这一章从一个六行的节点出发，走完了“写源码 → 建 ament 包 → 配 CMakeLists/package.xml → 编译 → 运行”的完整流程，也看清了直接 g++ 编译为什么会失败：缺的不是一两个头文件，而是 ament/CMake 准备好的整套构建环境。

以后再新增一个节点，不要直接 g++，而是在 `src/` 下放源码，在 `CMakeLists.txt` 里加对应的 `add_executable` 和 `target_link_libraries`，然后按 `Ctrl+Shift+B` —— 每加一个节点，就重复一次这个循环。

到这里，从环境准备、常用命令，到第一个自己写的 ROS 2 节点，这条入门线就走完一轮了。回到 [ROS 2 学习记录目录](/ros2/)，可以从头按顺序再读一遍，也可以接着往下折腾话题、服务和 Action。
