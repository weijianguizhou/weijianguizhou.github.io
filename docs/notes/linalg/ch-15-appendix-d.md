---
title: 附录 D 讲义里超出考纲的部分
description: 高等代数 · 附录 D 讲义里超出考纲的部分
---

# 附录 D 讲义里超出考纲的部分

李思的讲义后面还有几章，课程不讲，但用的全是前面的东西，顺手记一下。

矩阵群与 Lie 代数。$GL(n),SL(n),O(n),SO(n),U(n),SU(n)$ 都是矩阵群。$SO(n)$ 在单位阵处的切空间是反对称矩阵空间，指数映射把 $\widetilde\omega$ 送成旋转矩阵 $e^{\widetilde\omega}$，角速度积分出姿态就靠这个。BCH 公式说两个小旋转复合的对数约等于

$$
X+Y+\frac12[X,Y]+\cdots,
$$

李括号就是矩阵交换子 $[X,Y]=XY-YX$。

线性规划。约束是线性不等式，可行域是多面体，最优值在顶点取到，单纯形法沿着顶点走。对偶问题把

$$
\min c^{\mathsf T}x\ \text{s.t.}\ Ax\ge b
\quad\longleftrightarrow\quad
\max b^{\mathsf T}y\ \text{s.t.}\ A^{\mathsf T}y\le c
$$

配对，强弱对偶背后的 Farkas 引理和分离定理，本质上还是线性代数加凸性。

量子力学。量子态是复内积空间里的单位向量，可观测量是 Hermite 矩阵，测量结果是特征值，概率是投影的模方。自旋用 Pauli 矩阵描述：

$$
\sigma_1=\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad
\sigma_2=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad
\sigma_3=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$

它们和单位阵一起张成 $2\times2$ 的 Hermite 矩阵空间。复合系统用张量积，纠缠和 Bell 不等式就是第十章那套线性代数。
