---
title: 第三章 轴向拉伸与压缩
description: 材料力学 · 第三章 轴向拉伸与压缩
outline: [2, 3]
series: 材料力学
chapter: 3
---

# 第三章 轴向拉伸与压缩

> 如果作用在物体一小块区域上的力系被另一个静力等效的力系所代替，那么这种代替只会在近处产生显著影响，而在离加力作用区稍远的地方，物体的应力分布几乎不受影响。
>
> <span class="epigraph-src">—— Saint-Venant</span>

::: tip 本章要解决的问题
受轴力作用的杆件，横截面上有多大的内力？斜截面上的应力如何变化？材料在拉伸、压缩时各表现出什么力学性能？杆件按什么条件设计才安全？
:::

::: definition 轴向拉伸与压缩
作用在杆件两端的外力合力的作用线与杆件轴线重合，杆件的变形沿轴线的方向伸长或者缩短。
:::

<Figure src="/mechanics/axial-force.webp" alt="轴向拉伸与压缩" caption="图 3.1　轴向拉伸与压缩" :width="520" />

::: definition 轴力
轴横截面上的内力。规定**拉为正、压为负**。
:::

::: definition 正应力与切应力
**正应力**：垂直于截面方向的应力。

**切应力**：平行于截面方向的应力。
:::

## 3.1 斜截面上的应力

::: theorem 斜截面上的应力
设横截面上的正应力为 $\sigma$，则与横截面成 $\alpha$ 角的斜截面上：

$$
\begin{aligned}
\sigma_{\alpha} &= \sigma\cos^2\alpha\\
\tau_{\alpha} &= \frac{\sigma}{2}\sin 2\alpha
\end{aligned}
$$
:::

<Figure src="/mechanics/stress-decompose.webp" alt="斜截面上的应力分解" caption="图 3.2　斜截面上的应力分解" :width="520" />

::: proof 公式推导
由 $F_N=P_{\alpha}A_{\alpha}$ 与 $A=A_{\alpha}\cos\alpha$，代入后得

$$
\begin{aligned}
F_N &= P_{\alpha}A_{\alpha}\\
A &= A_{\alpha}\cos\alpha\\
\sigma_{\alpha} &= P_{\alpha}\cos\alpha=\frac{F_N}{A}\cos^2\alpha=\sigma\cos^2\alpha\\
\tau_{\alpha} &= P_{\alpha}\sin\alpha=\frac{F_N}{A}\cos\alpha\sin\alpha=\frac{\sigma}{2}\sin 2\alpha
\end{aligned}
$$

$\square$
:::

## 3.2 材料拉伸时的力学性能

通过实验，可以得到材料的 $F-\Delta l$ 曲线。

### 3.2.1 塑性材料拉伸时的力学性能

<Figure src="/mechanics/mild-steel-curve.webp" alt="低碳钢的拉伸曲线" caption="图 3.3　低碳钢拉伸时的 F–Δl 曲线" :width="420" />

为了消除试样尺寸的影响，可以把 $F-\Delta l$ 曲线转换为 $\sigma-\varepsilon$ 曲线。

::: definition 应力与应变
应力：$\sigma=\dfrac{F}{A}$

应变：$\varepsilon=\dfrac{\Delta l}{l_0}$
:::

<Figure src="/mechanics/stress-element.webp" alt="低碳钢拉伸时的应力—应变曲线" caption="图 3.4　低碳钢拉伸时的 σ–ε 曲线" :width="420" />

下面按阶段分析这条 $\sigma-\varepsilon$ 曲线。

| 阶段 | 区间 | 特征 |
| --- | --- | --- |
| 弹性阶段 | $0\to b$ | $\sigma$ 与 $\varepsilon$ 成正比，满足 Hooke 定律 $\sigma=E\varepsilon$ |
| 屈服阶段 | $b\to c$ | $\sigma$ 基本保持不变，$\varepsilon$ 继续增大 |
| 强化阶段 | $c\to d$ | $\sigma$ 继续增大，$\varepsilon$ 继续增大 |
| 颈缩阶段 | $d\to e$ | $\sigma$ 达到最大值后开始下降，$\varepsilon$ 继续增大 |
| 断裂阶段 | $e\to f$ | $\sigma$ 继续下降，$\varepsilon$ 继续增大，直到试样断裂 |

::: definition 屈服
材料在应力不增加的情况下发生较大塑性变形的现象。

**屈服强度（屈服极限）$\sigma_s$**：屈服阶段内最小的应力值。
:::

::: definition 强化
材料在屈服阶段后，随着应变的增大，所能承受的应力继续增大的现象。

