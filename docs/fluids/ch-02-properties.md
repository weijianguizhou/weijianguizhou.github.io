---
title: 第二章 流体的物理性质
description: 连续介质模型、粘性、压缩性，体积力与表面力，以及界面现象（表面张力、接触角、毛细现象）
---

# 第二章 流体的物理性质

## 流体的连续介质模型
什么是固体？什么是流体？

初高中我们从分子间距离，也就是微观的角度去进行分类和理解。

流体力学研究的是宏观的性质，我们从宏观的视角去重新认识流体。

按**能否通过静止变形抵抗剪切**，对三态作宏观区分：

| 分类 | 能否通过静止变形抵抗剪切 | 固定形状 | 固定体积 |
| :--- | :---: | :---: | :---: |
| 固体 | 能 | 有 | 有 |
| 液体（流体） | 不能 | 无 | 有 |
| 气体（流体） | 不能 | 无 | 无 |

**流体的宏观性质：** 没有固定的形状，不一定具有固定的体积，且不能通过静止变形抵抗剪切。

**流体的分子输运性质：** 通过随机运动交换质量，动量，能量。对应的宏观效应是扩散，粘性和热传导。

### 连续介质模型
1. 流体是连续分布的物质，它可以无限分割为具有一定质量的宏观微元体（物理模型）

2. 在不发生化学反应和离解等非平衡热力学过程的运动流体中，微元体内流体状态服从热力学关系(仅有两个热力学参数是独立的，且与流体的历史无关)；

3. 除特殊面（界面、激波等）外，流体的力学和热力学状态参数在时空中是连续分布的，并且通常认为是无限可微的。

**连续介质模型的适用范围：** 流体的运动尺度远远大于流体分子运动的平均自由程。
而王先智《物理流体力学》给出了流体力学适用条件为：体积元尺寸比分子尺寸大两到三个数量级。

为了衡量连续介质模型是否适用，给出了
::: definition 努森数

$$
Kn=\frac{\lambda}{L}
$$

即分子自由程/流动特征长度
:::

<Figure src="/fluids/scale-kn.webp" alt="空间尺度与 Kn 数" caption="图 2.1　空间尺度与 Kn 数" />

### 流体微团及流体质点
#### 流体微团
::: definition 流体微团
把流体无限分割为具有一定质量的微元，它是研究流体运动的最小单元，称为“流体微团”
:::

::: remark 注
流体微团应是宏观上无限小，微观上无限大的质量体
:::

#### 流体质点
当不需要考虑流体微团的体积和变形，只研究它的位移和各个物理状态时，我们可以把它视作没有体积的质点，这时我们称流体微团为流体质点。

#### 流体物理量
空间任一点上的流体物理量（如密度、温度、速度等）是指位于该点上的流体质点的物理量，是宏观平均量的极限值。

如：流体在某一点上的密度定义为：

$$
\rho(P)=\lim _{\Delta V \rightarrow 0} \frac{\Delta M}{\Delta V}
$$

根据连续介质模型，流体中每一点都被相应的流体质点所占据，流体质点可以用时空中的一个点$(\boldsymbol{x},t)$来标记 ，因此流体宏观物性的不均匀性，可以用时空变量$(\boldsymbol{x},t)$的函数来描述，即是一个**场函数**。

## 流体的基本性质
### 流体的易流动性
流体在任意微小的剪切力作用下发生连续不断变形的性质。这是流体的本质属性。即流体无法通过静止变形抵抗剪切。

::: info 注
静止流体中**不存在切应力**。
:::

### 流体的粘性
::: definition 粘性
流体运动时，流体微团之间具有抵抗相互滑移运动的属性，称为流体的粘性。
:::

粘性是流体的固有属性之一，不论是静止流体还是运动流体都具有粘性。

**无滑移边界：** 物体表面的流体速度总是与物体速度一致。

::: theorem 牛顿内摩擦定律

