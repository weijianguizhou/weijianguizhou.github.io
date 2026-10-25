---
title: 高等代数
description: 高等代数课程笔记：多项式、行列式、矩阵到欧氏空间与双线性函数
---

# 高等代数

这套笔记把吕新民老师的的 PPT（北大《高等代数》体系）、李思的《线性代数讲义》、以及 Linear Algebra Done Right (Sheldon Axler, 4th Ed.)]、Linear Algebra (M. Thamban Nair & Arindama Singh, Springer 2018)、Matrix Analysis and Applied Linear Algebra (Carl D. Meyer, SIAM)本书的相关内容合在一起，以期形成自己的理解。

记号：$K$ 是数域，一般就当成 $\mathbb{Q},\mathbb{R},\mathbb{C}$；$V$ 是 $K$ 上有限维线性空间，$\dim V=n$；$A^{\mathsf T}$ 是转置，$A^{*}$ 是共轭转置（实情形就是转置）；$(f,g)$ 表示首一最大公因式；$I_n$ 或 $E$ 是单位阵。

## 章节

| 章节 | 内容 |
| --- | --- |
| [第一章 多项式](/notes/linalg/ch-01-polynomial.html) | 数域与归纳法、多项式环、带余除法、整除与最大公因式、不可约多项式与唯一分解 |
| [第二章 行列式](/notes/linalg/ch-02-determinant.html) | 排列与定义、基本性质、展开定理与 Laplace 定理、乘法定理、伴随矩阵、逆矩阵与 Cramer 法则 |
| [第三章 矩阵](/notes/linalg/ch-03-matrix.html) | 基本运算、初等变换与初等矩阵、秩、分块矩阵、LU 分解 |
| [第四章 线性方程组](/notes/linalg/ch-04-linear-systems.html) | 齐次方程组、非齐次方程组、解的结构与四个基本子空间、秩-零度定理 |
| [第五章 二次型](/notes/linalg/ch-05-quadratic-forms.html) | 二次型与矩阵表示、化标准形、惯性定理、正定性、正交变换与主轴定理 |
| [第六章 线性空间](/notes/linalg/ch-06-linear-space.html) | 定义与例子、子空间、直和、基、维数与坐标、基变换与坐标变换 |
| [第七章 线性变换](/notes/linalg/ch-07-linear-transformations.html) | 线性映射与线性变换、矩阵表示、秩-零度定理（映射版）、不变子空间、特征值与特征多项式 |
| [第八章 λ-矩阵与相似标准形](/notes/linalg/ch-08-lambda-matrix.html) | λ-矩阵、Smith 标准形、行列式因子、不变因子、初等因子、相似判定、有理标准形 |
| [第九章 欧氏空间](/notes/linalg/ch-09-euclidean-space.html) | 内积与度量、Gram 矩阵、标准正交基与 Gram-Schmidt、正交补与投影、正交矩阵与正交变换 |
| [第十章 双线性函数与对偶空间](/notes/linalg/ch-10-bilinear-dual.html) | 线性函数与对偶空间、双线性函数、对称双线性函数与二次型、反对称双线性函数与辛空间、张量积 |
| [第十一章 解析几何](/notes/linalg/ch-11-analytic-geometry.html) | 向量代数、平面与直线、距离、柱面、锥面、旋转曲面、二次曲面 |
| [附录 A 定理与证明手法](/notes/linalg/ch-12-appendix-a.html) | 常用定理的证明抓手：带余除法、Bézout、唯一分解、Eisenstein、范德蒙德 |
| [附录 B 计算套路](/notes/linalg/ch-13-appendix-b.html) | 行列式、秩、逆矩阵、二次型、Jordan 形的固定算法 |
| [附录 C 矩阵求导](/notes/linalg/ch-14-appendix-c.html) | 分母布局约定，标量对向量、对矩阵的求导公式 |
| [附录 D 讲义里超出考纲的部分](/notes/linalg/ch-15-appendix-d.html) | 矩阵群与 Lie 代数、线性规划对偶、量子力学里的线性代数 |

::: tip 怎么读
按顺序读：前面几章是后面章节的语言（行列式、矩阵是线性空间的计算基础），第八章的 λ-矩阵和第十章的对偶空间可以按需跳读。
:::
