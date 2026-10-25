---
title: 附录 B 场论
description: 附录 B · 场的定义、空间导数（梯度/Hessian/雅可比）与场论三度
---

# 附录 B 场论

> 结合吴望一《流体力学》第一章、王成跃老师课堂所讲与谢树艺《矢量分析与场论》相关内容整理。

## 场的定义

::: definition 场
如果在全部空间或部分空间里的每一个点，都对应着某个物理量的一个确定的值，就说在这空间里确定了该物理量的一个场。
- 该物理量为标量，则为**标量场**，记作 $g(x_1,x_2,x_3;t)$；
- 该物理量为矢量，则为**矢量场**，记作 $\boldsymbol{f}(x_1,x_2,x_3;t)$；
- 该物理量为张量，则为**张量场**，记作 $\boldsymbol{T}(x_1,x_2,x_3;t)$。
:::

## 空间导数

### 1.标量函数的偏导数

设 $g=g(x_1,x_2,x_3)$。一阶偏导数就是梯度的分量：

$$
\frac{\partial g}{\partial x_i}=\left(\nabla g\right)_i,\qquad
\nabla g=\frac{\partial g}{\partial x_1}\boldsymbol{e}_1+\frac{\partial g}{\partial x_2}\boldsymbol{e}_2+\frac{\partial g}{\partial x_3}\boldsymbol{e}_3
$$

二阶偏导数排成 Hessian 矩阵：

$$
\frac{\partial^{2} g}{\partial x_{i} \partial x_{j}}
=\begin{bmatrix}
\dfrac{\partial^{2} g}{\partial x_{1}^{2}} & \dfrac{\partial^{2} g}{\partial x_{1} \partial x_{2}} & \dfrac{\partial^{2} g}{\partial x_{1} \partial x_{3}}\\[3mm]
\dfrac{\partial^{2} g}{\partial x_{2} \partial x_{1}} & \dfrac{\partial^{2} g}{\partial x_{2}^{2}} & \dfrac{\partial^{2} g}{\partial x_{2} \partial x_{3}}\\[3mm]
\dfrac{\partial^{2} g}{\partial x_{3} \partial x_{1}} & \dfrac{\partial^{2} g}{\partial x_{3} \partial x_{2}} & \dfrac{\partial^{2} g}{\partial x_{3}^{2}}
\end{bmatrix}
$$

### 2. Taylor 展开

$$
g(\boldsymbol{x}+\Delta\boldsymbol{x})
=g(\boldsymbol{x})+\frac{\partial g}{\partial x_{i}}\Delta x_{i}
+\frac{1}{2}\frac{\partial^{2} g}{\partial x_{i} \partial x_{j}}\Delta x_{i}\Delta x_{j}+\cdots
$$

$$
\mathrm{d}g=\frac{\partial g}{\partial x_{i}}\mathrm{d}x_{i}
$$

### 3. 矢量函数的偏导数（雅可比矩阵）

设有矢量函数 $\boldsymbol{f}=f_{1}\boldsymbol{e}_{1}+f_{2}\boldsymbol{e}_{2}+f_{3}\boldsymbol{e}_{3}$，它对坐标的偏导数构成雅可比矩阵：

$$
\frac{\partial f_{j}}{\partial x_{i}}
=\begin{bmatrix}
\dfrac{\partial f_{1}}{\partial x_{1}} & \dfrac{\partial f_{2}}{\partial x_{1}} & \dfrac{\partial f_{3}}{\partial x_{1}}\\[3mm]
\dfrac{\partial f_{1}}{\partial x_{2}} & \dfrac{\partial f_{2}}{\partial x_{2}} & \dfrac{\partial f_{3}}{\partial x_{2}}\\[3mm]
\dfrac{\partial f_{1}}{\partial x_{3}} & \dfrac{\partial f_{2}}{\partial x_{3}} & \dfrac{\partial f_{3}}{\partial x_{3}}
\end{bmatrix}
$$

它的迹（对角元之和）就是散度：