$$
\tau=\mu\frac{dU}{dy}
$$

- $\mu$:动力黏性系数
- 适用范围：平行流
:::

**动力粘性系数$\mu=\mu(\theta)$**
是流体粘性大小的一种度量，它取决于流体的种类和状态，与温度$\theta$有很大关系，而与压力关系不大

后面还会用到**运动粘性系数$\nu$：**

$$
\nu=\frac{\mu}{\rho}=\nu(\theta,\rho)
$$

常温常压下：
- 液体：$\theta \uparrow \quad \mu \downarrow \quad \rho \downarrow \quad v \downarrow$
- 气体：$\theta \uparrow \quad \mu \uparrow \quad \rho \downarrow \quad v \uparrow$

::: info 与 Hooke 定律的类比
牛顿内摩擦定律中切应力与**变形速率**（速度梯度）呈线性关系，其地位相当于固体的 Hooke 定律（应力与应变成线性）。但并非所有流体都满足该线性关系，不满足者称为**非牛顿流体**。
:::

### 流体的压缩性
由于压强变化而引起流体体积变化的性质

分液体和气体讨论：
#### 液体
**体积压缩系数：** 在一定温度下，单位压强增量引起的流体体积的相对变化量。

$$
\beta=-\frac{1}{V}\left(\frac{\partial V}{\partial p}\right)_{T}=\frac{1}{\rho}\left(\frac{\mathrm{~d} \rho}{\mathrm{~d} p}\right)_{T} \quad \mathrm{M}^{2} / \mathrm{N}
$$

**体积弹性模量：**$E=\frac{1}{\beta}$

#### 气体
**理想气体状态方程：**

$$
pV=mR\theta \quad\Longleftrightarrow\quad p=\rho R\theta
$$

（$m$ 为气体质量，由 $\rho=m/V$ 两种形式等价）
- R:气体常数（空气：R=287 $J/(kg\cdot K)$

**不可压缩流体：** 流体运动过程中密度相对变化微小的流体

一般情况下，液体的密度几乎不随压强变化，视为不可压流体.

气体视为可压缩的，但气体速度远小于当地音速时，视为不可压。

### 理想流体
**粘性系数等于零**的流体称为理想流体。理想流体也不考虑流体的扩散和热传导性质。
- 人们为简化实际问题所提出的的一种抽象模型
- 可用于粘性系数较小、远离固壁、速度梯度较小情况

## 作用在流体上的体积力和表面力
在流体中，任取一流体微团，其上受到两种外力：
- 第一种外力作用在流体微团的质心上，与流体微团的体积成正比，称为体积力，属于非接触力；
- 第二种外力是周围流体或物体作用在流体微团表面上的力，与力的作用面大小成正比，称为表面力，是接触力。

### 体积力和体积力强度
#### 几种体积力
1. 地球引力场中流体微团受到的引力与它的质量成正比

$$
\left.\begin{array}{l}
\delta \boldsymbol{G}=\boldsymbol{g} \delta m \\
\delta m=\rho \delta V
\end{array}\right\} \Rightarrow \delta \boldsymbol{G}=\rho \underline{\boldsymbol{g}} \delta V
$$

2. 流体在非惯性坐标系中运动时，受到的惯性力

$$
\delta \boldsymbol{F}=-\boldsymbol{a} \delta m=-\rho \underline{\boldsymbol{a}} \delta V
$$

3. 带电质点在静电场中运动时，受到的静电力

$$
\delta \boldsymbol{F}=q \boldsymbol{E} \delta V
$$

#### 体积力强度
流体微团单位体积上作用的体积力称为体积力强度

$$
\boldsymbol{f}_{V}=\lim _{\delta V \rightarrow 0} \frac{\delta \boldsymbol{F}}{\delta V}
$$

