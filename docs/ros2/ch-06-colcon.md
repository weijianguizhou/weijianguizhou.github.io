---
title: 第六章 · 构建节点
description: 用 colcon 构建功能包，分别用 rclcpp 与 rclpy 编写节点，并转向面向对象的写法。
---

# 第六章 · 构建节点

## 6.1 ROS2节点工具colcon是什么？

colcon是ROS2的功能包构建工具。

简单点说就是用来编译代码的，但是ROS2默认是没有安装colcon的..... 所以第一步就是进行colcon的安装。

## 6.2 安装colcon

```bash
sudo apt-get install python3-colcon-common-extensions
```
测试一下。

```bash
mkdir colcon_test && cd colcon_test
```
下载一段示例代码：

```bash
git clone https://ghproxy.com/https://github.com/ros2/examples src/examples -b foxy
```
拉取结束build一下：

```bash
colcon build
```
运行试试：

- 运行一个订阅杂志节点

```bash
ros2 run examples_rclcpp_minimal_subscriber subscriber_member_function
```
- 重开一个终端运行一个发行杂志节点

```bash
ros2 run examples_rclcpp_minimal_publisher publisher_member_function
```
就可以看到效果了！！！

**命令汇总：**

1.  只编译一个包：

    ```bash
    colcon build --packages-select <包名>
    ```

2.  不编译测试单元：

    ```bash
    colcon bulid --packages-select <包名> --cmake-args -DBUILD_TESTING=0
    ```

3.  运行编译的包测试:

    ```bash
    colcon test
    ```

4.  允许通过更改src下的部分文件来改变install:

    ```bash
    colcon build --symlink-install
    ```

## 6.3 使用RCLCPP编写节点

编写ROS2节点的一般步骤：

    1. 导入库文件
    2. 初始化客户端库
    3. 新建节点
    4. spin循环节点
    5. 关闭客户端库

节点需要存在于功能包当中、功能包需要存在于工作空间当中。所以我们要想创建节点，就要先创建一个工作空间，再创建功能包。

### 创建工作空间和功能包

1.  **工作空间**

    工作空间就是文件夹，所以很简单。

    ```bash
    cd d2lros2/chapt2/
    mkdir -p chapt2_ws/src/
    ```

2.  **创建 `example_cpp` 功能包**

    创建 example_cpp 功能包，使用 ament-cmake 作为编译类型，并为其添加 rclcpp 依赖。

    ```bash
    cd chapt2_ws/src
    ros2 pkg create example_cpp --build-type ament_cmake --dependencies rclcpp
    ```

这条命令的含义和参数:

- pkg create 是创建包的意思

- --build-type 用来指定该包的编译类型，一共有三个可选项ament_python、ament_cmake、cmake

- --dependencies 指的是这个功能包的依赖，这里用一个ros2的C++客户端接口rclcpp

诶，怎么报错了...

![pkg_create报错](/ros2/pkg-create-error.webp)

哦.....,原来是cmake拼错了.....

![pkg_create成功](/ros2/pkg-create-success.webp)

现在好了......

创建完目录的格式如下：

    .
    └── src
        └── example_cpp
            ├── CMakeLists.txt
            ├── include
            │   └── example_cpp
            ├── package.xml
            └── src

    5 directories, 2 files

### 创建节点

接着我们在example_cpp/src下创建一个node_01.cpp文件，可以直接使用命令

```bash
vim node_01.cpp
```
如果有Neovim，可以使用命令：

```bash
nvim node_01.cpp
```
### 编写代码

```cpp
#include "rclcpp/rclcpp.hpp"

int main(int argc, char **argv)
{
    /* 初始化rclcpp  */
    rclcpp::init(argc, argv);
    /*产生一个node_01的节点*/
    auto node = std::make_shared<rclcpp::Node>("node_01");
    // 打印一句自我介绍
    RCLCPP_INFO(node->get_logger(), "你好，我是你编写的第一个节点");
    /* 运行节点，并检测退出信号 Ctrl+C*/
    rclcpp::spin(node);
    /* 停止运行 */
    rclcpp::shutdown();
    return 0;
}
```
在node_01.cpp中输入上面的内容后，还需要修改一下CMakeLists.txt。将其添加为可执行文件，并使用install指令将其安装到install目录。

在CmakeLists.txt最后一行加入下面两行代码。

```cmake
add_executable(node_01 src/node_01.cpp)
ament_target_dependencies(node_01 rclcpp)
```
添加这两行代码的目的是让编译器编译node_01这个文件，接着在上面两行代码下面添加下面的代码。

```cmake
install(TARGETS
  node_01
  DESTINATION lib/${PROJECT_NAME}
)
```
在chapt2_ws下依次输入下面的命令:

```bash
colcon build
source install/setup.bash
ros2 run example_cpp node_01
```
![第一个节点](/ros2/first-node.webp)

就可以看到第一个节点在和我们打招呼。yeeh!!!

后面还有面向对象的方式写节点，但我还没学到。

## 6.4 使用`RCLPY`编写节点

### 创建Python功能包

创建一个名字叫做`example_py python`版本的功能包。

```bash
cd chapter2/chapt2_ws/src/
ros2 pkg create example_py  --build-type ament_python --dependencies rclpy
```
完成之后的目录结构：