$$
\frac{\partial f_{i}}{\partial x_{i}}
=\frac{\partial f_{1}}{\partial x_{1}}+\frac{\partial f_{2}}{\partial x_{2}}+\frac{\partial f_{3}}{\partial x_{3}}
=\nabla\cdot\boldsymbol{f}
$$

全微分为

$$
\mathrm{d}f_{j}=\frac{\partial f_{j}}{\partial x_{i}}\mathrm{d}x_{i}
$$

## 微分算子

### 1. 哈密顿算子 ∇

$$
\nabla=\boldsymbol{e}_{i}\frac{\partial}{\partial x_{i}}
$$

该算子具有**向量**和**微分算子**的双重属性：先按向量作乘积运算，再对乘积中位于其后的量作微分运算。

### 2. 拉普拉斯算子 Δ

$$
\Delta=\frac{\partial^{2}}{\partial x_{i}\partial x_{i}}=\nabla\cdot\nabla
$$

## 场论三度

### 1. 梯度

$$
\operatorname{grad}\varphi
=\frac{\partial\varphi}{\partial x_{1}}\boldsymbol{e}_{1}
+\frac{\partial\varphi}{\partial x_{2}}\boldsymbol{e}_{2}
+\frac{\partial\varphi}{\partial x_{3}}\boldsymbol{e}_{3}
=\nabla\varphi,\qquad(\nabla\varphi)_{i}=\frac{\partial\varphi}{\partial x_{i}}
$$

**梯度是标量场不均匀性的度量。** 它的性质：

1. 梯度方向沿**等值面**的法线方向，且指向 $\varphi$ 增大的方向；
2. 任一方向 $\boldsymbol{s}$ 上的方向导数为 $\nabla\varphi\cdot\boldsymbol{s}$（$\boldsymbol{s}$ 为单位向量）；
3. 梯度方向是 $\varphi$ 变化最快的方向；
4. $\mathrm{d}\varphi=\mathrm{d}\boldsymbol{r}\cdot\nabla\varphi$；
5. 若 $\boldsymbol{a}=\nabla\varphi$，且 $\varphi$ 是场点的单值函数，则沿任一封闭曲线 $L$ 有 $\oint_{L}\boldsymbol{a}\cdot\mathrm{d}\boldsymbol{r}=0$。

### 2. 散度

$$
\operatorname{div}\boldsymbol{a}=\nabla\cdot\boldsymbol{a}=\frac{\partial a_{i}}{\partial x_{i}}
$$

对张量场 $\boldsymbol{T}$：

$$
\nabla\cdot\boldsymbol{T}:\qquad(\nabla\cdot\boldsymbol{T})_{k}=\frac{\partial T_{jk}}{\partial x_{j}}
$$

### 3. 旋度

$$
\nabla\times\boldsymbol{a}=\varepsilon_{ijk}\frac{\partial a_{j}}{\partial x_{i}}\boldsymbol{e}_{k},
\qquad(\nabla\times\boldsymbol{a})_{k}=\varepsilon_{ijk}\frac{\partial a_{j}}{\partial x_{i}}
$$

## 例题

对流项与并矢的散度，用乘积法则展开：

$$
\left(\boldsymbol{V}\cdot\nabla\boldsymbol{V}\right)_{j}
=V_{i}\frac{\partial}{\partial x_{i}}V_{j}=V_{i}\frac{\partial V_{j}}{\partial x_{i}}
$$

$$
\begin{aligned}
\left[\nabla\cdot\left(\boldsymbol{V}\boldsymbol{V}\right)\right]_{j}
&=\frac{\partial}{\partial x_{i}}\left(V_{i}V_{j}\right)\\
&=V_{i}\frac{\partial V_{j}}{\partial x_{i}}+V_{j}\frac{\partial V_{i}}{\partial x_{i}}\\
&=\left(\boldsymbol{V}\cdot\nabla\boldsymbol{V}\right)_{j}+V_{j}\left(\nabla\cdot\boldsymbol{V}\right)
\end{aligned}
$$
