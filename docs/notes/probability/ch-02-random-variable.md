---
title: 第二章 随机变量及其分布
description: 概率论 · 第二章 随机变量及其分布
---

# 第二章 随机变量及其分布

#### §1 随机变量

* **定义 :** 设 $S=\{e\}$ 是试验的样本空间, 如果量 $X$ 是定义在 $S$ 上的一个单值实值函数，则称 $X$ 为**随机变量** (r. v. $X$)
    * **映射:** $X: S \to R$
* **引入意义:** 将随机试验的结果数量化，描述随机事件 。
* **分类:** 离散型随机变量、非离散型（连续型、奇异型/混合型）。
#### §2 离散型随机变量的分布律
* **定义:** 若 $X$ 取值 $x_{1}, x_{2}, \ldots, x_{k}, \ldots$ 且取这些值的概率依次为 $p_{1}, p_{2}, \ldots, p_{k}, \ldots$，则称

$$
P\{X=x_{k}\} = p_{k} \quad (k=1, 2, \ldots)
$$

为 $X$ 的**分布律**。
* **性质**：
	* 1.$p_k\geq0 ,k=1,2,3,\dots$;
	* 2.$\sum_{k\geq1}p_k=1$.
##### 常见的离散型随机变量的分布律
###### 1.两点分布

| $X$   | 1     | 0   |
| ----- | ----- | --- |
| $p_k$ | $1-p$ | $p$ |
###### 2.二项分布
记作$X\sim b(n,p)$
其中：
	$X$表示n重贝努里试验中事件$A$发生的次数
	$n$表示伯努利试验发生的次数
	$p=p(A)$

$$
P\{X = k\} = C_n^k p^k (1 - p)^{n - k},(k=0,1,2,3,\dots,n)
$$

###### 3.泊松分布(n很大，p很小的二项分布)
如果一个随机变量 $X$ 服从参数为 $\lambda$ 的泊松分布即$X\sim \pi{(\lambda)}$，其概率质量函数为：

$$
P(X = k) = \frac{e^{-\lambda} \lambda^k}{k!}, \quad (k = 0, 1, 2, \dots)
$$

- **$\lambda$ (Lambda)**：这是唯一的参数，代表事件发生的**平均速率**（或平均发生次数）。
- **$e$**：自然常数（约等于 2.718）。
- **$k$**：你想要计算的实际发生次数。
* **例 ** 问讯次数 $X \sim P(\lambda)$。已知 $P\{X=0\} = e^{-6}$
    * **求参数 $\lambda$:** $P\{X=0\} = \frac{\lambda^{0}}{0!} e^{-\lambda} = e^{-\lambda}$。故 $\lambda = 6$。
    * **求 $P\{X \ge 2\}$:**
        * **泊松分布公式:** $P\{X=k\} = \frac{\lambda^{k}}{k!} e^{-\lambda}$

$$
P\{X \ge 2\} = 1 - P\{X < 2\} = 1 - (P\{X=0\} + P\{X=1\})
$$

$$
P\{X \ge 2\} = 1 - (e^{-6} + \frac{6^{1}}{1!} e^{-6}) = 1 - 7 e^{-6} \approx 0.9826
$$

#### §3 随机变量的分布函数
* **定义:** 设 $X$ 是一个随机变量，**分布函数** $F(x)$ 定义为:

$$
F(x) = P\{X \le x\}, \quad -\infty < x < +\infty
$$

*

$$
P\{a<X\le b\}=P\{X\le b\}-P\{X\le a\}=F(b)-F(a)
$$

* **性质：**
	* 1.单调不减性 (Monotonicity)：若 $x_1 < x_2$，则 $F(x_1) \le F(x_2)$
	* 2.归一性 (Normalization / Boundedness)：$0 \le F(x) \le 1$，且 $F(-\infty) = 0, F(+\infty) = 1$
	* 3.右连续性 (Right-continuity)：$\lim_{x \to x_0^+} F(x) = F(x_0)$
* **一些公式：**
	* $P(a < X \le b) = F(b) - F(a)$
	* $P(X > a) = 1 - F(a)$
	* $P(X = a) = F(a) - F(a-0)$
	* $P(X < a) = F(a-0)$
#### §4 连续型随机变量及其概率密度
* **概率密度函数 ($f(x)$) (定义):** 若 $X$ 的分布函数为 $F(x)$ 存在非负函数 $f(x)$, 使得 $F(x) = \int_{-\infty}^{x} f(t) dt$, 则称 $f(x)$ 为 $X$ 的**概率密度函数**。
* **性质:**
    1.  $f(x) \ge 0$
    2.  归一性: $\int_{-\infty}^{\infty} f(x) dx = 1$
