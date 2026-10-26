---
title: 电磁学笔记
date: 2026-10-24
tags:
  - 普通物理
  - 电磁学
---

# 电磁学笔记

从真空中的静电场、稳恒磁场到麦克斯韦方程组。定义、定理按块排版，例题与推导保留原样。

## 静电场

这一部分讨论真空中的静电场，以及静电场中的导体和电介质。

### 真空中的静电场

静电场是由静止电荷产生的电场，是**保守场**，也是**有源场**。

#### 库仑定律

库仑定律（Coulomb's Law）是静电学的基础实验定律，描述真空中两个静止点电荷 $q_1$、$q_2$ 之间的相互作用力。

::: theorem 库仑定律
真空中两个静止点电荷之间的作用力为

$$
\vec{F}_{12} = \frac{1}{4\pi\epsilon_0}\frac{q_1 q_2}{r^2}\hat{r}_{21}
$$

其中 $\epsilon_0 \approx 8.85\times10^{-12}\,\mathrm{F/m}$ 为**真空介电常数**，$\dfrac{1}{4\pi\epsilon_0} = k \approx 9.0\times10^{9}\,\mathrm{N\cdot m^2/C^2}$，$\hat{r}_{21}$ 是从 $q_2$ 指向 $q_1$ 的单位矢量。
:::

#### 电场强度

电场强度（Electric Field Intensity）描述电场的力的性质，是电场的**矢量点函数**。

::: definition 电场强度
试验电荷 $q_0$ 在电场中某点所受的力为 $\vec{F}$，则该点的电场强度为

$$
\vec{E} = \lim_{q_0 \to 0}\frac{\vec{F}}{q_0}
$$
:::

由库仑定律和电场强度的定义，点电荷 $q$ 在距其 $r$ 处产生的场强为

$$
\vec{E} = \frac{1}{4\pi\epsilon_0}\frac{q}{r^2}\hat{r}
$$

**叠加原理**：复杂电荷分布产生的场强，等于所有电荷单独产生的场强的矢量和，

$$
\vec{E} = \sum_i \vec{E}_i \quad \text{或} \quad \vec{E} = \int \dd\vec{E}
$$

#### 静电场的高斯定理

高斯定理（Gauss's Law）是静电场的基本性质之一，表明**静电场是有源场**。

::: theorem 高斯定理
通过任意闭合曲面 $S$ 的电场强度通量，等于该曲面所包围的电荷代数和除以 $\epsilon_0$：

$$
\oint_S \vec{E}\cdot\dd\vec{S} = \frac{\sum q_i}{\epsilon_0}
$$

其中 $\oint_S \vec{E}\cdot\dd\vec{S}$ 是电场强度通量 $\Phi_e$，$\sum q_i$ 是高斯面 $S$ 内包围的电荷代数和。
:::

::: example 无限大均匀带电平面的场强
设无限大均匀带电平面的面电荷密度为 $\sigma$。

1. **选择高斯面**：取一个横截面积为 $A$ 的圆柱体，两底面平行于带电平面，且分别位于平面两侧。
2. **计算通量**：由于对称性，$\vec{E}$ 垂直于平面，两底面方向一致，只有底面有通量，$\Phi_e = EA + EA = 2EA$。
3. **计算包围电荷**：$\sum q_i = \sigma A$。
4. **求解**：代入高斯定理

$$
2EA = \frac{\sigma A}{\epsilon_0} \implies E = \frac{\sigma}{2\epsilon_0}
$$

推导结论：场强与到平面的距离无关。
:::

#### 电势

电势（Electric Potential）描述电场的能量性质，是电场的**标量点函数**。

::: theorem 静电场的环路定理
静电场沿任意闭合路径的线积分为零：

$$
\oint_L \vec{E}\cdot\dd\vec{l} = 0
$$

这表明静电场力做功与路径无关，静电场是**保守场**。
:::

::: definition 电势差与电势
$A$、$B$ 两点间的电势差，等于把单位正电荷从 $A$ 点移到 $B$ 点时电场力所做的功：

$$
U_{AB} = V_A - V_B = \int_A^B \vec{E}\cdot\dd\vec{l}
$$

