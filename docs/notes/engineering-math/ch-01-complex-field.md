---
title: "复数域与复变函数"
description: "工程数学 · 复数域与复变函数"
---

# 复数域与复变函数

## 复数的定义

### 基本定义

复数通常表示为 $z = a + bi$ 的形式，其中：

- $\boldsymbol{a}$ 称为**实部** (Real part)，记作 $\re(z)$。

- $\boldsymbol{b}$ 称为**虚部** (Imaginary part)，记作 $\im(z)$。

- $\boldsymbol{i}$ 是**虚数单位**，满足方程 $i^2 = -1$。

> **备注 (Remark)** 一般来说，任意两个复数不能比较大小。

### 数集表示

在数学符号中，复数集用 $\mathbb{C}$ 表示。它包含了所有的实数（当 $b=0$ 时），也就是说实数集 $\mathbb{R}$ 是复数集 $\mathbb{C}$ 的子集：

$$
\mathbb{R} \subset \mathbb{C}
$$

## 复数的运算与复数集

- **共轭复数的定义：** 共轭复数的性质：$z \cdot \bar{z} = |z|^2$

- **复数的运算性质：**

  1.  **交换律：** $z_1 + z_2 = z_2 + z_1$，$z_1 z_2 = z_2 z_1$

  2.  **结合律：** $(z_1 + z_2) + z_3 = z_1 + (z_2 + z_3)$，$(z_1 z_2) z_3 = z_1 (z_2 z_3)$

  3.  **分配律：** $(z_1 + z_2) z_3 = z_1 z_3 + z_2 z_3$，$z_1 (z_2 + z_3) = z_1 z_2 + z_1 z_3$

  4.  $z + 0 = z = 0 + z$；$z + (-1)z = 0$，$1 \cdot z = z$，$0 \cdot z = 0$

  5.  $\bar{\bar{z}} = z$

  6.  $z + \bar{z} = 2 \re(z)$，$z - \bar{z} = 2i \im(z)$

  7.  $\overline{z_1 \pm z_2} = \bar{z}_1 \pm \bar{z}_2$，$\overline{z_1 \cdot z_2} = \bar{z}_1 \cdot \bar{z}_2$；$\overline{\left(\frac{z_1}{z_2}\right)} = \frac{\bar{z}_1}{\bar{z}_2}$

> **定理：共轭虚根定理** 若 $z$ 是实系数多项式方程

$$
C_0 z^n + C_1 z^{n-1} + C_2 z^{n-2} + \dots + C_{n-1} z + C_n = 0
$$

> 的根，其中 $n \in \mathbb{N}$，$C_k \in \mathbb{R}$ ($k=0, 1, \dots, n$)，$C_0 \neq 0$，则 $\bar{z}$ 也是该方程的根。

> **证明：** 对原方程两边取共轭：

$$
\overline{C_0 z^n + C_1 z^{n-1} + C_2 z^{n-2} + \dots + C_{n-1} z + C_n} = \bar{0}
$$

$$
\bar{C}_0 \bar{z}^n + \bar{C}_1 \bar{z}^{n-1} + \bar{C}_2 \bar{z}^{n-2} + \dots + \bar{C}_{n-1} \bar{z} + \bar{C}_n = 0
$$

> 又 $\because C_k = \bar{C}_k$（实数的共轭是其本身），以及 $\overline{z^n} = \bar{z}^n$，$\dots \bar{z}$ 满足原方程。

## 复数的几何表示

$z = x + iy$ 可以由一组有序实数 $(x, y) \in \mathbb{R}^2$ 唯一确定。

$\therefore z$ 与平面 $xOy$ 上点的全体具有一一对应关系。

于是，我们将 $x$ 轴定为**实轴**，$y$ 轴定为**虚轴**，两轴所在的平面定为**复平面**（或 $z$ 平面）。

### 性质与证明

> **复数的模与不等式性质** 设 $z = x + iy$，$z_k, w_k \in \mathbb{C}$：

> 1.  $|x| \le |z|$，$|y| \le |z|$，$|z| \le |x| + |y|$；

> 2.  $z\bar{z} = |z|^2 = |\bar{z}|^2$，$|z| = |\bar{z}|$；

> 3.  $|z_1 \cdots z_n| = |z_1| \cdots |z_n|$，$|z^n| = |z|^n$；

> 4.  $|z_1 + z_2| \le |z_1| + |z_2|$，$|z_1 - z_2| \ge ||z_1| - |z_2||$；

> 5.  $|z_1 + z_2|^2 + |z_1 - z_2|^2 = 2(|z_1|^2 + |z_2|^2)$；

> 6.  $\left|\sum_{k=1}^n z_k\right| \le \sum_{k=1}^n |z_k|$；

> 7.  **(Cauchy 不等式)** $\left|\sum_{k=1}^n z_k w_k\right|^2 \le \left(\sum_{k=1}^n |z_k|^2\right)\left(\sum_{k=1}^n |w_k|^2\right)$

#### 证明 (Pf)

**(1)** $|z| = \sqrt{x^2 + y^2}$ $|x| = \sqrt{x^2}$，$|y| = \sqrt{y^2}$

$\because y^2 \ge 0, x^2 \ge 0 \quad \therefore |z| \ge |x|, |z| \ge |y|$

$|z|^2 = x^2 + y^2$，$(|x| + |y|)^2 = x^2 + y^2 + 2|xy| \ge |z|^2 \quad \therefore |z| \le |x| + |y|$

