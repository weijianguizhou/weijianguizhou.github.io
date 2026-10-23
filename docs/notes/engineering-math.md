---
title: 工程数学
description: 工程数学课程完整笔记：复变函数、积分变换与场论（已学完）
---

# 工程数学

复变函数、级数、留数、积分变换与场论，一页读完。

::: tip 原稿 PDF
同一份笔记的 PDF 版：[工程数学.pdf](/notes/engineering-math.pdf)
:::

想记录一下以后学习科研中会经常碰到的数学知识。

就想着不那么严密了。因为我的数学分析学的不是很好。知道什么情况下能用就行。

本笔记整理自课堂讲授与参考教材，内容覆盖复变函数、级数、留数、积分变换与场论等核心章节。记号约定见绪论中的符号说明。

## 符号说明

本书采用如下记号约定：

| 符号                   | 含义                 |
|:-----------------------|:---------------------|
| $z$                  | 复数，$z = x + iy$ |
| $\Arg z$             | 辐角主值             |
| $\arg z$             | 辐角                 |
| $|z|$                | 复数的模             |
| $\bar{z}$            | 共轭复数             |
| $e^z$,  $\ln z$    | 指数函数 / 对数函数  |
| $\oint$,  $\oiint$ | 回路积分 / 面积分    |
| $\mathcal{F}$        | Fourier 变换         |
| $\mathcal{L}$        | Laplace 变换         |
| $\mathcal{Z}$        | $Z$ 变换           |

符号说明

## 复数域与复变函数

### 复数的定义

#### 基本定义

复数通常表示为 $z = a + bi$ 的形式，其中：

- $\boldsymbol{a}$ 称为**实部** (Real part)，记作 $\re(z)$。

- $\boldsymbol{b}$ 称为**虚部** (Imaginary part)，记作 $\im(z)$。

- $\boldsymbol{i}$ 是**虚数单位**，满足方程 $i^2 = -1$。

>   
> **备注 (Remark)** 一般来说，任意两个复数不能比较大小。

#### 数集表示

在数学符号中，复数集用 $\mathbb{C}$ 表示。它包含了所有的实数（当 $b=0$ 时），也就是说实数集 $\mathbb{R}$ 是复数集 $\mathbb{C}$ 的子集：
$$
\mathbb{R} \subset \mathbb{C}
$$

### 复数的运算与复数集

- **共轭复数的定义：** 共轭复数的性质：$z \cdot \bar{z} = |z|^2$

- **复数的运算性质：**

  1.  **交换律：** $z_1 + z_2 = z_2 + z_1$，$z_1 z_2 = z_2 z_1$

  2.  **结合律：** $(z_1 + z_2) + z_3 = z_1 + (z_2 + z_3)$，$(z_1 z_2) z_3 = z_1 (z_2 z_3)$

  3.  **分配律：** $(z_1 + z_2) z_3 = z_1 z_3 + z_2 z_3$，$z_1 (z_2 + z_3) = z_1 z_2 + z_1 z_3$

  4.  $z + 0 = z = 0 + z$；$z + (-1)z = 0$，$1 \cdot z = z$，$0 \cdot z = 0$

  5.  $\bar{\bar{z}} = z$

  6.  $z + \bar{z} = 2 \re(z)$，$z - \bar{z} = 2i \im(z)$

  7.  $\overline{z_1 \pm z_2} = \bar{z}_1 \pm \bar{z}_2$，$\overline{z_1 \cdot z_2} = \bar{z}_1 \cdot \bar{z}_2$；$\overline{\left(\frac{z_1}{z_2}\right)} = \frac{\bar{z}_1}{\bar{z}_2}$

>   
> **定理：共轭虚根定理** 若 $z$ 是实系数多项式方程
$$
C_0 z^n + C_1 z^{n-1} + C_2 z^{n-2} + \dots + C_{n-1} z + C_n = 0
$$
> 的根，其中 $n \in \mathbb{N}$，$C_k \in \mathbb{R}$ ($k=0, 1, \dots, n$)，$C_0 \neq 0$，则 $\bar{z}$ 也是该方程的根。
>
> **证明：** 对原方程两边取共轭：
$$
\overline{C_0 z^n + C_1 z^{n-1} + C_2 z^{n-2} + \dots + C_{n-1} z + C_n} = \bar{0}
$$
$$
\bar{C}_0 \bar{z}^n + \bar{C}_1 \bar{z}^{n-1} + \bar{C}_2 \bar{z}^{n-2} + \dots + \bar{C}_{n-1} \bar{z} + \bar{C}_n = 0
$$
> 又 $\because C_k = \bar{C}_k$（实数的共轭是其本身），以及 $\overline{z^n} = \bar{z}^n$，$\dots \bar{z}$ 满足原方程。

### 复数的几何表示

$z = x + iy$ 可以由一组有序实数 $(x, y) \in \mathbb{R}^2$ 唯一确定。

$\therefore z$ 与平面 $xOy$ 上点的全体具有一一对应关系。

于是，我们将 $x$ 轴定为**实轴**，$y$ 轴定为**虚轴**，两轴所在的平面定为**复平面**（或 $z$ 平面）。

#### 性质与证明

>   
> **复数的模与不等式性质** 设 $z = x + iy$，$z_k, w_k \in \mathbb{C}$：
>
> 1.  $|x| \le |z|$，$|y| \le |z|$，$|z| \le |x| + |y|$；
>
> 2.  $z\bar{z} = |z|^2 = |\bar{z}|^2$，$|z| = |\bar{z}|$；
>
> 3.  $|z_1 \cdots z_n| = |z_1| \cdots |z_n|$，$|z^n| = |z|^n$；
>
> 4.  $|z_1 + z_2| \le |z_1| + |z_2|$，$|z_1 - z_2| \ge ||z_1| - |z_2||$；
>
> 5.  $|z_1 + z_2|^2 + |z_1 - z_2|^2 = 2(|z_1|^2 + |z_2|^2)$；
>
> 6.  $\left|\sum_{k=1}^n z_k\right| \le \sum_{k=1}^n |z_k|$；
>
> 7.  **(Cauchy 不等式)** $\left|\sum_{k=1}^n z_k w_k\right|^2 \le \left(\sum_{k=1}^n |z_k|^2\right)\left(\sum_{k=1}^n |w_k|^2\right)$

##### 证明 (Pf)

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

#### 复数的三角表达式

>   
> **定义：复数的辐角** 对每一个非零的复数 $z = x + iy$，实轴的正向与表示 $z$ 的向量 $\vec{Oz}$ 的夹角 $\theta$ 称为复数的**辐角**，记作 $\theta = \Arg z$。

记 $r = |\vec{Oz}| = |z| > 0$，此时有 $\tan \theta = \frac{y}{x}$，$x = r \cos \theta$，$y = r \sin \theta$。

称 $z = r(\cos \theta + i\sin \theta) = |z|[\cos(\Arg z) + i\sin(\Arg z)]$ 为**复数的三角表达式**。

##### 复数主辐角 ($\argz z$) 的确定

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

### 三维空间中的球面投影（黎曼球）

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

#### 无穷远点与四则运算

>   
> **无穷远点的四则运算规则** 关于 $\infty$ 的四则运算如下：
>
> - $a + \infty = \infty + a = \infty$
>
> - $a - \infty = \infty - a = \infty \quad (a \neq \infty)$
>
> - $a \cdot \infty = \infty \cdot a = \infty \quad (a \neq 0, \infty)$
>
> - $\dfrac{a}{\infty} = 0, \quad \dfrac{\infty}{a} = \infty \quad (a \neq \infty)$
>
> - $\dfrac{a}{0} = \infty \quad (a \neq 0)$

### 复内积空间 $\mathbb{C}^n$

> - **定义**：设 $\vec{z}, \vec{w} \in \mathbb{C}^n$，内积定义为：
$$
  \langle \vec{z}, \vec{w} \rangle = \sum_{k=1}^{n} \bar{z}_k w_k
$$
>
> - **Cauchy 不等式**：$|\langle \vec{z}, \vec{w} \rangle| \le \|\vec{z}\| \|\vec{w}\|$

### 复数的 $n$ 次方根

> 
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

## 复变函数基础

### 实数域到复数域的扩充

从实数域 $\mathbb{R}$ 到复数域 $\mathbb{C}$ 的扩充，是为了使代数方程总有解、使开方、指数、三角函数等运算在更大范围内封闭。

#### 扩充动机

实数域中，方程
$$
x^2 + 1 = 0
$$
无解。为使这类方程有解，引入虚数单位 $i$，满足
$$
i^2 = -1.
$$

#### 扩充步骤

>   
> **复数的定义** 1. 引入符号 $i$，定义 $i^2 = -1$。
>
> 2\. 定义复数为 $z = x + iy$，其中 $x,y\in\mathbb{R}$。
>
> 3\. 规定复数的加法与乘法运算满足交换律、结合律、分配律。
>
> 4\. 当 $y=0$ 时，$z = x$，即实数是复数的特例。
>
> 5\. 当 $x=0$ 时，$z = iy$ 为纯虚数。

#### 扩充后的封闭性

>   
> **复数域的封闭性** 扩充后的复数域 $\mathbb{C}$ 具有以下重要性质：
>
> 1.  复数域是**代数闭域**：任意次数的复系数多项式方程在 $\mathbb{C}$ 内必有根。
>
> 2.  加、减、乘、除（除数非零）运算封闭。
>
> 3.  开方、指数、对数、三角函数、反三角函数均可合理定义。

### 定义与性质

>   
> **复变函数定义** 复变函数是定义在复数集上的函数，记为
$$
w = f(z),
$$
> 其中 $z\in\mathbb{C}$ 为复自变量，$w\in\mathbb{C}$ 为复因变量。
>
> 将 $z=x+iy$，$w=u+iv$ 代入，则复变函数可表示为
$$
f(z) = u(x,y) + i\,v(x,y),
$$
> 即一个复变函数等价于**两个二元实变函数的有序组合**。

### 初等函数

#### 指数函数

> 复指数函数定义为
$$
e^z = e^{x+iy} = e^x(\cos y + i\sin y),
$$
> 满足：
>
> - 周期性：周期为 $2\pi i$；
>
> - $e^{z_1+z_2}=e^{z_1}e^{z_2}$；
>
> - $|e^z|=e^x>0$。

#### 对数函数

> 复对数函数是指数函数的反函数，定义为多值函数：
$$
\ln z = \ln|z| + i\left(\arg z + 2k\pi\right),\quad k\in\mathbb{Z}.
$$
> 主值分支为
$$
\mathrm{Ln}\,z = \ln|z| + i\mathrm{Arg}\,z.
$$

#### 三角函数

> 由欧拉公式定义复三角函数：
$$
\cos z = \frac{e^{iz} + e^{-iz}}{2},\quad \sin z = \frac{e^{iz} - e^{-iz}}{2i}.
$$
> 性质：
>
> - 周期仍为 $2\pi$；
>
> - 在复平面上**无界**；
>
> - 实三角函数公式全部形式保留。

#### 反三角函数

> 以反正弦函数为例，由 $\sin w = z$ 解出：
$$
\arcsin z = -i \ln\left(iz + \sqrt{1-z^2}\right).
$$

#### 一般幂函数 $z^b$

> 利用复对数统一定义：
$$
z^b = e^{b\ln z}.
$$

## 解析函数

### 复变函数的极限

设函数 $w=f(z)=u(x,y)+iv(x,y)$ 在 $z_0=x_0+iy_0$ 的去心邻域内有定义，$A=a+ib$ 为复常数。若对任意 $\varepsilon>0$，存在 $\delta>0$，使得当
$$
0<|z-z_0|<\delta
$$
时，有
$$
|f(z)-A|<\varepsilon,
$$
则称 $A$ 为 $f(z)$ 当 $z\to z_0$ 时的极限，记作
$$
\lim_{z\to z_0}f(z)=A.
$$

#### 极限存在的充要条件

复变函数极限存在等价于其实部和虚部的极限同时存在：
$$
\lim_{z\to z_0}f(z)=A\iff
    \lim_{(x,y)\to(x_0,y_0)}u(x,y)=a,\quad
    \lim_{(x,y)\to(x_0,y_0)}v(x,y)=b.
$$

#### 极限运算法则

若 $\lim\limits_{z\to z_0}f(z)=A$，$\lim\limits_{z\to z_0}g(z)=B$，则

1.  $\lim\limits_{z\to z_0}[f(z)\pm g(z)]=A\pm B$;

2.  $\lim\limits_{z\to z_0}[f(z)\cdot g(z)]=AB$;

3.  $\lim\limits_{z\to z_0}\dfrac{f(z)}{g(z)}=\dfrac{A}{B}\ (B\neq 0)$.

### 复变函数的连续性

>   
> **定义：复变函数的连续性** 若 $\lim\limits_{z\to z_0}f(z)=f(z_0)$，则称 $f(z)$ 在 $z_0$ 处**连续**。

#### 连续的充要条件

$$
f(z)\ \text{在}\ z_0\ \text{连续}
    \iff
    u(x,y),\ v(x,y)\ \text{在}\ (x_0,y_0)\ \text{处均连续}.
$$

#### 连续函数的运算性质

1.  连续函数的和、差、积、商（分母非零）仍连续；

2.  连续函数的复合函数仍连续；

3.  有界闭域上的连续函数必有界、可取到最值。

### 复变函数的导数

>   
> **定义：复变函数的导数** 设函数 $w=f(z)$ 在 $z_0$ 的邻域内有定义。若极限
$$
\lim_{\Delta z\to 0}\frac{\Delta w}{\Delta z}
        =\lim_{\Delta z\to 0}\frac{f(z_0+\Delta z)-f(z_0)}{\Delta z}
$$
> 存在且有限，则称 $f(z)$ 在 $z_0$ 处**可导**，该极限称为 $f(z)$ 在 $z_0$ 处的导数，记作
$$
f'(z_0)=\left.\frac{\mathrm{d}w}{\mathrm{d}z}\right|_{z=z_0}.
$$

#### 可导的必要条件：连续

若 $f(z)$ 在 $z_0$ 可导，则 $f(z)$ 必在 $z_0$ 连续。
$$
\lim_{\Delta z\to0}\big[f(z_0+\Delta z)-f(z_0)\big]
    =\lim_{\Delta z\to0}\frac{f(z_0+\Delta z)-f(z_0)}{\Delta z}\cdot\Delta z
    =f'(z_0)\cdot 0=0.
$$

### 柯西—黎曼方程（C-R 方程）

设 $f(z)=u(x,y)+iv(x,y)$，$z=x+iy$。

>   
> **定理：柯西—黎曼方程 (C-R 方程)** $f(z)$ 在 $z$ 处可导的必要条件是 $u,v$ 可微且满足
$$
\frac{\partial u}{\partial x}=\frac{\partial v}{\partial y},\qquad
        \frac{\partial u}{\partial y}=-\frac{\partial v}{\partial x}.
$$
> 若 $u,v$ 一阶偏导连续且满足 C-R 方程，则 $f(z)$ 可导。

#### 推导思路

令 $\Delta z=\Delta x+i\Delta y$，分别沿实轴、虚轴取极限，令两者相等即得 C-R 方程。

#### 导数计算公式

$$
f'(z)=\frac{\partial u}{\partial x}+i\frac{\partial v}{\partial x}
    =\frac{\partial v}{\partial y}-i\frac{\partial u}{\partial y}.
$$

### 解析函数

>   
> **定义：解析函数** 若 $f(z)$ 在 $z_0$ 及其某一邻域内**处处可导**，则称 $f(z)$ 在 $z_0$ 处**解析**。
>
> 若 $f(z)$ 在区域 $D$ 内每一点都解析，则称 $f(z)$ 是 $D$ 内的**解析函数**。

#### 可导与解析的区别

> - **可导**：只要求在一点存在导数；
>
> - **解析**：要求在一点及其邻域内都可导，条件更强。

#### 解析的充要条件

$f(z)=u+iv$ 在区域 $D$ 内解析 $\iff$

1.  $u(x,y),\ v(x,y)$ 在 $D$ 内可微；

2.  $u,v$ 在 $D$ 内处处满足 C-R 方程。

### 调和函数

>   
> **定义：调和函数** 若二元实函数 $u(x,y)$ 在区域 $D$ 内具有二阶连续偏导数，且满足拉普拉斯方程
$$
\Delta u=\frac{\partial^2 u}{\partial x^2}+\frac{\partial^2 u}{\partial y^2}=0,
$$
> 则称 $u$ 为 $D$ 内的**调和函数**。

#### 解析函数与调和函数的关系

>   
> **定理：解析函数与调和函数** 若 $f(z)=u+iv$ 在区域 $D$ 内解析，则 $u,v$ 都是 $D$ 内的调和函数。