#### 体积力合力及合力矩（有限体积的流体）
- 主失：$\boldsymbol{F}=\int_{V} \boldsymbol{f}_{V} \mathrm{~d} V$
- 主矩：$\boldsymbol{M}=\int_{V} \boldsymbol{r} \times \boldsymbol{f}_{V} \mathrm{~d} V$

### 表面力和应力
#### 定义:
单位面积上的表面力称为称为“应力”（矢量）

$$
\boldsymbol{T}(\boldsymbol{n})=\lim _{\delta A \rightarrow 0} \frac{\delta \boldsymbol{F}}{\delta A}
$$

<Figure src="/fluids/stress-vector.webp" alt="应力矢量" caption="图 2.2　应力矢量" />

**注意：**
1. 应力和它的作用面的方向有关；
2. $\boldsymbol{T}(\boldsymbol{n})$是向量，可分解为沿作用面的法向分量（正应力）和切向分量（切应力）。
   - 正应力：$T(\boldsymbol{n}, \boldsymbol{n})=\boldsymbol{T}(\boldsymbol{n}) \cdot \boldsymbol{n}$
   - 切应力：$T(\boldsymbol{n}, \boldsymbol{t})=\boldsymbol{T}(\boldsymbol{n}) \cdot \boldsymbol{t}$
   - 切应力：$T(\boldsymbol{n}, \boldsymbol{s})=\boldsymbol{T}(\boldsymbol{n}) \cdot \boldsymbol{s}$

### 一点上的应力张量及其性质
#### 一点的应力状态
一点上三个相互垂直平面上的应力向量称为一点的应力状态

只要知道一点的应力状态，就可以确定通过该点任意面上的应力
<Figure src="/fluids/stress-state.webp" alt="一点的应力状态" caption="图 2.3　一点的应力状态" />

采用指标表示:

$$
\left\{\begin{array}{l}
\boldsymbol{T}\left(\boldsymbol{e}_{i}\right)=\boldsymbol{T}_{i} \quad \boldsymbol{T}\left(-\boldsymbol{e}_{i}\right)=-\boldsymbol{T}_{i} \\
\boldsymbol{n}=n_{1} \boldsymbol{e}_{1}+n_{2} \boldsymbol{e}_{2}+n_{3} \boldsymbol{e}_{3}=n_{i} \boldsymbol{e}_{i}
\end{array}\right.
$$

投影关系:

$$
\delta A_{i}=\delta A n_{i}
$$

平衡方程（用牛顿第二定律推导）：

$$
\boldsymbol{T}(\boldsymbol{n})=\boldsymbol{T}_{1} n_{1}+\boldsymbol{T}_{2} n_{2}+\boldsymbol{T}_{3} n_{3}=n_{i} \boldsymbol{T}_{i}
$$

#### 应力张量分量
$\boldsymbol{T}(\boldsymbol{n})=n_{i} \boldsymbol{T}_{i}$
一个向量可分解为三个分量

$$
\left.\begin{array}{l}
\boldsymbol{T}_{1}=T_{11} \boldsymbol{e}_{1}+T_{12} \boldsymbol{e}_{2}+T_{13} \boldsymbol{e}_{3}=T_{1 j} \boldsymbol{e}_{j} \\
\boldsymbol{T}_{2}=T_{21} \boldsymbol{e}_{1}+T_{22} \boldsymbol{e}_{2}+T_{23} \boldsymbol{e}_{3}=T_{2 j} \boldsymbol{e}_{j} \\
\boldsymbol{T}_{3}=T_{31} \boldsymbol{e}_{1}+T_{32} \boldsymbol{e}_{2}+T_{33} \boldsymbol{e}_{3}=T_{3 j} \boldsymbol{e}_{j}
\end{array}\right\} \boldsymbol{T}_{i}=T_{i j} \boldsymbol{e}_{j}
$$

一点的应力状态还可以用九个代数值组成的矩阵表示:

$$
\left[T_{i j}\right]=\left[\begin{array}{lll}
T_{11} & T_{12} & T_{13} \\
T_{21} & T_{22} & T_{23} \\
T_{31} & T_{32} & T_{33}
\end{array}\right]
$$

第一个指标代表作用面，第二个指标代表应力分量

于是任意面上的应力可表示为

$$
\boldsymbol{T}(\boldsymbol{n})=n_{i} \boldsymbol{T}_{i}=n_{i} T_{i j} \boldsymbol{e}_{j}
$$

即 $\boldsymbol{T}(\boldsymbol{n})$ 的分量就是把 $n_{i} T_{i j}$ 作为自由指标 $j$ 写开。

::: theorem 切应力互等定理

$$
T_{i j}=T_{j i}
$$

应力张量是**对称张量**，因此九个分量中只有六个是独立的。
:::

**说明：** 该定理由 0 阶流体微团（点的单元体）的力矩平衡给出。在 $x_{1} O x_{2}$ 平面内取单元体 $d x_{1} d x_{2}$，设两个剪应力分量的大小分别为 $T_{12}$、$T_{21}$，则它们对单元体质心的力矩分别为

$$
T_{12} d x_{2} d x_{3} \cdot \frac{d x_{1}}{2}, \quad T_{21} d x_{1} d x_{3} \cdot \frac{d x_{2}}{2}
$$

而两者转向相反，由转动平衡（合力矩为零）可得

$$
T_{12}=T_{21}
$$

其余两对分量同理，合起来即 $T_{i j}=T_{j i}$。

#### 应力张量实体
以上是应力的分量形式，把分量收起来写成坐标无关的实体形式：

$$
\boldsymbol{T}(\boldsymbol{n})=n_{i} \boldsymbol{T}_{i}=n_{i} T_{i j} \boldsymbol{e}_{j}=\left(n_{k} \delta_{i k}\right) T_{i j} \boldsymbol{e}_{j}=n_{k}\left(\boldsymbol{e}_{k} \cdot \boldsymbol{e}_{i}\right) T_{i j} \boldsymbol{e}_{j}=n_{k} \boldsymbol{e}_{k} \cdot\left(T_{i j} \boldsymbol{e}_{i} \boldsymbol{e}_{j}\right)=\boldsymbol{n} \cdot\left(T_{i j} \boldsymbol{e}_{i} \boldsymbol{e}_{j}\right)
$$

::: definition 应力张量实体

$$
\boldsymbol{T}=T_{i j} \boldsymbol{e}_{i} \boldsymbol{e}_{j}
$$

具有坐标不变性：

$$
\boldsymbol{T}=T_{i j} \boldsymbol{e}_{i} \boldsymbol{e}_{j}=T_{m n}^{\prime} \boldsymbol{e}_{m}^{\prime} \boldsymbol{e}_{n}^{\prime}
$$

:::

于是 $n$ 截面上的应力矢量与 $n$ 截面上 $s$ 方向的应力分量分别写成

$$
\boldsymbol{T}(\boldsymbol{n})=\boldsymbol{n} \cdot \boldsymbol{T}
$$

$$
T(\boldsymbol{n}, \boldsymbol{s})=\boldsymbol{T}(\boldsymbol{n}) \cdot \boldsymbol{s}=\boldsymbol{n} \cdot \boldsymbol{T} \cdot \boldsymbol{s}
$$

这与前文应力分量 $T(\boldsymbol{n}, \boldsymbol{t})=\boldsymbol{T}(\boldsymbol{n}) \cdot \boldsymbol{t}$ 的约定一致。

## 流体的界面现象与性质
::: definition 界面现象
流体和固体，或流体和另一种互不掺混的流体，交界面处的力学和热力学现象。
:::

宏观的微元界面两侧的流体应处于热力学平衡状态，即两侧流体分子运动处于统计平衡态，因此两侧的物理量之间存在确定的关系。

### 界面上流体温度和速度的连续性

界面两侧流体的温度相等、速度相等：