* **概率计算:** $P\{a < X < b\} = \int_{a}^{b} f(x) dx = F(b) - F(a)$

##### 几个常用的连续型分布
###### 1.均匀分布
如果随机变量 $X$ 在区间 $[a, b]$ 上服从均匀分布，记作 $X \sim U(a, b)$。它的概率密度函数是一条水平直线：

$$
f(x) = \begin{cases} \frac{1}{b - a}, & a \le x \le b \\ 0, & \text{其他} \end{cases}
$$

$$
F(x) = P(X \le x) = \begin{cases} 0, & x < a \\ \frac{x - a}{b - a}, & a \le x < b \\ 1, & x \ge b \end{cases}
$$

###### 2.指数分布
如果随机变量 $X$ 服从参数为 $\lambda$ 的指数分布（其中 $\lambda > 0$），记作 $X \sim E(\lambda)$。它的概率密度函数为：

$$
f(x) = \begin{cases} \lambda e^{-\lambda x}, & x \ge 0 \\ 0, & x < 0 \end{cases}
$$

$$
F(x) = P(X \le x) = \begin{cases} 1 - e^{-\lambda x}, & x \ge 0 \\ 0, & x < 0 \end{cases}
$$

###### 3.正态分布
如果随机变量 $X$ 服从均值为 $\mu$、方差为 $\sigma^2$ 的正态分布，记作 $X \sim N(\mu, \sigma^2)$。其密度函数公式为：

$$
f(x) = \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$

当 $\mu = 0, \sigma = 1$ 时，称为标准正态分布，记为 $Z \sim N(0, 1)$。

$$
\varphi(x) = \frac{1}{\sqrt{2\pi}} e^{-\frac{x^{2}}{2}}, \quad -\infty < x < +\infty
$$

$$
\Phi(x) = P\{X \le x\} = \int_{-\infty}^{x} \varphi(t) dt
$$

其分布函数通常用专用符号 $\Phi(x)$ 表示。任何一般的正态分布都可以通过以下公式标准化：

$$
Z = \frac{X - \mu}{\sigma}
$$

* **例1 (求参数 A, 概率, 分布函数):** 已知 $f(x)=\begin{cases}A x^{2} & 0 < x < 1 \\ 0 & \text{其他}\end{cases}$
    * **(1) 求参数 A (推导):** 由 $\int_{0}^{1} A x^{2} dx = 1 \Rightarrow A \cdot \frac{x^{3}}{3} \vert _{0}^{1} = \frac{A}{3} = 1 \Rightarrow A = 3$。
    * **(2) 求 $P\{0.5 < X < 3\}$ (推导):** $P\{0.5 < X < 3\} = \int_{0.5}^{1} 3 x^{2} dx = x^{3} \vert _{0.5}^{1} = 1 - (0.5)^{3} = 0.875$。
    * **(3) 求分布函数 $F(x)$ (推导):**

$$
F(x)=\begin{cases}0 & x \le 0 \\ \int_{0}^{x} 3 t^{2} dt = x^{3} & 0 < x < 1 \\ 1 & x \ge 1\end{cases}
$$

###### **无记忆性**
如果随机变量 $X$ 具有无记忆性，对于任何正数 $s$ 和 $t$，以下等式成立：

$$
P(X > s + t \mid X > s) = P(X > t)
$$

#### §5 随机变量函数的分布

* **公式法:** 若 $X \sim f_{X}(x)$, $Y=g(x)$ 是严格单调可导函数, 则 $Y$ 的概率密度函数 $f_{Y}(y)$ 为:

$$
f_{Y}(y) = f_{X}[g^{-1}(y)] \cdot \left\vert  [cite_start]\frac{d g^{-1}(y)}{d y} \right\vert
$$

* **例4 (线性变换 - 推导):** 已知 $X \sim N(\mu, \sigma^{2})$, 求 $Y = \frac{X-\mu}{\sigma}$ 的概率密度。
    * **反函数:** $x = g^{-1}(y) = \sigma y + \mu$(p54)。
    * **导数:** $\left\vert  \frac{d g^{-1}(y)}{d y} \right\vert  [cite_start]= \sigma$  (p54)。
    * **结果:** $f_{Y}(y) = f_{X}(\sigma y + \mu) \cdot \sigma = \frac{1}{\sqrt{2\pi}} e^{-\frac{y^{2}}{2}}$。
    * **结论:** $Y \sim N(0, 1)$ (p54)。

---