**(2)** $z\bar{z} = (x + iy)(x - iy) = x^2 + y^2 = |z|^2$

**（7）** 对于任意复数 $\lambda$，有： $\sum_{k=1}^n |z_k - \lambda w_k|^2 \ge 0$

展开得：

$$
\sum |z_k|^2 - \lambda \sum \bar{z}_k w_k - \bar{\lambda} \sum z_k \bar{w}_k + |\lambda|^2 \sum |w_k|^2 \ge 0
$$

令 $\lambda = \dfrac{\sum z_k \bar{w}_k}{\sum |w_k|^2}$，代入化简得：

$$
\left( \sum_{k=1}^n |z_k|^2 \right) \left( \sum_{k=1}^n |w_k|^2 \right) \ge \left| \sum_{k=1}^n z_k \bar{w}_k \right|^2
$$

**证毕。**

### 复数的三角表达式

> **定义：复数的辐角** 对每一个非零的复数 $z = x + iy$，实轴的正向与表示 $z$ 的向量 $\vec{Oz}$ 的夹角 $\theta$ 称为复数的**辐角**，记作 $\theta = \Arg z$。

记 $r = |\vec{Oz}| = |z| > 0$，此时有 $\tan \theta = \frac{y}{x}$，$x = r \cos \theta$，$y = r \sin \theta$。

称 $z = r(\cos \theta + i\sin \theta) = |z|[\cos(\Arg z) + i\sin(\Arg z)]$ 为**复数的三角表达式**。

#### 复数主辐角 ($\argz z$) 的确定

$$
\argz z =
\begin{cases}
    \arctan \dfrac{y}{x}, & z \text{ 在第一、四象限内} \\
    \pi + \arctan \dfrac{y}{x}, & z \text{ 在第二象限内} \\
    -\pi + \arctan \dfrac{y}{x}, & z \text{ 在第三象限内} \\
    0, & z \text{ 在 } x \text{ 正半轴上} \\
    \dfrac{\pi}{2}, & z \text{ 在 } y \text{ 正半轴上} \\
    \pi, & z \text{ 在 } x \text{ 负半轴上} \\
    -\dfrac{\pi}{2}, & z \text{ 在 } y \text{ 负半轴上}
\end{cases}
$$

## 三维空间中的球面投影（黎曼球）

在三维空间中，取一个与复平面切于原点 $z=0$ 的半径为 $\frac{1}{2}$ 的球面：

$$
\xi^2 + \eta^2 + \left(\zeta - \frac{1}{2}\right)^2 = \left(\frac{1}{2}\right)^2
$$

- 记 $S(0, 0, 0)$ 为南极 $S$。

- 记 $N(0, 0, 1)$ 为北极 $N$。

对于复平面内任一点 $z(x, y, 0)$，若用直线连接 $z$ 和 $N$，则交球面于点 $P(\xi, \eta, \zeta)$。

$$
\frac{x}{\xi} = \frac{y}{\eta} = \frac{1}{1-\zeta}
$$

即 $\xi = (1-\zeta)x, \eta = (1-\zeta)y$。

代入得：

- $\xi = \dfrac{x}{x^2+y^2+1} = \dfrac{z+\bar{z}}{2(|z|^2+1)}$

- $\eta = \dfrac{y}{x^2+y^2+1} = \dfrac{z-\bar{z}}{2i(|z|^2+1)}$

- $\zeta = \dfrac{|z|^2}{|z|^2+1}$

### 无穷远点与四则运算

> **无穷远点的四则运算规则** 关于 $\infty$ 的四则运算如下：

> - $a + \infty = \infty + a = \infty$

> - $a - \infty = \infty - a = \infty \quad (a \neq \infty)$

> - $a \cdot \infty = \infty \cdot a = \infty \quad (a \neq 0, \infty)$

> - $\dfrac{a}{\infty} = 0, \quad \dfrac{\infty}{a} = \infty \quad (a \neq \infty)$

> - $\dfrac{a}{0} = \infty \quad (a \neq 0)$

## 复内积空间 $\mathbb{C}^n$

> - **定义**：设 $\vec{z}, \vec{w} \in \mathbb{C}^n$，内积定义为：

$$
  \langle \vec{z}, \vec{w} \rangle = \sum_{k=1}^{n} \bar{z}_k w_k
$$

> - **Cauchy 不等式**：$|\langle \vec{z}, \vec{w} \rangle| \le \|\vec{z}\| \|\vec{w}\|$

## 复数的 $n$ 次方根

$$
w_k = \sqrt[n]{|z|} \left[ \cos\left(\frac{\argz z + 2k\pi}{n}\right) + i\sin\left(\frac{\argz z + 2k\pi}{n}\right) \right], \quad k=0, 1, \dots, n-1
$$

**实例：**求 $\sqrt[5]{1-\sqrt{3}i}$

$$
1-\sqrt{3}i = 2\left[\cos\left(-\frac{\pi}{3}\right) + i\sin\left(-\frac{\pi}{3}\right)\right]
$$

$$
\sqrt[5]{2} \left[\cos\left(-\frac{\pi}{15} + \frac{2k\pi}{5}\right) + i\sin\left(-\frac{\pi}{15} + \frac{2k\pi}{5}\right)\right], \quad k=0,1,2,3,4
$$
