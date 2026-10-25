---
title: 第三章 矩阵
description: 高等代数 · 第三章 矩阵
---

# 第三章 矩阵

## 3.1 基本运算

矩阵加法、数乘逐元素进行。乘法是

$$
(AB)_{ij}=\sum_k a_{ik}b_{kj}.
$$

矩阵乘法不交换，但满足结合律和对加法的分配律。$AB=0$ 推不出 $A=0$ 或 $B=0$，这是和数的最大差别。

转置满足 $(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}$，注意反序。对称矩阵 $A^{\mathsf T}=A$，反对称矩阵 $A^{\mathsf T}=-A$。任何方阵都能拆成对称与反对称之和：

$$
A=\frac{A+A^{\mathsf T}}{2}+\frac{A-A^{\mathsf T}}{2}.
$$

迹 $\operatorname{tr}A=\sum a_{ii}$，满足 $\operatorname{tr}(AB)=\operatorname{tr}(BA)$，更一般地 $\operatorname{tr}(ABC)=\operatorname{tr}(BCA)$，但不满足 $\operatorname{tr}(ABC)=\operatorname{tr}(ACB)$。证明就是交换求和次序：

$$
\operatorname{tr}(AB)=\sum_i\sum_k a_{ik}b_{ki}=\sum_k\sum_i b_{ki}a_{ik}=\operatorname{tr}(BA).
$$

## 3.2 初等变换与初等矩阵

三类初等行变换对应三类初等矩阵（对单位阵做同样的变换得到）：

| 变换 | 矩阵 | 行列式 | 逆 |
|---|---|---|---|
| 交换 $i,j$ 行 | $E_{ij}$ | $-1$ | $E_{ij}$ |
| 第 $i$ 行乘 $k\ne0$ | $E_i(k)$ | $k$ | $E_i(1/k)$ |
| 第 $i$ 行加 $k$ 倍第 $j$ 行 | $E_{ij}(k)$ | $1$ | $E_{ij}(-k)$ |

左乘初等矩阵等于做行变换，右乘等于做列变换。这一点在求逆、解矩阵方程、化标准形时反复用到。

任何矩阵经过初等变换可以化成等价标准形

$$
\begin{pmatrix}I_r&0\\0&0\end{pmatrix},
$$

$r$ 就是秩。于是 $A$ 可逆 $\iff$ $A$ 是若干初等矩阵之积。

## 3.3 秩

秩有三种等价说法：最高阶非零子式的阶数；行向量组的秩；列向量组的秩。三者相等不是显然的，证明通常用消元：行变换不改变行空间，也不改变列向量之间的线性关系，化成阶梯形后主元个数同时是行秩和列秩。

常用不等式：

$$
\operatorname{rank}(AB)\le\min\{\operatorname{rank}A,\operatorname{rank}B\},
$$

$$
\operatorname{rank}(A+B)\le\operatorname{rank}A+\operatorname{rank}B,
$$

Sylvester 不等式：

$$
\operatorname{rank}(AB)\ge\operatorname{rank}A+\operatorname{rank}B-n\quad(A\in K^{m\times n},B\in K^{n\times p}).
$$

Frobenius 不等式：

$$
\operatorname{rank}(ABC)\ge\operatorname{rank}(AB)+\operatorname{rank}(BC)-\operatorname{rank}B .
$$

前两个用“像的维数不超过定义域维数”“像空间被两个像空间张成”就能证。Sylvester 用线性映射 $B$ 在 $\operatorname{im}A$ 上的限制：$\dim\ker(AB)\le\dim\ker B+\dim\ker A$，整理即得。

秩为 $1$ 的矩阵都能写成 $uv^{\mathsf T}$，它的平方的迹给出 $(u^{\mathsf T}v)^2$，这类分解在计算 $A^n$ 时很省事。

## 3.4 分块矩阵

分块乘法只要保证块尺寸匹配，规则和普通乘法一样，但块的顺序不能换。

分块求逆：

$$
\begin{pmatrix}A&B\\0&D\end{pmatrix}^{-1}=
\begin{pmatrix}A^{-1}&-A^{-1}BD^{-1}\\0&D^{-1}\end{pmatrix},
$$

$$
\begin{pmatrix}A&B\\C&D\end{pmatrix}^{-1}
=
\begin{pmatrix}
(A-BD^{-1}C)^{-1}&-(A-BD^{-1}C)^{-1}BD^{-1}\\
-D^{-1}C(A-BD^{-1}C)^{-1}&D^{-1}+D^{-1}C(A-BD^{-1}C)^{-1}BD^{-1}
\end{pmatrix}.
$$

第二个式子不用背，用分块消元现推。关键是两个 Schur 补 $A-BD^{-1}C$ 和 $D-CA^{-1}B$。

分块对角阵的行列式、秩、幂都按块算。准对角矩阵的幂等于各块幂的直和，这是后面 Jordan 形计算的基础。

## 3.5 LU 分解

若 $A$ 的前 $n-1$ 个顺序主子式都不为零，则存在唯一的单位下三角 $L$ 和上三角 $U$ 使 $A=LU$。

推导：Gauss 消元的第 $k$ 步等价于左乘一个单位下三角矩阵 $L_k$（对角线下第 $k$ 列记录倍加系数）。消元结束

$$
L_{n-1}\cdots L_1A=U,
$$

于是 $A=L_1^{-1}\cdots L_{n-1}^{-1}U$。每个 $L_k^{-1}$ 仍是单位下三角，乘积也是。并且 $L$ 的第 $k$ 列刚好是第 $k$ 步倍加系数的相反数，可以直接从消元过程抄下来。

需要选主元时就是 $PA=LU$，$P$ 是置换矩阵。数值计算里几乎总要选主元，否则一个小主元会把误差放大。

## 3.6 矩阵方程

$AX=B$ 有解 $\iff$ $\operatorname{rank}(A)=\operatorname{rank}(A,B)$。有解时通解是 $X=X_0+Y$，$Y$ 取遍齐次方程 $AY=0$ 的解。

$A$ 可逆时 $X=A^{-1}B$，但实际计算用增广矩阵 $[A\mid B]$ 做行变换更稳。