取无穷远处为零电势点，则 $A$ 点的电势为

$$
V_A = \int_A^{\infty}\vec{E}\cdot\dd\vec{l}
$$
:::

点电荷 $q$ 的电势为

$$
V = \frac{1}{4\pi\epsilon_0}\frac{q}{r}
$$

#### 电场强度与电势的微分关系

场强是电势的负梯度，场强方向指向电势降低最快的方向。

::: theorem 场强与电势的微分关系
电场强度与电势满足

$$
\vec{E} = -\nabla V = -\left(\frac{\partial V}{\partial x}\vec{i} + \frac{\partial V}{\partial y}\vec{j} + \frac{\partial V}{\partial z}\vec{k}\right)
$$

其中 $\nabla$ 为梯度算符。
:::

::: example 由电势求场强
若空间电势分布为 $V(x,y) = C(x^2 - y^2)$，求任一点 $(x,y)$ 的场强 $\vec{E}$。

1. **分量求解**：

$$
E_x = -\frac{\partial V}{\partial x} = -\frac{\partial (C(x^2 - y^2))}{\partial x} = -2Cx
$$

$$
E_y = -\frac{\partial V}{\partial y} = -\frac{\partial (C(x^2 - y^2))}{\partial y} = -(-2Cy) = 2Cy
$$

$$
E_z = -\frac{\partial V}{\partial z} = 0
$$

2. **矢量表示**：

$$
\vec{E} = -2Cx\,\vec{i} + 2Cy\,\vec{j}
$$
:::

### 静电场中的导体和电介质

本节先讨论导体的静电平衡条件，再引入电位移矢量处理电介质中的静电场。

#### 导体的静电平衡条件

处于静电场中的导体，其内部自由电荷重新分布，直至内部合力为零，达到**静电平衡**。

::: definition 静电平衡条件
静电平衡时，导体内部的场强为零：

$$
\vec{E}_{in} = 0
$$
:::

::: remark 静电平衡的重要推论
- 导体内部任一点的电势都相等，整个导体是一个**等势体**。
- 导体表面是**等势面**。
- 导体表面附近场强 $\vec{E}$ 垂直于表面，大小为 $E_n = \sigma/\epsilon_0$。
- 净电荷只分布在导体的外表面上。
:::

#### 电介质的极化与电位移矢量

电介质在外电场作用下发生极化，产生**极化电荷**，削弱了介质内部的场强 $\vec{E}$。

::: definition 极化强度
极化强度 $\vec{P}$ 与介质中的场强成正比：

$$
\vec{P} = \chi_e \epsilon_0 \vec{E}
$$

其中 $\chi_e$ 为电极化率。
:::

::: definition 电位移矢量
引入电位移矢量 $\vec{D}$ 来描述由自由电荷单独产生的电场效应：

$$
\vec{D} = \epsilon_0\vec{E} + \vec{P}
$$

对于线性均匀介质（$\vec{P}$ 与 $\vec{E}$ 同向且成正比）：

$$
\vec{D} = \epsilon_0(1 + \chi_e)\vec{E} = \epsilon_r\epsilon_0\vec{E} = \epsilon\vec{E}
$$

其中 $\epsilon_r$ 为相对介电常数，$\epsilon$ 为介质的介电常数。
:::

#### 电介质中的高斯定理

::: theorem 电介质中的高斯定理
通过任意闭合曲面的电位移通量，等于该曲面所包围的**自由电荷**的代数和：

$$
\oint_S \vec{D}\cdot\dd\vec{S} = \sum q_f
$$

其中 $\sum q_f$ 为高斯面内包围的自由电荷的代数和。
:::

::: proof 推导逻辑
从真空中的高斯定理出发

$$
\oint_S \epsilon_0\vec{E}\cdot\dd\vec{S} = \sum q_f + \sum q_p
$$

其中 $q_p$ 为极化电荷。利用 $\vec{D}$ 的定义将极化电荷的影响消除，使得 $\vec{D}$ 的源仅为自由电荷。

$\square$
:::

#### 电容和电场能量

