---
title: '第四章 控制系统的频率特性'
description: '控制工程基础 · 第四章 控制系统的频率特性'
---

# 第四章 控制系统的频率特性

时域分析直观，但高阶系统求解繁琐。**频率特性分析法**（频域法）是工程上广为采用的图解方法：不必求解闭环特征根，可间接用开环频率特性分析闭环性能，且频域指标与时域指标存在对应关系。机械振动中的共振频率、动刚度、抗振稳定性等概念，也都可归结为系统在频率域中的特性。

## 频率特性的概念

::: definition 频率响应与频率特性
线性定常系统对正弦输入的**稳态响应**称为频率响应：输出仍为同频率的正弦信号，仅幅值与相位随频率变化。稳态输出与输入的幅值之比、相位之差随频率 $\omega$ 变化的规律，称为系统的**频率特性**：

$$
G(\mathrm{j}\omega)=\left.G(s)\right|_{s=\mathrm{j}\omega}=U(\omega)+\mathrm{j}V(\omega)=A(\omega)e^{\mathrm{j}\varphi(\omega)}
$$

$A(\omega)=|G(\mathrm{j}\omega)|$ 为**幅频特性**，$\varphi(\omega)=\angle G(\mathrm{j}\omega)$ 为**相频特性**；$U(\omega)$、$V(\omega)$ 分别称实频、虚频特性。
:::

<Figure src="/control/frequency-response.webp" alt="频率特性示意图" caption="图 4.1　线性系统对正弦输入的稳态响应（频率不变性）" :width="420" />

设输入 $x_i(t)=A\sin\omega t$，则稳态输出

$$
x_o(t)=A|G(\mathrm{j}\omega)|\sin(\omega t+\varphi(\omega))
$$

频率特性与传递函数本质相同：前者是后者在虚轴上的取值。求取方法有三：① $G(s)$ 中令 $s=\mathrm{j}\omega$；② 微分方程中代入正弦输入求稳态解；③ 实验测取（扫频）。

## 极坐标图（Nyquist 图）

当 $\omega$ 由 $0$ 增至 $+\infty$ 时，$G(\mathrm{j}\omega)$ 作为矢量其端点在复平面上的轨迹，称为**极坐标图**（Nyquist 图、乃氏图）。

| 环节 | $G(\mathrm{j}\omega)$ | Nyquist 图特征 |
| --- | --- | --- |
| 比例 | $K$ | 实轴上一点 $K$ |
| 积分 | $\frac{1}{\mathrm{j}\omega T}$ | 沿负虚轴：$\omega\to0$ 时 $-\mathrm{j}\infty$，$\omega\to\infty$ 时原点 |
| 微分 | $\mathrm{j}\omega T$ | 沿正虚轴：由原点趋于 $+\mathrm{j}\infty$ |
| 一阶惯性 | $\frac{1}{1+\mathrm{j}\omega T}$ | $1\angle0^\circ\to0\angle-90^\circ$，第四象限半圆 |
| 二阶振荡 | $\frac{1}{1-T^2\omega^2+2\mathrm{j}\zeta T\omega}$ | $1\angle0^\circ\to0\angle-180^\circ$，与负虚轴交于 $\omega=\omega_n$，$\lvert G\rvert=\frac{1}{2\zeta}$ |
| 延时 | $e^{-\mathrm{j}\omega\tau}$ | 单位圆上顺时针无限盘旋 |

作图一般步骤：写出 $|G(\mathrm{j}\omega)|$ 与 $\angle G(\mathrm{j}\omega)$ → 求 $\omega=0$ 与 $\omega\to\infty$ 时的值 → 求与实轴交点（$\mathrm{Im}\,G=0$ 或 $\angle G=n\cdot180^\circ$）→ 求与虚轴交点（$\mathrm{Re}\,G=0$ 或 $\angle G=n\cdot90^\circ$，$n$ 为奇数）→ 必要时补中间点 → 勾画曲线。负频段（$\omega:-\infty\to0$）的曲线与正频段关于实轴对称。

开环频率特性一般可写为

$$
G_k(\mathrm{j}\omega)=\frac{K\prod_i(1+\mathrm{j}\omega\tau_i)}{(\mathrm{j}\omega)^\lambda\prod_j(1+\mathrm{j}\omega T_j)}
$$

$\lambda=0,1,2,\cdots$ 分别称 0 型、I 型、II 型系统。**低频段**：0 型起于实轴上的 $K$；I 型起于无穷远、方向为 $-90^\circ$；II 型起于无穷远、方向为 $-180^\circ$。

<Figure src="/control/nyquist-lowfreq.webp" alt="各型系统 Nyquist 低频段" caption="图 4.2　0 型、I 型、II 型系统 Nyquist 图的低频段" :width="480" />

**高频段**：分母阶次大于分子阶次时曲线终止于原点；两者阶次相等时终止于实轴上的有限值。

::: example
$G(\mathrm{j}\omega)=\frac{1}{\mathrm{j}\omega(\mathrm{j}\omega+1)(2\mathrm{j}\omega+1)}$。$\omega\to0$ 时 $|G|\to\infty$、$\angle G\to-90^\circ$；$\omega\to\infty$ 时趋于原点、相角 $-270^\circ$。曲线与负实轴交于 $(-0.67,\mathrm{j}0)$。
:::

<Figure src="/control/nyquist-example.webp" alt="Nyquist 图示例" caption="图 4.3　交点附近的局部放大：(-0.67, j0)" :width="460" />

## 对数坐标图（Bode 图）