$$
\theta^{+}=\theta^{-},\qquad \boldsymbol{U}^{+}=\boldsymbol{U}^{-}
$$

在流-固界面上，该条件即固壁上的无滑移条件：$\theta=\theta_{w}$，$\boldsymbol{U}=\boldsymbol{U}_{w}$。

界面两侧作用于同一面元的应力矢量等值反向（暂不计及表面张力，计及表面张力时的修正见第 3 节），即

$$
\boldsymbol{T}^{+}(\boldsymbol{n})=-\boldsymbol{T}^{-}(-\boldsymbol{n})
$$

由 $\boldsymbol{T}(-\boldsymbol{n})=-\boldsymbol{T}(\boldsymbol{n})$，上式等价于 $\boldsymbol{T}^{+}(\boldsymbol{n})=\boldsymbol{T}^{-}(\boldsymbol{n})$，写成分量形式即正应力与两个切应力分量连续：

$$
\begin{aligned}
T^{+}(\boldsymbol{n},\boldsymbol{n})&=T^{-}(\boldsymbol{n},\boldsymbol{n})\\
T^{+}(\boldsymbol{n},\boldsymbol{t})&=T^{-}(\boldsymbol{n},\boldsymbol{t}),\qquad T^{+}(\boldsymbol{n},\boldsymbol{s})=T^{-}(\boldsymbol{n},\boldsymbol{s})
\end{aligned}
$$

对于理想流体，粘性为零，界面上允许速度滑移，速度连续条件退化为**不可穿透条件**；不计表面张力时，两流体界面上的法向应力（压强）仍然连续：

$$
\boldsymbol{U}^{+}\cdot\boldsymbol{n}=\boldsymbol{U}^{-}\cdot\boldsymbol{n},\qquad p^{+}=p^{-}
$$

### 表面张力

在界面上取微元弧 $\mathrm{d}\boldsymbol{x}$，作用在该弧上的表面张力为

$$
\delta\boldsymbol{\Gamma}=\gamma\,\mathrm{d}\boldsymbol{x}\times\boldsymbol{n},\qquad \left|\delta\boldsymbol{\Gamma}\right|=\gamma\left|\mathrm{d}\boldsymbol{x}\right|
$$

其中 $\gamma$ 称为**表面张力系数**；表面张力位于界面的切平面内，并垂直于分割线。

### 表面张力与应力平衡（Young–Laplace 方程）

设界面凸面一侧的压强为 $p_{+}$、凹面一侧的压强为 $p_{-}$，则曲界面两侧存在压强跃变：

$$
\Delta p=p_{-}-p_{+}=\gamma\left(\frac{1}{R_{1}}+\frac{1}{R_{2}}\right)
$$

其中 $R_{1}$、$R_{2}$ 为曲面的两个主曲率半径；凸面一侧压强小，凹面一侧压强大。对球面 $R_{1}=R_{2}=R$，有 $\Delta p=2\gamma/R$。

**推导（微元曲面上的力平衡）：** 任取一微元曲面，使其边界曲线平行于 $xy$ 平面。设曲面方程为 $z=f(x,y)$，原点取在曲面上，$z$ 轴由凹面指向凸面，则

$$
f(0,0)=0,\qquad \frac{\partial f}{\partial x}(0,0)=\frac{\partial f}{\partial y}(0,0)=0
$$

界面的单位法向为

$$
\boldsymbol{n}=\frac{-f_{x}\,\boldsymbol{i}-f_{y}\,\boldsymbol{j}+\boldsymbol{k}}{\sqrt{1+{f_{x}}^{2}+{f_{y}}^{2}}}
=\boldsymbol{k}-f_{x}\,\boldsymbol{i}-f_{y}\,\boldsymbol{j}+O(r^{2})
$$

边界上的表面张力合力为