**推导：** 由解析性知 C-R 方程成立：
$$
u_x=v_y,\quad u_y=-v_x.
$$
分别对两式求导：
$$
u_{xx}=v_{yx},\quad u_{yy}=-v_{xy}.
$$
由二阶偏导连续，$v_{yx}=v_{xy}$，故
$$
u_{xx}+u_{yy}=0.
$$
同理可证 $v_{xx}+v_{yy}=0$。

#### 共轭调和函数

>   
> **定义：共轭调和函数** 设 $u,v$ 均为调和函数，且满足 C-R 方程，则称 $v$ 为 $u$ 的**共轭调和函数**。

若 $f(z)=u+iv$ 解析，则 $v$ 是 $u$ 的共轭调和函数。已知 $u$ 可通过 C-R 方程求出 $v$，从而构造解析函数。

## 共形映射 (Conformal Mapping)

### 几何意义

解析函数在导数不为零的点处具有两个重要的局部几何性质：

- **保角性**：设曲线 $C_1,C_2$ 在点 $z_0$ 相交，夹角为 $\theta$。映射 $w=f(z)$ 将 $C_1,C_2$ 映为 $\Gamma_1,\Gamma_2$，它们在 $w_0=f(z_0)$ 处的夹角仍为 $\theta$，且旋转方向保持不变。其原因是
$$
  \operatorname{Arg} f'(z_0) = \lim_{\Delta z\to 0}\bigl[\operatorname{Arg}\Delta w - \operatorname{Arg}\Delta z\bigr],
$$
  即映射后的切向量相对于原切向量旋转了 $\operatorname{Arg} f'(z_0)$，该旋转角对所有经过 $z_0$ 的曲线均相同，故称**旋转角不变性**。

- **伸缩率不变性**：微小线段在映射前后的长度比近似为常数 $|f'(z_0)|$，与线段方向无关。即
$$
  |f'(z_0)| = \lim_{\Delta z\to 0}\frac{|\Delta w|}{|\Delta z|}.
$$

>   
> **例** 设 $w = f(z) = z^2 + 2z$，求在点 $z_0 = 1+i$ 处的旋转角与伸缩率。

>   
> **解** $f'(z) = 2z + 2$，故 $f'(1+i) = 2(1+i)+2 = 4+2i$。 旋转角为 $\operatorname{Arg}(4+2i) = \arctan\frac{2}{4} = \arctan 0.5$。 伸缩率为 $|f'(1+i)| = \sqrt{4^2+2^2} = 2\sqrt{5}$。

### 共形映射的定义

>   
> **定义** 若 $w = f(z)$ 在区域 $D$ 内处处解析、且对任意 $z_0 \in D$ 有 $f'(z_0) \neq 0$，则称该映射在 $D$ 内是**共形的**（或称第一类共形映射，保持夹角大小和方向）。

#### 扩充复平面上的共形性

针对扩充复平面 $\mathbb{C}^* = \mathbb{C}\cup\{\infty\}$，可利用倒数变换将无穷远点转化为有限点，从而定义共形性：

- **情形 I**：$w = f(z)$ 将 $z = z_0 (\neq \infty)$ 映成 $w = \infty$。  
  令 $\zeta = \dfrac{1}{w}$。若 $\zeta = \dfrac{1}{f(z)}$ 在 $z = z_0$ 处共形，则称原映射在 $z = z_0$ 处共形。

- **情形 II**：$w = f(z)$ 将 $z = \infty$ 映成 $w = w_0 (\neq \infty)$。  
  令 $\eta = \dfrac{1}{z}$。若 $w = f\!\left(\dfrac{1}{\eta}\right)$ 在 $\eta = 0$ 处共形，则称原映射在 $z = \infty$ 处共形。

- **情形 III**：$w = f(z)$ 将 $z = \infty$ 映成 $w = \infty$。  
  令 $\eta = \dfrac{1}{z},\ \zeta = \dfrac{1}{w}$。若 $\zeta = \dfrac{1}{f(1/\eta)}$ 在 $\eta = 0$ 处共形，则称原映射在 $z = \infty$ 处共形。

>   
> **定理** 分式线性映射在扩充复平面上是一一的，且处处具有**保角性**。

### 分式线性映射

分式线性映射（Möbius 变换）的一般形式为
$$
w = \frac{az+b}{cz+d}, \quad ad - bc \neq 0.
$$
它可以分解为以下三种基本变换的复合：

1.  **平移**：$z \mapsto z + b$

2.  **旋转与伸缩**：$z \mapsto az$（$a \neq 0$）

3.  **反演**：$z \mapsto \dfrac{1}{z}$

公式分解：
$$
w = \frac{a}{c} - \frac{ad-bc}{c} \cdot \frac{1}{cz+d} \quad (c \neq 0).
$$

>   
> **例** 将分式线性映射 $w = \dfrac{2z+3}{z-1}$ 分解为基本变换的复合。

>   
> **解**
$$
w = \frac{2z+3}{z-1} = 2 + \frac{5}{z-1}.
$$
> 因此变换可分解为：$z \mapsto z-1$（平移），$\mapsto \dfrac{1}{z-1}$（反演），$\mapsto \dfrac{5}{z-1}$（伸缩），$\mapsto \dfrac{5}{z-1}+2$（平移）。

### 保圆性与对称点

#### 对称点引理

>   
> **引理** 设 $C$ 是以 $z_0$ 为心、$R$ 为半径的圆周。两点 $z_1, z_2$ 关于 $C$ 对称的充要条件是：过 $z_1, z_2$ 的任意圆周（或直线）均与 $C$ 正交。

**代数刻画**：$z_1,z_2$ 关于圆周 $C: |z - z_0| = R$ 对称 $\iff$ $(z_1 - z_0)\overline{(z_2 - z_0)} = R^2$，或当 $C$ 为实轴（半径为无穷大的圆周）时，$z_2 = \overline{z_1}$。

>   
> **定理** 设 $w = f(z)$ 是分式线性映射，$C$ 为扩充复平面上的圆周。若 $z_1,z_2$ 关于 $C$ 对称，则 $w_1 = f(z_1),\ w_2 = f(z_2)$ 关于 $f(C)$ 也对称。

#### 保圆性 (Circle-Preserving Property)

>   
> **定义** 若一个映射将扩充复平面上的圆周（包括直线，视为过 $\infty$ 的圆周）映为圆周，则称它具有**保圆性**。

以反演映射 $w = \dfrac{1}{z}$ 为例验证：  
令 $z = x + iy$，$w = u + iv$，代入一般圆方程
$$
a(x^2+y^2) + bx + cy + d = 0,
$$
利用 $x = \frac{u}{u^2+v^2},\ y = \frac{-v}{u^2+v^2}$（由 $z = 1/w$ 得 $x+iy = \frac{u-iv}{u^2+v^2}$），代入后整理可得
$$
d(u^2+v^2) + bu - cv + a = 0,
$$
仍为圆方程（当 $d \neq 0$ 时为普通圆；$d=0$ 时为直线）。故保圆。

>   
> **注** 分式线性映射在扩充复平面上将圆周映成圆周，即具有**保圆性**。

### 交比与映射唯一性

#### 交比 (Cross Ratio)

扩充复平面上四个相异点 $z_1,z_2,z_3,z_4$ 的交比定义为
$$
(z_1, z_2, z_3, z_4) = \frac{z_1 - z_3}{z_2 - z_3} : \frac{z_1 - z_4}{z_2 - z_4}
= \frac{(z_1 - z_3)(z_2 - z_4)}{(z_2 - z_3)(z_1 - z_4)}.
$$
当某点为 $\infty$ 时，将分子分母中含有该点的因子按极限理解（如 $z_4 = \infty$ 时，$(z_1,z_2,z_3,\infty) = \frac{z_1 - z_3}{z_2 - z_3}$）。

>   
> **注** 分式线性映射保持交比不变，即具有**保交比性**：
$$
(w_1,w_2,w_3,w_4) = (z_1,z_2,z_3,z_4).
$$

#### 唯一确定映射的条件

>   
> **定理** 给定 $z$ 平面上三个相异点 $z_1,z_2,z_3$ 与 $w$ 平面上三个相异点 $w_1,w_2,w_3$，则存在唯一的分式线性映射 $w = f(z)$ 使得
$$
f(z_k) = w_k, \quad k=1,2,3.
$$

由保交比性可直接写出该映射：
$$
\frac{(w - w_1)(w_3 - w_2)}{(w - w_2)(w_3 - w_1)}
= \frac{(z - z_1)(z_3 - z_2)}{(z - z_2)(z_3 - z_1)}.
$$

>   
> **例** 求将点 $z=0,1,\infty$ 分别映为 $w = -1, -i, 1$ 的分式线性映射。

>   
> **解** 设对应关系为 $z_1=0\to w_1=-1,\ z_2=1\to w_2=-i,\ z_3=\infty\to w_3=1$。 利用三点式：
$$
\frac{w - w_1}{w - w_2} \cdot \frac{w_3 - w_2}{w_3 - w_1} = \frac{z - z_1}{z - z_2} \cdot \frac{z_3 - z_2}{z_3 - z_1}.
$$
> 代入得
$$
\frac{w+1}{w+ i} \cdot \frac{1+ i}{2} = \frac{z-0}{z-1} \cdot 1 = \frac{z}{z-1}.
$$
> 解得
$$
w = \frac{(i-1)z + 2}{(1-3i)z + (i-1)}.
$$

### 三种典型映射类型及其推导

分式线性映射的核心在于利用**边界对应原理**与**对称点原理**确定参数。

#### 类型 I：上半平面 $\operatorname{Im}(z) > 0 \to$ 单位圆盘 $|w| < 1$

> **推导步骤：**
>
> 1.  设上半平面内一点 $\lambda$（$\operatorname{Im}(\lambda) > 0$）映为圆心 $w=0$。
>
> 2.  由对称点原理，$\lambda$ 关于实轴的对称点 $\bar{\lambda}$ 应映为 $w=\infty$。
>
> 3.  映射形式为 $\displaystyle w = k \,\frac{z - \lambda}{z - \bar{\lambda}}$。
>
> 4.  实轴映为单位圆周 $|w|=1$，取 $z$ 为实数时 $|w| = |k| = 1$，故 $k = e^{i\theta}$。
>
> **最终映射公式：**
$$
w = e^{i\theta} \frac{z - \lambda}{z - \bar{\lambda}}, \quad \theta\in\mathbb{R},\ \operatorname{Im}(\lambda) > 0.
$$

#### 类型 II：单位圆盘 $|z| < 1 \to$ 单位圆盘 $|w| < 1$

> **推导步骤：**
>
> 1.  设圆盘内一点 $\alpha$（$|\alpha| < 1$）映为 $w=0$。
>
> 2.  对称点 $1/\bar{\alpha}$ 映为 $w=\infty$。
>
> 3.  映射形式为 $\displaystyle w = k' \,\frac{z - \alpha}{1 - \bar{\alpha}z}$。
>
> 4.  单位圆周 $|z|=1$ 映为 $|w|=1$，可得 $|k'|=1$，即 $k' = e^{i\varphi}$。
>
> **最终映射公式：**
$$
w = e^{i\varphi} \frac{z - \alpha}{1 - \bar{\alpha}z}, \quad \varphi\in\mathbb{R},\ |\alpha| < 1.
$$

#### 类型 III：上半平面 $\operatorname{Im}(z) > 0 \to$ 上半平面 $\operatorname{Im}(w) > 0$

> **推导步骤：**
>
> 1.  系数 $a,b,c,d$ 均取实数（可相差一个实常数因子）。
>
> 2.  虚部满足：
$$
    \operatorname{Im}(w) = \frac{1}{2i}(w - \bar{w}) = \frac{(ad-bc)\operatorname{Im}(z)}{|cz+d|^2}.
$$
>
> 3.  为保持上、下半平面，需要分子分母符号一致，故要求 $ad - bc > 0$（保定向）。
>
> **最终映射公式：**
$$
w = \frac{az + b}{cz + d}, \quad a,b,c,d\in\mathbb{R},\ ad-bc > 0.
$$

>   
> **例** 求将上半平面映为单位圆盘，且使 $\lambda = i$ 映为 $w=0$，并满足 $w(2i) > 0$ 的分式线性映射。

>   
> **解** 由类型 I 公式，$\lambda = i$，$\bar{\lambda} = -i$，故
$$
w = e^{i\theta} \frac{z - i}{z + i}.
$$
> 由附加条件 $w(2i) > 0$：
$$
w(2i) = e^{i\theta} \frac{2i - i}{2i + i} = e^{i\theta} \frac{i}{3i} = \frac{1}{3} e^{i\theta} > 0,
$$
> 故 $e^{i\theta} = 1$（取 $\theta = 0$）。所求映射为
$$
w = \frac{z - i}{z + i}.
$$

>   
> **例** 求将上半单位圆盘 $D = \{z: |z|<1,\ \operatorname{Im}z > 0\}$ 共形映射为上半平面的映射。

>   
> **解** 区域边界由上半圆周和实轴上的线段 $[-1,1]$ 组成。 先用分式线性映射将两个边界“拉直”。考虑映射 $w_1 = \frac{z+1}{z-1}$。它把实轴映为实轴，把圆周 $|z|=1$ 映为虚轴。取 $z=0$ 得 $w_1=-1$，取 $z=i$ 得 $w_1=-i$，故 $w_1$ 将上半单位圆盘映为第三象限。调正方向： 用 $w_2 = -w_1 = \frac{1+z}{1-z}$，则 $z=0\mapsto 1$，$z=i\mapsto i$，将上半单位圆盘映为第一象限。 再平方 $w = w_2^2 = \left(\frac{1+z}{1-z}\right)^2$，即把第一象限映为上半平面。 故所求映射为
$$
w = \left(\frac{1+z}{1-z}\right)^2.
$$

### 初等函数的共形性

#### 幂函数

> 幂函数 $w = z^n \ (n \ge 2)$：
>
> - **导数**：$\dfrac{\mathrm{d}w}{\mathrm{d}z} = nz^{n-1}$。
>
> - **共形性**：除 $z=0$ 外处处共形；$z=0$ 处角度放大 $n$ 倍。
>
> - **角形域变换**：将角域 $0 < \arg z < \alpha$（$\alpha \le 2\pi/n$）一一地共形映为角域 $0 < \arg w < n\alpha$。

#### 根式函数

> 根式函数 $w = \sqrt[n]{z}$（取定单值分支）：
>
> - 是幂函数的逆映射，在除原点外的区域共形。
>
> - 将角域 $0 < \arg z < n\alpha$ 共形映为 $0 < \arg w < \alpha$。
>
> - 常用于“展平”角度过大的角域。

#### 指数函数

> 指数函数 $w=e^z$：
>
> - **导数**：$\dfrac{\mathrm{d}w}{\mathrm{d}z}=e^z\neq0$，复平面内处处共形。
>
> - **几何意义**：将水平带形域 $0<\operatorname{Im} z < 2\pi$ 共形映射为沿正实轴割开的复平面（去掉 $0$ 到 $+\infty$ 的射线）。一般地，带形域 $y_0 < \operatorname{Im}z < y_0 + 2\pi$ 映为去掉从原点出发的一条射线的复平面。
>
> - 将水平直线映为从原点出发的射线，将竖直直线映为以原点为心的圆周。

#### 对数函数

> 对数函数 $w = \Ln z$（取主值支 $w = \ln|z| + i\Arg z,\ -\pi < \Arg z \le \pi$）：
>
> - 是指数函数的逆映射，在去掉原点和负实轴的区域上解析且导数 $w' = 1/z \neq 0$，故共形。
>
> - 将上述割开的复平面共形映为水平带形域 $-\pi < \operatorname{Im}w < \pi$。
>
> - 常用来把角域或扇形域变为带形域。

>   
> **例** 求将带形域 $0 < \operatorname{Im} z < \pi$ 共形映射为单位圆盘 $|w|<1$ 的映射。

>   
> **解** 分两步：
>
> 1.  先用指数函数 $w_1 = e^z$。当 $z = x+iy,\ 0<y<\pi$ 时，$w_1 = e^x e^{iy}$，幅角在 $(0,\pi)$，模长取遍 $(0,\infty)$，故 $w_1$ 将带形域映为上半平面 $\operatorname{Im} w_1 > 0$。
>
> 2.  再将上半平面映为单位圆盘，可取典型映射 $w = \dfrac{w_1 - i}{w_1 + i}$（将 $i$ 映为圆心）。
>
> 复合得
$$
w = \frac{e^z - i}{e^z + i}.
$$

>   
> **例** 求将扇形域 $D = \{z: |z| < 1,\ 0 < \arg z < \pi/3\}$ 共形映射为上半平面的映射。

>   
> **解**
>
> 1.  先用幂函数 $w_1 = z^3$，将扇形域（张角 $\pi/3$）展平为上半单位圆盘：$|w_1|<1,\ \operatorname{Im} w_1 > 0$。
>
> 2.  再用上半单位圆盘到上半平面的映射：$w = \left(\dfrac{1+w_1}{1-w_1}\right)^2$。
>
> 复合得
$$
w = \left(\frac{1+z^3}{1-z^3}\right)^2.
$$

