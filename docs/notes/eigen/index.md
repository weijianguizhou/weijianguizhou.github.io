---
title: Eigen 库使用指南
description: Eigen 库使用指南
---

# Eigen 库使用指南

<Figure src="/eigen/eigen.png" alt="Eigen 库" caption="Eigen · 纯头文件的 C++ 线性代数库" :width="460" />

**Eigen** 是一个开源的 C++ 模板库，专注于**线性代数**、**矩阵运算**及**数值算法**。纯头文件、高性能（SIMD + 表达式模板）、跨平台零依赖。

- 官网：[eigen.tuxfamily.org](https://eigen.tuxfamily.org)
- 源码：[gitlab.com/libeigen/eigen](https://gitlab.com/libeigen/eigen)
- API 文档（5.0）：[libeigen.gitlab.io](https://libeigen.gitlab.io/eigen/docs-5.0/)
- 许可证：MPL 2.0

## 章节

| 部分 | 章节 |
| --- | --- |
| 基础入门 | [第一章 Matrix 类](/notes/eigen/ch-01-matrix.html) · [第二章 矩阵与向量运算](/notes/eigen/ch-02-vector-ops.html) · [第三章 数组类与系数运算](/notes/eigen/ch-03-array.html) |
| 高级操作 | [第四章 块操作](/notes/eigen/ch-04-block.html) · [第五章 高级初始化](/notes/eigen/ch-05-init.html) · [第六章 切片与索引](/notes/eigen/ch-06-slice.html) · [第七章 归约、访问者与广播](/notes/eigen/ch-07-reduction.html) |
| 线性求解 | [第八章 分解概述与选择](/notes/eigen/ch-08-decomposition.html) · [第九章 LU 分解](/notes/eigen/ch-09-lu.html) · [第十章 QR 分解与最小二乘](/notes/eigen/ch-10-qr.html) · [第十一章 Cholesky 分解](/notes/eigen/ch-11-cholesky.html) · [第十二章 SVD 分解](/notes/eigen/ch-12-svd.html) · [第十三章 特征值与特征向量](/notes/eigen/ch-13-eigen.html) |
| 几何变换 | [第十四章 旋转的表达](/notes/eigen/ch-14-rotation.html) · [第十五章 仿射变换](/notes/eigen/ch-15-affine.html) · [第十六章 几何实战](/notes/eigen/ch-16-geometry.html) |
| 实战应用 | [第十七章 最小二乘与 PCA](/notes/eigen/ch-17-least-squares-pca.html) · [第十八章 卡尔曼滤波与点云配准](/notes/eigen/ch-18-kalman-icp.html) · [第十九章 数值求解与性能技巧](/notes/eigen/ch-19-numerics.html) |

## 快速开始

```cpp
#include <Eigen/Dense>
using namespace Eigen;

MatrixXd m(2, 2);
m(0, 0) = 3;
m(1, 0) = 2.5;
m(0, 1) = -1;
m(1, 1) = m(1, 0) + m(0, 1);
std::cout << m << std::endl;
// 输出:  3  -1
//       2.5 1.5
```

纯头文件，编译时只需把 Eigen 目录加进 include 路径：

```bash
g++ -I /path/to/eigen program.cpp -o program
```

::: tip 怎么读
前七章讲矩阵与数组的日常操作，第八章起进入分解与求解；第十四章之后的几何部分可以先跳过，用到机器人或视觉时再回来。每章的代码都是完整可编译的片段。
:::
