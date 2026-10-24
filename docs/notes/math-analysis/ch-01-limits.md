---
title: 数学分析 · 第一章 函数极限与连续性
date: 2026-10-24
tags:
  - 随笔
---

# 数学分析 · 第一章 函数极限与连续性

> 整理自 `数学分析第一章.tex/`（手写扫描稿的 OCR 转写）。已修正形近字与公式录入错误，并对照标准定义与定理做了**科学性、逻辑性复核**（14 处，见修正日志第七节），逐条见 修正日志。原手写稿：`../数学分析第一章.pdf`（15 页）。6 张图已用 **TikZ 重绘**，提供 PNG 与 WebP（`figures/fig-0N.png` / `.webp`）；原手写稿的裁图存档在 `figures/originals/` 备查。

---

## 一、函数极限

### 1.1 六种连续变化的基本极限过程

**I. 有限值型**

$$
x \to a,\qquad x \to a^{-},\qquad x \to a^{+}
$$

**II. 与 $\infty$ 相关**

$$
|x| \to \infty,\qquad x \to -\infty,\qquad x \to +\infty
$$

### 1.2 函数在一点 a 处的极限

**定义（归结形式）**：对**任一**满足

$$
\lim_{n \to \infty} x_n = a \quad \text{且} \quad x_n \neq a\ (\forall n),
$$

的数列 $\{x_n\}$，**均有** $\lim\limits_{n \to \infty} f(x_n) = A$，则称 $A$ 是 $f$ 在 $x=a$ 处的极限。

**（2）$A$ 与 $f(a)$ 的关系**：$A$ 与 $f(a)$ 的取值无关。

> **eg.** $f(x) = |x|,\ x \in [-1, 0) \cup (0, 1]$，则 $\lim\limits_{x \to 0} f(x) = 0$。

**（3）局部性**：极限是局部性质，而不是函数的整体性质。

> **eg.** $f(x)$ 在 $a = 1$ 处的极限，与 $f(x)$ 在 $b = 0$ 点附近的行为无关。

- 补充（函数的整体性质）：eg. 凸函数

$$
f\big(px + (1-p)y\big) \le p\,f(x) + (1-p)\,f(y),\qquad p \in (0,1).
$$

- 取某种形式的“抽子列”：$\{x_n\}$ 收敛 $\iff$ $\{x_n\}$ 的任一子列均收敛且极限值均为 $A$。（点 $a$ 的 $\delta$ 邻域）

### 1.3 极限的 ε-δ 定义

**（2）定义**：若对 $\forall \varepsilon > 0$，均存在 $\delta > 0$，使得当

$$
x \in (a-\delta,\ a+\delta) \setminus \{a\}
$$

时，均有 $|f(x) - A| < \varepsilon$，则称 $f(x)$ 在 $x = a$ 处的极限值为 $A$。

即

$$
\forall \varepsilon > 0,\ \exists \delta > 0,\quad \text{使得 } x \in (a-\delta, a+\delta) \setminus \{a\} \Rightarrow |f(x) - A| < \varepsilon.
$$

### 1.4 两种定义的等价性

**(2) $\Rightarrow$ (1)**：$\forall \varepsilon > 0,\ \exists \delta > 0$，当 $x \in (a-\delta, a+\delta) \setminus \{a\}$ 时，有

$$
|f(x) - A| < \varepsilon.
$$

对任意 $\{x_n\}$，有 $\lim\limits_{n\to\infty} x_n = a$，且 $\forall n,\ x_n \neq a$。对上述 $\delta > 0$，一定有 $N$，使当 $n \ge N$ 时 $|x_n - a| < \delta$，

$$
\Rightarrow \text{当 } n \ge N \text{ 时},\ |f(x_n) - A| < \varepsilon \Rightarrow \{f(x_n)\} \text{ 的极限为 } A. \quad \checkmark
$$

**(1) $\Rightarrow$ (2)（反证）**：假设 (2) 不成立，即

$$
\exists \varepsilon_0 > 0,\ \forall \delta > 0,\ \text{在 } (a-\delta, a+\delta)\setminus\{a\} \text{ 中总会有某个 } x,\ \text{使得 } |f(x) - A| \ge \varepsilon_0.
$$

- 当 $\delta = 1$，一定存在 $x_1 \in N(a; 1) \setminus \{a\}$，使 $|f(x_1) - A| \ge \varepsilon_0$；
- 当 $\delta_2 = \min\left\{\tfrac{1}{2},\ |x_1 - a|\right\}$，可在 $N(a;\delta_2) \setminus \{a\}$ 中找到 $x_2$，使 $|f(x_2) - A| \ge \varepsilon_0$；
- ……
- 当 $\delta_n = \min\left\{\tfrac{1}{n},\ |x_1 - a|,\ \ldots,\ |x_{n-1} - a|\right\}$，可在 $N(a;\delta_n)\setminus\{a\}$ 中找到 $x_n$，使 $|f(x_n) - A| \ge \varepsilon_0$。

于是 $\delta_n \le \dfrac{1}{n}$，从而 $\{x_n\}$ 满足

$$
\forall n,\quad |x_n - a| \le \delta_n \le \frac{1}{n},\qquad \forall n,\quad |f(x_n) - A| \ge \varepsilon_0.
$$

矛盾。故 (2) 成立。

### 1.5 左极限与右极限

**定义**：对函数 $f(x)$，若对任意数列 $\{x_n\}$，满足 $\lim\limits_{n\to\infty} x_n = a$ 且 $x_n < a\ (\forall n)$，均有

$$
\lim_{n\to\infty} f(x_n) = A,
$$

则称 $A$ 是 $f(x)$ 在 $x=a$ 处的**左极限**。

**性质**：函数 $f(x)$ 在 $x=a$ 处有极限 $A$ 的充要条件是

$$
\lim_{x \to a^{-}} f(x) = A = \lim_{x \to a^{+}} f(x).
$$

<Figure src="/math-analysis/fig-01-fe4c8b56.webp" alt="图 1-1 分段函数在 x=1 处跳跃间断点" caption="图 1-1 分段函数在 x=1 处跳跃间断点" />

$$
\text{eg.}\quad f(x) = \begin{cases} 2 - x, & x > 1,\\ 1, & x = 1,\\ 1 - x, & x < 1.\end{cases}
$$