::: definition 电容
电容（Capacitance）$C$ 等于电容器极板所带电荷量与两极板间电势差之比：

$$
C = \frac{Q}{U}
$$
:::

电场能量密度 $w_e$ 为

$$
w_e = \frac{1}{2}\vec{D}\cdot\vec{E} \quad \text{或} \quad w_e = \frac{1}{2}\epsilon E^2
$$

静电场总能量 $W_e$ 为

$$
W_e = \int_V w_e \dd V = \frac{1}{2}CU^2
$$

## 稳恒磁场与电磁感应

这一部分先讨论真空中的稳恒磁场，再讨论磁介质与电磁感应。

### 真空中的稳恒磁场

稳恒磁场由**稳恒电流**（不随时间变化的电流）产生，是**无源场**，也是**有旋场**。

#### 毕奥-萨伐尔定律

毕奥-萨伐尔定律（Biot-Savart Law）是计算电流产生的磁场的基础实验定律。

::: theorem 毕奥-萨伐尔定律
电流元 $I\dd\vec{l}$ 在空间点 $P$ 处产生的磁感应强度为

$$
\dd\vec{B} = \frac{\mu_0}{4\pi}\frac{I\dd\vec{l}\times\vec{r}}{r^3}
$$

其中 $\mu_0 = 4\pi\times10^{-7}\,\mathrm{N/A^2}$ 为**真空磁导率**。$\dd\vec{B}$ 的方向由右手定则确定，垂直于 $I\dd\vec{l}$ 和 $\vec{r}$ 所确定的平面。
:::

::: example 无限长直载流导线的磁场
对电流元产生的磁场沿导线积分，可得距导线 $r$ 处的磁感应强度大小为

$$
B = \frac{\mu_0 I}{2\pi r}
$$
:::

#### 稳恒磁场的高斯定理

::: theorem 稳恒磁场的高斯定理
磁场的高斯定理为

$$
\oint_S \vec{B}\cdot\dd\vec{S} = 0
$$

**物理含义**：**磁场是无源场**。穿过任意闭合曲面的磁通量恒为零，表明磁感线总是闭合曲线，不存在磁单极。
:::

#### 安培环路定理

::: theorem 安培环路定理
磁感应强度沿任意闭合路径的线积分，等于该路径所围面积内所有电流的代数和的 $\mu_0$ 倍：

$$
\oint_L \vec{B}\cdot\dd\vec{l} = \mu_0\sum I
$$

其中 $\sum I$ 为穿过环路 $L$ 所围面积 $S$ 的所有电流的代数和（方向由右手螺旋定则确定）。
:::

磁场是**有旋场**。当磁场具有高度对称性时，可用安培环路定理求解磁场。

::: remark 注意
安培环路定理只适用于稳恒电流；非稳恒电流情形需要引入位移电流修正，见下文「麦克斯韦方程组与电磁波」一节。
:::

::: example 无限长直密绕螺线管内的磁场
设螺线管单位长度匝数为 $n$，通电流 $I$。

1. **选择环路**：取一个长方形环路 $L$，长 $l$，两边分别在管内和管外。
2. **管内场强**：假设管内磁场 $B$ 均匀且平行于轴线，管外 $B = 0$，则

$$
\oint_L \vec{B}\cdot\dd\vec{l} = Bl
$$

3. **穿过电流**：穿过环路内的总电流 $\sum I = NI = n l I$。
4. **求解**：由安培环路定理

$$
Bl = \mu_0 n l I \implies B = \mu_0 n I
$$

推导结论：磁场均匀且只存在于螺线管内部。
:::

#### 洛伦兹力和安培力

::: definition 洛伦兹力
磁场对运动电荷 $q$ 的作用力（Lorentz Force）为

$$
\vec{F}_m = q(\vec{v}\times\vec{B})
$$
:::

::: remark 洛伦兹力不做功
洛伦兹力始终与速度垂直，即 $\vec{F}_m \perp \vec{v}$，所以洛伦兹力**不做功**。
:::

::: definition 安培力
磁场对电流元 $I\dd\vec{l}$ 的作用力（Ampere Force）为