## 复积分

### 复变函数积分的定义

设 $C$ 是复平面上一条光滑（或逐段光滑）的曲线，我们选定一个正方向（规定 $+$：起点指向终点或逆时针），称 $C$ 为一条**有向曲线**，其反向曲线为 $C^-$。

>   
> **定义：复变函数积分** 设函数 $w=f(z)$ 在区域 $D$ 内有定义，$C$ 为 $D$ 内以 $A$ 为起点、$B$ 为终点的光滑有向曲线。 若将曲线 $C$ 任意划分为 $n$ 个小弧段，分点为 $A=z_0, z_1, \dots, z_n=B$。在每个小弧段 $\overset{\frown}{z_{k-1}z_k}$ 上任取一点 $\xi_k$，作和式：
$$
\sum_{k=1}^n f(\xi_k) \Delta z_k, \quad \text{其中 } \Delta z_k = z_k - z_{k-1}.
$$
> 记 $\delta = \max_{1\leq k\leq n} |\Delta z_k|$ 为小弧段的最大长度。若当 $\delta \to 0$ 时，该和式的极限存在且唯一（与分法、取点 $\xi_k$ 无关），则称此极限为函数 $f(z)$ 在曲线 $C$ 上的**复变函数积分**，记作
$$
\int_C f(z) \, \mathrm{d}z = \lim_{\delta \to 0} \sum_{k=1}^n f(\xi_k) \Delta z_k.
$$

#### 积分的计算方法（参数方程法）

设曲线 $C$ 的参数方程为 $z = z(t) = x(t) + iy(t)$，其中 $t \in [\alpha, \beta]$。 则 $\mathrm{d}z = z'(t) \mathrm{d}t = (x'(t) + iy'(t)) \mathrm{d}t$。

复积分可转化为实变量的定积分计算：
$$
\int_C f(z) \mathrm{d}z = \int_\alpha^\beta f[z(t)] z'(t) \mathrm{d}t.
$$
也可拆分为实部和虚部的曲线积分组合：
$$
\int_C f(z) \mathrm{d}z = \int_C u \mathrm{d}x - v \mathrm{d}y + i \int_C v \mathrm{d}x + u \mathrm{d}y.
$$

### 典型例题计算

>   
> **例 1** 计算 $\displaystyle \int_C z \, \mathrm{d}z$，路径 $C$ 分别为：  
> (1) 从点 $O$ 沿直线 $z=t+it$ 到点 $1+i$；  
> (2) 从点 $O$ 沿实轴到 $1$，再平行虚轴到 $1+i$。
>
> **解 (1)：** 路径 $z = t + it, \quad t: 0 \to 1$。 $\mathrm{d}z = (1+i)\mathrm{d}t$。
$$
\int_C z \, \mathrm{d}z = \int_0^1 (t + it)(1+i) \mathrm{d}t = (1+i)^2 \int_0^1 t \mathrm{d}t = 2i \cdot \frac{1}{2} = i.
$$
>
> **解 (2)：** 分为两段 $C_1: z=t, t:0\to 1$；$C_2: z=1+it, t:0\to 1$。
$$
\int_{C_1} z \, \mathrm{d}z = \int_0^1 t \, \mathrm{d}t = \frac{1}{2}.
$$
$$
\int_{C_2} z \, \mathrm{d}z = \int_0^1 (1+it)(i \, \mathrm{d}t) = \int_0^1 (-t+i) \mathrm{d}t = -\frac{1}{2} + i.
$$
$$
\int_C z \, \mathrm{d}z = \int_{C_1} z \, \mathrm{d}z + \int_{C_2} z \, \mathrm{d}z = \frac{1}{2} + \left(-\frac{1}{2} + i\right) = i.
$$

>   
> **例 2** 设 $C$ 为正向圆周 $|z|=1$，计算：  
> (1) $\displaystyle \oint_C (x^2 - y^2 + 2xyi) \mathrm{d}z$ (2) $\displaystyle \oint_C \frac{1}{z} \mathrm{d}z$
>
> **解：** 参数化圆周 $z(\theta) = e^{i\theta} = \cos\theta + i\sin\theta$，$\theta: 0 \to 2\pi$，$\mathrm{d}z = i e^{i\theta} \mathrm{d} \theta$。
>
> \(1\) 观察被积函数可知 $f(z) = (x^2-y^2) + i(2xy) = (x+iy)^2 = z^2 = e^{i2\theta}$。
$$
\oint_C z^2 \mathrm{d}z = \int_0^{2\pi} e^{i2\theta} \cdot i e^{i\theta} \mathrm{d}\theta = i \int_0^{2\pi} e^{i3\theta} \mathrm{d}\theta = \left. \frac{1}{3} e^{i3\theta} \right|_0^{2\pi} = 0.
$$
>
> \(2\) $\displaystyle \oint_{|z|=1} \frac{1}{z} \mathrm{d}z = \int_0^{2\pi} \frac{1}{e^{i\theta}} \cdot i e^{i\theta} \mathrm{d}\theta = \int_0^{2\pi} i \, \mathrm{d}\theta = 2\pi i$.

### 重要公式与推论

#### 复积分的估值不等式

对于复变量积分，我们有对应的模长估值定理：
$$
\left| \int_C f(z) \mathrm{d}z \right| \le \int_C |f(z)| \mathrm{d}s.
$$

> 若在曲线 $C$ 上满足 $|f(z)| \le M$，且 $L$ 为曲线 $C$ 的长度，则：
$$
\left| \int_C f(z) \mathrm{d}z \right| \le M L.
$$

#### 核心公式：$\displaystyle \oint_{|z-z_0|=r} \frac{1}{(z-z_0)^n} \mathrm{d}z$ 的计算

设 $C$ 为正向圆周 $|z-z_0|=r$。令 $z-z_0 = re^{i\varphi}$，则 $\mathrm{d}z = ire^{i\varphi} \mathrm{d}\varphi$。
$$
\oint_C \frac{1}{(z-z_0)^n} \mathrm{d}z = \int_0^{2\pi} \frac{1}{r^n e^{in\varphi}} \cdot ire^{i\varphi} \mathrm{d}\varphi = \frac{i}{r^{n-1}} \int_0^{2\pi} e^{-i(n-1)\varphi} \mathrm{d}\varphi.
$$
当 $n=1$ 时，积分积项为 $1$，结果为 $2\pi$；当 $n \neq 1$ 时，由于指数函数的周期性，积分结果为 $0$。

> **重要结论：**
$$
\oint_{|z-z_0|=r} \frac{1}{(z-z_0)^n} \mathrm{d}z =
    \begin{cases}
        2\pi i, & n=1 \\
        0, & n \neq 1 \quad (n \in \mathbb{Z})
    \end{cases}
$$

### 原函数与不定积分

>   
> **定理：积分与路径无关性** 设函数 $f(z)$ 在单连通区域 $B$ 内解析，则积分 $\displaystyle \int_C f(z) \mathrm{d}z$ 与在 $B$ 内的路径无关。

>   
> **定义：原函数** 若在区域 $B$ 内有 $F'(z) = f(z)$，则称 $F(z)$ 为 $f(z)$ 在该区域内的一个**原函数**。

#### 变上限积分的导数

设 $F(z) = \int_{z_0}^z f(\zeta) \mathrm{d}\zeta$，其中 $z_0$ 为 $B$ 内任意定点。由解析性及积分与路径无关，可证：
$$
F'(z) = \lim_{\Delta z \to 0} \frac{F(z+\Delta z) - F(z)}{\Delta z} = f(z).
$$

#### 牛顿-莱布尼茨公式

若 $G(z)$ 是 $f(z)$ 的一个原函数，则复积分同样可以用前后端点值计算：
$$
\int_{z_0}^{z_1} f(z) \mathrm{d}z = G(z_1) - G(z_0).
$$

### 柯西-古萨基本定理

>   
> **定理：柯西-古萨定理 (Cauchy-Goursat Theorem)** 如果函数 $w=f(z)$ 在单连通区域 $D$ 内解析，$C$ 是 $D$ 内的一条简单闭曲线，则
$$
\oint_C f(z) \mathrm{d}z = 0.
$$

#### 闭路变形原理

> 设 $f(z)$ 在区域 $D$ 内解析，$C, C_1, C_2, \dots, C_n$ 是 $D$ 内互不相交的正向简单闭曲线，且 $C_1, \dots, C_n$ 全部包含在 $C$ 所围的区域内，则：
$$
\oint_C f(z) \mathrm{d}z = \sum_{k=1}^n \oint_{C_k} f(z) \mathrm{d}z.
$$

### 复合闭路定理与例题

>   
> **例 3** 计算 $\displaystyle \oint_C \frac{3z-2i}{z(z-i)} \mathrm{d}z$，其中 $C$ 为正向圆周 $|z|=2$。
>
> **解：** 被积函数有两个奇点 $z=0$ 及 $z=i$，均在圆周 $C$ 内部。 利用部分分式展开法：
$$
\frac{3z-2i}{z(z-i)} = \frac{2}{z} + \frac{1}{z-i}.
$$
> 由闭路变形原理，分别围绕两奇点作小圆周积分，结合核心圆周积分结论得：
$$
\oint_C \frac{2}{z} \mathrm{d}z = 2 \cdot 2\pi i = 4\pi i, \quad \oint_C \frac{1}{z-i} \mathrm{d}z = 2\pi i.
$$
$$
\text{原式} = 4\pi i + 2\pi i = 6\pi i.
$$

### 柯西积分公式

柯西积分公式是解析函数理论的核心结果之一，它揭示了解析函数在区域内部的值可由边界上的积分完全确定。

>   
> **定理：柯西积分公式** 设 $f(z)$ 在简单闭曲线 $C$ 所围成的区域 $D$ 内解析，在 $\overline{D} = D \cup C$ 上连续，$z_0$ 为 $D$ 内任意一点，则
$$
f(z_0) = \frac{1}{2\pi i} \oint_C \frac{f(z)}{z - z_0} \mathrm{d}z .
$$

**证明思路：** 在 $D$ 内作以 $z_0$ 为心、充分小的正向圆周 $C_\varepsilon$，使 $C_\varepsilon$ 完全含于 $D$ 内。由闭路变形原理，$\oint_C \frac{f(z)}{z-z_0}\mathrm{d}z = \oint_{C_\varepsilon} \frac{f(z)}{z-z_0}\mathrm{d}z$。令 $z - z_0 = \varepsilon e^{i\theta}$，利用 $f(z)$ 的连续性可得
$$
\oint_{C_\varepsilon} \frac{f(z)}{z-z_0}\mathrm{d}z = \int_0^{2\pi} \frac{f(z_0 + \varepsilon e^{i\theta})}{\varepsilon e^{i\theta}} i\varepsilon e^{i\theta}\mathrm{d}\theta = i\int_0^{2\pi} f(z_0 + \varepsilon e^{i\theta})\mathrm{d}\theta \xrightarrow{\varepsilon\to0} 2\pi i f(z_0).
$$
移项即得公式。

>   
> **注** 柯西积分公式表明，解析函数在区域内部的值完全由其在边界上的值决定，这与实可微函数截然不同。

>   
> **例 4 (利用柯西积分公式)** 计算下列积分，其中 $C$ 为正向圆周 $|z|=2$：
$$
(1)\ \oint_C \frac{e^z}{z-1}\mathrm{d}z \qquad 
    (2)\ \oint_C \frac{\sin z}{z+\pi}\mathrm{d}z \qquad 
    (3)\ \oint_C \frac{z}{z^2+1}\mathrm{d}z
$$
> **解：**
>
> 1.  被积函数在 $C$ 内只有一个奇点 $z=1$。取 $f(z)=e^z$，$z_0=1$，由柯西积分公式
$$
    \oint_C \frac{e^z}{z-1}\mathrm{d}z = 2\pi i \, f(1) = 2\pi i \, e.
$$
>
> 2.  奇点 $z=-\pi$ 在 $C$ 内（$|-\pi|=\pi>2$？注意 $|z|=2$，$|-\pi|=\pi>2$，故 $z=-\pi$ 在圆外，积分为 0！需修改题目以确保奇点在内部）。  
>     改为 $C: |z|=4$，则 $z=-\pi$ 在内。令 $f(z)=\sin z$，$z_0=-\pi$，
$$
    \oint_C \frac{\sin z}{z+\pi}\mathrm{d}z = 2\pi i \sin(-\pi) = 0.
$$
>
> 3.  $z^2+1 = (z-i)(z+i)$，奇点 $z=i$ 和 $z=-i$ 均在 $C$ 内。不能直接套用柯西公式，需用复合闭路定理拆分为两个积分：
$$
    \frac{z}{z^2+1} = \frac{z}{(z-i)(z+i)}.
$$
>     作部分分式：$\frac{z}{z^2+1} = \frac{1}{2}\left(\frac{1}{z-i} + \frac{1}{z+i}\right)$。于是
$$
    \oint_C \frac{z}{z^2+1}\mathrm{d}z = \frac{1}{2}\left( \oint_C \frac{1}{z-i}\mathrm{d}z + \oint_C \frac{1}{z+i}\mathrm{d}z \right) = \frac{1}{2}(2\pi i + 2\pi i) = 2\pi i.
$$

### 高阶导数公式

柯西积分公式的一个极其重要的推论是：解析函数在区域内部任意阶导数都存在，且同样可用边界积分表示。

>   
> **定理：高阶导数公式** 设 $f(z)$ 在简单闭曲线 $C$ 所围成的区域 $D$ 内解析，在 $\overline{D}$ 上连续，则对于 $D$ 内任意一点 $z_0$，$f(z)$ 的 $n$ 阶导数存在，且
$$
f^{(n)}(z_0) = \frac{n!}{2\pi i} \oint_C \frac{f(z)}{(z - z_0)^{n+1}} \mathrm{d}z, \quad n = 1,2,3,\dots
$$

**证明思路：** 由柯西积分公式 $f(z_0) = \frac{1}{2\pi i}\oint_C \frac{f(\zeta)}{\zeta - z_0}\mathrm{d}\zeta$。对 $z_0$ 求导，交换积分与求导次序即得。

该定理表明，一个复变函数只要在某区域内有一阶导数（即解析），则它在该区域内具有任意阶导数。这是复变函数与实变函数的本质区别之一。

>   
> **例 5 (利用高阶导数公式)** 计算下列积分，其中 $C$ 为正向圆周 $|z|=1$：
$$
(1)\ \oint_C \frac{e^{2z}}{z^4}\mathrm{d}z \qquad
    (2)\ \oint_C \frac{\cos \pi z}{(z-1/2)^3}\mathrm{d}z
$$
> **解：**
>
> 1.  函数 $e^{2z}$ 在整个平面解析，$z_0=0$ 在 $C$ 内。由高阶导数公式，$n+1=4 \Rightarrow n=3$，
$$
    \oint_C \frac{e^{2z}}{z^4}\mathrm{d}z = \frac{2\pi i}{3!} f^{(3)}(0), \quad \text{其中 } f(z)=e^{2z}.
$$
>     计算 $f^{(3)}(z) = 2^3 e^{2z} = 8e^{2z}$，故 $f^{(3)}(0)=8$。因此
$$
    \oint_C \frac{e^{2z}}{z^4}\mathrm{d}z = \frac{2\pi i}{6} \cdot 8 = \frac{8\pi i}{3}.
$$
>
> 2.  $z_0=1/2$ 在 $C$ 内，$n+1=3 \Rightarrow n=2$。令 $f(z)=\cos \pi z$，则
$$
    f''(z) = -\pi^2 \cos \pi z, \quad f''(1/2) = -\pi^2 \cos(\pi/2) = 0.
$$
>     故
$$
    \oint_C \frac{\cos \pi z}{(z-1/2)^3}\mathrm{d}z = \frac{2\pi i}{2!} f''(1/2) = \pi i \cdot 0 = 0.
$$

>   
> **例 6 (柯西积分与高阶导数的综合)** 设 $C$ 为正向圆周 $|z|=3$，计算积分
$$
I = \oint_C \frac{z^3 + 2z + 1}{(z-1)^2(z+2)}\mathrm{d}z.
$$
> **解：** 被积函数在 $C$ 内有两个奇点：$z=1$（二级极点）和 $z=-2$（一级极点）。由复合闭路定理，
$$
I = \oint_{C_1} \frac{z^3+2z+1}{(z-1)^2(z+2)}\mathrm{d}z + \oint_{C_2} \frac{z^3+2z+1}{(z-1)^2(z+2)}\mathrm{d}z,
$$
> 其中 $C_1$ 只围绕 $z=1$，$C_2$ 只围绕 $z=-2$。
>
> - 在 $C_1$ 上，记 $g(z) = \frac{z^3+2z+1}{z+2}$，它在该小圆内解析。于是
$$
  \oint_{C_1} \frac{g(z)}{(z-1)^2}\mathrm{d}z = 2\pi i \, g'(1).