### 1.6 x → ∞ 时的极限

**定义**：对函数 $f(x)$，$\forall \varepsilon > 0$，总存在 $M > 0$，使得当 $|x| > M$ 时有 $|f(x) - A| < \varepsilon$，则称 $f(x)$ 在无穷远处的极限为 $A$。

> **例**：$f(x) = \dfrac{1}{x}$，求证 $\lim\limits_{x \to \infty} \dfrac{1}{x} = 0$。
>
> **Pf**：$\left|\dfrac{1}{x} - 0\right| = \dfrac{1}{|x|}$，只须 $|x| > \dfrac{1}{\varepsilon}$，可取得 $M = \dfrac{1}{\varepsilon}$。

**（2）数列形式**：对函数 $f(x)$，对于任意数列 $\{x_n\}$，满足 $n \to \infty$ 时 $\lim\limits_{n\to\infty} x_n = \infty$，则对任意 $\varepsilon > 0$，总存在 $N$，使得当 $n \ge N$ 时，有 $|f(x_n) - A| < \varepsilon$。

### 1.7 极限的性质

**性质（一）**：若 $f(x)$ 的极限存在，则一定唯一。

**性质（2）**：对函数 $f(x),\ g(x)$，若 $\lim\limits_{x \to a} f(x) = A$，$\lim\limits_{x \to a} g(x) = B$，且 $A > B$，则一定存在 $\delta > 0$，使得当

$$
x \in (a - \delta,\ a + \delta) \setminus \{a\}
$$

时，有

$$
f(x) > \frac{A + B}{2} > g(x).
$$

<Figure src="/math-analysis/fig-02-6b49c560.webp" alt="图 1-2 极限保序性：f 与 g 被 (A+B)/2 分开" caption="图 1-2 极限保序性：f 与 g 被 (A+B)/2 分开" />

### 1.8 极限的四则运算

若 $\lim\limits_{x \to a} f(x) = A$，$\lim\limits_{x \to a} g(x) = B$，则

$$
\begin{cases} \lim\limits_{x \to a}\big(f(x) \pm g(x)\big) = A \pm B,\\ \lim\limits_{x \to a} f(x)\,g(x) = A\,B,\\ \text{若 } B \neq 0,\quad \lim\limits_{x \to a} \dfrac{f(x)}{g(x)} = \dfrac{A}{B}.\end{cases}
$$

**例**：求 $\lim\limits_{x \to 0} \dfrac{\sqrt[3]{1+x} - 1}{x}$。

**解**：令 $t = \sqrt[3]{1+x}$，则 $t^3 = 1 + x$，$x \to 0 \Leftrightarrow t \to 1$。

$$
\lim_{x \to 0} \frac{\sqrt[3]{1+x} - 1}{x} = \lim_{t \to 1} \frac{t - 1}{t^3 - 1} = \lim_{t \to 1} \frac{t-1}{(t-1)(t^2 + t + 1)} = \lim_{t \to 1} \frac{1}{t^2 + t + 1} = \frac{1}{3}.
$$

### 1.9 夹逼（控制收敛）

设 $f(x),\ g(x),\ h(x)$ 在 $x=a$ 处满足

$$
f(x) \le g(x) \le h(x)
$$

（在 $x = a$ 的某一去心邻域内成立），且

$$
\lim_{x \to a} f(x) = 0 = \lim_{x \to a} h(x) = 0,
$$

则 $\lim\limits_{x \to a} g(x) = 0$。

> 注：一般形式是“$\lim f = \lim h = A \Rightarrow \lim g = A$”，上面写的是 $A = 0$ 的特例。（整理补注）

### 1.10 重要极限：sin x / x → 1（x → 0）

**换写法**：

$$
\lim_{x \to \infty} \frac{\sin \frac{1}{x}}{\frac{1}{x}} = \lim_{x \to \infty} x \sin \frac{1}{x} = 1,\qquad \lim_{n \to \infty} n \sin \frac{1}{n} = 1.
$$

<Figure src="/math-analysis/fig-03-36ad41c2.webp" alt="图 1-3 sinx/x 的几何证明：三角形<扇形<切三角形" caption="图 1-3 sinx/x 的几何证明：三角形<扇形<切三角形" />

**几何证明**（单位圆扇形面积比较）：

$$
S_{\triangle} = \frac{1}{2}\sin x < S_{\text{扇形}} = \frac{1}{2}x < \frac{1}{2}\tan x
$$

$$
\Rightarrow \sin x < x < \tan x \Rightarrow \frac{x}{\sin x} < \frac{1}{\cos x} \Rightarrow \cos x < \frac{\sin x}{x} < 1
$$

又

$$
|1 - \cos x| = 2\sin^2\frac{x}{2} < 2\left(\frac{x}{2}\right)^2 = \frac{x^2}{2},
$$

$$
\lim_{x \to 0}(1 - \cos x) = \lim_{x \to 0}\frac{x^2}{2} = 0.
$$

故 $\lim\limits_{x \to 0}\cos x = 1$；再由 $\cos x < \dfrac{\sin x}{x} < 1$ 夹逼得

$$
\lim_{x \to 0}\frac{\sin x}{x} = 1.
$$

**应用**：

$$
\lim_{x \to a} g(x)\sin x = \lim_{x \to a} g(x)\,x \cdot \frac{\sin x}{x} = \lim_{x \to a} g(x)\,x \cdot \lim_{x \to a}\frac{\sin x}{x}.
$$

### 1.11 重要极限：(1 + 1/x)^x → e（x → ∞）

**Pf（1）$x \to +\infty$ 时**：取整函数满足 $E(x) \le x \le E(x) + 1$，

$$
\Rightarrow \frac{1}{E(x)+1} \le \frac{1}{x} \le \frac{1}{E(x)}
$$

$$
\Rightarrow 1 + \frac{1}{E(x)+1} \le 1 + \frac{1}{x} \le 1 + \frac{1}{E(x)}
$$

$$
\Rightarrow \left(1 + \frac{1}{E(x)+1}\right)^{E(x)} < \left(1 + \frac{1}{x}\right)^{x} < \left(1 + \frac{1}{E(x)}\right)^{E(x)+1}.
$$

两端极限为