$$
\begin{aligned}
\boldsymbol{F}_{\gamma}
&=\oint_{C}\gamma\,\mathrm{d}\boldsymbol{l}\times\boldsymbol{n}
=\gamma\oint_{C}\left(f_{x}\,\mathrm{d}y-f_{y}\,\mathrm{d}x\right)\boldsymbol{k}\\
&=\gamma\iint_{A}\left(\frac{\partial^{2}f}{\partial x^{2}}+\frac{\partial^{2}f}{\partial y^{2}}\right)\mathrm{d}A\,\boldsymbol{k}
=-\gamma\left(\frac{1}{R_{1}}+\frac{1}{R_{2}}\right)A\,\boldsymbol{k}
\end{aligned}
$$

其中第二个等号用到闭合曲线 $\oint_{C}\mathrm{d}x=\oint_{C}\mathrm{d}y=0$，第三个等号用到格林公式；又因 $z$ 轴由凹面指向凸面，$f_{xx}+f_{yy}=-(1/R_{1}+1/R_{2})$。

<Figure src="/fluids/interface-stress.webp" alt="界面上的应力平衡" caption="图 2.4　界面上的应力平衡" />

压强差产生的合力为 $\Delta p\,A\,\boldsymbol{k}$，由力平衡

$$
\Delta p\,A\,\boldsymbol{k}+\boldsymbol{F}_{\gamma}=0
$$

即得

$$
\Delta p=p_{-}-p_{+}=\gamma\left(\frac{1}{R_{1}}+\frac{1}{R_{2}}\right)
$$

写成分量形式，界面两侧的应力满足

$$
T^{+}(\boldsymbol{n},\boldsymbol{n})-T^{-}(\boldsymbol{n},\boldsymbol{n})=\gamma\left(\frac{1}{R_{1}}+\frac{1}{R_{2}}\right),\qquad T^{+}(\boldsymbol{n},\boldsymbol{t})=T^{-}(\boldsymbol{n},\boldsymbol{t}),\qquad T^{+}(\boldsymbol{n},\boldsymbol{s})=T^{-}(\boldsymbol{n},\boldsymbol{s})
$$

其中 $+$ 侧为凸面一侧。对理想流体 $T(\boldsymbol{n},\boldsymbol{n})=-p$，即回到 Young–Laplace 方程。

### 接触角与毛细现象

当三种互不掺混的介质共存时，两种流体的界面与固壁的交线称为**接触线**；在接触线上，流体界面切面与固壁表面切面的夹角（角内包含该流体）称为**接触角** $\theta$。$\theta<90^{\circ}$ 为浸润，$\theta>90^{\circ}$ 为不浸润。

<Figure src="/fluids/contact-angle.webp" alt="接触角" caption="图 2.5　接触角" />

将细管插入液体，管内液面高于或低于周围连通的液面，这种现象称为**毛细现象**。对浸润液体（$\theta<90^{\circ}$），管内弯月面近似为凹面朝上的球冠，两主曲率半径相等 $R_{1}=R_{2}=R$（曲率中心在气侧，即凹面一侧），且

$$
R=\frac{d}{2\cos\theta}
$$

其中 $d$ 为细管内径。由 Young–Laplace 方程

$$
\Delta p=p_{-}-p_{+}=\frac{2\gamma}{R}=\frac{4\gamma\cos\theta}{d}
$$

再由静力平衡（$h$ 为管内液面与管外液面的高度差，液面上升时 $h>0$）

$$
p_{-}=p_{+}+\rho g h
$$

得

$$
h=\frac{4\gamma\cos\theta}{\rho g d}
$$

对不浸润液体（$\theta>90^{\circ}$，如玻璃-水银），弯月面反向、曲率中心在液侧，$\cos\theta<0$，上式给出 $h<0$，即管内液面下降，且 $\left|h\right|=\dfrac{4\gamma\left|\cos\theta\right|}{\rho g d}$。

<Figure src="/fluids/capillary.webp" alt="毛细现象" caption="图 2.6　毛细现象" />