$$
\dd\vec{F} = I\dd\vec{l}\times\vec{B}
$$
:::

::: example 带电粒子在匀强磁场中的回旋运动
粒子速度 $\vec{v}$ 垂直于 $\vec{B}$。

1. **受力分析**：洛伦兹力 $F_m = qvB$ 提供向心力。
2. **牛顿第二定律**：$F_m = m\dfrac{v^2}{R}$。
3. **回旋半径**：

$$
qvB = m\frac{v^2}{R} \implies R = \frac{mv}{qB}
$$

4. **回旋周期**：

$$
T = \frac{2\pi R}{v} = \frac{2\pi}{v}\left(\frac{mv}{qB}\right) \implies T = \frac{2\pi m}{qB}
$$

推导结论：周期 $T$ 与速度 $v$ 无关。
:::

### 磁介质与电磁感应

本节讨论磁介质中的磁场，以及法拉第电磁感应定律、自感与磁场能量。

#### 磁场强度

::: definition 磁化强度
磁化强度 $\vec{M}$ 描述磁介质的磁化状态。
:::

::: definition 磁场强度
磁场强度 $\vec{H}$ 与磁感应强度 $\vec{B}$、磁化强度 $\vec{M}$ 的关系为

$$
\vec{B} = \mu_0(\vec{H} + \vec{M})
$$
:::

对于线性均匀磁介质，

$$
\vec{B} = \mu_r\mu_0\vec{H} = \mu\vec{H}
$$

其中 $\mu_r$ 为相对磁导率，$\mu$ 为介质的磁导率。

#### 法拉第电磁感应定律

电磁感应定律揭示了**磁生电**的规律。

::: theorem 法拉第电磁感应定律
回路中的感应电动势，等于穿过该回路所围面积的磁通量对时间变化率的负值：

$$
\mathcal{E}_i = -\frac{\dd\Phi_m}{\dd t}
$$

其中 $\mathcal{E}_i$ 为感应电动势，$\Phi_m = \int_S \vec{B}\cdot\dd\vec{S}$ 为磁通量。
:::

::: theorem 楞次定律
公式中的负号即楞次定律（Lenz's Law）：感应电动势的方向总是**反抗**引起它本身的磁通量变化。
:::

**感应电动势的两种产生机制**：

::: definition 动生电动势
导体切割磁感线运动时，洛伦兹力作用于运动导体中的电荷，引起动生电动势 $\mathcal{E}_i$：

$$
\mathcal{E}_i = \oint_L (\vec{v}\times\vec{B})\cdot\dd\vec{l}
$$
:::

::: definition 感生电动势
磁场随时间变化（$\partial\vec{B}/\partial t \ne 0$）时，激发涡旋电场 $\vec{E}_e$，产生感生电动势 $\mathcal{E}_e$：

$$
\mathcal{E}_e = \oint_L \vec{E}_e\cdot\dd\vec{l}
$$
:::

::: example 导体棒在转动中产生的动生电动势
一根长为 $L$ 的导体棒 $OA$，以端点 $O$ 为轴心，在垂直于 $B$ 场的平面内匀速转动，角速度为 $\omega$。

1. **速度分析**：距 $O$ 点 $r$ 处的微元 $\dd r$ 的线速度为 $v = \omega r$。
2. **微元电动势**：$\dd\mathcal{E}_i = vB\,\dd r = (\omega r)B\,\dd r$。
3. **总电动势**：

$$
\mathcal{E}_i = \int_0^L \dd\mathcal{E}_i = \int_0^L \omega B r\,\dd r = \omega B\left[\frac{r^2}{2}\right]_0^L \implies \mathcal{E}_i = \frac{1}{2}BL^2\omega
$$
:::

#### 自感与磁场能量

::: definition 自感
线圈自身的电流变化引起磁通量变化，从而产生自感电动势：

$$
\mathcal{E}_L = -L\frac{\dd I}{\dd t}
$$

其中 $L$ 为自感系数，由线圈的几何尺寸和介质的磁导率决定，$\Phi = LI$。
:::

磁场能量密度 $w_m$ 为