$$
\lim_{x \to +\infty}\left(1 + \frac{1}{E(x)+1}\right)^{E(x)+1} \cdot \frac{1}{1 + \frac{1}{E(x)+1}} = e, \qquad \lim_{x \to +\infty}\left(1 + \frac{1}{E(x)}\right)^{E(x)}\left(1 + \frac{1}{E(x)}\right) = e.
$$

由夹逼得 $\lim\limits_{x \to +\infty}\left(1 + \dfrac{1}{x}\right)^{x} = e$。

**（2）$x \to -\infty$ 时**：令 $x = -\mu\ (\mu \to +\infty)$，

$$
\lim_{\mu \to +\infty}\left(1 - \frac{1}{\mu}\right)^{-\mu} = \lim_{\mu \to +\infty}\left(\frac{\mu}{\mu - 1}\right)^{\mu} = \lim_{\mu \to +\infty}\left(1 + \frac{1}{\mu-1}\right)^{\mu-1}\left(1 + \frac{1}{\mu-1}\right) = e.
$$

### 1.12 单调有界原理

设 $f$ 在 $(a,b)$ 上有定义且单调。

1. 若 $f$ 单调递增且有**上界**，则 $\lim\limits_{x \to b^{-}} f(x)$ 存在，且等于 $\sup\limits_{x \in (a,b)} f(x)$；
2. 若 $f$ 单调递减且有**下界**，则 $\lim\limits_{x \to b^{-}} f(x)$ 存在，且等于 $\inf\limits_{x \in (a,b)} f(x)$。

同理，对左端点：单调递增且有下界时 $\lim\limits_{x \to a^{+}} f(x)\ (=\inf f)$ 存在；单调递减且有上界时 $\lim\limits_{x \to a^{+}} f(x)\ (=\sup f)$ 存在。

### 1.13 例：a^x → 1（x → 0，a > 0，a ≠ 1）

**（1）先考虑 $a > 1$**：则 $a^{x}$（$x \in (-\infty, +\infty)$）随 $x$ 增大而增大。

- 当 $x \in (0, +\infty)$，$a > 1$：$\lim\limits_{x \to 0^{+}} a^{x}$ 一定存在，且 $= 1$；
- 当 $x \in (-\infty, 0)$，令 $x = -\mu$，$a^{x} = \dfrac{1}{a^{\mu}}$，$\lim\limits_{x \to 0^{-}} a^{x} = 1$。

### 1.14 函数极限的 Cauchy 准则

$\lim\limits_{x \to a} f(x)$ 存在的充要条件：$\forall \varepsilon > 0$，$\exists \delta > 0$，使得对任何满足

$$
0 < |x' - a| < \delta \quad \text{和} \quad 0 < |x'' - a| < \delta
$$

的 $x'$ 和 $x''$，都有

