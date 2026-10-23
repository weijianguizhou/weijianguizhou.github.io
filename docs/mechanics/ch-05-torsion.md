---
title: 第五章 扭转
description: 第五章 扭转 · 材料力学学习笔记
---

# 第五章 扭转

## 5.1 受力与变形特点

### 5.1.1 受力特点

外力偶作用面与杆件横截面平行。

### 5.1.2 变形特点

纵向线转过一角度，产生切应变（剪切角）。杆件横截面绕轴线发生相对转动。

## 5.2 外力偶矩的计算

### 5.2.1 直接计算

- $M_e=F\cdot d$（作用于盘上的力偶）
- $m=(F_1-F_2)\cdot\dfrac{D}{2}$（皮带传动）

### 5.2.2 按输入功率和转速计算

已知轴的转速为 $n$ (r/min)，输出功率为 $P$ (kW)，求外力偶矩 $M_e$：

$$
\begin{aligned}
P &= \frac{dW}{dt}=\frac{M_e\,d\varphi}{dt}=M_e\omega\\
P\times 1000 &= M_e\cdot\frac{2\pi n}{60}\\
M_e &= \frac{60000P}{2\pi n}\approx 9550\frac{P}{n}\quad(\text{N}\cdot\text{m})
\end{aligned}
$$

$$
M_e=\frac{60000P}{2\pi n}\approx 9550\frac{P}{n}\quad(\text{N}\cdot\text{m})
$$

**结论：** 即低速轴更粗，高速轴更细。

## 5.3 圆轴扭转时的应力与强度分析

### 5.3.1 纯剪切与薄壁圆筒

对于薄壁圆筒（壁厚 $t\le\dfrac{r_0}{10}$）：

::: warning 扭转假设
圆周线大小、间距、形状不变；纵向线倾斜同一角度。
:::

$$
\tau=\frac{T}{2\pi r_0^2t}
$$

## 5.4 切应力互等定理

::: tip 切应力互等定理
在相互垂直的两个平面上，切应力必然成对出现，且数值相等、方向垂直于两平面的交线。其方向表现为：两个切应力要么同时指向交线，要么同时背离交线。
:::

### 5.4.1 力学本质

该定理是由单元体的**力矩平衡条件**（$\sum M_0=0$）推导得出的。

- **在扭转中的体现：** 当圆轴受扭时，横截面上产生的切应力 $\tau$ 必然伴随着纵向截面（过轴线的截面）上大小相等的切应力。
- **破坏现象：** 对于木材等纵向抗剪能力较弱的材料，在受扭时常沿纵向裂开，这就是切应力互等定理的直观体现。

### 5.4.2 纯剪切状态

当单元体的各个面上只有切应力而无正应力时，称该点处于**纯剪切 (Pure Shear)** 状态。

### 5.4.3 剪切虎克定律

$$
\tau=G\gamma,\quad G=\frac{E}{2(1+\mu)}
$$

### 5.4.4 圆轴扭转应力公式推导

1. **几何关系：** $\gamma_\rho=\rho\dfrac{d\varphi}{dx}=\rho\theta$（切应变与半径 $\rho$ 成正比）
2. **物理关系：** $\tau_\rho=G\gamma_\rho=G\rho\dfrac{d\varphi}{dx}$
3. **静力学关系：** $T=\displaystyle\int_A\tau_\rho\cdot\rho\,dA=G\dfrac{d\varphi}{dx}\int_A\rho^2dA=GI_p\dfrac{d\varphi}{dx}$

### 5.4.5 应力公式

横截面上任意一点的切应力：

$$
\tau_\rho=\frac{T\rho}{I_p}
$$

横截面上的最大切应力（边缘点 $\rho=R$）：

$$
\tau_{\max}=\frac{TR}{I_p}=\frac{T}{W_t}
$$

其中 $I_p$ 为极惯性矩，$W_t=\dfrac{I_p}{R}$ 为抗扭截面模量。

$$
I_p=\int_A\rho^2dA,\quad W_t=\frac{I_p}{R}
$$

### 5.4.6 截面几何参数

- **圆轴：** $I_p=\dfrac{\pi d^4}{32},\quad W_t=\dfrac{\pi d^3}{16}$
- **圆环：** $I_p=\dfrac{\pi(D^4-d^4)}{32},\quad W_t=\dfrac{\pi(D^4-d^4)}{16D}$

## 5.5 圆轴扭转变形与刚度计算

### 5.5.1 变形公式

- **单位长度扭转角：**

    $$
    \theta=\frac{d\varphi}{dx}=\frac{T}{GI_p}
    $$

- **相对扭转角 $\varphi$：**
    1. 阶梯轴/分段等扭矩：$\varphi=\sum_{i=1}^{n}\dfrac{T_il_i}{G_iI_{pi}}$
    2. 变截面或连续变扭矩：$\varphi=\int_0^l\dfrac{T(x)}{GI_p(x)}\,dx$

$GI_p$ 称为杆的**抗扭刚度**。

### 5.5.2 强度条件与刚度条件

1. **强度条件：** $\tau_{\max}=\dfrac{T_{\max}}{W_t}\le[\tau]$
2. **刚度条件：** $\theta_{\max}=\dfrac{T_{\max}}{GI_p}\cdot\dfrac{180}{\pi}\le[\theta]\quad(^\circ/\text{m})$