$$
>   计算 $g(z) = \frac{z^3+2z+1}{z+2}$，求导得 $g'(z) = \frac{(3z^2+2)(z+2) - (z^3+2z+1)}{(z+2)^2}$。代入 $z=1$：
$$
  g'(1) = \frac{(3+2)(3) - (1+2+1)}{3^2} = \frac{15 - 4}{9} = \frac{11}{9}.
$$
>   故第一项为 $2\pi i \cdot \frac{11}{9} = \frac{22\pi i}{9}$。
>
> - 在 $C_2$ 上，记 $h(z) = \frac{z^3+2z+1}{(z-1)^2}$，由柯西积分公式
$$
  \oint_{C_2} \frac{h(z)}{z+2}\mathrm{d}z = 2\pi i \, h(-2).
$$
>   $h(-2) = \frac{(-8) + (-4) + 1}{(-3)^2} = \frac{-11}{9}$。故第二项为 $2\pi i \cdot \frac{-11}{9} = -\frac{22\pi i}{9}$。
>
> 因此 $I = \frac{22\pi i}{9} - \frac{22\pi i}{9} = 0$.

#### 推论

由高阶导数公式可立即得出以下重要结论：

1.  **解析函数的无穷可微性**：若 $f(z)$ 在区域 $D$ 内解析，则它在 $D$ 内具有任意阶导数。

2.  **柯西不等式**：设 $f(z)$ 在圆盘 $|z-z_0|<R$ 内解析，且 $|f(z)|\le M$，则
$$
    |f^{(n)}(z_0)| \le \frac{n! M}{R^n}.
$$

3.  **刘维尔定理**：若 $f(z)$ 在整个复平面上解析且有界，则 $f(z)$ 必为常数。

4.  **代数学基本定理**：任一 $n$ 次多项式在复数域上必有 $n$ 个根（含重数）。

## 级数

### 复数项级数

#### 基本概念

设 $\{z_n\} = \{x_n + i y_n\}$ 为一复数序列，若存在复数 $z_0 = x_0 + i y_0$ 使得 $\lim_{n\to\infty} |z_n - z_0| = 0$，则称序列收敛于 $z_0$。

无穷级数 $\sum_{n=0}^{\infty} z_n$ 定义为部分和序列 $S_N = \sum_{n=0}^{N} z_n$ 的极限（若存在）。

>   
> **定理：收敛的充要条件** 级数 $\sum_{n=0}^{\infty} z_n$ 收敛的充要条件是：实部级数 $\sum_{n=0}^{\infty} x_n$ 与虚部级数 $\sum_{n=0}^{\infty} y_n$ 均收敛。

>   
> **定义：绝对收敛与条件收敛** 若 $\sum_{n=0}^{\infty} |z_n|$ 收敛，则称复数项级数**绝对收敛**。  
> 若 $\sum_{n=0}^{\infty} z_n$ 收敛但 $\sum_{n=0}^{\infty} |z_n|$ 发散，则称其为**条件收敛**。

常用的判别法可直接推广到复数项级数：

- 比较判别法：若 $|z_n| \le a_n$ 且 $\sum a_n$ 收敛，则 $\sum z_n$ 绝对收敛。

- 比值判别法：设 $\lim_{n\to\infty} \left| \frac{z_{n+1}}{z_n} \right| = \rho$，则当 $\rho<1$ 时绝对收敛，$\rho>1$ 时发散。

- 根值判别法：设 $\lim_{n\to\infty} \sqrt[n]{|z_n|} = \rho$，结论同上。

### 复变函数项级数

设 $\{f_n(z)\}$ 是定义在集合 $E\subset\mathbb{C}$ 上的函数列。若对每一点 $z\in E$，级数 $\sum_{n=0}^{\infty} f_n(z)$ 均收敛，则称其在 $E$ 上逐点收敛。

#### 一致收敛与 Weierstrass M-判别法

>   
> **定义：一致收敛** 若对任意 $\varepsilon>0$，存在与 $z$ 无关的 $N$，使得当 $n>N$ 时，对所有 $z\in E$ 均有 $|r_n(z)| = \left|\sum_{k=n+1}^{\infty} f_k(z)\right| < \varepsilon$，则称级数在 $E$ 上**一致收敛**。

>   
> **定理：Weierstrass M-判别法** 若在集合 $E$ 上满足 $|f_n(z)| \le M_n$（$n=0,1,2,\dots$），且正项级数 $\sum_{n=0}^{\infty} M_n$ 收敛，则级数 $\sum_{n=0}^{\infty} f_n(z)$ 在 $E$ 上绝对且一致收敛。

一致收敛级数保持了解析性、可逐项积分与逐项求导等重要性质，这些是幂级数理论的基础。

### 幂级数

形如 $\sum_{n=0}^{\infty} c_n (z-a)^n$ 的级数称为**幂级数**，其中 $c_n$ 为复常数，$a$ 为展开中心。

#### 收敛半径与收敛圆

>   
> **定理：Abel 定理** 对于幂级数 $\sum_{n=0}^{\infty} c_n (z-a)^n$，存在一个实数 $R$ ($0\le R\le\infty$)，使得
>
> - 当 $|z-a| < R$ 时，级数绝对收敛；
>
> - 当 $|z-a| > R$ 时，级数发散；
>
> - 在 $|z-a| \le \rho$ ($\rho<R$) 上一致收敛。
>
> $R$ 称为该幂级数的**收敛半径**，开圆盘 $|z-a|<R$ 称为**收敛圆**。

收敛半径的求法：
$$
R = \lim_{n\to\infty} \left| \frac{c_n}{c_{n+1}} \right| \quad \text{或} \quad R = \frac{1}{\displaystyle\limsup_{n\to\infty} \sqrt[n]{|c_n|}}.
$$

#### 幂级数的运算与解析性

>   
> **性质**
>
> 1.  幂级数在其收敛圆内可逐项加、乘（Cauchy乘积）及逐项微分与积分，且不改变收敛半径。
>
> 2.  和函数 $f(z)=\sum_{n=0}^{\infty} c_n (z-a)^n$ 在收敛圆内解析，且导数可通过逐项求导得到：
$$
    f'(z) = \sum_{n=1}^{\infty} n c_n (z-a)^{n-1}.
$$

>   
> **例 1** 求幂级数 $\displaystyle \sum_{n=0}^{\infty} \frac{z^n}{n!}$ 的收敛半径，并证明其和函数为 $e^z$。 **解：** $c_n = 1/n!$，则
$$
R = \lim_{n\to\infty} \frac{1/n!}{1/(n+1)!} = \lim_{n\to\infty} (n+1) = \infty.
$$
> 故该级数在整个复平面上收敛。记 $f(z)=\sum_{n=0}^{\infty} \frac{z^n}{n!}$，逐项求导得
$$
f'(z) = \sum_{n=1}^{\infty} \frac{n z^{n-1}}{n!} = \sum_{n=1}^{\infty} \frac{z^{n-1}}{(n-1)!} = f(z).
$$
> 又 $f(0)=1$，满足初值问题的唯一解即 $f(z)=e^z$。因此 $e^z = \sum_{n=0}^{\infty} \frac{z^n}{n!}$。

### 泰勒级数

>   
> **定理：泰勒展开定理** 设 $f(z)$ 在区域 $D$ 内解析，$a\in D$，$R$ 为 $a$ 到 $D$ 边界的距离。则在圆盘 $|z-a|<R$ 内，$f(z)$ 可唯一地展开为泰勒级数：
$$
f(z) = \sum_{n=0}^{\infty} c_n (z-a)^n, \quad \text{其中 } c_n = \frac{f^{(n)}(a)}{n!}.
$$

这与实函数形式完全相同，但复变函数中只要函数在区域内解析，就一定能展成泰勒级数，且展开式唯一。

#### 常用泰勒展开式

以 $a=0$ 为中心的 Maclaurin 展开：
$$
\begin{align*}
    e^z &= \sum_{n=0}^{\infty} \frac{z^n}{n!}, \quad |z|<\infty; \\
    \sin z &= \sum_{n=0}^{\infty} (-1)^n \frac{z^{2n+1}}{(2n+1)!}, \quad |z|<\infty; \\
    \cos z &= \sum_{n=0}^{\infty} (-1)^n \frac{z^{2n}}{(2n)!}, \quad |z|<\infty; \\
    \frac{1}{1-z} &= \sum_{n=0}^{\infty} z^n, \quad |z|<1.
\end{align*}
$$

>   
> **例 2** 求 $f(z)=\dfrac{1}{z^2}$ 在 $z=1$ 处的泰勒展开式，并指出收敛半径。 **解：** 利用已知展开式 $\frac{1}{1+w} = \sum_{n=0}^{\infty} (-1)^n w^n$ ($|w|<1$)。将函数变形为关于 $(z-1)$ 的形式：
$$
f(z) = \frac{1}{z^2} = \frac{1}{[1+(z-1)]^2}.
$$
> 注意到 $\frac{d}{dz}\left(-\frac{1}{z}\right) = \frac{1}{z^2}$。先展开 $-\frac{1}{z}$：
$$
-\frac{1}{z} = -\frac{1}{1+(z-1)} = -\sum_{n=0}^{\infty} (-1)^n (z-1)^n, \quad |z-1|<1.
$$
> 对上式逐项求导得
$$
f(z) = \frac{1}{z^2} = \frac{d}{dz}\left(-\frac{1}{z}\right) = \sum_{n=1}^{\infty} (-1)^{n-1} n (z-1)^{n-1}, \quad |z-1|<1.
$$
> 收敛半径 $R=1$。

### 洛朗级数

当函数在奇点附近时，无法展成泰勒级数，但可以在环形区域内展开为洛朗级数。

>   
> **定理：洛朗展开定理** 设 $f(z)$ 在圆环域 $R_1 < |z-a| < R_2$ 内解析，则对环域内任意一点 $z$，$f(z)$ 可唯一地表示为洛朗级数：
$$
f(z) = \sum_{n=-\infty}^{\infty} c_n (z-a)^n,
$$
> 其中系数
$$
c_n = \frac{1}{2\pi i} \oint_C \frac{f(\zeta)}{(\zeta-a)^{n+1}} \mathrm{d}\zeta,
$$
> $C$ 为环域内围绕 $a$ 的任意正向简单闭曲线。

洛朗级数由正幂项（解析部分）与负幂项（主要部分）组成。其收敛域是一个环形区域，内半径由奇点决定。

#### 奇点分类

根据洛朗展开式中主要部分（负幂项）的项数，可将孤立奇点分为三类：

- **可去奇点**：展开式中无负幂项；

- **极点**：只有有限个负幂项，若最高负幂为 $m$ 次，则称为 $m$ 级极点；

- **本性奇点**：有无穷多个负幂项。

>   
> **例 3 (洛朗展开)** 求 $f(z)=\dfrac{1}{z(z-1)}$ 在以下区域内的洛朗展开式：  
> (1) $0<|z|<1$；(2) $1<|z|<\infty$。 **解：** 先将函数分解为部分分式：
$$
f(z) = \frac{1}{z(z-1)} = \frac{1}{z-1} - \frac{1}{z}.
$$
> (1) 在 $0<|z|<1$ 中，$|z|<1$，故 $\frac{1}{z-1} = -\frac{1}{1-z} = -\sum_{n=0}^{\infty} z^n$。
$$
f(z) = -\frac{1}{z} - \sum_{n=0}^{\infty} z^n = -\frac{1}{z} - 1 - z - z^2 - \cdots , \quad 0<|z|<1.
$$
> (2) 在 $1<|z|<\infty$ 中，$|z|>1$，故 $\frac{1}{z-1} = \frac{1}{z}\cdot\frac{1}{1-1/z} = \frac{1}{z}\sum_{n=0}^{\infty} \frac{1}{z^n} = \sum_{n=0}^{\infty} \frac{1}{z^{n+1}}$。
$$
f(z) = \sum_{n=0}^{\infty} \frac{1}{z^{n+1}} - \frac{1}{z} = \sum_{n=2}^{\infty} \frac{1}{z^n} = \frac{1}{z^2} + \frac{1}{z^3} + \cdots , \quad 1<|z|<\infty.
$$

>   
> **例 4 (利用洛朗级数求积分)** 计算积分 $\displaystyle \oint_{|z|=2} z^3 \sin\frac{1}{z} \,\mathrm{d}z$。 **解：** $\sin w = \sum_{n=0}^{\infty} (-1)^n \frac{w^{2n+1}}{(2n+1)!}$。令 $w=1/z$，则
$$
z^3 \sin\frac{1}{z} = z^3 \sum_{n=0}^{\infty} (-1)^n \frac{1}{(2n+1)! z^{2n+1}} = \sum_{n=0}^{\infty} (-1)^n \frac{z^{2-2n}}{(2n+1)!}.
$$
> 该洛朗级数中 $1/z$ 的系数（即 $c_{-1}$）对应于 $2-2n=-1$，解得 $n=3/2$ 非整数，故 $c_{-1}=0$。因此
$$
\oint_{|z|=2} z^3 \sin\frac{1}{z} \,\mathrm{d}z = 2\pi i \cdot c_{-1} = 0.
$$
> （亦可由留数定理直接看出被积函数偶函数，留数为零，此处用洛朗级数法强调系数求解。）

### 解析函数的零点和孤立奇点

#### 零点与极点之间的关系

若 $f(z)$ 在 $z=a$ 解析且 $f(a)=0$，则 $a$ 为 $f$ 的零点。由泰勒展开，存在正整数 $m$ 使得 $f(z) = (z-a)^m \varphi(z)$，其中 $\varphi(a)\neq 0$，此时称 $a$ 为 $f$ 的 $m$ 阶零点。 零点与极点的关系：$a$ 是 $f(z)$ 的 $m$ 阶零点等价于 $a$ 是 $1/f(z)$ 的 $m$ 级极点。

>   
> **例 5** 判别 $z=0$ 是函数 $f(z)=\dfrac{\sin z}{z^3}$ 的何种奇点。 **解：** $\sin z = z - \frac{z^3}{3!} + \frac{z^5}{5!} - \cdots$，故
$$
f(z) = \frac{1}{z^3}\left( z - \frac{z^3}{6} + \frac{z^5}{120} - \cdots \right) = \frac{1}{z^2} - \frac{1}{6} + \frac{z^2}{120} - \cdots
$$
> 洛朗级数中负幂项最高为 $1/z^2$，故 $z=0$ 为二级极点。

## 留数

留数理论（Residue Theory）是复分析（Complex Analysis）中的核心内容之一。它将复变函数的解析性质与积分计算紧密结合，是孤立奇点理论的自然延伸。利用留数定理，我们可以将复杂的复变函数沿闭曲线的积分转化为函数在曲线内部孤立奇点处的“留数”之和，从而极大地简化了积分的计算。此外，留数理论也是计算某些难以用初等方法求解的实定积分的强有力工具。

—

### 留数的定义与留数定理

#### 留数的定义

设 $z_0$ 是函数 $f(z)$ 的一个孤立奇点，即 $f(z)$ 在去心邻域 $D: 0 < |z - z_0| < R$ 内解析。根据罗朗（Laurent）级数理论，$f(z)$ 在该去心邻域内可以展开为：
$$
f(z) = \sum_{n=-\infty}^{+\infty} c_n (z - z_0)^n
$$
其中展开式的系数 $c_n$ 由下式决定：
$$
c_n = \frac{1}{2\pi i} \oint_{C} \frac{f(z)}{(z - z_0)^{n+1}} dz \quad (n = 0, \pm 1, \pm 2, \cdots)
$$
这里的 $C$ 是 $D$ 内绕 $z_0$ 的任意一条正向简单闭曲线。

特别地，当 $n = -1$ 时，我们有：
$$
c_{-1} = \frac{1}{2\pi i} \oint_{C} f(z) dz
$$
这个系数 $c_{-1}$ 包含了函数在该奇点处的某种“残留信息”，因此我们将其称为 $f(z)$ 在孤立奇点 $z_0$ 处的**留数**（或残数），记作 $\text{Res}(f, z_0)$ 或 $\text{Res}[f(z), z_0]$。

>   
> **定义** 设 $z_0$ 为 $f(z)$ 的孤立奇点，$f(z)$ 在其去心邻域内的罗朗展开式中 $(z-z_0)^{-1}$ 的系数 $c_{-1}$ 称为 $f(z)$ 在 $z_0$ 处的**留数**，即：
$$
\text{Res}(f, z_0) = c_{-1} = \frac{1}{2\pi i} \oint_{C} f(z) dz
$$

#### 留数基本定理

留数定义直接给出了单奇点包裹情形下的积分结果。当区域内包含多个孤立奇点时，通过复连通区域的柯西积分定理，可以立即导出著名的留数定理。