$$
|f(x') - f(x'')| < \varepsilon.
$$

即：$x'$、$x''$ 很近 $\Rightarrow$ 对应的函数值很近。

### 1.15 例题

**例 1**：

$$
\lim_{x \to 0}\frac{1 - \cos x}{x^2} = \lim_{x \to 0}\frac{2\sin^2\frac{x}{2}}{4\left(\frac{x}{2}\right)^2} = \frac{1}{2}\cdot\lim_{x \to 0}\left(\frac{\sin\frac{x}{2}}{\frac{x}{2}}\right)^2 = \frac{1}{2}.
$$

**例 2**：

$$
\begin{aligned}
\lim_{x \to \infty}\left(\frac{x^2+1}{x^2-2}\right)^{x^2}
&= \lim_{x \to \infty}\left(1 + \frac{3}{x^2-2}\right)^{x^2}\\
&= \lim_{x \to \infty}\left[\left(1 + \frac{1}{\frac{x^2-2}{3}}\right)^{\frac{x^2-2}{3}}\right]^{3}\left(1 + \frac{3}{x^2-2}\right)^{2}\\
&= \lim_{x \to \infty} e^{3} \cdot 1 = e^{3}.
\end{aligned}
$$

---

## 二、无穷小量与无穷大量的阶、渐近线

### 2.1 无穷小量

**定义**：对一个函数 $f(x)$，在 $U^{0}(x_0) \triangleq (x_0 - \delta,\ x_0 + \delta)\setminus\{x_0\}$ 有定义，若

$$
\lim_{x \to x_0} f(x) = 0,
$$

则称 $f(x)$ 是**无穷小量**。

- △ 无穷小量是一个变量，描述的是一个极限过程。
- 无穷小量与“函数在一点有极限 $0$”是同一件事。

$$
f(x) \text{ 在 } x_0 \text{ 处有极限 } A \iff \lim_{x \to x_0}\big(f(x) - A\big) = 0.
$$

- ◇ $f(x)$ 定义在 $U^{0}(x_0)$ 上，在 $x_0$ 处有极限 $A$ $\iff$ $f(x) - A$ 是 $x \to x_0$ 时的无穷小量。

### 2.2 关于无穷小量的计算

1. 两个无穷小量相加，和也一定是无穷小量；
2. 两个无穷小量相乘，积也一定是无穷小量；
3. 有界量和无穷小量相乘，积也一定是无穷小量。

**补充（有界量的定义）**：$f(x)$（在 $U^{0}(x)$ 上有定义）有界，iff 存在 $M \ge 0$，使得 $\forall x \in U^{0}(x)$，

$$
|f(x)| \le M.
$$

**Pf（3）**：设 $f$ 有界，$g(x)$ 满足 $\lim\limits_{x \to x_0} g(x) = 0$，$(fg)(x) = f(x)\cdot g(x)$，

$$
\therefore\quad |(fg)(x) - 0| = |f(x)\cdot g(x)| \le M\,|g(x)| \to 0.
$$

### 2.3 无穷小量的比较（阶）

比较两个无穷小量“趋于 $0$ 更快？” $\Rightarrow$ 无穷小量的阶。

**定义**：设 $f(x)$、$g(x)$ 在 $U^{0}(x_0)$ 上有定义，且均为 $x \to x_0$ 时的无穷小量：

1. 若 $\lim\limits_{x \to x_0}\dfrac{f(x)}{g(x)} = 0$，则称 $f(x)$ 是 $g(x)$ 的**高阶无穷小量**；
2. a. 若存在 $C>0$，使在 $U^{0}(x_0)$ 上都有 $\left|\dfrac{f(x)}{g(x)}\right| \le C$（即 $f/g$ 有界），则记 $f(x) = O\big(g(x)\big)$；
   b. 若 $\lim\limits_{x \to x_0}\dfrac{f(x)}{g(x)} = c\ (c \neq 0)$，则称 $f(x)$ 是 $g(x)$ 的**同阶无穷小量**。
   - $\because \lim\limits_{x \to x_0}\dfrac{f(x)}{g(x)} = c\ (c \neq 0) \Rightarrow$ 在 $x_0$ 的某一小的去心邻域 $V^{0}(x_0)$ 上，$k < \left|\dfrac{f(x)}{g(x)}\right| < K$，即 $f(x)$ 与 $g(x)$ 在 $x \to x_0$ 时两者趋于 $0$ 的“速度”差不多；
3. 若 $\lim\limits_{x \to x_0}\dfrac{f(x)}{g(x)} = 1$，则称 $f(x)$ 是 $g(x)$ 的**等价无穷小量**，记作

$$
f(x) \sim g(x).
$$

$\Rightarrow$ $g(x)$ 也是 $f(x)$ 的等价无穷小量 ✓

**Pf**：$\lim\limits_{x \to x_0}\dfrac{g(x)}{f(x)} = \lim\limits_{x \to x_0}\dfrac{1}{\dfrac{f(x)}{g(x)}} = \dfrac{1}{\lim\limits_{x \to x_0}\dfrac{f(x)}{g(x)}} = 1.$

### 2.4 等价无穷小与等价关系

若 $f(x) \sim g(x)$，$g(x) \sim h(x)$，则 $f(x) \sim h(x)$。

**Pf**：

$$
\lim_{x \to x_0}\frac{f(x)}{h(x)} = \lim_{x \to x_0}\frac{f(x)}{g(x)}\cdot\frac{g(x)}{h(x)} = \lim_{x \to x_0}\frac{f(x)}{g(x)}\cdot\lim_{x \to x_0}\frac{g(x)}{h(x)} = 1.
$$

- 等价无穷小是数学上的一个**等价关系**。

> **什么是“关系”？** 某种二元运算。对 $\{a_1, \ldots, a_n\}$，有一个关系 $R$：
>

$$
R(a_i, a_j) = \begin{cases} 1, & a_i \text{ 和 } a_j \text{ 有关系},\\ 0, & a_i \text{ 和 } a_j \text{ 没有关系}.\end{cases}
$$

>
> **等价关系的三条性质**：
> - （1）自反性：$A \sim A$；
> - （2）对称性：$A \sim B \Rightarrow B \sim A$；
> - （3）传递性：$A \sim B,\ B \sim C \Rightarrow A \sim C$。

△ **并不是任两个无穷小量都可以谈论“阶”**：

> **eg.**　$\left\{\dfrac{1}{n} + (-1)^{n}\dfrac{1}{n}\right\}$ 与 $\left\{\dfrac{1}{n}\right\}$：
>

$$
\frac{\frac{1}{n} + (-1)^n\frac{1}{n}}{\frac{1}{n}} = 1 + (-1)^{n} = \begin{cases} 0, & n \text{ 为奇数},\\ 2, & n \text{ 为偶数}.\end{cases}
$$

> 极限不存在，故二者不可比较。

**定理**：$f(x),\ g(x),\ h(x)$ 均在 $U^{0}(x_0)$ 上有定义，如果 $f(x) \sim g(x)$，则

1. 若 $\lim\limits_{x \to x_0} f(x)h(x) = A$，则 $\lim\limits_{x \to x_0} g(x)h(x) = A$（前提：$\lim\limits_{x \to x_0} f(x)h(x) \neq 0$）
2. 若 $\lim\limits_{x \to x_0}\dfrac{h(x)}{f(x)} = B$，则 $\lim\limits_{x \to x_0}\dfrac{h(x)}{g(x)} = B$。

**例证**：$\ln(1+x) \sim x\ (x \to 0)$，即 $\lim\limits_{x \to 0}\dfrac{\ln(1+x)}{x} = 1$。

**Pf**：只需证 $\forall \varepsilon > 0$，存在 $\delta > 0$，使 $0 < |x| < \delta$ 时

$$
\left|\frac{\ln(1+x)}{x} - 1\right| < \varepsilon.
$$

取 $\varepsilon_1 = \min\left\{e - e^{1-\varepsilon},\ e^{1+\varepsilon} - e\right\} > 0$。由已证的 $\lim\limits_{x \to 0}(1+x)^{\frac{1}{x}} = e$，存在 $\delta > 0$，使 $0 < |x| < \delta$ 时有

$$
\left|(1+x)^{\frac{1}{x}} - e\right| < \varepsilon_1,
$$

即

$$
e^{1-\varepsilon} < (1+x)^{\frac{1}{x}} < e^{1+\varepsilon}.
$$

两边取自然对数（$\ln$ 单调递增，且 $(1+x)^{1/x} = e^{\ln(1+x)/x}$）得

$$
1 - \varepsilon < \frac{\ln(1+x)}{x} < 1 + \varepsilon,
$$

即 $\left|\dfrac{\ln(1+x)}{x} - 1\right| < \varepsilon$。故 $\ln(1+x) \sim x\ (x \to 0)$。$\blacksquare$

### 2.5 常用的等价无穷小（x → 0）

| # | 等价关系 | 备注 |
|---|---|---|
| 1 | $\sin x \sim x$ | |
| 2 | $\tan x \sim x$ | |
| 3 | $\arcsin x \sim x$ | |
| 4 | $\arctan x \sim x$ | |
| 5 | $\ln(1+x) \sim x$ | $\log_a(1+x) \sim \dfrac{x}{\ln a}$ |
| 6 | $e^{x} - 1 \sim x$ | $a^{x} - 1 \sim x\ln a$ |
| 7 | $(1+x)^{\alpha} - 1 \sim \alpha x$ | |
| 8 | $1 - \cos x \sim \dfrac{1}{2}x^{2}$ | |

**例**：

$$
\lim_{x \to 0}\frac{\sin ax}{\ln(1+x)} = \lim_{x \to 0}\frac{\sin ax}{x} = \lim_{x \to 0} a\cdot\frac{\sin ax}{ax} = a.
$$

### 2.6 无穷大量

$\forall M > 0$，$\exists \delta > 0$，使得当 $x \in U^{0}(x_0;\delta)$ 时，有 $|f(x)| > M$。

**定义**：考虑 $U^{0}(x_0)$ 上的函数 $f(x)$，若有 $\lim\limits_{x \to x_0} f(x) = \infty$，则称 $f(x)$ 是 $x \to x_0$ 时的**无穷大量**。

**关于无穷大量的计算**：

1. 任两个**同号**的无穷大量相加，和一定是无穷大量（正 + 正 $=+\infty$，负 + 负 $=-\infty$）；
2. 任两个无穷大量相乘，积也一定是无穷大量；
3. 一个有界量和一个无穷大量相乘，积**不一定**是无穷大量；
4. 一个无穷大量和一个有界量相加，和也一定是无穷大量；
5. 若 $f(x)$ 是无穷大量，则 $\dfrac{1}{f(x)}$ 是无穷小量；
6. 若 $f(x)$ 是无穷小量，且 $f(x)$ 处处不为零，则 $\dfrac{1}{f(x)}$ 是无穷大量。

### 2.7 大 O 与小 o

（对某一极限过程中的两个变量 $f(x),\ g(x)$）

1. 若 $\lim \dfrac{f(x)}{g(x)} = 0$，则记 $f(x) = o\big(g(x)\big)$；
2. 若在该极限过程中，一直有 $\dfrac{|f(x)|}{g(x)} \le L$，则 $f(x) = O\big(g(x)\big)$。

### 2.8 渐近线

**定义**：若曲线 $C$ 上的动点 $P$，沿着曲线无限地远离原点时，$P$ 点与某定直线 $l$ 的距离趋于 $0$，则称直线 $l$ 为曲线 $C$ 的**渐近线**。

<Figure src="/math-analysis/fig-04-8ebfcc95.webp" alt="图 2-1 渐近线：动点 P 到定直线的距离趋于 0" caption="图 2-1 渐近线：动点 P 到定直线的距离趋于 0" />

设直线 $l: y = kx + b$，则距离

$$
d(P, l) = \frac{|y_P - kx_P - b|}{\sqrt{1 + k^2}},
$$

$$
\lim_{|P| \to \infty} d(P,l) = 0 \iff \lim_{|x_P| \to \infty}\big(y_P - kx_P - b\big) = 0.
$$

**求法**：

$$
k = \lim_{x \to \infty}\frac{f(x)}{x},\qquad b = \lim_{x \to \infty}\big(f(x) - kx\big).
$$

1. 先算 $\lim\limits_{x \to \infty}\dfrac{f(x)}{x} = k$，确定斜渐近线的斜率；
2. 再算 $\lim\limits_{x \to \infty}\big(f(x) - kx\big) = b$。

**例**：求曲线 $f(x) = \dfrac{x^{3}}{x^{2} + 2x - 3}$ 的渐近线。

**解**：

$$
f(x) = \frac{x^{3}}{(x+3)(x-1)},\qquad \begin{cases} x = -3 \Rightarrow \lim\limits_{x \to -3} f(x) = \infty,\\ x = 1 \Rightarrow \lim\limits_{x \to 1} f(x) = \infty,\end{cases}
$$

得垂直渐近线 $x = -3$ 与 $x = 1$。

又

$$
\frac{f(x)}{x} = \frac{x^{2}}{x^{2} + 2x - 3} \Rightarrow k = \lim_{x \to \infty}\frac{f(x)}{x} = \lim_{x \to \infty}\frac{1}{1 + \frac{2}{x} - \frac{3}{x^{2}}} = 1,
$$

$$
b = \lim_{x \to \infty}\big(f(x) - x\big) = \lim_{x \to \infty}\frac{-2x^{2} + 3x}{x^{2}+2x-3} = -2.
$$

∴ 斜渐近线为 $y = x - 2$；连同 $x = -3$、$x = 1$ 共三条。

**结论**（$x \to \infty$ 时）：$o(x^{5}) + o(x^{6}) = o(x^{6})$。

---

## 三、连续函数

### 3.1 函数在一点处连续

**定义**：若函数 $f$ 在 $U(x_0)$ 上有定义，且

$$
\lim_{x \to x_0} f(x) = f(x_0),
$$

则称 $f$ 在 $x_0$ 处**连续**。

记

$$
\Delta x = x - x_0\ (\text{自变量的增量}),\qquad \Delta y = f(x) - f(x_0)\ (\text{因变量的增量}),
$$

则

$$
\lim_{x \to x_0} f(x) = f(x_0) \iff \lim_{\Delta x \to 0}\Delta y = 0 \iff f(x) = f(x_0) + o(1).
$$

### 3.2 例：Dirichlet 函数

$$
D(x) = \begin{cases} 1, & x \text{ 为有理数},\\ 0, & x \text{ 为无理数}.\end{cases}
$$

该函数在**处处**不连续。

**数列刻画**：对任一 $\{x_n\}$，$\lim\limits_{n\to\infty} x_n = x_0$，则一定有 $\lim\limits_{n\to\infty} f(x_n) = f(x_0)$。

**Pf**：

- 若 $x_0$ 是有理数，则 $D(x_0) = 1$。可构造一列无理数 $\left\{x_0 + \dfrac{\sqrt{2}}{n}\right\}$，

$$
\lim_{n \to \infty} D\left(x_0 + \frac{\sqrt{2}}{n}\right) = 0 \neq D(x_0),
$$

故在有理数上不连续。

- 若 $x_0$ 是无理数，则 $D(x_0) = 0$。可构造一列有理数 $\{x_n\} \to x_0$：设

$$
x_0 = a_0.a_1a_2\ldots a_n\ldots,
$$

取 $x_1 = a_0.a_1$，$x_2 = a_0.a_1a_2$，……，则 $x_n \to x_0$ 而 $D(x_n) = 1 \neq 0$。

∴ 在无理数上也不连续。

$\Rightarrow$ 而 $x\cdot D(x)$ 只在 $x = 0$ 处连续。

### 3.3 左连续、右连续与间断点

$$
f(x) \text{ 在 } x_0 \text{ 处左连续} \iff \lim_{x \to x_0^{-}} f(x) = f(x_0),
$$

$$
f(x) \text{ 在 } x_0 \text{ 处右连续} \iff \lim_{x \to x_0^{+}} f(x) = f(x_0).
$$

$f(x)$ 在 $x_0$ 处不连续，则称 $x_0$ 为**间断点**。

- **跳跃度**：$f(x_0 + 0) - f(x_0 - 0)$ 称为 $f$ 在 $x_0$ 处的跃度。
- 若 $\lim\limits_{x \to x_0^{-}} f(x)$ 与 $\lim\limits_{x \to x_0^{+}} f(x)$ 都存在，而 $\lim\limits_{x \to x_0} f(x)$ 不存在。

**间断点分类**：

| 类型 | 判据 | 子类 |
| --- | --- | --- |
| 第一类间断点 | 左右极限**都**存在 | （1）可去间断点：$\lim\limits_{x\to x_0}f(x)$ 存在但 $\neq f(x_0)$；（2）跳跃间断点：$\lim\limits_{x\to x_0^{-}}f(x) = f(x_0-0)$ 与 $\lim\limits_{x\to x_0^{+}}f(x) = f(x_0+0)$ 都存在但不相等 |
| 第二类间断点 | 左右极限中**至少有一个**不存在 | （3）$\lim\limits_{x \to x_0^{-}} f(x)$ 与 $\lim\limits_{x \to x_0^{+}} f(x)$ 中至少有一个不存在 |

### 3.4 函数在区间 I 上的连续性

**定义**：若 $f$ 在区间 $I$ 上任意一点 $x$ 处连续，则称 $f(x)$ 在区间 $I$ 上连续。

对 $I = [a, b]$：若 $a < x < b$，一定会有某个 $\delta$ 使 $(x-\delta, x+\delta) \subset [a,b]$；若 $x = a$，$(a-\delta, a+\delta)$ 不会完整包含在 $[a,b]$ 内，故**在左端点处右连续**：

$$
\lim_{x \to a^{+}} f(x) = f(a).
$$

### 3.5 分段函数与 Riemann 函数

**定义**：$f$ 在区间 $I$ 上只有有限多个第一类间断点，则称 $f$ 在 $I$ 上**分段连续**。

**例（Riemann 函数）**：

$$
R(x) = \begin{cases} \dfrac{1}{q}, & x = \dfrac{p}{q}\ \text{（}p,q\text{ 为既约正整数，}q>0\text{）},\\ 0, & x = 0 \text{ 以及 } x \text{ 为无理数},\end{cases}\qquad x \in (0,1).
$$

**证明** $R(x)$ 在 $(0,1)$ 上的任一无理点上均连续，在有理数上不连续。

**Pf**：$\forall \varepsilon > 0$，取 $\dfrac{1}{q} \ge \varepsilon$（$q$ 为正整数），则 $q$ 的取值是有限的

$$
\Rightarrow \left\{x = \frac{p}{q} : \frac{1}{q} \ge \varepsilon,\ 0<x<1\right\} \text{ 中既约真分数有有限多个} \Rightarrow \text{记为 } \{a_1, a_2, \ldots, a_n\}.
$$

考虑任一无理数 $x_0 \in (0,1)$，取

$$
\delta = \min\left\{|x_0 - a_1|,\ \ldots,\ |x_0 - a_n|\right\} > 0,
$$

则对满足 $|x - x_0| < \delta$ 的 $x$：

- 若 $x$ 是有理数，$|R(x) - R(x_0)| = \dfrac{1}{q} - 0 < \varepsilon$；
- 若 $x$ 是无理数，$|R(x) - R(x_0)| = 0 < \varepsilon$。

∴ 在 $(0,1)$ 上的任一无理点上均连续，在有理数上不连续。

### 3.6 连续函数的性质

**性质 1**（极限与函数可交换）：

$$
\lim_{x \to x_0} f(x) = f(x_0) = f\left(\lim_{x \to x_0} x\right).
$$

**性质 2（函数的复合运算）**：若函数 $g$ 在 $x_0$ 处连续，$f$ 在 $\mu$ 处连续，且 $g(x_0) = \mu$，则 $f \circ g(x)$ 在 $x_0$ 处也连续。

**Pf**：$f$ 在 $\mu$ 处连续，则 $\forall \varepsilon > 0,\ \exists \delta_1 > 0$，使得当 $|v - \mu| < \delta_1$ 时，有

$$
|f(v) - f(\mu)| < \varepsilon.
$$

又 $g(x_0) = \mu$，且 $g$ 在 $x_0$ 处连续，则对上述 $\delta_1 > 0$ 一定有 $\delta_2 > 0$，使得当 $|x - x_0| < \delta_2$ 时，有

$$
|g(x) - g(x_0)| = |g(x) - \mu| < \delta_1.
$$

$\Rightarrow$ 当 $|x - x_0| < \delta_2$ 时，

$$
|f \circ g(x) - f \circ g(x_0)| = |f(g(x)) - f(\mu)| < \varepsilon.
$$

∴ $f \circ g$ 在 $x_0$ 处连续。

- 特别地，$\lim\limits_{x \to x_0^{+}} f(x) = f(x_0) \iff f\left(\lim\limits_{x \to x_0^{+}} x\right) = f(x_0)$。

- 函数 $f$ 在 $x_0$ 处取极限，意味着在该点，函数运算与取极限是可以交换顺序的。

### 3.7 反函数

若 $f$ 在 $I$ 上严格单调，则 $g = f^{-1}$ 一定存在且唯一；此外，若 $f$ 在 $I$ 上连续，则 $g$ 也连续。

---

## 四、闭区间上连续函数的性质

### 4.1 最值定理（Weierstrass）

**定义**：若 $f(x)$ 在 $[a,b]$ 上连续，则一定存在 $x_1, x_2 \in [a,b]$，使得

$$
f(x_1) = \max_{a \le x \le b} f(x),\qquad f(x_2) = \min_{a \le x \le b} f(x).
$$

### 4.2 介值定理

若 $f(x)$ 在 $[a,b]$ 上连续，且 $f(a) \neq f(b)$（设 $f(a) < f(b)$），则对任一

$$
\mu \in \big(f(a),\ f(b)\big),
$$

一定存在 $x \in (a,b)$，使 $f(x) = \mu$。

**概念区分：最大值 vs 上确界**

<Figure src="/math-analysis/fig-05-a0cfc313.webp" alt="图 4-1 最大值与上确界之别：开区间取不到最大值" caption="图 4-1 最大值与上确界之别：开区间取不到最大值" />

对 $y = x\ (x \in (1,2))$，其函数值没有最大值，但有上确界 $= 2$。

> 最大值 = 上确界 **且能取到**。

### 4.3 有界性定理的证明

**（1）$f(x)$ 在 $[a,b]$ 上有界。**

若没有上界，则对 $n = 1$，一定存在 $x_1 \in [a,b]$，且 $f(x_1) > 1$。

我们得到一个数列 $\{x_n\}$，

$$
\lim_{n \to \infty} f(x_n) = +\infty.
$$

∴ 类似地，可构造数列 $\{x_n\}$，使 $f(x_n) > n$。

又 $\because \{x_n\} \subset [a,b]$，则一定可以构造出一个收敛子列 $\{x_{n_k}\}$，

$$
\lim_{k \to \infty} x_{n_k} = x_0 \in [a,b].
$$

$$
\lim_{k \to \infty} f(x_{n_k}) = \lim_{n \to \infty} f(x_n) = +\infty,
$$

而 $f\left(\lim\limits_{k \to \infty} x_{n_k}\right) = f(x_0)$ 存在，矛盾。

$$
\therefore f(x) \text{ 在 } [a,b] \text{ 上有界}.
$$

**（2）$f(x)$ 在 $[a,b]$ 上有上下确界。**

由确界原理：有上界必有上确界，有下界必有下确界。

### 4.4 最值必能取到

设

$$
M = \sup_{x \in [a,b]} f(x),
$$

若存在 $\bar{x} \in [a,b]$ 使 $f(\bar{x}) = M$，则最大值取到。若取不到，则 $M - f(x)$ 在 $[a,b]$ 上恒有 $M - f(x) > 0$，构造

$$
g(x) = \frac{1}{M - f(x)},\qquad \text{则 } g(x) \text{ 在 } [a,b] \text{ 上有界},\ 0 \le g(x) \le N.
$$

$$
\Rightarrow M - f(x) \ge \frac{1}{N},\qquad f(x) \le M - \frac{1}{N},
$$

与 $M = \sup\limits_{x \in [a,b]} f(x)$ 矛盾。∴ 必取到。

### 4.5 介值定理的证明

<Figure src="/math-analysis/fig-06-466fe3f8.webp" alt="图 4-2 介值定理证明：E 的上确界即零点" caption="图 4-2 介值定理证明：E 的上确界即零点" />

令

$$
g(x) \triangleq f(x) - \mu \Rightarrow g(a) < 0,\ g(b) > 0,
$$

取

$$
E = \left\{x \in [a,b] \mid f(x) - \mu < 0\right\} = \left\{x \in [a,b] \mid g(x) < 0\right\}.
$$

由确界原理，$E$ 有上确界 $x_0 = \sup E \in [a,b]$（$E \neq \varnothing$，因 $a \in E$；$b \notin E$，故 $E \subsetneq [a,b]$）。

- 若 $g(x_0) < 0$：由连续性，存在 $\delta > 0$ 使 $(x_0, x_0 + \delta)$ 上 $g(x) < 0$，即 $x_0 + \tfrac{\delta}{2} \in E$，与 $x_0 = \sup E$ 矛盾；
- 若 $g(x_0) > 0$：同理，存在 $\delta > 0$ 使 $(x_0 - \delta, x_0)$ 上 $g(x) > 0$，即 $E$ 中没有大于 $x_0 - \delta$ 的点，故 $\sup E \le x_0 - \delta < x_0$，矛盾。

∴ $g(x_0) = 0$，即 $f(x_0) = \mu$。

**推论**：若 $f(x)$ 在 $[a,b]$ 上连续，则对 $[m, M]$ 内任一 $\mu$，一定存在 $x \in [a,b]$ 使 $f(x) = \mu$，其中

$$
m = \min f(x),\qquad M = \max f(x).
$$

### 4.6 应用：方程解的存在性

**例**：$a > 0$，证明 $x^{n} = a$ 有唯一的正实数解。

**解**：

$$
f(x) = x^{n} - a \Rightarrow f(0) = -a < 0,
$$

一定存在 $b > 0$，使 $f(b) = b^{n} - a > 0$。

∴ 存在 $r \in (0, b)$ 使 $r^{n} = a$。

再证唯一性：若 $r_1 \neq r_2$，均有 $r_1^{n} = r_2^{n}$，则

$$
r_1^{n} - r_2^{n} = (r_1 - r_2)\left(r_1^{n-1} + r_1^{n-2}r_2 + \cdots + r_2^{n-1}\right) = 0,
$$

但 $r_1 - r_2 \neq 0$ 且括号内各项同号为正，矛盾。故解唯一。

### 4.7 应用：不动点

**例**：若 $f(x)$ 在 $[a,b]$ 上连续，且 $f([a,b]) \subset [a,b]$，求证：至少存在一个 $x \in [a,b]$，使得 $f(x) = x$（$x$ 为 $f(x)$ 的**不动点**）。

**解**：考察

$$
g(x) = f(x) - x.
$$

若 $f(a) = a$ 或 $f(b) = b$，结论已成立。否则 $f(a) > a$、$f(b) < b$，即

$$
g(a) = f(a) - a > 0,\qquad g(b) = f(b) - b < 0.
$$

由介值定理，存在 $x \in (a,b)$ 使 $g(x) = 0$，即 $f(x) = x$。

### 4.8 一致连续性

**闭区间上的连续函数必一致连续。**

**定义**：若 $f$ 满足

$$
\forall \varepsilon > 0,\ \exists \delta > 0\ (\delta \text{ 只依赖于 } \varepsilon),
$$

使得 $\forall x, y \in D$，只要 $|x - y| < \delta$ 就有 $|f(x) - f(y)| < \varepsilon$，则称 $f$ 在 $D$ 上**一致连续**。

**例**：$\dfrac{1}{x}$ 在 $(0, +\infty)$ 上不一致连续，但在 $[a, +\infty)$ 上一致连续。

### 4.9 初等函数的连续性

**（1）基本初等函数的连续性**

若 $f_i$ 在 $x_0$ 处连续（$\lim\limits_{x \to x_0} f_i(x) = f_i(x_0)$），则

$$
\sum_{i=1}^{n} a_i f_i(x)\quad (a_i \in \mathbb{R})
$$

在 $x_0$ 处连续。

**（2）乘积**：$f_1 f_2(x) = f_1(x)f_2(x)$，

$$
\lim_{x \to x_0} f_1(x) f_2(x) = \lim_{x \to x_0} f_1(x)\cdot\lim_{x \to x_0} f_2(x) = f_1(x_0)f_2(x_0),
$$

故连续。

**（3）商**：$\dfrac{f_1}{f_2}(x)$（$f_2(x_0) \neq 0$）在 $x_0$ 处连续。

**三角函数的连续性**（以 $\sin x$ 为例，用和差化积）：

$$
\left|\sin(x_0 + \Delta x) - \sin x_0\right| = \left|2\cos\left(x_0 + \frac{1}{2}\Delta x\right)\sin\frac{1}{2}\Delta x\right| \le 2\left|\sin\frac{1}{2}\Delta x\right| \le |\Delta x|,
$$

故 $\Delta x \to 0$ 时 $\sin(x_0 + \Delta x) \to \sin x_0$，即 $\sin x$ 在 $x_0$ 处连续。

同理由 $\tan x = \dfrac{\sin x}{\cos x}$ 可得 $\tan x$ 的连续性：

$$
\lim_{\Delta x \to 0}\big(\tan(x_0+\Delta x) - \tan x_0\big) = \lim_{\Delta x \to 0}\frac{\sin\Delta x}{\cos x_0\cos(x_0 + \Delta x)} = 0.
$$

### 4.10 反三角函数的连续性与反函数定理

**定理（反函数存在与连续定理）**：若函数 $f$ 在 $[a,b]$ 上严格单调且连续，则 $g = f^{-1}$ 作为 $f$ 的反函数，一定存在且连续。

**Pf**（设 $f$ 在 $[a,b]$ 上严格单调递增）：

**① 满射**：由介值定理，$f$ 取遍 $f(a)$ 与 $f(b)$ 之间的一切值，故

$$
f([a,b]) = \big[f(a), f(b)\big].
$$

**② 单射**：严格单调 $\Rightarrow$ 一一对应。故 $g = f^{-1}:\ [f(a), f(b)] \to [a,b]$ 一定存在。

**③ 连续**：任取 $y_0 \in (f(a), f(b))$，记 $x_0 = g(y_0) \in (a,b)$。$\forall \varepsilon > 0$（取 $\varepsilon$ 足够小，使 $x_0 \pm \varepsilon \in (a,b)$），令

$$
\delta = \min\left\{f(x_0) - f(x_0 - \varepsilon),\ f(x_0 + \varepsilon) - f(x_0)\right\} > 0,
$$

则当 $|y - y_0| < \delta$ 时 $f(x_0 - \varepsilon) < y < f(x_0 + \varepsilon)$，由 $g$ 单调递增得

$$
x_0 - \varepsilon < g(y) < x_0 + \varepsilon,
$$

即 $|g(y) - g(y_0)| < \varepsilon$。故 $g$ 在 $y_0$ 处连续；端点处同理（单侧连续）。$\blacksquare$

### 4.11 幂函数与初等函数

多项式

$$
f(x) = a_n x^{n} + a_{n-1}x^{n-1} + \cdots + a_0
$$

连续。

形如 $2^{\sqrt{2}}$ 这样的式子：考察 $f(x) = 2^{x}$ 的连续性。$\sqrt{2}$ 一定会有一列有理数 $\{p_n\}$ 趋近于它，

$$
2^{\sqrt{2}} = \lim_{n \to \infty} 2^{p_n}.
$$

**定理**：初等函数在其定义域内连续。

### 4.12 例题：1^∞ 型极限

**例**：设

$$
\lim_{x \to x_0}\mu(x) = 1,\qquad \lim_{x \to x_0}v(x) = +\infty,\qquad \lim_{x \to x_0}v(x)\big(\mu(x) - 1\big) = \alpha,
$$

证明 $\lim\limits_{x \to x_0}\mu(x)^{v(x)} = e^{\alpha}$，并计算

$$
\lim_{x \to 0}\tan\left(x + \frac{\pi}{4}\right)^{\csc x}\qquad \left(\csc x = \frac{1}{\sin x}\right).
$$

**证明**：

$$
\mu(x)^{v(x)} = e^{v(x)\ln\mu(x)},
$$

$$
\lim_{x \to x_0}\mu(x)^{v(x)} = e^{\lim\limits_{x \to x_0} v(x)\ln\mu(x)},
$$

而

$$
\begin{aligned}
\lim_{x \to x_0}v(x)\ln\mu(x)
&= \lim_{x \to x_0}v(x)\ln\big(1 + (\mu(x)-1)\big)\\
&= \lim_{x \to x_0}v(x)\big(\mu(x)-1\big) \quad \big(\ln(1+t)\sim t\big)\\
&= \alpha.
\end{aligned}
$$

$$
\therefore \lim_{x \to x_0}\mu(x)^{v(x)} = e^{\alpha}.
$$

**计算**：

$$
\lim_{x \to 0}\tan\left(x + \frac{\pi}{4}\right) = 1,\qquad \lim_{x \to 0}\csc x = \infty,
$$

$$
\tan\left(x + \frac{\pi}{4}\right) = \frac{2\tan x + 1}{1 - \tan x},
$$

$$
\lim_{x \to 0}\csc x\left(\tan\left(x + \frac{\pi}{4}\right) - 1\right) = \lim_{x \to 0}\frac{1}{\sin x}\cdot\frac{2\tan x}{1 - \tan x} = \lim_{x \to 0}\frac{2\tan x}{\sin x(1 - \tan x)} = 2,
$$

$$
\therefore \lim_{x \to 0}\tan\left(x + \frac{\pi}{4}\right)^{\csc x} = e^{2}.
$$

### 4.13 李普希兹条件

若 $f(x)$ 满足：对 $D_f$ 内任意两点 $x'$、$x''$，一定有

$$
\left|f(x') - f(x'')\right| \le L\left|x' - x''\right|,
$$

其中 $L$ 为常数，则称 $f$ 满足**李普希兹条件**。

> 满足李普希兹条件的函数一定一致连续。