**极限强度 $\sigma_b$**：强化阶段内最大的应力值。
:::

::: definition 断裂
材料在应力作用下发生破坏的现象。

**断后伸长率** $\delta=\dfrac{l_f-l_0}{l_0}\times 100\%$

**断面收缩率** $\psi=\dfrac{A_0-A_f}{A_0}\times 100\%$
:::

::: remark 注意
并不是所有材料都有明显的屈服阶段：铸铁、玻璃等脆性材料在拉伸时没有；也不是所有塑性材料都有四个阶段，例如黄铜 H62 就没有屈服阶段。
:::

::: definition 弹性模量
弹性模量 $E$：弹性阶段内的应力与应变的比值，$E=\dfrac{\sigma}{\varepsilon}$。
:::

::: theorem 卸载定律与冷作硬化
**卸载定律**：在弹性阶段内，材料的卸载曲线与加载曲线重合。

**冷作硬化**：在塑性阶段内，材料的卸载曲线与加载曲线不重合，卸载曲线的斜率大于加载曲线的斜率。冷作硬化后，材料的屈服强度和极限强度都增加了，但会降低材料的塑性。
:::

### 3.2.2 脆性材料拉伸时的力学性能

<Figure src="/mechanics/cast-iron-curve.webp" alt="铸铁的拉伸曲线" caption="图 3.5　铸铁拉伸时的 F–Δl 曲线" :width="320" />

可以看到，铸铁拉伸时的曲线没有明显的直线部分，弹性模量 $E$ 随应力的变化而变化。

显然，铸铁不抗拉。

## 3.3 材料压缩时的力学性能

脆性材料抗压不抗拉。

## 3.4 拉压杆的强度条件

### 3.4.1 许用应力

::: definition 许用应力（塑性材料）
$$[\sigma]=\dfrac{\sigma_s}{n}$$

$n$：安全系数。
:::

::: definition 许用应力（脆性材料）
$$[\sigma]=\dfrac{\sigma_b}{n}$$

$n$：安全系数。
:::

### 3.4.2 强度条件

::: theorem 拉压杆的强度条件
$$
\sigma_{\max}=\frac{F_N}{A}\leq[\sigma]
$$
:::

## 3.5 拉压杆的变形

### 3.5.1 轴向变形

$$
\Delta l=l_1-l_0
$$

由 Hooke 定律，

$$
\Delta l=\frac{F_Nl_0}{EA}
$$

### 3.5.2 横向变形

::: definition 泊松比
泊松比 $\mu$：材料在拉伸时，横向变形与轴向变形的比值。

$$\mu=\dfrac{\Delta l_{\alpha}}{\Delta l}$$
:::

## 3.6 拉、压超静定问题

::: tip 一般步骤
1. 列出独立的平衡方程。
2. 找出变形几何关系（以切代弧）。
3. 找出物理关系（Hooke 定律）。
4. 解决问题。
:::

## 3.7 拉压时的应变能

::: definition 应变能
固体在外力作用下，因变形而存储的能量。
:::

应变能：

$$
\begin{aligned}
V_s &= \frac{1}{2}F\Delta l\\
&= \frac{F_N^2l}{2EA}
\end{aligned}
$$

应变能密度：

$$
\begin{aligned}
v_s &= \frac{V_s}{V}\\
&= \frac{1}{2}E\varepsilon^2\\
&= \frac{1}{2}\sigma\varepsilon
\end{aligned}
$$

## 3.8 应力集中

在构件尺寸突变处，会发生应力局部增大的现象，称为**应力集中**。在进行工程设计时，需要考虑该效应对强度的影响。

用塑性材料制成的零件在静载下，可以不考虑应力集中的影响。脆性材料没有屈服阶段，应力集中的危害性很严重。

当零件受周期性变化的应力或受冲击载荷作用时，不管是塑性材料还是脆性材料，应力集中对零件的强度都有严重影响。

## 本章小结

| 概念 | 公式 / 要点 |
| --- | --- |
| 轴力 | 横截面上的内力，拉正压负 |
| 斜截面应力 | $\sigma_{\alpha}=\sigma\cos^2\alpha$，$\tau_{\alpha}=\dfrac{\sigma}{2}\sin 2\alpha$ |
| 弹性阶段 | $\sigma=E\varepsilon$ |
| 强度条件 | $\sigma_{\max}=\dfrac{F_N}{A}\leq[\sigma]$ |
| 轴向变形 | $\Delta l=\dfrac{F_Nl_0}{EA}$ |
| 应变能 | $V_s=\dfrac{F_N^2l}{2EA}$ |