Bode 图由**对数幅频特性** $L(\omega)=20\lg|G(\mathrm{j}\omega)|$（单位 dB）与**对数相频特性** $\varphi(\omega)$ 组成，横轴为 $\lg\omega$。频率变化十倍称一个**十倍频程**（dec）。串联环节的乘除在对数坐标中化为加减，故 Bode 图最便于工程作图。

| 环节 | $L(\omega)$ | $\varphi(\omega)$ |
| --- | --- | --- |
| 比例 | $20\lg K$（水平线） | $0^\circ$ |
| 积分 | 过 $(\omega=1,\ 0\ \text{dB})$、斜率 $-20\ \text{dB/dec}$ | $-90^\circ$ |
| 微分 | 斜率 $+20\ \text{dB/dec}$ | $+90^\circ$ |
| 一阶惯性 | 低频 $0\ \text{dB}$，转角 $\omega=1/T$ 后 $-20\ \text{dB/dec}$ | $0\to-90^\circ$（$1/T$ 处 $-45^\circ$） |
| 一阶微分 | 低频 $0\ \text{dB}$，转角后 $+20\ \text{dB/dec}$ | $0\to+90^\circ$ |
| 二阶振荡 | 低频 $0\ \text{dB}$，转角 $\omega_n$ 后 $-40\ \text{dB/dec}$，$\zeta$ 小时有谐振峰 | $0\to-180^\circ$ |
| 延时 | $0\ \text{dB}$ | $-\omega\tau$（随频率线性下降） |

一般系统 Bode 图作图步骤：① 将 $G(\mathrm{j}\omega)$ 化为典型环节乘积（时间常数形式）；② 由静态放大倍数定低频段高度、由各时间常数定转角频率与斜率变化，画近似折线；③ 必要时修正。系统 Bode 图可由各环节 Bode 图叠加得到。

<Figure src="/control/bode-example.webp" alt="Bode 图示例" caption="图 4.4　系统 Bode 图作图示例：各环节渐近线与总幅频、相频曲线" :width="500" />

::: definition 最小相位系统
开环传递函数在 $s$ 右半平面既无极点又无零点的系统。其幅频特性与相频特性一一对应——已知幅频特性即可唯一确定相频特性；非最小相位系统则不然。
:::

## 由频率特性曲线求传递函数

实验测得 Bode 图后，可按以下线索反求传递函数：

1. **转角频率**对应时间常数的倒数（$\omega=1/T$）；
2. **斜率变化**确定环节类型：斜率减小 $20\ \text{dB/dec}$ 对应一个惯性环节，减小 $40$ 对应振荡环节；斜率增大对应微分环节；
3. **低频段高度**确定静态放大倍数：0 型系统为 $20\lg K$；I 型系统为首段 $-20\ \text{dB/dec}$ 延长线与 $\omega=1$ 线的交点高度 $20\lg K$；II 型系统为首段 $-40\ \text{dB/dec}$ 延长线与 $\omega=1$ 线的交点高度 $20\lg K$。

同时用相频特性判断是否为最小相位系统，以确定零点在左半平面还是右半平面。

## 闭环频率特性与频域指标

对单位反馈系统，$\Phi(\mathrm{j}\omega)=\frac{G}{1+G}$。由开环 Bode 图可估计闭环幅频：低频时 $|\Phi|\approx1$（0 dB），高频时 $|\Phi|\approx|G|$，两者在剪切频率附近衔接。

<Figure src="/control/open-closed-freq.webp" alt="开环与闭环频率特性" caption="图 4.5　系统开环与闭环幅频特性对照" :width="500" />

由 Nyquist 图求闭环频率特性：设 $A$ 点对应 $G(\mathrm{j}\omega_A)$，则

$$
\Phi(\mathrm{j}\omega_A)=\frac{OA}{PA}=\frac{G(\mathrm{j}\omega_A)}{1+G(\mathrm{j}\omega_A)}
$$

即闭环幅值等于向量 OA 与 PA（$P$ 为 $(-1,\mathrm{j}0)$）的幅值之比，闭环相角等于两向量夹角。

::: definition 频域指标
**开环指标**：剪切频率 $\omega_c$（$|G|=1$ 处的频率）、相位裕量 $\gamma=180^\circ+\varphi(\omega_c)$、幅值裕量 $K_g=\frac{1}{|G(\mathrm{j}\omega_g)|}$（$\varphi(\omega_g)=-180^\circ$）。

**闭环指标**：谐振峰值 $M_r$、谐振频率 $\omega_r$（幅频最大处）、截止频率 $\omega_b$（幅值降至 $-3\ \text{dB}$ 处）。
:::

<Figure src="/control/open-loop-specs.webp" alt="开环频域指标" caption="图 4.6　开环频域指标：ω_c、γ、K_g" :width="460" />

<Figure src="/control/closed-loop-specs.webp" alt="闭环频域指标" caption="图 4.7　闭环频域指标：M_r、ω_r、ω_b" :width="460" />

$M_r$ 反映系统的相对稳定性（$M_r$ 越大超调越大），$\omega_b$ 反映快速性（带宽越宽响应越快）。对标准二阶系统：

$$
\begin{aligned}
\omega_r &= \omega_n\sqrt{1-2\zeta^2}, \\
M_r &= \frac{1}{2\zeta\sqrt{1-\zeta^2}}, \\
\omega_b &= \omega_n\sqrt{(1-2\zeta^2)+\sqrt{(1-2\zeta^2)^2+1}}
\end{aligned}
$$

::: remark
机械系统的动刚度：质量—弹簧—阻尼系统的 $G(\mathrm{j}\omega)$ 是动柔度，其倒数为动刚度。$\omega=0$ 时动刚度等于静刚度 $k$；共振时动柔度最大、动刚度最小。增大阻尼比可有效提高动刚度。
:::