>   
> **定理** 设 $D$ 是一个有界区域，其边界为正向周线或闭曲线族 $C$。若函数 $f(z)$ 在 $D$ 内除去有限个孤立奇点 $z_1, z_2, \cdots, z_n$ 外处处解析，且在 $\bar{D} = D \cup C$ 上除这些奇点外连续，则 $f(z)$ 沿 $C$ 的正向积分等于 $f(z)$ 在 $D$ 内所有奇点处的留数之和的 $2\pi i$ 倍：
$$
\oint_{C} f(z) dz = 2\pi i \sum_{k=1}^{n} \text{Res}(f, z_k)
$$

—

### 留数的计算方法

计算留数的核心在于寻找罗朗级数中 $c_{-1}$ 的值。虽然可以直接展开函数，但针对不同类型的孤立奇点（主要是极点），有着更为简便的代数计算公式。

#### 可去奇点与本性奇点处的留数

1.  **可去奇点：** 若 $z_0$ 是 $f(z)$ 的可去奇点，则 $f(z)$ 在 $z_0$ 的去心邻域内没有负幂项，即 $c_{-1} = 0$。因此，**可去奇点处的留数必为 0**。

2.  **本性奇点：** 若 $z_0$ 是 $f(z)$ 的本性奇点，通常没有通用的代数公式，必须将 $f(z)$ 直接展开为罗朗级数，然后**直接观察 $(z-z_0)^{-1}$ 的系数**。

#### 极点处的留数计算公式

若 $z_0$ 是 $f(z)$ 的极点，我们可以利用导数和极限来直接计算留数。

##### 1. $m$ 阶极点的通用公式

>   
> **定理** 若 $z_0$ 是 $f(z)$ 的 $m$ 阶极点，则 $f(z)$ 在 $z_0$ 处的留数为：
$$
\text{Res}(f, z_0) = \frac{1}{(m-1)!} \lim_{z \to z_0} \frac{d^{m-1}}{dz^{m-1}} \left[ (z - z_0)^m f(z) \right]
$$

##### 2. 1 阶极点（单极点）的特例公式

当 $m = 1$ 时，上述公式简化为：
$$
\text{Res}(f, z_0) = \lim_{z \to z_0} (z - z_0) f(z)
$$

此外，在实际应用中，单极点经常以分式形式 $f(z) = \frac{P(z)}{Q(z)}$ 出现。