```bash
.
├── example_cpp
│   ├── CMakeLists.txt
│   ├── include
│   │   └── example_cpp
│   ├── package.xml
│   └── src
│       └── node_01.cpp
└── example_py
    ├── example_py
    │   └── __init__.py
    ├── package.xml
    ├── resource
    │   └── example_py
    ├── setup.cfg
    ├── setup.py
    └── test
        ├── test_copyright.py
        ├── test_flake8.py
        └── test_pep257.py

9 directories, 11 files
```
在`example_py/example_py`下创建`node_02.py`接着我们开始编写代码。

```python
import rclpy
from rclpy.node import Node

def main(args=None):
    """
    ros2运行该节点的入口函数
    编写ROS2节点的一般步骤
    1. 导入库文件
    2. 初始化客户端库
    3. 新建节点对象
    4. spin循环节点
    5. 关闭客户端库
    """
    rclpy.init(args=args) # 初始化rclpy
    node = Node("node_02")  # 新建一个节点
    node.get_logger().info("你好，我是你创建的第二个节点")
    rclpy.spin(node) # 保持节点运行，检测是否收到退出指令（Ctrl+C）
    rclpy.shutdown() # 关闭rclpy
```
接着修改`setup.py`

```python
entry_points={
        'console_scripts': [
            "node_02 = example_py.node_02:main"
        ],
    },
)
```
setup.py这段配置是声明一个ROS2的节点，声明后使用colcon build才能检测到，从而将其添加到install目录下。

完成上面的工作后，就可以编译运行了。

```bash
cd chapter2/chapt2_ws/
colcon build
source install/setup.bash
ros2 run example_py node_02
```
## 6.5 面向对象编程思想（OOP）

### 面向对象编程的基本概念

面向对象中有五个重要的概念，理解这五个概念相当于对OOP编程有了了解。

1.  **类与对象（抽象与具体）**：比如说鱼类和小鱼，鱼类就是一个类，而小鱼就是鱼类（抽象的）中的一个对象（具体的）。在ROS2设计时这种抽象和具体的思想发挥着非常重要的作用，比如说DDS是有很多厂家的，ROS2为了匹配不同厂家的DDS，就设计除了DDS抽象层，而每一个具体的DDS厂家，我们可以称之为一个DDS的对象，是具体的。

2.  **封装、继承与多态**：

    - 所谓封装就是将属性和行为封装在一起。上面已经介绍了对象 = 属性+行为，比如冰箱将冰箱的温度值（属性）和对温度值的操作（行为）等封装在一起。

    - 继承，继承可以帮我们减少很多的工作量，比如ROS2中的执行器类，通过继承执行器类实现了单线程执行器和多线程执行器，更多具体的例子我们在后续的学习中遇到再说。

    - 多态，其实很简单，我们可以说鲤鱼是鱼类，草鱼是鱼类，鲤鱼是鱼类。同一个鱼类可以有多种不同的类型，即多态。

### 使用面向对象方式编写ROS2节点

#### C++版本

在`d2lros2/chapt2/chapt2_ws/src/example_cpp/src`下新建`node_03.cpp`，接着输入下面的代码。

```cpp
#include "rclcpp/rclcpp.hpp"

/*
    创建一个类节点，名字叫做Node03,继承自Node.
*/
class Node03 : public rclcpp::Node
{

public:
    // 构造函数,有一个参数为节点名称
    Node03(std::string name) : Node(name)
    {
        // 打印一句
        RCLCPP_INFO(this->get_logger(), "大家好，我是%s.",name.c_str());
    }

private:

};

int main(int argc, char **argv)
{
    rclcpp::init(argc, argv);
    /*产生一个node_03的节点*/
    auto node = std::make_shared<Node03>("node_03");
    /* 运行节点，并检测退出信号*/
    rclcpp::spin(node);
    rclcpp::shutdown();
    return 0;
}
```
在`CMakeLists.txt`末尾加上这么一段：

```cpp
add_executable(node_03 src/node_03.cpp)
ament_target_dependencies(node_03 rclcpp)

install(TARGETS
  node_03
  DESTINATION lib/${PROJECT_NAME}
)
```
编译运行一下：

```bash
colcon build --packages-select example_cpp
source install/setup.bash
ros2 run example_cpp node_03
```
#### Python版本

在`d2lros2/d2lros2/chapt2/chapt2_ws/src/example_py/example_py`下新建`node_04.py`，输入下面的代码

```python
#!/usr/bin/env python3
import rclpy
from rclpy.node import Node

class Node04(Node):
    """
    创建一个Node04节点，并在初始化时输出一个话
    """
    def __init__(self,name):
        super().__init__(name)
        self.get_logger().info("大家好，我是%s!" % name)

def main(args=None):
    rclpy.init(args=args) # 初始化rclpy
    node = Node04("node_04")  # 新建一个节点
    rclpy.spin(node) # 保持节点运行，检测是否收到退出指令（Ctrl+C）
    rclpy.shutdown() # 关闭rclpy
```
接着修改`setup.py`

```python
entry_points={
        'console_scripts': [
            "node_02 = example_py.node_02:main",
            "node_04 = example_py.node_04:main"
        ],
    },
```