$$
w_m = \frac{1}{2}\vec{B}\cdot\vec{H} \quad \text{或} \quad w_m = \frac{B^2}{2\mu}
$$

磁场总能量 $W_m$ 为

$$
W_m = \int_V w_m \dd V = \frac{1}{2}LI^2
$$

## 麦克斯韦方程组与电磁波

这一部分引入位移电流，把电磁场的基本规律写成麦克斯韦方程组，并说明真空中的电磁波。

### 位移电流

麦克斯韦发现，原来的安培环路定理（见上文「稳恒磁场与电磁感应」中的安培环路定理）不适用于非稳恒电流，因此引入了**位移电流**的概念。

::: definition 位移电流密度
位移电流密度为

$$
\vec{J}_D = \frac{\partial\vec{D}}{\partial t}
$$
:::

::: definition 位移电流
位移电流为

$$
I_D = \int_S \vec{J}_D\cdot\dd\vec{S} = \frac{\dd\Phi_D}{\dd t}
$$

**物理含义**：变化的电场 $\partial\vec{D}/\partial t$ 具有与传导电流相似的产生磁场的作用。
:::

::: theorem 全电流安培环路定理
把传导电流与位移电流合并，安培环路定理修正为

$$
\oint_L \vec{H}\cdot\dd\vec{l} = \sum I_c + I_D = \int_S\left(\vec{J}_c + \frac{\partial\vec{D}}{\partial t}\right)\cdot\dd\vec{S}
$$

其中 $\vec{J}_c$ 为传导电流密度。
:::

### 麦克斯韦方程组（积分形式）

麦克斯韦方程组是描述宏观电磁场性质的四大基本方程。

::: theorem 麦克斯韦方程组（积分形式）
**（1）电场的高斯定理**

$$
\oint_S \vec{D}\cdot\dd\vec{S} = \sum q_f
$$

**物理意义**：自由电荷是电位移 $\vec{D}$ 的源。

**（2）磁场的高斯定理**

$$
\oint_S \vec{B}\cdot\dd\vec{S} = 0
$$

**物理意义**：磁场是无源场，不存在磁单极。

**（3）法拉第电磁感应定律**

$$
\oint_L \vec{E}\cdot\dd\vec{l} = -\frac{\dd}{\dd t}\int_S \vec{B}\cdot\dd\vec{S}
$$

**物理意义**：变化的磁场产生涡旋电场。

**（4）全电流安培环路定理**

$$
\oint_L \vec{H}\cdot\dd\vec{l} = \int_S\left(\vec{J}_c + \frac{\partial\vec{D}}{\partial t}\right)\cdot\dd\vec{S}
$$

**物理意义**：传导电流和变化的电场都产生磁场。
:::

### 真空中的电磁波

麦克斯韦方程组的解表明，在真空中，电场和磁场互相激发，可以以波的形式传播。

::: theorem 电磁波的传播速度
在真空（$\epsilon = \epsilon_0$，$\mu = \mu_0$）中，由波动方程可得电磁波的传播速度

$$
c = \frac{1}{\sqrt{\epsilon_0\mu_0}}
$$

此值恰好等于光速，证明了光是电磁波。
:::

真空中的电磁波具有以下性质：

1. **横波**：$\vec{E}$ 矢量和 $\vec{B}$ 矢量都垂直于传播方向 $\vec{c}$。
2. **相互垂直**：$\vec{E}\perp\vec{B}$。
3. **同相振动**：$\vec{E}$ 和 $\vec{B}$ 在同一瞬间达到最大值和零值。
4. **幅值比**：$E_{\text{max}}/B_{\text{max}} = c$。

::: example 电磁波的传播方向
电磁波的传播方向 $\vec{c}$ 与 $\vec{E}\times\vec{B}$ 同向（右手定则）。若某一时刻 $\vec{E}$ 沿 $x$ 轴正方向、$\vec{B}$ 沿 $y$ 轴正方向，则

$$
\vec{E}\times\vec{B} \propto \vec{i}\times\vec{j} = \vec{k}
$$

传播方向为 $z$ 轴正方向。
:::
