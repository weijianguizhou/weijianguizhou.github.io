---
title: 第四章 线性方程组
description: 高等代数 · 第四章 线性方程组
---

# 第四章 线性方程组

## 4.1 齐次方程组

$Ax=0$，$A\in K^{m\times n}$。解集 $N(A)=\ker A$ 是 $K^n$ 的子空间，叫解空间或零空间。它的维数是

$$
\dim N(A)=n-\operatorname{rank}A .
$$

这是秩-零度定理的矩阵版。求出基础解系 $\eta_1,\dots,\eta_{n-r}$，通解就是它们的任意线性组合。

具体算法：对 $A$ 做行变换化成行最简形，主元所在列对应主变量，其余是自由变量。让自由变量轮流取 $1$、其余取 $0$，回代得到基础解系。

## 4.2 非齐次方程组

$Ax=b$ 有解 $\iff$ $\operatorname{rank}(A)=\operatorname{rank}(A,b)$（Rouché-Capelli）。有解时若 $x_0$ 是一个特解，则通解是

$$
x=x_0+N(A)=\{x_0+\eta\mid A\eta=0\}.
$$

几何上就是解空间这个仿射子空间，方向由齐次解空间给出。

有解时解唯一的条件是 $\operatorname{rank}A=n$（列满秩），此时零空间只有零向量。

## 4.3 解的结构与四个基本子空间

对 $A\in K^{m\times n}$：

| 子空间 | 记号 | 定义 | 所在空间 | 维数 |
|---|---|---|---|---|
| 列空间 | $C(A)$ | $\{Ax\}$ | $K^m$ | $r$ |
| 行空间 | $R(A)$ | $\{A^{\mathsf T}y\}$ | $K^n$ | $r$ |
| 零空间 | $N(A)$ | $\{x:Ax=0\}$ | $K^n$ | $n-r$ |
| 左零空间 | $N(A^{\mathsf T})$ | $\{y:A^{\mathsf T}y=0\}$ | $K^m$ | $m-r$ |

在标准内积下，

$$
C(A)^\perp=N(A^{\mathsf T}),\qquad N(A)^\perp=R(A).
$$

证明是一行等价变换：$y\in N(A^{\mathsf T})\iff A^{\mathsf T}y=0\iff$ 对一切 $x$ 有 $y^{\mathsf T}Ax=0\iff y\perp C(A)$。

由此得到

$$
\dim C(A)+\dim N(A^{\mathsf T})=m,\qquad \dim R(A)+\dim N(A)=n .
$$

第一式其实是 $r+(m-r)=m$，第二式是 $r+(n-r)=n$。四个子空间按正交关系配成两对，两对的维数都等于 $r$，这就是线性代数里那张经典的正交分解图。

## 4.4 秩-零度定理

对线性映射 $T:V\to W$，

$$
\dim V=\dim\ker T+\dim\operatorname{im}T .
$$

证明是“扩基法”的标准套路。取 $\ker T$ 的基 $u_1,\dots,u_k$，扩充成 $V$ 的基 $u_1,\dots,u_k,v_1,\dots,v_{n-k}$。断言 $Tv_1,\dots,Tv_{n-k}$ 是 $\operatorname{im}T$ 的基。

生成：任意 $Tv$，把 $v$ 按基展开，$Tu_i=0$，只剩 $Tv_j$ 的组合。无关：若 $\sum\beta_jTv_j=0$，则 $\sum\beta_jv_j\in\ker T$，用 $u_i$ 表出，与基的线性无关性矛盾。

这条定理贯穿全书。矩阵情形是 $n=r+(n-r)$，微分方程情形是“通解 = 特解 + 齐次解”，积分方程里有 Fredholm 二择一，都是它。