>   
> **定理** 设 $f(z) = \frac{P(z)}{Q(z)}$，其中 $P(z)$ 和 $Q(z)$ 在 $z_0$ 处解析。若 $P(z_0) \neq 0$，$Q(z_0) = 0$ 且 $Q'(z_0) \neq 0$（即 $z_0$ 是 $Q(z)$ 的一重零点，从而为 $f(z)$ 的单极点），则：
$$
\text{Res}(f, z_0) = \frac{P(z_0)}{Q'(z_0)}
$$

这个公式在处理三角函数或多项式分式时效率极高。

#### 无穷远点处的留数

如果 $f(z)$ 在区域 $R < |z| < +\infty$ 内解析，则称 $\infty$ 轴为 $f(z)$ 的孤立奇点。 定义 $f(z)$ 在 $\infty$ 处的留数为：
$$
\text{Res}(f, \infty) = \frac{1}{2\pi i} \oint_{C^-} f(z) dz = - \frac{1}{2\pi i} \oint_{C^+} f(z) dz
$$
其中 $C$ 是一条顺时针方向（对无穷远点而言是正向）绕原点的闭曲线。

通过作变换 $\zeta = \frac{1}{z}$，可以得到无穷远点留数的计算公式：
$$
\text{Res}(f, \infty) = \text{Res}\left[ -\frac{1}{\zeta^2} f\left(\frac{1}{\zeta}\right), 0 \right]
$$

>   
> **定理** 若 $f(z)$ 在整个扩充复平面上只有有限个孤立奇点 $z_1, z_2, \cdots, z_n$ 以及 $\infty$，则它们处的留数总和为零：
$$
\sum_{k=1}^{n} \text{Res}(f, z_k) + \text{Res}(f, \infty) = 0
$$

—

### 留数的典型应用

留数定理最重要的应用之一是计算实变函数中难以用常规微积分方法解决的某些实定积分。通常的方法是将实积分路线看作复平面上某条闭曲线的一部分，然后构造辅助复变函数进行闭合路径积分。

#### 1. 计算 $\int_{0}^{2\pi} R(\cos\theta, \sin\theta) d\theta$ 型积分

这类积分的特点是区间为 $[0, 2\pi]$，被积函数是关于 $\sin\theta$ 和 $\cos\theta$ 的有理函数。

**转化策略：** 令 $z = e^{i\theta} = \cos\theta + i\sin\theta$，当 $\theta$ 从 $0$ 变到 $2\pi$ 时，$z$ 沿着复平面上的单位圆周 $C: |z|=1$ 逆时针运动。 利用欧拉公式，我们有：
$$
d\theta = \frac{dz}{iz}, \quad \cos\theta = \frac{z + z^{-1}}{2} = \frac{z^2 + 1}{2z}, \quad \sin\theta = \frac{z - z^{-1}}{2i} = \frac{z^2 - 1}{2iz}
$$
将其代入原积分，即可转化为沿单位圆周 $C$ 的复变函数有理分式积分：
$$
\int_{0}^{2\pi} R(\cos\theta, \sin\theta) d\theta = \oint_{|z|=1} R\left( \frac{z^2+1}{2z}, \frac{z^2-1}{2iz} \right) \frac{dz}{iz}
$$
最后只需计算该函数在单位圆 $|z| < 1$ 内部的所有孤立奇点的留数即可。

#### 2. 计算 $\int_{-\infty}^{+\infty} P(x)/Q(x) dx$ 型广义积分

其中 $P(x)$ 和 $Q(x)$ 为实多项式，且满足：$Q(x)$ 在实轴上无零点，且 $\text{deg}(Q) \ge \text{deg}(P) + 2$（保证积分收敛）。

**转化策略：** 在复平面上构造闭合回路 $\Gamma = [-R, R] \cup C_R$，其中 $C_R$ 是上半平面上以原点为圆心、 $R$ 为半径的半圆周。 根据留数定理，当 $R$ 足够大以至于包含了上半平面内的所有奇点 $z_k$（$\text{Im}(z_k) > 0$）时：
$$
\int_{-R}^{R} \frac{P(x)}{Q(x)} dx + \int_{C_R} \frac{P(z)}{Q(z)} dz = 2\pi i \sum_{\text{Im}(z_k)>0} \text{Res}\left( \frac{P}{Q}, z_k \right)
$$
由大弧段引理（Jordan引理的简化版），当 $R \to +\infty$ 时，沿半圆周 $C_R$ 的积分趋于 0。因此：
$$
\int_{-\infty}^{+\infty} \frac{P(x)}{Q(x)} dx = 2\pi i \sum_{\text{Im}(z_k)>0} \text{Res}\left( \frac{P(z)}{Q(z)}, z_k \right)
$$

#### 3. 计算 $\int_{-\infty}^{+\infty} \frac{P(x)}{Q(x)} e^{i\alpha x} dx$ 型积分（约当引理）

这类积分常用于傅里叶变换的求解，其中 $\alpha > 0$，$\text{deg}(Q) \ge \text{deg}(P) + 1$。

在同样的半圆闭回路 $\Gamma$ 下，我们需要借助**约当引理（Jordan’s Lemma）**来证明大半圆弧上的积分贡献在 $R \to +\infty$ 时为 0：

>   
> **引理** 设 $C_R$ 是上半平面上的半圆周 $|z|=R, \text{Im}(z) > 0$。若在 $C_R$ 上 $\lim_{R \to +\infty} F(z) = 0$ 均匀成立，则对于任何 $\alpha > 0$，有：
$$
\lim_{R \to +\infty} \int_{C_R} F(z) e^{i\alpha z} dz = 0
$$

基于此引理，这类积分的计算公式为：
$$
\int_{-\infty}^{+\infty} \frac{P(x)}{Q(x)} e^{i\alpha x} dx = 2\pi i \sum_{\text{Im}(z_k)>0} \text{Res}\left( \frac{P(z)}{Q(z)} e^{i\alpha z}, z_k \right)
$$
通过取其实部或虚部，可以顺带求出形如 $\int_{-\infty}^{+\infty} \frac{P(x)}{Q(x)}\cos(\alpha x) dx$ 或 $\int_{-\infty}^{+\infty} \frac{P(x)}{Q(x)}\sin(\alpha x) dx$ 的积分。

—

### 典型例题解析

>   
> **例** 计算积分 $I = \int_{0}^{2\pi} \frac{1}{2 + \cos\theta} d\theta$。

>   
> **证明** 令 $z = e^{i\theta}$，则 $\cos\theta = \frac{z^2+1}{2z}$，$d\theta = \frac{dz}{iz}$。代入原积分得：
$$
I = \oint_{|z|=1} \frac{1}{2 + \frac{z^2+1}{2z}} \frac{dz}{iz} = \oint_{|z|=1} \frac{2}{4z + z^2 + 1} \frac{dz}{i} = \frac{2}{i} \oint_{|z|=1} \frac{1}{z^2 + 4z + 1} dz
$$
> 设 $f(z) = \frac{1}{z^2 + 4z + 1}$，其分母的零点（即 $f(z)$ 的单极点）为：
$$
z_1 = -2 + \sqrt{3}, \quad z_2 = -2 - \sqrt{3}
$$
> 显然，$|z_1| = 2 - \sqrt{3} < 1$（在单位圆内），而 $|z_2| = 2 + \sqrt{3} > 1$（在单位圆外）。
>
> 利用分式型单极点留数公式，计算 $z_1$ 处的留数：
$$
\text{Res}(f, z_1) = \left. \frac{1}{(z^2 + 4z + 1)'} \right|_{z=z_1} = \frac{1}{2z_1 + 4} = \frac{1}{2(-2+\sqrt{3}) + 4} = \frac{1}{2\sqrt{3}}
$$
> 由留数定理：
$$
I = \frac{2}{i} \cdot 2\pi i \cdot \text{Res}(f, z_1) = 4\pi \cdot \frac{1}{2\sqrt{3}} = \frac{2\pi}{\sqrt{3}}
$$

## Fourier 变换

### Fourier 级数与 Fourier 积分

>   
> **定理** 设周期为 $2l$ 的函数 $f(x)$ 在区间 $[-l,l]$ 上满足**狄利克雷条件**：
>
> 1.  $f(x)$ 在 $[-l,l]$ 上分段连续；
>
> 2.  $f(x)$ 在 $[-l,l]$ 上只有有限个极值点。
>
> 则 $f(x)$ 的 Fourier 级数
$$
\frac{a_0}{2}+\sum_{n=1}^{\infty}\left(a_n\cos\frac{n\pi x}{l}+b_n\sin\frac{n\pi x}{l}\right)
$$
> 在任意点 $x$ 处收敛，且其和为
$$
S(x)=
  \begin{cases}
    f(x), & x\text{ 为 }f(x)\text{ 的连续点},\\[4pt]
    \dfrac{f(x^-)+f(x^+)}{2}, & x\text{ 为 }f(x)\text{ 的间断点}.
  \end{cases}
$$
> 其中 Fourier 系数为
$$
\begin{aligned}
    a_n&=\dfrac{1}{l}\int_{-l}^{l}f(x)\cos\dfrac{n\pi x}{l}\,\mathrm{d}x,\quad n=0,1,2,\dots,\\
    b_n&=\dfrac{1}{l}\int_{-l}^{l}f(x)\sin\dfrac{n\pi x}{l}\,\mathrm{d}x,\quad n=1,2,\dots.
  \end{aligned}
$$
> 特别地，若周期为 $2\pi$（即 $l=\pi$），则系数简化为
$$
\begin{aligned}
    a_n&=\dfrac{1}{\pi}\int_{-\pi}^{\pi}f(x)\cos nx\,\mathrm{d}x,\quad n=0,1,2,\dots,\\
    b_n&=\dfrac{1}{\pi}\int_{-\pi}^{\pi}f(x)\sin nx\,\mathrm{d}x,\quad n=1,2,\dots.
  \end{aligned}
$$

>   
> **定理** 若函数 $f(x)$ 在 $\mathbb R$ 上满足下列条件：
>
> 1.  $f(x)$ 在任意有限区间上分段单调且分段连续；
>
> 2.  广义积分 $\displaystyle\int_{-\infty}^{+\infty}|f(x)|\,\mathrm{d}x$ 收敛。
>
> 则对任意 $x\in\mathbb R$，有
$$
\frac{f(x^-)+f(x^+)}{2}
  =\int_{0}^{+\infty}\left[A(\omega)\cos\omega x + B(\omega)\sin\omega x\right]\mathrm{d}\omega,
$$
> 其中
$$
A(\omega)=\frac{1}{\pi}\int_{-\infty}^{+\infty}f(t)\cos\omega t\,\mathrm{d}t,\quad
  B(\omega)=\frac{1}{\pi}\int_{-\infty}^{+\infty}f(t)\sin\omega t\,\mathrm{d}t.
$$
> 等价复指数形式为
$$
\frac{f(x^-)+f(x^+)}{2}
  =\frac{1}{2\pi}\int_{-\infty}^{+\infty}\left(\int_{-\infty}^{+\infty}f(t)e^{-i\omega t}\mathrm{d}t\right)
  e^{i\omega x}\mathrm{d}\omega.
$$
> 特别地，在 $f(x)$ 的连续点处有
$$
f(x)=\int_{0}^{+\infty}\big(A(\omega)\cos\omega x+B(\omega)\sin\omega x\big)\mathrm{d}\omega.
$$

### Fourier 变换的定义与基本性质

>   
> **定理** 若 $\mathbb{R}$ 上的函数 $f(x)$ 绝对可积且具有连续导数 $f'(x)$，则对任意 $x\in\mathbb{R}$，有
$$
\frac{1}{2\pi}\,\mathrm{p.v.}\int_{-\infty}^{+\infty}F(\lambda)e^{i\lambda x}\,\mathrm{d}\lambda=f(x),
$$
> 其中 $F(\lambda)=\displaystyle\int_{-\infty}^{+\infty}f(x)e^{-i\lambda x}\,\mathrm{d}x$。

>   
> **定义** 若 $f(x)$ 满足 Fourier 积分定理条件，则称
$$
F(\lambda)=\int_{-\infty}^{+\infty}f(x)e^{-i\lambda x}\,\mathrm{d}x
$$
> 为 $f(x)$ 的 Fourier 变换，记为 $F(\lambda)=\mathcal{F}[f(x)]$ 或 $\hat{f}(\lambda)$。 称
$$
f(x)=\frac{1}{2\pi}\int_{-\infty}^{+\infty}F(\lambda)e^{i\lambda x}\,\mathrm{d}\lambda
$$
> 为 $F(\lambda)$ 的 Fourier 逆变换，记为 $f(x)=\mathcal{F}^{-1}[F(\lambda)]$。 并称 $F(\lambda)$ 与 $f(x)$ 为 Fourier 变换对，记为 $F(\lambda)\leftrightarrow f(x)$。

>   
> **定义**
>
> 1.  若 $f(x)$ 为奇函数，则
$$
    F_s(\lambda)=\int_{0}^{+\infty}f(x)\sin\lambda x\,\mathrm{d}x
$$
>     称为 Fourier 正弦变换；逆变换为
$$
    f(x)=\frac{2}{\pi}\int_{0}^{+\infty}F_s(\lambda)\sin\lambda x\,\mathrm{d}\lambda.
$$
>
> 2.  若 $f(x)$ 为偶函数，则
$$
    F_c(\lambda)=\int_{0}^{+\infty}f(x)\cos\lambda x\,\mathrm{d}x
$$
>     称为 Fourier 余弦变换；逆变换为
$$
    f(x)=\frac{2}{\pi}\int_{0}^{+\infty}F_c(\lambda)\cos\lambda x\,\mathrm{d}\lambda.
$$

### Dirac $\delta$ 函数

>   
> **定义** 称满足
$$
\delta(t)=
  \begin{cases}
    0, & t\neq 0,\\
    \infty, & t=0,
  \end{cases}
  \quad
  \int_{-\infty}^{+\infty}\delta(t)\,\mathrm{d}t=1
$$
> 的函数为 Dirac 函数（单位脉冲函数）。其 Fourier 变换为
$$
\mathcal{F}[\delta(x)]=\int_{-\infty}^{+\infty}\delta(x)e^{-i\lambda x}\,\mathrm{d}x=1.
$$

>   
> **定理**
>
> 1.  筛选性质：$\displaystyle\int_{-\infty}^{+\infty}\delta(x)\varphi(x)\,\mathrm{d}x=\varphi(0)$；
>
> 2.  导数性质：$\displaystyle\int_{-\infty}^{+\infty}\delta^{(n)}(x)\varphi(x)\,\mathrm{d}x=(-1)^n\varphi^{(n)}(0)$；
>
> 3.  对称性：$\delta(-x)=\delta(x)$；
>
> 4.  伸缩性质：$\delta(ax)=\dfrac{1}{|a|}\delta(x)$；
>
> 5.  乘积性质：$x\delta(x)=0$；
>
> 6.  与阶跃函数关系：$\dfrac{\mathrm{d}}{\mathrm{d}x}H(x)=\delta(x)$，其中
$$
    H(x)=
        \begin{cases}
          1, & x>0,\\
          0, & x<0
        \end{cases}
$$
>     为单位阶跃函数。

>   
> **例 1：单位阶跃函数** 求单位阶跃函数 $H(x)$ 的 Fourier 变换。 **解：** 由定义
$$
\mathcal{F}[H(x)]=\int_{0}^{+\infty}e^{-i\lambda x}\mathrm{d}x
  =\lim_{\varepsilon\to 0^+}\int_{0}^{+\infty}e^{-\varepsilon x}e^{-i\lambda x}\mathrm{d}x
  =\lim_{\varepsilon\to 0^+}\frac{1}{\varepsilon+i\lambda}.
$$
> 利用广义函数极限
$$
\lim_{\varepsilon\to 0^+}\frac{\varepsilon}{\lambda^2+\varepsilon^2}=\pi\delta(\lambda),\quad
  \lim_{\varepsilon\to 0^+}\frac{-\lambda}{\lambda^2+\varepsilon^2}= \frac{1}{i\lambda},
$$
> 故
$$
\mathcal{F}[H(x)]=\frac{1}{i\lambda}+\pi\delta(\lambda).
$$

>   
> **例 2：矩形脉冲（门函数）** 设 $a>0$，矩形脉冲函数定义为
$$
f(x)=\begin{cases}
    1, & |x|\le a,\\
    0, & |x|>a.
  \end{cases}
$$
> 求其 Fourier 变换。 **解：**
$$
\begin{aligned}
    \mathcal{F}[f(x)]&=\int_{-a}^{a} e^{-i\lambda x}\mathrm{d}x
    =\left.\frac{e^{-i\lambda x}}{-i\lambda}\right|_{-a}^{a}
    =\frac{e^{-i\lambda a}-e^{i\lambda a}}{-i\lambda}\\[4pt]
    &=\frac{-2i\sin(\lambda a)}{-i\lambda}
    =2a\,\frac{\sin(\lambda a)}{\lambda a}
    =2a\operatorname{sinc}(\lambda a).
  \end{aligned}
$$

>   
> **例 3：单边指数衰减函数** 设 $\beta>0$，求 $f(x)=e^{-\beta x}H(x)$ 的 Fourier 变换。 **解：**
$$
\mathcal{F}[e^{-\beta x}H(x)]=\int_{0}^{+\infty} e^{-\beta x}e^{-i\lambda x}\mathrm{d}x
  =\int_{0}^{+\infty} e^{-(\beta+i\lambda)x}\mathrm{d}x
  =\frac{1}{\beta+i\lambda}.
$$

>   
> **例 4：正弦函数** 求 $f(x)=\sin\lambda_0 x$ 的 Fourier 变换。 **解：** 由欧拉公式 $\sin\lambda_0 x=\dfrac{e^{i\lambda_0 x}-e^{-i\lambda_0 x}}{2i}$，及 $\mathcal{F}[e^{i\lambda_0 x}]=2\pi\delta(\lambda-\lambda_0)$，得
$$
\begin{aligned}
    \mathcal{F}[\sin\lambda_0 x]
    &=\frac{1}{2i}\big[2\pi\delta(\lambda-\lambda_0)-2\pi\delta(\lambda+\lambda_0)\big]\\
    &=i\pi\big[\delta(\lambda+\lambda_0)-\delta(\lambda-\lambda_0)\big].
  \end{aligned}
$$

>   
> **例 5：符号函数** 求符号函数 $\operatorname{sgn} x$ 的 Fourier 变换。 **解：** 符号函数可表示为 $\operatorname{sgn} x = 2H(x)-1$。利用线性性质及 $\mathcal{F}[H(x)]=\frac{1}{i\lambda}+\pi\delta(\lambda)$，$\mathcal{F}[1]=2\pi\delta(\lambda)$，有
$$
\mathcal{F}[\operatorname{sgn} x]=2\left(\frac{1}{i\lambda}+\pi\delta(\lambda)\right)-2\pi\delta(\lambda)=\frac{2}{i\lambda}.
$$

>   
> **例 6：高斯函数** 设 $a>0$，求高斯函数 $f(x)=e^{-ax^2}$ 的 Fourier 变换。 **解：** 配方法得
$$
\begin{aligned}
    \mathcal{F}[e^{-ax^2}]&=\int_{-\infty}^{+\infty} e^{-ax^2} e^{-i\lambda x}\mathrm{d}x
    =e^{-\frac{\lambda^2}{4a}}\int_{-\infty}^{+\infty} e^{-a\left(x+\frac{i\lambda}{2a}\right)^2}\mathrm{d}x
    =\sqrt{\frac{\pi}{a}}\, e^{-\frac{\lambda^2}{4a}}.
  \end{aligned}
$$

>   
> **例 7：双边指数函数** 求 $f(x)=e^{-\beta|x|}\ (\beta>0)$ 的 Fourier 变换。 **解：**
$$
\begin{aligned}
    \mathcal{F}[e^{-\beta|x|}]
    &=\int_{-\infty}^{0} e^{\beta x} e^{-i\lambda x}\mathrm{d}x + \int_{0}^{+\infty} e^{-\beta x} e^{-i\lambda x}\mathrm{d}x\\
    &=\frac{1}{\beta-i\lambda} + \frac{1}{\beta+i\lambda}
    = \frac{2\beta}{\beta^2+\lambda^2}.
  \end{aligned}
$$

>   
> **例 8：三角脉冲** 设 $a>0$，三角脉冲定义为
$$
f(x)=\begin{cases}
    1-\dfrac{|x|}{a}, & |x|\le a,\\
    0, & |x|>a.
  \end{cases}
$$
> 求其 Fourier 变换。 **解：** 利用偶函数性质及积分，
$$
\begin{aligned}
    \mathcal{F}[f(x)]&=2\int_{0}^{a} \left(1-\frac{x}{a}\right)\cos(\lambda x)\,\mathrm{d}x
    = a\left(\frac{\sin(\lambda a/2)}{\lambda a/2}\right)^2
    = a\operatorname{sinc}^2\!\left(\frac{\lambda a}{2}\right).
  \end{aligned}
$$

### Fourier 变换的性质

>   
> **定理** 若 $a,b$ 为常数，且 $\mathcal{F}[f(x)]=F(\lambda)$，$\mathcal{F}[g(x)]=G(\lambda)$，则
$$
\mathcal{F}[af(x)+bg(x)]=aF(\lambda)+bG(\lambda).
$$

>   
> **定理** 设 $\mathcal{F}[f(x)]=F(\lambda)$，则
>
> 1.  时移性质：$\mathcal{F}[f(x\pm x_0)]=e^{\pm i\lambda x_0}F(\lambda)$。
>
> 2.  频移性质：$\mathcal{F}^{-1}[F(\lambda\pm\lambda_0)]=e^{\mp i\lambda_0 x}f(x)$。

>   
> **例 9：位移性质应用** 设 $g(x)=e^{-\beta x}H(x)\cos\lambda_0 x\ (\beta>0)$，求 $\mathcal{F}[g(x)]$。 **解：** 记 $f(x)=e^{-\beta x}H(x)$，已知 $\mathcal{F}[f(x)]=\dfrac{1}{\beta+i\lambda}$。由欧拉公式
$$
g(x)=f(x)\frac{e^{i\lambda_0 x}+e^{-i\lambda_0 x}}{2},
$$
> 利用频移性质，
$$
\begin{aligned}
    \mathcal{F}[g(x)]
    &=\frac{1}{2}\mathcal{F}[f(x)e^{i\lambda_0 x}]+\frac{1}{2}\mathcal{F}[f(x)e^{-i\lambda_0 x}]\\
    &=\frac{1}{2}\cdot\frac{1}{\beta+i(\lambda-\lambda_0)}+\frac{1}{2}\cdot\frac{1}{\beta+i(\lambda+\lambda_0)}.
  \end{aligned}
$$

>   
> **定理** 设 $\lim\limits_{|x|\to\infty}f(x)=0$，且 $\mathcal{F}[f(x)]=F(\lambda)$，则
$$
\mathcal{F}[f'(x)]=i\lambda F(\lambda).
$$
> 一般地，若 $\lim\limits_{|x|\to\infty}f^{(k)}(x)=0$，$k=0,1,\dots,n-1$，则
$$
\mathcal{F}[f^{(n)}(x)]=(i\lambda)^n F(\lambda).
$$
> 同时，若 $\lim\limits_{|\lambda|\to\infty}F(\lambda)=0$，则
$$
\mathcal{F}[x^n f(x)] = i^n F^{(n)}(\lambda).
$$

>   
> **例 10：微分性质应用** 设 $f(x)=xe^{-\beta|x|}\ (\beta>0)$，求 $\mathcal{F}[f(x)]$。 **解：** 先求 $f_0(x)=e^{-\beta|x|}$ 的变换（见例7）：$F_0(\lambda)=\dfrac{2\beta}{\beta^2+\lambda^2}$。 由 $\mathcal{F}[x f_0(x)] = i F_0'(\lambda)$，得
$$
\mathcal{F}[x e^{-\beta|x|}]=i\cdot\frac{\mathrm{d}}{\mathrm{d}\lambda}\left(\frac{2\beta}{\beta^2+\lambda^2}\right)
  =\frac{-4i\beta\lambda}{(\beta^2+\lambda^2)^2}.
$$

>   
> **定理** 设 $g(x)=\int_{-\infty}^{x}f(t)\,\mathrm{d}t$，且 $\lim\limits_{x\to\infty}g(x)=0$，则
$$
\mathcal{F}[g(x)]=\frac{1}{i\lambda}\mathcal{F}[f(x)].
$$

>   
> **定理** 设 $\mathcal{F}[f(x)]=F(\lambda)$，常数 $a\neq 0$，则
$$
\mathcal{F}[f(ax)]=\frac{1}{|a|}F\left(\frac{\lambda}{a}\right).
$$

>   
> **定理** 设 $\mathcal{F}[f(x)]=F(\lambda)$，则
$$
\mathcal{F}[F(x)]=2\pi f(-\lambda).
$$
> 若 $f(x)$ 为偶函数，则 $\mathcal{F}[F(x)]=2\pi f(\lambda)$。

### 卷积与相关定理

>   
> **定义** 函数 $f_1(x)$ 与 $f_2(x)$ 的卷积定义为
$$
(f_1*f_2)(x)=\int_{-\infty}^{+\infty}f_1(\tau)f_2(x-\tau)\,\mathrm{d}\tau.
$$

>   
> **定理** 设 $\mathcal{F}[f_1(x)]=F_1(\lambda)$，$\mathcal{F}[f_2(x)]=F_2(\lambda)$，则
$$
\mathcal{F}[f_1(x)*f_2(x)]=F_1(\lambda)F_2(\lambda).
$$
> 同时，频域卷积定理为 $\mathcal{F}[f_1(x)f_2(x)]=\dfrac{1}{2\pi}F_1(\lambda)*F_2(\lambda)$。

>   
> **定理** 设 $F_1(\lambda)=\mathcal{F}[f_1(x)]$，$F_2(\lambda)=\mathcal{F}[f_2(x)]$，则
$$
\int_{-\infty}^{+\infty}f_1(x)f_2(x)\,\mathrm{d}x
  =\frac{1}{2\pi}\int_{-\infty}^{+\infty}F_1(\lambda)\overline{F_2(\lambda)}\,\mathrm{d}\lambda.
$$
> 特别地，当 $f_1=f_2=f$ 时，得到 Parseval 恒等式：
$$
\int_{-\infty}^{+\infty}|f(x)|^2\,\mathrm{d}x = \frac{1}{2\pi}\int_{-\infty}^{+\infty}|F(\lambda)|^2\,\mathrm{d}\lambda.
$$

>   
> **例 11：Parseval 恒等式求积分** 计算积分 $\displaystyle\int_{-\infty}^{+\infty}\frac{\sin^2 x}{x^2}\,\mathrm{d}x$。 **解：** 取 $f(x)=\dfrac{\sin x}{x}$，其 Fourier 变换为
$$
F(\lambda)=\begin{cases}
    \pi, & |\lambda|<1,\\
    0, & |\lambda|>1.
  \end{cases}
$$
> 由 Parseval 恒等式，
$$
\int_{-\infty}^{+\infty}\left(\frac{\sin x}{x}\right)^2\mathrm{d}x
  =\frac{1}{2\pi}\int_{-1}^{1}\pi^2\,\mathrm{d}\lambda = \pi.
$$

### 综合应用举例

>   
> **例 12：求解积分微分方程** 利用 Fourier 变换求解方程：
$$
x'(t)-\int_{-\infty}^{t}x(\tau)\,\mathrm{d}\tau = e^{-|t|}.
$$
> **解：** 设 $X(\lambda)=\mathcal{F}[x(t)]$，对两边取变换：
$$
i\lambda X(\lambda) - \frac{1}{i\lambda}X(\lambda) = \frac{2}{\lambda^2+1}.
$$
> 整理得 $X(\lambda) = \dfrac{-2i\lambda}{(\lambda^2+1)^2}$。求逆变换得
$$
x(t) = \frac{1}{2} t e^{-|t|}.
$$

## Laplace 变换

拉普拉斯变换（Laplace Transform）是算子振幅分析与线性系统理论中的强有力工具。它能够将时域中的微分、积分运算转化为复频域中的代数运算，从而极大地简化了解微分方程（组）的步骤。本章将详细讨论拉普拉斯变换的定义、核心性质、利用复变函数中的留数理论计算逆变换的方法，以及其在求解常微分方程初值问题中的典型应用。

—

### Laplace 变换的定义与存在定理

#### Laplace 变换的定义

>   
> **定义 Laplace 变换** 设函数 $f(t)$ 在 $t \ge 0$ 时有定义， $s = \sigma + i\omega$ 是一个复变量。若广义积分
$$
F(s) = \int_{0}^{+\infty} f(t) e^{-st} dt
$$
> 在 $s$ 的某一区域内收敛，则称此积分确定了一个复变量 $s$ 的函数 $F(s)$，并称 $F(s)$ 为函数 $f(t)$ 的**拉普拉斯变换**（或像函数），记为：
$$
F(s) = \mathcal{L}[f(t)]
$$
> 相应地，称 $f(t)$ 为 $F(s)$ 的**拉普拉斯逆变换**（或原函数），记为：
$$
f(t) = \mathcal{L}^{-1}[F(s)]
$$

#### Laplace 变换的存在定理

并非所有的函数都存在拉普拉斯变换。以下定理给出了积分收敛的充分条件。

>   
> **定理 存在定理** 若函数 $f(t)$ 满足下列条件：
>
> 1.  在 $t \ge 0$ 的任何有限区间上分段连续；
>
> 2.  当 $t \to +\infty$ 时，其增长速度是有限的，即存在常数 $M > 0$ 和 $c \ge 0$，使得：
$$
    |f(t)| \le M e^{ct} \quad (\text{称 } f(t) \text{ 为指数级增长函数})
$$
>
> 则当 $\text{Re}(s) > c$ 时，拉普拉斯变换积分必绝对收敛，且像函数 $F(s)$ 在右半平面 $\text{Re}(s) > c$ 内是解析的。

—

### Laplace 变换的基本性质

#### 线性性质

>   
> **定理 线性性质** 设 $\mathcal{L}[f_1(t)] = F_1(s)$，$\mathcal{L}[f_2(t)] = F_2(s)$，$\alpha, \beta$ 为任意常数，则：
$$
\mathcal{L}[\alpha f_1(t) + \beta f_2(t)] = \alpha F_1(s) + \beta F_2(s)
$$

#### 微分性质（时域微分）

>   
> **定理 微分定理** 设 $f(t)$ 连续，且其导数 $f'(t)$ 满足存在定理的条件，若 $\mathcal{L}[f(t)] = F(s)$，则：
$$
\mathcal{L}[f'(t)] = sF(s) - f(0)
$$
> 一般地，若 $f(t)$ 的各阶导数均满足条件，则有 $n$ 阶微分公式：
$$
\mathcal{L}[f^{(n)}(t)] = s^n F(s) - s^{n-1}f(0) - s^{n-2}f'(0) - \cdots - f^{(n-1)}(0)
$$

#### 积分性质（时域积分）

>   
> **定理 积分定理** 若 $\mathcal{L}[f(t)] = F(s)$，则其变上限积分的拉氏变换为：
$$
\mathcal{L}\left[ \int_{0}^{t} f(\tau) d\tau \right] = \frac{1}{s} F(s)
$$

#### 相似性质

>   
> **定理 相似性质** 若 $a$ 为正实数，且 $\mathcal{L}[f(t)] = F(s)$，则：
$$
\mathcal{L}[f(at)] = \frac{1}{a} F\left(\frac{s}{a}\right) \quad \left(\text{Re}\left(\frac{s}{a}\right) > c\right)
$$

>   
> **证明** 根据定义，有：
$$
\mathcal{L}[f(at)] = \int_{0}^{+\infty} f(at)e^{-st} dt
$$
> 令 $u = at$，则 $t = \frac{u}{a}$，$dt = \frac{1}{a}du$。代入积分式中得：
$$
\mathcal{L}[f(at)] = \int_{0}^{+\infty} f(u)e^{-s\frac{u}{a}} d\left(\frac{u}{a}\right) = \frac{1}{a} \int_{0}^{+\infty} f(u)e^{-\left(\frac{s}{a}\right)u} du = \frac{1}{a} F\left(\frac{s}{a}\right)
$$

**延伸推论：**

1.  若已知 $\mathcal{L}[f(t)] = F(s)$，则 $\mathcal{L}\left[f\left(\frac{t}{a}\right)\right] = aF(as)$。

2.  结合衰减性质（位移性质），可得：$\mathcal{L}\left[e^{at}f\left(\frac{t}{a}\right)\right] = aF(a(s-a))$。

#### 卷积性质

>   
> **定义 卷积** 设函数 $f(t)$ 与 $g(t)$ 在 $[0, +\infty)$ 上有定义，称积分
$$
\int_{0}^{t} f(\tau)g(t-\tau)d\tau \quad (t \ge 0)
$$
> 为函数 $f(t)$ 与 $g(t)$ 的**卷积**，记为 $f(t) * g(t)$。

卷积运算满足交换律，即：$f(t) * g(t) = g(t) * f(t)$。

>   
> **定理 卷积定理** 若 $\mathcal{L}[f(t)] = F(s)$，$\mathcal{L}[g(t)] = G(s)$，则两个函数时域卷积的拉普拉斯变换等于它们各自像函数的乘积：
$$
\mathcal{L}[f(t) * g(t)] = F(s) \cdot G(s)
$$

>   
> **证明** 由定义开展二重积分：
$$
\mathcal{L}[f(t) * g(t)] = \int_{0}^{+\infty} \left[ \int_{0}^{t} f(\tau)g(t-\tau)d\tau \right] e^{-st} dt = \int_{0}^{+\infty} f(\tau) d\tau \int_{\tau}^{+\infty} g(t-\tau)e^{-st} dt
$$
> 在内层积分中令 $u = t - \tau$，则 $t = u + \tau$，$dt = du$。积分限从 $[\tau, +\infty)$ 变为 $[0, +\infty)$：
$$
\mathcal{L}[f(t) * g(t)] = \int_{0}^{+\infty} f(\tau) d\tau \int_{0}^{+\infty} g(u)e^{-s(u+\tau)} du = \left( \int_{0}^{+\infty} f(\tau)e^{-s\tau} d\tau \right) \cdot \left( \int_{0}^{+\infty} g(u)e^{-su} du \right) = F(s)G(s)
$$

**逆变换应用：**
$$
\mathcal{L}^{-1}[F(s)G(s)] = f(t) * g(t) = \int_{0}^{t} f(\tau)g(t-\tau)d\tau
$$

#### 初值定理与终值定理

>   
> **定理 初值定理** 设 $\mathcal{L}[f(t)] = F(s)$，且 $\lim_{t \to 0^+} f(t)$ 存在，则：
$$
\lim_{t \to 0^+} f(t) = \lim_{s \to \infty} sF(s)
$$

>   
> **定理 终值定理** 设 $\mathcal{L}[f(t)] = F(s)$，若 $\lim_{t \to +\infty} f(t)$ 存在，且像函数 $F(s)$ 在右半复平面及虚轴上除原点外无奇点（即 $F(s)$ 的所有奇点均位于左半平面 $\text{Re}(s) < 0$ 或原点），则：
$$
\lim_{t \to +\infty} f(t) = \lim_{s \to 0} sF(s)
$$

—

### 用留数计算 Laplace 逆变换

>   
> **定理 留数反演定理** 设像函数 $F(s)$ 在整个扩充复平面上除去有限个孤立奇点 $s_1, s_2, \cdots, s_n$ 外处处解析，且满足条件 $\lim_{s \to \infty} F(s) = 0$。如果选取实数 $\beta$ 使得 $F(s)$ 的所有奇点都位于半平面 $\text{Re}(s) < \beta$ 内，则当 $t > 0$ 时，$F(s)$ 的拉普拉斯逆变换 $f(t)$ 可以表示为 $F(s)e^{st}$ 在其所有奇点处的留数之和：
$$
f(t) = \mathcal{L}^{-1}[F(s)] = \sum_{k=1}^{n} \text{Res}[F(s)e^{st}, s_k] \quad (t > 0)
$$

#### 典型极点处的留数计算法

1\. **单极点（一阶极点）：**
$$
\text{Res}[F(s)e^{st}, s_k] = \lim_{s \to s_k} (s - s_k)F(s)e^{st}
$$
2. **高阶极点（以 $m$ 阶极点为例）：**
$$
\text{Res}[F(s)e^{st}, s_k] = \frac{1}{(m-1)!} \lim_{s \to s_k} \frac{d^{m-1 biographical}}{ds^{m-1}} \left[ (s - s_k)^m F(s)e^{st} \right]
$$

—

### Laplace 变换的应用

拉普拉斯变换的基本应用逻辑是将时域的微分方程，通过导数的拉氏变换公式转化为关于 $Y(s)$ 的复频域代数方程，解出 $Y(s)$ 后再求其拉氏逆变换得到原微分方程的解。

#### 典型例题 1：求解高阶常微分方程初值问题

>   
> **例题** 求微分方程 $y'' - 2y' - 3y = te^{-t}$ 满足初始条件 $y|_{t=0} = 0, y'|_{t=0} = 1$ 的解。

>   
> **证明** 设 $\mathcal{L}[y(t)] = Y(s)$。已知 $\mathcal{L}[te^{-t}] = \frac{1}{(s+1)^2}$。 对方程两边同时取拉普拉斯变换：
$$
\left[ s^2Y(s) - s y(0) - y'(0) \right] - 2\left[ sY(s) - y(0) \right] - 3Y(s) = \frac{1}{(s+1)^2}
$$
> 代入初始条件 $y(0) = 0, y'(0) = 1$ 得：
$$
(s^2 - 2s - 3)Y(s) - 1 = \frac{1}{(s+1)^2}
$$
> 由于 $s^2 - 2s - 3 = (s-3)(s+1)$，故：
$$
(s-3)(s+1)Y(s) = 1 + \frac{1}{(s+1)^2} = \frac{(s+1)^2 + 1}{(s+1)^2}
$$
$$
Y(s) = \frac{1}{(s-3)(s+1)^3} + \frac{1}{(s-3)(s+1)}
$$
>
> 为了求 $y(t) = \mathcal{L}^{-1}[Y(s)]$，我们可以分别对两部分用留数反演定理或分式展开进行计算： 对于 $Y(s)$，其孤立奇点为 $s_1 = 3$（单极点）和 $s_2 = -1$（三阶极点）。 根据留数反演定理：
$$
y(t) = \text{Res}[Y(s)e^{st}, 3] + \text{Res}[Y(s)e^{st}, -1]
$$
> 经计算（或结合部分分式展开与时域卷积）可得原方程的唯一时域特解。

#### 典型例题 2：求解常微分方程组初值问题

>   
> **例题** 求解常微分方程组
$$
\begin{cases} x'' - y'' = e^t \\ x'' - 2y'' + y = 0 \end{cases}
$$
> 满足初始条件：$x(0) = 1, x'(0) = 0, y(0) = 0, y'(0) = 0$。

>   
> **证明** 设 $\mathcal{L}[x(t)] = X(s)$，$\mathcal{L}[y(t)] = Y(s)$。对方程组两边同时进行拉普拉斯变换： 因为 $x(0)=1$ 且其他初值均为 0，所以依据微分性质：
$$
\mathcal{L}[x''] = s^2X(s) - sx(0) - x'(0) = s^2X(s) - s
$$
$$
\mathcal{L}[y''] = s^2Y(s)
$$
> 代入原方程组得到其复频域代数方程组：
$$
\begin{cases} s^2X(s) - s - s^2Y(s) = \frac{1}{s-1} \\ s^2X(s) - s - 2s^2Y(s) + Y(s) = 0 \end{cases}
$$
>
> 两式相减（第一式减第二式）可以迅速消去变量 $X(s)$：
$$
s^2Y(s) - Y(s) = \frac{1}{s-1} \implies (s^2 - 1)Y(s) = \frac{1}{s-1}
$$
> 解得像函数 $Y(s)$ 的显式表达式：
$$
Y(s) = \frac{1}{(s+1)(s-1)^2}
$$
>
> 将其代回第一式，即可解出 $X(s)$。最终两变量的像函数形式为：
$$
\begin{cases} X(s) = \frac{1}{s^2} + \frac{1}{s^2(s-1)} + \frac{1}{s(s-1)^2(s+1)} \\ Y(s) = \frac{1}{(s+1)(s-1)^2} \end{cases}
$$
>
> 最后，利用拉普拉斯逆变换（部分分式展开法或高阶极点留数法）可得时域特解： 对于 $Y(s)$：$s=1$ 是二阶极点，$s=-1$ 是单极点。通过计算留数和反演可得：
$$
y(t) = \mathcal{L}^{-1}\left[\frac{1}{(s+1)(s-1)^2}\right] = \frac{1}{2}te^t - \frac{3}{4}e^t - \frac{1}{4}e^{-t} + 1
$$
> 同理对 $X(s)$ 每一项求逆变换即可解出 $x(t)$。

## Z 变换

在连续时间信号与系统分析中，拉普拉斯变换是将时域连续信号映射到复频域（$s$ 平面）的强有力工具。然而，在离散时间信号与数字信号处理（DSP）领域，我们需要处理的是离散时间序列。$Z$ 变换（Z-Transform）正是拉普拉斯变换在离散域的自然延伸，它将时域的离散序列映射到复平面（$z$ 平面）上，从而将时域的差分方程运算转化为离散复频域的代数运算，极大地简化了离散系统的分析与设计。

—

### Z 变换的定义与收敛域

#### Z 变换的定义

>   
> **定义 Z 变换** 设离散时间序列为 $x(n)$，其中 $n$ 为整数。定义 $x(n)$ 的**双边 $Z$ 变换**为：
$$
X(z) = \mathcal{Z}[x(n)] = \sum_{n=-\infty}^{+\infty} x(n) z^{-n}
$$
> 其中 $z$ 是一个复变量，$z = r e^{i\omega}$。
>
> 若序列在 $n < 0$ 时满足 $x(n) = 0$（即因果序列），则上述定义退化为**单边 $Z$ 变换**：
$$
X(z) = \mathcal{Z}[x(n)] = \sum_{n=0}^{+\infty} x(n) z^{-n}
$$

#### 收敛域（ROC）

由于 $Z$ 变换是以无穷级数的形式定义的，级数必须收敛才有数学意义。使得 $X(z)$ 绝对收敛的所有 $z$ 值的集合称为**收敛域**（Region of Convergence, 简称 ROC）。即满足：
$$
\sum_{n=-\infty}^{+\infty} |x(n) z^{-n}| < +\infty
$$
若令 $z = r e^{i\omega}$，则上述条件变为 $\sum_{n=-\infty}^{+\infty} |x(n)| r^{-n} < +\infty$。这表明收敛域仅取决于 $z$ 的模长 $r = |z|$，因此在复平面上，\*\*$Z$ 变换的收敛域通常是一系列同心圆环或圆外、圆内的区域\*\*。

根据序列 $x(n)$ 的时域特性，其收敛域通常分为以下几种情况：

1.  **有限长序列：** 仅在有限区间 $n_1 \le n \le n_2$ 内非零。其 ROC 通常为整个 $z$ 平面（可能除去 $z=0$ 或 $z=\infty$）。

2.  **因果序列（右边序列）：** 当 $n < n_0$ 时 $x(n) = 0$。其 ROC 为某个圆的外侧区域：$|z| > R_x$。

3.  **反因果序列（左边序列）：** 当 $n > n_0$ 时 $x(n) = 0$。其 ROC 为某个圆的内侧区域：$|z| < R_y$。

4.  **双边序列：** 左右两侧均无限延伸。其 ROC 为一个圆环区域：$R_x < |z| < R_y$（若 $R_x < R_y$ 级数才存在交集收敛）。

—

### Z 变换的基本性质

设 $\mathcal{Z}[x(n)] = X(z)$，收敛域为 $\text{ROC}_x$；$\mathcal{Z}[y(n)] = Y(z)$，收敛域为 $\text{ROC}_y$。

#### 线性性质

>   
> **定理 线性性质** 设 $a, b$ 为任意常数，则：
$$
\mathcal{Z}[a x(n) + b y(n)] = a X(z) + b Y(z) \quad (\text{ROC} \supseteq \text{ROC}_x \cap \text{ROC}_y)
$$

#### 时移性质（移位性质）

>   
> **定理 时移性质** 对于双边 $Z$ 变换，若 $m$ 为任意整数，则：
$$
\mathcal{Z}[x(n - m)] = z^{-m} X(z)
$$
>
> 对于单边 $Z$ 变换（设 $m > 0$），由于移位会导致部分序列值滑出或滑入积分限，其公式修正为：
$$
\begin{align*}
        \mathcal{Z}[x(n - m)] &= z^{-m} X(z) + \sum_{k=0}^{m-1} x(k-m) z^{-k} \quad (\text{时域右移/延迟}) \\
        \mathcal{Z}[x(n + m)] &= z^m \left[ X(z) - \sum_{k=0}^{m-1} x(k) z^{-k} \right] \quad (\text{时域左移/超前})
    
\end{align*}
$$

>   
> **证明** 根据定义，令 $m' = n - m$，则 $n = m' + m$：
$$
\mathcal{Z}[x(n - m)] = \sum_{n=-\infty}^{+\infty} x(n-m) z^{-n} = \sum_{m'=-\infty}^{+\infty} x(m') z^{-(m'+m)} = z^{-m} \sum_{m'=-\infty}^{+\infty} x(m') z^{-m'} = z^{-m} X(z)
$$

#### $z$ 域尺度变换（序列乘指数序列）

>   
> **定理 $z$ 域尺度变换** 若 $a$ 为非零复常数，则：
$$
\mathcal{Z}[a^n x(n)] = X\left(\frac{z}{a}\right) \quad (\text{新 ROC: } |a| \cdot \text{ROC}_x)
$$

#### 时域微分（$z$ 域求导性质）

>   
> **定理 $z$ 域求导性质** 序列乘以线性自变量 $n$ 对应于复频域的微分运算：
$$
\mathcal{Z}[n x(n)] = -z \frac{dX(z)}{dz}
$$

#### 时域卷积定理

时域卷积定理是数字线性时不变（LTI）系统级联与滤波分析的理论基石。

>   
> **定理 时域卷积定理** 两个离散序列的卷积定义为 $x(n) * y(n) = \sum_{k=-\infty}^{+\infty} x(k)y(n-k)$。其 $Z$ 变换等于各自像函数的乘积：
$$
\mathcal{Z}[x(n) * y(n)] = X(z) \cdot Y(z) \quad (\text{ROC} \supseteq \text{ROC}_x \cap \text{ROC}_y)
$$

—

### 逆 Z 变换的计算方法

求解原序列 $x(n) = \mathcal{Z}^{-1}[X(z)]$ 常见的有三种经典代数方法。

#### 1. 幂级数展开法（长除法）

由于 $X(z) = \sum x(n)z^{-n}$，若能将 $X(z)$ 写成关于 $z^{-1}$ 或 $z$ 的幂级数形式，则各项系数即为序列值 $x(n)$。在处理有理分式 $X(z) = \frac{P(z)}{Q(z)}$ 时，根据收敛域的指示，将分式进行多项式长除法展开：

- 若 ROC 为圆外区域 $|z| > R$（因果序列），则将分子分母按 $z$ 的降幂（或 $z^{-1}$ 的升幂）排列进行长除，得到 $X(z) = c_0 + c_1 z^{-1} + c_2 z^{-2} + \cdots$。

- 若 ROC 为圆内区域 $|z| < R$（反因果序列），则按 $z$ 的升幂排列进行长除。

#### 2. 部分分式展开法

当 $X(z)$ 是有理有理分式时，为了方便利用公式表，通常先对 $\frac{X(z)}{z}$ 进行部分分式展开（因为典型变换公式分子往往带 $z$）：
$$
\frac{X(z)}{z} = \frac{A_1}{z - p_1} + \frac{A_2}{z - p_2} + \cdots
$$
乘回 $z$ 得到 $X(z) = \sum \frac{A_k z}{z - p_k}$，再根据收敛域 ROC 结合基本变换对（如 $\mathcal{Z}[a^n u(n)] = \frac{z}{z-a}, |z|>|a|$）求出原序列。

#### 3. 留数计算法（复反演积分法）

根据围道积分定理，逆 $Z$ 变换的严格数学逆运算为：
$$
x(n) = \mathcal{Z}^{-1}[X(z)] = \frac{1}{2\pi i} \oint_{C} X(z) z^{n-1} dz
$$
其中 $C$ 是收敛域内的一条逆时针正向闭合围道。由柯西留数定理可得：

>   
> **定理 留数法求逆 Z 变换**
$$
x(n) = \sum_{k} \text{Res}[X(z) z^{n-1}, z_k]
$$
> 其中 $z_k$ 是函数 $X(z)z^{n-1}$ 在围道 $C$ **内部** 的所有孤立奇点。

\*注意：\* 随着 $n$ 取值的正负变化， $z=0$ 处可能会产生高阶极点，计算时通常需要分 $n \ge 0$ 和 $n < 0$ 讨论。

—

### Z 变换的应用：求解差分方程

线性常系数差分方程（LCCDE）是离散时间系统的时域数学模型。利用单边 $Z$ 变换的时移性质，可以非常优雅地解出包含初始条件的非齐次差分方程。

#### 典型例题

>   
> **例题** 已知一因果离散系统的差分方程为：
$$
y(n) - \frac{1}{2}y(n-1) = x(n)
$$
> 若激励信号 $x(n) = \left(\frac{1}{3}\right)^n u(n)$，且已知初始状态为 $y(-1) = 1$。求系统的全响应 $y(n)$。

>   
> **证明** 对差分方程两边同时求**单边 $Z$ 变换**。 根据单边时移性质，有 $\mathcal{Z}[y(n-1)] = z^{-1}Y(z) + y(-1)$。代入方程得：
$$
Y(z) - \frac{1}{2}\left[ z^{-1}Y(z) + y(-1) \right] = X(z)
$$
>
> 已知 $x(n) = \left(\frac{1}{3}\right)^n u(n)$，其 $Z$ 变换为 $X(z) = \frac{1}{1 - \frac{1}{3}z^{-1}} = \frac{z}{z - \frac{1}{3}}$，收敛域为 $|z| > \frac{1}{3}$。 将初始条件 $y(-1) = 1$ 和 $X(z)$ 代入复频域代数方程中：
$$
\left(1 - \frac{1}{2}z^{-1}\right)Y(z) - \frac{1}{2} = \frac{1}{1 - \frac{1}{3}z^{-1}}
$$
$$
\left(1 - \frac{1}{2}z^{-1}\right)Y(z) = \frac{1}{2} + \frac{1}{1 - \frac{1}{3}z^{-1}} = \frac{\frac{1}{2}\left(1 - \frac{1}{3}z^{-1}\right) + 1}{1 - \frac{1}{3}z^{-1}} = \frac{\frac{3}{2} - \frac{1}{6}z^{-1}}{1 - \frac{1}{3}z^{-1}}
$$
>
> 两边同除以 $\left(1 - \frac{1}{2}z^{-1}\right)$，得到系统全响应的像函数 $Y(z)$：
$$
Y(z) = \frac{\frac{3}{2} - \frac{1}{6}z^{-1}}{\left(1 - \frac{1}{2}z^{-1}\right)\left(1 - \frac{1}{3}z^{-1}\right)}
$$
> 上下同乘 $z^2$，将其整理为关于 $z$ 的有理分式以便于展开：
$$
Y(z) = \frac{z\left(\frac{3}{2}z - \frac{1}{6}\right)}{\left(z - \frac{1}{2}\right)\left(z - \frac{1}{3}\right)} \implies \frac{Y(z)}{z} = \frac{\frac{3}{2}z - \frac{1}{6}}{\left(z - \frac{1}{2}\right)\left(z - \frac{1}{3}\right)}
$$
>
> 利用部分分式展开法：
$$
\frac{Y(z)}{z} = \frac{A}{z - \frac{1}{2}} + \frac{B}{z - \frac{1}{3}}
$$
> 计算留数系数 $A$ 和 $B$：
$$
A = \left. \frac{\frac{3}{2}z - \frac{1}{6}}{z - \frac{1}{3}} \right|_{z=\frac{1}{2}} = \frac{\frac{3}{4} - \frac{1}{6}}{\frac{1}{2} - \frac{1}{3}} = \frac{\frac{7}{12}}{\frac{1}{6}} = \frac{7}{2}
$$
$$
B = \left. \frac{\frac{3}{2}z - \frac{1}{6}}{z - \frac{1}{2}} \right|_{z=\frac{1}{3}} = \frac{\frac{1}{2} - \frac{1}{6}}{\frac{1}{3} - \frac{1}{2}} = \frac{\frac{1}{3}}{-\frac{1}{6}} = -2
$$
>
> 于是有：
$$
\frac{Y(z)}{z} = \frac{\frac{7}{2}}{z - \frac{1}{2}} - \frac{2}{z - \frac{1}{3}} \implies Y(z) = \frac{7}{2}\frac{z}{z - \frac{1}{2}} - 2\frac{z}{z - \frac{1}{3}}
$$
>
> 由于系统和输入信号均为因果的，故响应的收敛域为 $|z| > \frac{1}{2}$。逐项求逆 $Z$ 变换，最终得到时域全响应解为：
$$
y(n) = \left[ \frac{7}{2}\left(\frac{1}{2}\right)^n - 2\left(\frac{1}{3}\right)^n \right] u(n)
$$

## 场论

场论（Field Theory）是研究物理量在空间中分布与变化规律的数学工具，广泛应用于电磁学、流体力学与理论物理中。空间中的场主要分为标量场（如温度场、电势场）和矢量场（如流速场、电场）。本章将引入哈密顿算子（$\nabla$），系统阐述梯度的几何意义，散度与旋度的物理本质，并深入讨论高斯定理与斯托克斯定理这两大连接低维积分与高维积分的核心纽带。

—

### 标量场的梯度

#### 方向导数

标量场中某一点的变化率不仅与位置有关，还与选取的方向有关。

>   
> **定义 方向导数** 设标量函数 $u = f(x, y, z)$ 在点 $P(x, y, z)$ 的某邻域内有定义。$\vec{l} = (\cos\alpha, \cos\beta, \cos\gamma)$ 是从点 $P$ 出发的具有方向余弦的单位方向矢量。若极限
$$
\frac{\partial u}{\partial l} = \lim_{\Delta t \to 0} \frac{f(x + \Delta t\cos\alpha, y + \Delta t\cos\beta, z + \Delta t\cos\gamma) - f(x, y, z)}{\Delta t}
$$
> 存在，则称该极限为标量场 $u$ 在点 $P$ 沿方向 $\vec{l}$ 的**方向导数**。

若 $u = f(x, y, z)$ 可微，则其沿 $\vec{l}$ 的方向导数可以通过偏导数线性组合求得：
$$
\frac{\partial u}{\partial l} = \frac{\partial u}{\partial x}\cos\alpha + \frac{\partial u}{\partial y}\cos\beta + \frac{\partial u}{\partial z}\cos\gamma
$$

#### 梯度的定义与几何意义

为了寻找使得方向导数取得最大值的方向，我们引入梯度的概念。

>   
> **定义 梯度** 设标量场 $u = f(x, y, z)$ 在区域内各点存在一阶偏导数，则称矢量
$$
\text{grad}\,u = \nabla u = \frac{\partial u}{\partial x}\vec{i} + \frac{\partial u}{\partial y}\vec{j} + \frac{\partial u}{\partial z}\vec{k}
$$
> 为标量场 $u$ 在该点处的**梯度**（Gradient）。其中 $\nabla = \vec{i}\frac{\partial}{\partial x} + \vec{j}\frac{\partial}{\partial y} + \vec{k}\frac{\partial}{\partial z}$ 称为**哈密顿算子**（Nabla 算子）。

**几何与物理意义：**

1.  **最大变化率：** 方向导数可写为内积形式 $\frac{\partial u}{\partial l} = \nabla u \cdot \vec{l} = |\nabla u| \cos\theta$。因此，当 $\vec{l}$ 与 $\nabla u$ 同向时（$\theta=0$），方向导数取得最大值 $|\nabla u|$。这表明：**梯度方向是标量场数值增长最快的法向方向，梯度的模长等于该方向的最大增长率**。

2.  **正交性：** 标量场在空间中形成的等值面群为 $f(x, y, z) = C$。梯度矢量 $\nabla u$ 严格垂直于过该点的等值面，即**梯度恒指向等值面的正法线方向**。

—

### 矢量场的散度与旋度

设矢量场在直角坐标系下的表达式为：$\vec{A}(x, y, z) = P(x, y, z)\vec{i} + Q(x, y, z)\vec{j} + R(x, y, z)\vec{k}$。

#### 散度的定义与物理本质

>   
> **定义 散度** 称标量
$$
\text{div}\,\vec{A} = \nabla \cdot \vec{A} = \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z}
$$
> 为矢量场 $\vec{A}$ 的**散度**（Divergence）

**物理本质：** 散度是一个标量，表征了矢量场在某点处的“源头”或“汇”的强度。

- $\nabla \cdot \vec{A} > 0$：该点有正源，通量向外流出。

- $\nabla \cdot \vec{A} < 0$：该点有负源（汇），通量向内流入。

- $\nabla \cdot \vec{A} = 0$：该点无源。若在某区域内处处有 $\nabla \cdot \vec{A} = 0$，则称该场为**无源场**或**管流场**。

#### 旋度的定义与物理本质

>   
> **定义 旋度** 称矢量
$$
\text{rot}\,\vec{A} = \text{curl}\,\vec{A} = \nabla \times \vec{A} = \begin{vmatrix} \vec{i} & \vec{j} & \vec{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ P & Q & R \end{vmatrix}
$$
> 展开形式为：
$$
\nabla \times \vec{A} = \left( \frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z} \right)\vec{i} + \left( \frac{\partial P}{\partial z} - \frac{\partial R}{\partial x} \right)\vec{j} + \left( \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} \right)\vec{k}
$$
> 为矢量场 $\vec{A}$ 的**旋度**（Curl）。

**物理本质：** 旋度是一个矢量，表征了矢量场在某点处的旋转微观效应。它的方向是流体旋转微元旋转轴的法向（符合右手螺旋定则），模长等于该点最大环流面密度。若在某区域内处处有 $\nabla \times \vec{A} = \vec{0}$，则称该场为**无旋场**或**保守场**。

—

### 场论两大核心积分定理

#### 高斯散度定理

高斯定理建立了闭合曲面积分（宏观通量）与体积分（微观散度累加）之间的桥梁。

>   
> **定理 高斯散度定理 (Gauss’s Theorem)** 设空间有界闭区域 $V$ 的边界为分片光滑的闭曲面 $S$，$\vec{n}$ 是 $S$ 的外法线单位矢量。若矢量场 $\vec{A}$ 在 $V$ 上有一阶连续偏导数，则有：
$$
\oiint_{S} \vec{A} \cdot \vec{n}\, dS = \iiint_{V} (\nabla \cdot \vec{A})\, dV
$$
> 即通过闭合曲面的总通量等于该曲面所包围体积内散度的总和。

#### 斯托克斯定理

斯托克斯定理建立了沿闭合曲线的线积分（环流）与以该曲线为边界的开放曲面积分（旋度通量）之间的联系。

>   
> **定理 斯托克斯定理 (Stokes’s Theorem)** 设 $S$ 为分片光滑的开放曲面，其边界为分段光滑的空间右旋闭合曲线 $\Gamma$。$\vec{n}$ 为曲面 $S$ 的单位法矢量，且 $\Gamma$ 的正方向与 $\vec{n}$ 满足右手螺旋法则。若 $\vec{A}$ 在包含 $S$ 的开区域内有一阶连续偏导数，则：
$$
\oint_{\Gamma} \vec{A} \cdot d\vec{r} = \iint_{S} (\nabla \times \vec{A}) \cdot \vec{n}\, dS
$$
> 即矢量沿闭合回路的环流等于该回路所张曲面上旋度的总通量。

—

### 哈密顿算子的代数运算法则

$\nabla$ 算子具有双重身份：一方面它具有**微分算子**的特征（满足乘积微分求导律）；另一方面它具有**几何矢量**的特征（满足点积、叉积的代数规律）。

#### 一阶算子核心恒等式

设 $u, v$ 为标量场，$\vec{A}, \vec{B}$ 为矢量场，以下恒等式在线性场论推导中被频繁使用：

>   
> **定理 乘积性质恒等式**
$$
\begin{align}
        \nabla (uv) &= u \nabla v + v \nabla u \\
        \nabla \cdot (u \vec{A}) &= u (\nabla \cdot \vec{A}) + \nabla u \cdot \vec{A} \\
        \nabla \times (u \vec{A}) &= u (\nabla \times \vec{A}) + \nabla u \times \vec{A} \\
        \nabla \cdot (\vec{A} \times \vec{B}) &= \vec{B} \cdot (\nabla \times \vec{A}) - \vec{A} \cdot (\nabla \times \vec{B})
    
\end{align}
$$

#### 二阶算子与拉普拉斯算子

将 $\nabla$ 算子两次作用于场，可以得到五个主要的二阶场运算，其中有两项因“矢量几何恒等性”（如 $\vec{a}\times\vec{a}=\vec{0}$）而恒等于 0：

>   
> **定理 二阶核心恒等式**
>
> 1.  **梯度的旋度恒为零（保守场必无旋）：**
$$
    \nabla \times (\nabla u) = \vec{0} \quad (\text{rot}(\text{grad}\,u) = \vec{0})
$$
>
> 2.  **旋度的散度恒为零（旋涡场必无源）：**
$$
    \nabla \cdot (\nabla \times \vec{A}) = 0 \quad (\text{div}(\text{rot}\,\vec{A}) = 0)
$$

另外，梯度的散度 $\nabla \cdot (\nabla u)$ 引入了一个极其核心的算子——**拉普拉斯算子**（Laplacian），记为 $\nabla^2$ 或 $\Delta$：
$$
\nabla \cdot (\nabla u) = \nabla^2 u = \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} + \frac{\partial^2 u}{\partial z^2}
$$

—

### 典型例题解析

>   
> **例题** 已知标量场为 $u = x^2 y z^3$，求：
>
> 1.  在点 $P(1, 2, 1)$ 处的梯度 $\nabla u$；
>
> 2.  在点 $P(1, 2, 1)$ 处沿从点 $P$ 指向点 $Q(2, 4, 3)$ 方向的方向导数 $\frac{\partial u}{\partial l}$。

>   
> **证明** (1) 首先求标量场 $u$ 在任意点处的各阶偏导数：
$$
\frac{\partial u}{\partial x} = 2xyz^3, \quad \frac{\partial u}{\partial y} = x^2z^3, \quad \frac{\partial u}{\partial z} = 3x^2yz^2
$$
> 将点 $P(1, 2, 1)$ 代入上述偏导数中，可得：
$$
\left.\frac{\partial u}{\partial x}\right|_P = 2(1)(2)(1)^3 = 4, \quad \left.\frac{\partial u}{\partial y}\right|_P = (1)^2(1)^3 = 1, \quad \left.\frac{\partial u}{\partial z}\right|_P = 3(1)^2(2)(1)^2 = 6
$$
> 故点 $P$ 处的梯度为：
$$
\nabla u|_P = 4\vec{i} + \vec{j} + 6\vec{k}
$$
>
> \(2\) 算出从点 $P$ 指向点 $Q$ 的位移矢量 $\vec{PQ}$：
$$
\vec{PQ} = (2-1)\vec{i} + (4-2)\vec{j} + (3-1)\vec{k} = \vec{i} + 2\vec{j} + 2\vec{k}
$$
> 其模长为 $|\vec{PQ}| = \sqrt{1^2 + 2^2 + 2^2} = 3$。进而得到该方向的单位方向矢量 $\vec{l}$：
$$
\vec{l} = \frac{\vec{PQ}}{|\vec{PQ}|} = \frac{1}{3}\vec{i} + \frac{2}{3}\vec{j} + \frac{2}{3}\vec{k}
$$
> 根据方向导数与梯度的点积映射关系：
$$
\frac{\partial u}{\partial l} = \nabla u|_P \cdot \vec{l} = (4, 1, 6) \cdot \left(\frac{1}{3}, \frac{2}{3}, \frac{2}{3}\right) = 4\cdot\frac{1}{3} + 1\cdot\frac{2}{3} + 6\cdot\frac{2}{3} = \frac{4 + 2 + 12}{3} = 6
$$
> 因此，场在点 $P$ 沿 $\vec{PQ}$ 方向的方向导数为 $6$。

这里是附录内容（例如常用积分表、变换性质汇总等）。附录章节样式已由模板在 ‘‘ 后自动切换为「附录 1 / 附录 1.1」格式。
