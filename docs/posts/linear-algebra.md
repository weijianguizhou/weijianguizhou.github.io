---
title: 高等代数笔记
date: 2026-10-24
tags:
  - 数学
  - 代数
  - 高等代数
---

# 高等代数笔记

这套笔记把吕新民老师的的 PPT（北大《高等代数》体系）、李思的《线性代数讲义》、以及 Linear Algebra Done Right (Sheldon Axler, 4th Ed.)]、Linear Algebra (M. Thamban Nair & Arindama Singh, Springer 2018)、Matrix Analysis and Applied Linear Algebra (Carl D. Meyer, SIAM)本书的相关内容合在一起，以期形成自己的理解。

记号：$K$ 是数域，一般就当成 $\mathbb{Q},\mathbb{R},\mathbb{C}$；$V$ 是 $K$ 上有限维线性空间，$\dim V=n$；$A^{\mathsf T}$ 是转置，$A^{*}$ 是共轭转置（实情形就是转置）；$(f,g)$ 表示首一最大公因式；$I_n$ 或 $E$ 是单位阵。

## 目录

- [第一章 多项式](#第一章-多项式)
- [第二章 行列式](#第二章-行列式)
- [第三章 矩阵](#第三章-矩阵)
- [第四章 线性方程组](#第四章-线性方程组)
- [第五章 二次型](#第五章-二次型)
- [第六章 线性空间](#第六章-线性空间)
- [第七章 线性变换](#第七章-线性变换)
- [第八章 λ-矩阵与相似标准形](#第八章-λ-矩阵与相似标准形)
- [第九章 欧氏空间](#第九章-欧氏空间)
- [第十章 双线性函数与对偶空间](#第十章-双线性函数与对偶空间)
- [第十一章 解析几何](#第十一章-解析几何)
- [附录 A 定理与证明手法](#附录-a-定理与证明手法)
- [附录 B 计算套路](#附录-b-计算套路)
- [附录 C 矩阵求导](#附录-c-矩阵求导)
- [附录 D 讲义里超出考纲的部分](#附录-d-讲义里超出考纲的部分)

## 第一章 多项式

> [← 返回总目录](#目录)

### 1.1 数域与归纳法

数域是复数的一个子集 $P$，含 $0,1$，并且对加、减、乘、除（除数非零）封闭。任何数域都含 $\mathbb{Q}$，因为 $1$ 在里头，反复加减得到 $\mathbb{Z}$，再取商得到 $\mathbb{Q}$。所以 $\mathbb{Q}$ 是最小的数域。

$\mathbb{Q}[\sqrt2]=\{a+b\sqrt2\mid a,b\in\mathbb{Q}\}$ 是数域，除法靠有理化：

$$
\frac{a+b\sqrt2}{c+d\sqrt2}=\frac{ac-2bd}{c^2-2d^2}+\frac{bc-ad}{c^2-2d^2}\sqrt2 .
$$

每个素数 $p$ 都能这样造出一个介于 $\mathbb{Q}$ 和 $\mathbb{R}$ 之间的数域，这是后来域扩张的雏形。

数学归纳法有两种常用形式。第一归纳法：$0\in S$，且 $n\in S\Rightarrow n+1\in S$，则 $S=\mathbb{N}$。第二归纳法：$0\in S$，且 $0,1,\dots,n-1$ 全在 $S$ 中 $\Rightarrow n\in S$，则 $S=\mathbb{N}$。两者等价，也都等价于最小数原理：$\mathbb{N}$ 的非空子集有最小元。多项式里的整除、因式分解几乎全靠第二归纳法。

### 1.2 多项式环

$K[x]$ 里的元素写成

$$
f(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0,\qquad a_i\in K .
$$

$a_n\ne0$ 时称 $n$ 为次数，记 $\deg f=n$；零多项式不定义次数（或约定 $-\infty$）。首项系数为 $1$ 的叫首一多项式。两个多项式相等，指的是同次项系数全相等。

加法是逐项加，乘法是卷积：

$$
f(x)g(x)=\sum_{s=0}^{n+m}\Bigl(\sum_{i+j=s}a_ib_j\Bigr)x^s .
$$

$K[x]$ 对这两种运算构成交换环，并且是整环（无零因子）。于是有消去律：$f\ne0$ 且 $fg=fh$，则 $g=h$。

次数公式在 $K$ 是域（更一般地是整环）时成立：

$$
\deg(f\pm g)\le\max\{\deg f,\deg g\},\qquad \deg(fg)=\deg f+\deg g .
$$

第二个式子成立是因为首项系数 $a_nb_m\ne0$。$K$ 有零因子时就会失效，比如 $\mathbb{Z}_6[x]$ 里 $(2x)(3x)=0$。

### 1.3 带余除法

设 $f,g\in K[x]$，$g\ne0$。存在唯一的 $q,r\in K[x]$ 使

$$
f=qg+r,\qquad r=0\ \text{或}\ \deg r<\deg g .
$$

存在性对 $\deg f$ 作第二归纳：若 $\deg f<\deg g$ 就取 $q=0,r=f$；否则设 $f,g$ 首项为 $ax^n,bx^m$，令 $q_1=\dfrac{a}{b}x^{n-m}$，则 $f-q_1g$ 的次数严格小于 $n$，对它用归纳假设即可。这里用到 $K$ 是域，$b$ 可除。整系数多项式就没有这个性质，$x^2+1$ 除以 $2x$ 在 $\mathbb{Z}[x]$ 里除不尽。

唯一性：若 $f=qg+r=q'g+r'$，则 $(q-q')g=r'-r$。右边次数小于 $\deg g$，左边只要 $q\ne q'$ 次数就不小于 $\deg g$，矛盾。所以 $q=q'$，$r=r'$。

带余除法是后面一切的地基：整除、公因式、重根、Jordan 形里的不变因子，都是它的推论。

### 1.4 整除与最大公因式

$g\mid f$ 意思是存在 $h$ 使 $f=gh$。整除有传递性，也对线性组合封闭：$f\mid g,h\Rightarrow f\mid ug+vh$。

最大公因式 $d=(f,g)$ 要满足两条：$d\mid f$，$d\mid g$；并且任何公因式 $c$ 都满足 $c\mid d$。它在相差一个非零常数的意义下唯一，通取首一的那一个。

辗转相除：

$$
\begin{aligned}
f&=q_1g+r_1,\\
g&=q_2r_1+r_2,\\
&\ \vdots\\
r_{s-1}&=q_{s+1}r_s .
\end{aligned}
$$

因为 $(f,g)$ 与 $(g,r_1)$ 的公因式集合相同，一路下去得到 $(f,g)=r_s$（首一化）。次数严格下降，所以有限步必停。

把余式反代回去，就得到 Bézout 恒等式：

$$
(f,g)=u(x)f(x)+v(x)g(x).
$$

$u,v$ 不唯一，差一个 $f$ 或 $g$ 的倍数都行。求的时候从倒数第二行往上代，别从第一行往下猜。

互素就是 $(f,g)=1$。几个常用的等价与推论：

- $(f,g)=1$ $\iff$ 存在 $u,v$ 使 $uf+vg=1$。
- 若 $(f,g)=1$ 且 $f\mid gh$，则 $f\mid h$。
- 若 $f_1\mid g$，$f_2\mid g$，且 $(f_1,f_2)=1$，则 $f_1f_2\mid g$。
- 若 $uf+vg=(f,g)$，则 $(u,v)=1$。

第一条的证明：右边存在就说明任何公因式都整除 $1$；反过来用辗转相除反代。第二条的关键是拿 $uf+vg=1$ 乘 $h$，得 $ufh+vgh=h$，两项都被 $f$ 整除。

### 1.5 不可约多项式与唯一分解

$p\in K[x]$，$\deg p\ge1$，若 $p=fg$ 只能有一个是常数，就说 $p$ 在 $K$ 上不可约。不可约是相对于数域说的：$x^2+1$ 在 $\mathbb{R}$ 上不可约，在 $\mathbb{C}$ 上等于 $(x+i)(x-i)$。

不可约多项式的核心性质：$p\mid fg$ 则 $p\mid f$ 或 $p\mid g$。理由：若 $p\nmid f$，则 $(p,f)=1$（$p$ 的因式只有常数和自身），由 Bézout 得 $up+vf=1$，乘 $g$ 得 $upg+vfg=g$，右边被 $p$ 整除。

分解定理：$K[x]$ 中每个次数 $\ge1$ 的多项式都能写成不可约多项式之积，且不计次序、不计非零常数因子时唯一。存在性对次数归纳；唯一性靠上面那条性质逐个消去。

标准分解式：把首项系数提出来，把相同的不可约因式合并，

$$
f(x)=c\,p_1^{r_1}(x)p_2^{r_2}(x)\cdots p_s^{r_s}(x),
$$

其中 $c$ 是首项系数，$p_i$ 是互不相同的首一不可约多项式。

### 1.6 重因式与导数

若 $p^k\mid f$ 而 $p^{k+1}\nmid f$，称 $p$ 是 $f$ 的 $k$ 重因式。$k=1$ 叫单因式，$k>1$ 叫重因式。

形式导数是

$$
f'(x)=na_nx^{n-1}+(n-1)a_{n-1}x^{n-2}+\cdots+a_1 .
$$

数域上 $f$ 是 $n$ 次，$f'$ 就是 $n-1$ 次，不会像特征 $p$ 的域那样掉次数，这让我们能放心用导数判重根。

关键定理：若不可约多项式 $p$ 是 $f$ 的 $k$ 重因式，则 $p$ 是 $f'$ 的 $k-1$ 重因式。写 $f=p^kg$，$p\nmid g$，求导：

$$
f'=p^{k-1}\bigl(kgp'+pg'\bigr).
$$

括号里那一项模 $p$ 等于 $kgp'$，$k\ne0$，$p\nmid g$，$p'$ 次数低于 $p$ 所以 $p\nmid p'$，于是 $p$ 不整除括号。故 $p$ 恰是 $f'$ 的 $k-1$ 重因式。

推论：$f$ 无重因式 $\iff (f,f')=1$。若 $p$ 是 $k$ 重因式，它就同时整除 $f,f'$；反过来，公因式一定是某个重因式。这个判别在实际计算里比求根好用得多。

求 $f$ 的因式分解可以走这条路：算 $d=(f,f')$，则 $f/d$ 把所有重因式降成单因式，$d$ 里保留了重数信息。

### 1.7 多项式函数与根

对 $\alpha\in K$，$f(\alpha)$ 是 $f$ 在 $\alpha$ 处的值。带余除法除以 $x-\alpha$：

$$
f(x)=(x-\alpha)q(x)+c,\qquad c=f(\alpha).
$$

这就是余数定理。于是

$$
\alpha \text{ 是 } f \text{ 的根}\iff (x-\alpha)\mid f .
$$

$n$ 次多项式在数域里最多 $n$ 个根（重根按重数算）。在 $\mathbb{C}$ 上正好 $n$ 个，因为可以完全分解。证明就是每提一个 $(x-\alpha)$ 次数降一。

重根的判别：$\alpha$ 是 $f$ 的 $k$ 重根 $\iff$

$$
f(\alpha)=f'(\alpha)=\cdots=f^{(k-1)}(\alpha)=0,\qquad f^{(k)}(\alpha)\ne0 .
$$

例：若 $(x-1)^2\mid ax^4+bx^2+1$，则 $f(1)=0$ 且 $f'(1)=0$：

$$
\begin{cases}a+b+1=0,\\ 4a+2b=0,\end{cases}\Longrightarrow a=1,\ b=-2 .
$$

### 1.8 复系数与实系数多项式

代数基本定理：每个次数 $\ge1$ 的复系数多项式都有复根。反复提取一次因式，得

$$
f(x)=a_n(x-\alpha_1)^{\ell_1}\cdots(x-\alpha_s)^{\ell_s}.
$$

所以 $\mathbb{C}$ 上不可约多项式就是一次多项式。

实系数多项式若 $\alpha$ 是根，则 $\bar\alpha$ 也是根，重数相同（因为系数是实数的共轭等于自身）。所以 $\mathbb{R}$ 上的不可约多项式只有两类：一次多项式，以及判别式 $p^2-4q<0$ 的二次多项式 $x^2+px+q$。于是

$$
f(x)=a_n\prod_i (x-\alpha_i)^{\ell_i}\prod_j (x^2+p_jx+q_j)^{k_j},
$$

其中 $\alpha_i\in\mathbb{R}$，二次因子在实数上不可约。奇次实多项式必有实根，因为复根成对出现。

判断一个具体多项式在给定数域上是否不可约，通常没有万能办法。$x^4+4$ 在 $\mathbb{Q}$ 上可约，用 Sophie Germain 恒等式：

$$
x^4+4=(x^2+2)^2-4x^2=(x^2+2x+2)(x^2-2x+2).
$$

$x^4+2$ 就不行，得换 Eisenstein。

### 1.9 有理系数多项式

先清分母。任意 $f\in\mathbb{Q}[x]$ 乘一个正整数就能化成整系数多项式；再提出系数的最大公因数，得到 $f=c\,g$，其中 $c\in\mathbb{Q}$，$g$ 是本原多项式。所以有理系数多项式的不可约性问题可以化成整系数问题。

本原多项式：系数互素的整系数多项式。Gauss 引理：两个本原多项式的乘积仍是本原多项式。

证明思路：设 $h=fg$。若 $h$ 不本原，存在素数 $p$ 整除 $h$ 的所有系数。由于 $f$ 本原，$p$ 不可能整除 $f$ 的所有系数，取 $f$ 中第一个不被 $p$ 整除的系数 $a_i$；同理取 $g$ 中第一个不被 $p$ 整除的 $b_j$。看 $h$ 的 $x^{i+j}$ 项系数：

$$
d_{i+j}=a_ib_j+a_{i+1}b_{j-1}+\cdots+a_{i-1}b_{j+1}+\cdots
$$

除 $a_ib_j$ 外每一项都含一个被 $p$ 整除的因子，所以模 $p$ 只剩 $a_ib_j\not\equiv0$，与 $p\mid d_{i+j}$ 矛盾。

于是有：整系数多项式在 $\mathbb{Q}$ 上可约 $\iff$ 在 $\mathbb{Z}$ 上可约（分解成两个低次整系数多项式之积）。这条把问题搬到了整数上，非常好用。

有理根定理：设 $f=a_nx^n+\cdots+a_0\in\mathbb{Z}[x]$，既约分数 $\dfrac{r}{s}$ 是根，则

$$
s\mid a_n,\qquad r\mid a_0 .
$$

证明：代入 $x=r/s$，乘 $s^n$，移项得 $r(a_nr^{n-1}+\cdots)= -a_0s^n$，左边被 $r$ 整除，且 $(r,s)=1$，故 $r\mid a_0$；同理 $s\mid a_n$。

首一整系数多项式的有理根只能是整数，且整除常数项。这条在考试里出现频率极高。

Eisenstein 判别法：$f=a_nx^n+\cdots+a_0\in\mathbb{Z}[x]$，若存在素数 $p$ 使

$$
p\nmid a_n,\qquad p\mid a_{n-1},\dots,a_0,\qquad p^2\nmid a_0,
$$

则 $f$ 在 $\mathbb{Q}$ 上不可约。

证明走模 $p$：若 $f=gh$ 在 $\mathbb{Z}[x]$ 中，模 $p$ 后 $\bar f=\bar a_nx^n$。因为 $\bar a_n\ne0$，$\bar g,\bar h$ 都只能是单项式 $\bar bx^k,\bar cx^{n-k}$ 的形状，于是 $g,h$ 的常数项都被 $p$ 整除，$a_0$ 就被 $p^2$ 整除，矛盾。

Eisenstein 不是万能的，很多多项式直接套不上，要先平移。$f(x)$ 与 $f(x\pm1)$ 的可约性相同，所以可以试着把 $x$ 换成 $x+1$：

$$
f(x)=x^6+x^3+1,\qquad f(y+1)=y^6+6y^5+15y^4+21y^3+18y^2+9y+3 .
$$

取 $p=3$，末项系数 $3$ 不被 $9$ 整除，前面系数都被 $3$ 整除，首项不被 $3$ 整除，于是不可约。这个技巧对付分圆多项式特别顺：$\Phi_p(x)=x^{p-1}+\cdots+x+1$ 换成 $x+1$ 后，除首项外系数都是二项式系数，全被 $p$ 整除，常数项是 $p$ 不被 $p^2$ 整除。

还有一个模 $p$ 判别：若某个素数 $p\nmid a_n$，且 $f$ 模 $p$ 后次数不变并且在 $\mathbb{F}_p$ 上不可约，则 $f$ 在 $\mathbb{Q}$ 上不可约。因为可约会模 $p$ 后保持可约。$x^4+x+1$ 模 $2$ 后没有一次因子，也不被 $x^2+x+1$ 整除，所以不可约。反过来，$x^4+1$ 在 $\mathbb{Q}$ 上不可约，却在每个奇素数模下都能拆成两个二次式，这个方法对它失效。

### 1.10 对称多项式、Vieta 与 Newton 恒等式

$n$ 元多项式 $f(x_1,\dots,x_n)$ 若在任意置换变量后不变，称为对称多项式。初等对称多项式是

$$
\sigma_1=\sum x_i,\quad \sigma_2=\sum_{i<j}x_ix_j,\quad \dots,\quad \sigma_n=x_1x_2\cdots x_n .
$$

对称多项式基本定理：任何对称多项式都能唯一地写成 $\sigma_1,\dots,\sigma_n$ 的多项式。存在性可以对字典序最高的单项式做消去，唯一性由代数无关性给出。

Vieta 定理：设

$$
f(x)=x^n+a_{n-1}x^{n-1}+\cdots+a_0=(x-r_1)\cdots(x-r_n),
$$

则

$$
\sum r_i=-a_{n-1},\qquad \sum_{i<j}r_ir_j=a_{n-2},\qquad \dots,\qquad \prod r_i=(-1)^na_0 .
$$

也就是说，$a_{n-k}=(-1)^k\sigma_k(r_1,\dots,r_n)$。看 $x^{n-1}$ 的系数最直观：展开时每次选一个 $-r_i$、其余选 $x$，总共凑出 $-\sum r_i$。

Newton 恒等式把幂和与初等对称多项式连起来。记 $p_k=\sum x_i^k$，则

$$
k\sigma_k=\sum_{i=1}^{k}(-1)^{i-1}\sigma_{k-i}p_i .
$$

推导用生成函数。令

$$
P(t)=\prod_{i=1}^{n}(1+x_it)=1+\sigma_1t+\cdots+\sigma_nt^n .
$$

取对数导数：

$$
\frac{P'(t)}{P(t)}=\sum_i\frac{x_i}{1+x_it}=\sum_{j\ge0}(-1)^jp_{j+1}t^j .
$$

于是

$$
P'(t)=P(t)\sum_{j\ge0}(-1)^jp_{j+1}t^j,
$$

比较 $t^{k-1}$ 的系数就得到上式。用它可以由根的和、平方和等反求初等对称多项式，或者由系数算幂和。

判别式：$\Delta=\prod_{i<j}(r_i-r_j)^2$ 是对称多项式，能写成系数的多项式。对三次 $x^3+px+q$，

$$
\Delta=-4p^3-27q^2 .
$$

$\Delta=0$ 就是有重根。这个式子在判断三次方程根的性质时很好用，和后面的结式是一套东西。

### 1.11 结式（了解）

两个多项式的结式 $\operatorname{Res}(f,g)$ 是一个由系数组成的行列式，满足

$$
\operatorname{Res}(f,g)=0\iff f,g \text{ 有公根（或有公共因式）}.
$$

Sylvester 矩阵是把 $f$ 的系数平移着排 $m$ 行、$g$ 的系数平移着排 $n$ 行。结式可以判断两个多项式是否有公根，而不用真的解方程。判别式可以写成 $\operatorname{Res}(f,f')$ 差一个常数因子。高代课上一般只要求知道这个思路。

## 第二章 行列式

> [← 返回总目录](#目录)

### 2.1 排列与定义

$n$ 元排列 $j_1j_2\cdots j_n$ 是 $1,\dots,n$ 的一个排列。逆序数 $\tau(j_1\cdots j_n)$ 是满足 $s<t$ 但 $j_s>j_t$ 的对数。对换两个元素改变逆序数的奇偶性，所以 $\operatorname{sgn}(\sigma)=(-1)^{\tau(\sigma)}$ 是良定的，且

$$
\operatorname{sgn}(\sigma\tau)=\operatorname{sgn}(\sigma)\operatorname{sgn}(\tau),\qquad \operatorname{sgn}(\sigma^{-1})=\operatorname{sgn}(\sigma).
$$

行列式的组合定义：

$$
|A|=\det A=\sum_{j_1\cdots j_n}(-1)^{\tau(j_1\cdots j_n)}a_{1j_1}a_{2j_2}\cdots a_{nj_n}.
$$

一共 $n!$ 项，每项从每行每列各取一个元素。二、三阶的对角线法则只对 $n\le3$ 成立，四阶以上硬套会漏项。

几何意义也值得记：$|A|$ 是以 $A$ 的列向量为棱的平行六面体的有向体积。二维时是平行四边形的有向面积。这个解释让“换两列变号”“两列相同体积为零”“倍加不改变体积”一眼就看出来。

### 2.2 基本性质

- 行列式对每一行（列）是线性的。
- 交换两行（列），行列式变号。
- 有两行（列）相同或成比例，行列式为 $0$。
- 把一行的 $k$ 倍加到另一行，行列式不变。
- $\det(A^{\mathsf T})=\det A$，所以行的性质对列全部成立。
- $\det(kA)=k^n\det A$。
- 上三角、下三角、对角阵的行列式等于对角元之积。

倍加不变性的证明最能体现“多重线性加交错性”：

$$
\det(\cdots,a_i+ka_j,\cdots)=\det(\cdots,a_i,\cdots)+k\det(\cdots,a_j,\cdots,a_j,\cdots),
$$

后一项有两行相同，为零。

交换变号也可以这么证。在第 $r,s$ 行都放 $a_r+a_s$，由交错性行列式为 $0$；再按多重线性展开成四项，其中两项是重复行，剩下两项互为相反数。

对每行线性、两行相同则为零、单位阵行列式为 $1$，这三条其实唯一确定了行列式，可以拿来当公理化定义。后面的性质都从这三条推，不必回到 $n!$ 项求和。

### 2.3 展开定理与 Laplace 定理

划去第 $i$ 行第 $j$ 列得到的 $n-1$ 阶行列式叫余子式 $M_{ij}$，代数余子式是 $A_{ij}=(-1)^{i+j}M_{ij}$。按一行展开：

$$
|A|=\sum_{j=1}^{n}a_{ij}A_{ij}\qquad(i\text{ 固定}).
$$

按一列展开同理。还有一条常被忽略的“异乘”公式：

$$
\sum_{j=1}^{n}a_{kj}A_{ij}=0\quad(k\ne i),
$$

因为它是把第 $i$ 行换成第 $k$ 行后的行列式，有两行相同。

Laplace 定理：任取 $k$ 行，则

$$
|A|=\sum_{1\le j_1<\cdots<j_k\le n}(-1)^{(i_1+\cdots+i_k)+(j_1+\cdots+j_k)}M_{J}^{I}\widehat{M}_{J}^{I},
$$

其中 $M_J^I$ 是这 $k$ 行与这 $k$ 列交叉处的 $k$ 阶子式，$\widehat M_J^I$ 是划掉这 $k$ 行 $k$ 列后剩下的 $n-k$ 阶子式。符号由选中的行标和列标之和决定。实际计算时通常取含零多的行或列，或者取一整块为零的情形。

### 2.4 乘法定理

$$
\det(AB)=\det A\det B .
$$

三种证法各有用途。

初等矩阵法：先证对每类初等矩阵 $E$ 有 $\det(EB)=\det E\det B$。倍加型 $\det E=1$，由倍加不变性成立；交换型 $\det E=-1$，由换行变号成立；倍乘型 $\det E=k$，由行线性成立。可逆矩阵能写成初等矩阵之积，累乘即得。对奇异矩阵 $A$，若 $\det(AB)\ne0$，则 $AB$ 可逆，设其逆为 $C$，则 $A(BC)=I$，$A$ 有右逆；方阵有右逆就可逆，矛盾。所以两边都是 $0$。

直接展开法：把 $(AB)_{ik}=\sum_ja_{ij}b_{jk}$ 代进定义，用行列式对列的多重线性把和拆开，再利用“列重复则为零”，剩下的正好是 $\det A\det B$。

分块三角法：对 $\begin{pmatrix}A&0\\-I&B\end{pmatrix}$ 用两种方式算行列式，也能得到结论。

推论：$A$ 可逆 $\iff\det A\ne0$，且 $\det(A^{-1})=1/\det A$。

### 2.5 伴随矩阵、逆矩阵与 Cramer 法则

伴随矩阵 $A^*$ 的 $(i,j)$ 元是 $A_{ji}$（注意转置），于是

$$
AA^*=A^*A=|A|I .
$$

$|A|\ne0$ 时 $A^{-1}=\dfrac{1}{|A|}A^*$。几个常用结论：

$$
|A^*|=|A|^{n-1},\qquad (A^*)^{-1}=(A^{-1})^*,\qquad (A^*)^*=|A|^{n-2}A .
$$

$\operatorname{rank}(A^*)$ 分三种情况：

$$
\operatorname{rank}(A^*)=
\begin{cases}
n,&\operatorname{rank}A=n,\\
1,&\operatorname{rank}A=n-1,\\
0,&\operatorname{rank}A<n-1 .
\end{cases}
$$

秩为 $n-1$ 时，至少有一个 $n-1$ 阶子式非零，所以 $A^*\ne0$；但 $AA^*=0$ 说明 $A^*$ 的列都在 $\ker A$ 里，而 $\dim\ker A=1$，故秩为 $1$。

Cramer 法则：$A$ 可逆，$Ax=b$，则

$$
x_i=\frac{|A_i|}{|A|},
$$

$A_i$ 是把 $A$ 的第 $i$ 列换成 $b$ 得到的矩阵。证明只用列线性与交错性：把 $b=\sum_jx_ja_j$ 代入第 $i$ 列，展开后除 $j=i$ 外都有重复列，行列式为零。

Cramer 法则理论漂亮，实际算方程组还是消元快。它的真正用处是给出解的显式表达式，比如后面 Jacobi 公式的推导。

### 2.6 计算技巧

化三角形是通用办法：用倍加把主对角线下方清成零，行列式不变，最后乘对角元。注意换行要变号，提公因子要记账。

范德蒙德行列式：

$$
\begin{vmatrix}
1&1&\cdots&1\\
x_1&x_2&\cdots&x_n\\
\vdots&\vdots&&\vdots\\
x_1^{n-1}&x_2^{n-1}&\cdots&x_n^{n-1}
\end{vmatrix}
=\prod_{1\le i<j\le n}(x_j-x_i).
$$

证明从最后一行开始，逐行减去上一行的 $x_1$ 倍，提出因子后降阶，归纳即可。

三对角行列式用递推。设主对角全是 $a$，上下次对角全是 $b,c$，按第一行展开：

$$
D_n=aD_{n-1}-bcD_{n-2}.
$$

例如主对角 $2$、次对角 $-1$ 的行列式满足 $D_n=2D_{n-1}-D_{n-2}$，$D_1=2,D_2=3$，得 $D_n=n+1$。

加边法（升阶法）适合“除对角线外全相同”的行列式。比如对角为 $a$、其余为 $b$ 的矩阵，行列式是

$$
(a-b)^{n-1}\bigl(a+(n-1)b\bigr).
$$

把它写成 $(a-b)I+bJ$，用 $J$ 的秩为 $1$ 直接算特征值更快。

分块行列式：

$$
\begin{vmatrix}A&B\\0&D\end{vmatrix}=|A||D|,\qquad
\begin{vmatrix}A&B\\C&D\end{vmatrix}=|A|\,|D-CA^{-1}B|\quad(A\text{ 可逆}).
$$

第二个叫 Schur 补公式，用分块消元把 $C$ 消掉即可。$A,D$ 都不可逆时用摄动或直接用行列式的连续性取极限。

### 2.7 Jacobi 公式与 Jacobi 行列式

设 $A(x)$ 可逆且元素可微，则

$$
\frac{d}{dx}\det A=\det A\cdot\operatorname{tr}\!\left(A^{-1}\frac{dA}{dx}\right).
$$

证明只用“行列式对每个元素求偏导等于代数余子式”：

$$
\frac{\partial\det A}{\partial a_{ij}}=A_{ij}=(\det A)(A^{-1})_{ji}.
$$

于是

$$
\frac{d}{dx}\det A=\sum_{i,j}A_{ij}\frac{da_{ij}}{dx}
=\det A\sum_{i,j}(A^{-1})_{ji}\frac{da_{ij}}{dx}
=\det A\operatorname{tr}\!\left(A^{-1}\dot A\right).
$$

$A$ 不可逆时公式要换成 $\operatorname{tr}\bigl(\operatorname{adj}(A)^{\mathsf T}\dot A\bigr)$ 的形式。

这个公式在解线性微分方程组时经常出现：$\dfrac{d}{dt}\ln|\det\Phi(t)|=\operatorname{tr}A(t)$，其中 $\Phi$ 是基本解矩阵。 Liouville 公式就是这么来的。

Jacobi 行列式与变量替换：若 $x=g(u)$ 是 $\mathbb{R}^n$ 中的可微变换，则

$$
\int_{\Omega}f(x)\,dx=\int_{\Omega'}f(g(u))\,\left|\det\frac{\partial x}{\partial u}\right|du .
$$

理由是一小块长方体经线性化后变成平行多面体，体积放大倍数就是 Jacobian 行列式的绝对值；局部线性化再取极限就得到积分公式。

## 第三章 矩阵

> [← 返回总目录](#目录)

### 3.1 基本运算

矩阵加法、数乘逐元素进行。乘法是

$$
(AB)_{ij}=\sum_k a_{ik}b_{kj}.
$$

矩阵乘法不交换，但满足结合律和对加法的分配律。$AB=0$ 推不出 $A=0$ 或 $B=0$，这是和数的最大差别。

转置满足 $(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}$，注意反序。对称矩阵 $A^{\mathsf T}=A$，反对称矩阵 $A^{\mathsf T}=-A$。任何方阵都能拆成对称与反对称之和：

$$
A=\frac{A+A^{\mathsf T}}{2}+\frac{A-A^{\mathsf T}}{2}.
$$

迹 $\operatorname{tr}A=\sum a_{ii}$，满足 $\operatorname{tr}(AB)=\operatorname{tr}(BA)$，更一般地 $\operatorname{tr}(ABC)=\operatorname{tr}(BCA)$，但不满足 $\operatorname{tr}(ABC)=\operatorname{tr}(ACB)$。证明就是交换求和次序：

$$
\operatorname{tr}(AB)=\sum_i\sum_k a_{ik}b_{ki}=\sum_k\sum_i b_{ki}a_{ik}=\operatorname{tr}(BA).
$$

### 3.2 初等变换与初等矩阵

三类初等行变换对应三类初等矩阵（对单位阵做同样的变换得到）：

| 变换 | 矩阵 | 行列式 | 逆 |
|---|---|---|---|
| 交换 $i,j$ 行 | $E_{ij}$ | $-1$ | $E_{ij}$ |
| 第 $i$ 行乘 $k\ne0$ | $E_i(k)$ | $k$ | $E_i(1/k)$ |
| 第 $i$ 行加 $k$ 倍第 $j$ 行 | $E_{ij}(k)$ | $1$ | $E_{ij}(-k)$ |

左乘初等矩阵等于做行变换，右乘等于做列变换。这一点在求逆、解矩阵方程、化标准形时反复用到。

任何矩阵经过初等变换可以化成等价标准形

$$
\begin{pmatrix}I_r&0\\0&0\end{pmatrix},
$$

$r$ 就是秩。于是 $A$ 可逆 $\iff$ $A$ 是若干初等矩阵之积。

### 3.3 秩

秩有三种等价说法：最高阶非零子式的阶数；行向量组的秩；列向量组的秩。三者相等不是显然的，证明通常用消元：行变换不改变行空间，也不改变列向量之间的线性关系，化成阶梯形后主元个数同时是行秩和列秩。

常用不等式：

$$
\operatorname{rank}(AB)\le\min\{\operatorname{rank}A,\operatorname{rank}B\},
$$

$$
\operatorname{rank}(A+B)\le\operatorname{rank}A+\operatorname{rank}B,
$$

Sylvester 不等式：

$$
\operatorname{rank}(AB)\ge\operatorname{rank}A+\operatorname{rank}B-n\quad(A\in K^{m\times n},B\in K^{n\times p}).
$$

Frobenius 不等式：

$$
\operatorname{rank}(ABC)\ge\operatorname{rank}(AB)+\operatorname{rank}(BC)-\operatorname{rank}B .
$$

前两个用“像的维数不超过定义域维数”“像空间被两个像空间张成”就能证。Sylvester 用线性映射 $B$ 在 $\operatorname{im}A$ 上的限制：$\dim\ker(AB)\le\dim\ker B+\dim\ker A$，整理即得。

秩为 $1$ 的矩阵都能写成 $uv^{\mathsf T}$，它的平方的迹给出 $(u^{\mathsf T}v)^2$，这类分解在计算 $A^n$ 时很省事。

### 3.4 分块矩阵

分块乘法只要保证块尺寸匹配，规则和普通乘法一样，但块的顺序不能换。

分块求逆：

$$
\begin{pmatrix}A&B\\0&D\end{pmatrix}^{-1}=
\begin{pmatrix}A^{-1}&-A^{-1}BD^{-1}\\0&D^{-1}\end{pmatrix},
$$

$$
\begin{pmatrix}A&B\\C&D\end{pmatrix}^{-1}
=
\begin{pmatrix}
(A-BD^{-1}C)^{-1}&-(A-BD^{-1}C)^{-1}BD^{-1}\\
-D^{-1}C(A-BD^{-1}C)^{-1}&D^{-1}+D^{-1}C(A-BD^{-1}C)^{-1}BD^{-1}
\end{pmatrix}.
$$

第二个式子不用背，用分块消元现推。关键是两个 Schur 补 $A-BD^{-1}C$ 和 $D-CA^{-1}B$。

分块对角阵的行列式、秩、幂都按块算。准对角矩阵的幂等于各块幂的直和，这是后面 Jordan 形计算的基础。

### 3.5 LU 分解

若 $A$ 的前 $n-1$ 个顺序主子式都不为零，则存在唯一的单位下三角 $L$ 和上三角 $U$ 使 $A=LU$。

推导：Gauss 消元的第 $k$ 步等价于左乘一个单位下三角矩阵 $L_k$（对角线下第 $k$ 列记录倍加系数）。消元结束

$$
L_{n-1}\cdots L_1A=U,
$$

于是 $A=L_1^{-1}\cdots L_{n-1}^{-1}U$。每个 $L_k^{-1}$ 仍是单位下三角，乘积也是。并且 $L$ 的第 $k$ 列刚好是第 $k$ 步倍加系数的相反数，可以直接从消元过程抄下来。

需要选主元时就是 $PA=LU$，$P$ 是置换矩阵。数值计算里几乎总要选主元，否则一个小主元会把误差放大。

### 3.6 矩阵方程

$AX=B$ 有解 $\iff$ $\operatorname{rank}(A)=\operatorname{rank}(A,B)$。有解时通解是 $X=X_0+Y$，$Y$ 取遍齐次方程 $AY=0$ 的解。

$A$ 可逆时 $X=A^{-1}B$，但实际计算用增广矩阵 $[A\mid B]$ 做行变换更稳。

## 第四章 线性方程组

> [← 返回总目录](#目录)

### 4.1 齐次方程组

$Ax=0$，$A\in K^{m\times n}$。解集 $N(A)=\ker A$ 是 $K^n$ 的子空间，叫解空间或零空间。它的维数是

$$
\dim N(A)=n-\operatorname{rank}A .
$$

这是秩-零度定理的矩阵版。求出基础解系 $\eta_1,\dots,\eta_{n-r}$，通解就是它们的任意线性组合。

具体算法：对 $A$ 做行变换化成行最简形，主元所在列对应主变量，其余是自由变量。让自由变量轮流取 $1$、其余取 $0$，回代得到基础解系。

### 4.2 非齐次方程组

$Ax=b$ 有解 $\iff$ $\operatorname{rank}(A)=\operatorname{rank}(A,b)$（Rouché-Capelli）。有解时若 $x_0$ 是一个特解，则通解是

$$
x=x_0+N(A)=\{x_0+\eta\mid A\eta=0\}.
$$

几何上就是解空间这个仿射子空间，方向由齐次解空间给出。

有解时解唯一的条件是 $\operatorname{rank}A=n$（列满秩），此时零空间只有零向量。

### 4.3 解的结构与四个基本子空间

对 $A\in K^{m\times n}$：

| 子空间 | 记号 | 定义 | 所在空间 | 维数 |
|---|---|---|---|---|
| 列空间 | $C(A)$ | $\{Ax\}$ | $K^m$ | $r$ |
| 行空间 | $R(A)$ | $\{A^{\mathsf T}y\}$ | $K^n$ | $r$ |
| 零空间 | $N(A)$ | $\{x:Ax=0\}$ | $K^n$ | $n-r$ |
| 左零空间 | $N(A^{\mathsf T})$ | $\{y:A^{\mathsf T}y=0\}$ | $K^m$ | $m-r$ |

在标准内积下，

$$
C(A)^\perp=N(A^{\mathsf T}),\qquad N(A)^\perp=R(A).
$$

证明是一行等价变换：$y\in N(A^{\mathsf T})\iff A^{\mathsf T}y=0\iff$ 对一切 $x$ 有 $y^{\mathsf T}Ax=0\iff y\perp C(A)$。

由此得到

$$
\dim C(A)+\dim N(A^{\mathsf T})=m,\qquad \dim R(A)+\dim N(A)=n .
$$

第一式其实是 $r+(m-r)=m$，第二式是 $r+(n-r)=n$。四个子空间按正交关系配成两对，两对的维数都等于 $r$，这就是线性代数里那张经典的正交分解图。

### 4.4 秩-零度定理

对线性映射 $T:V\to W$，

$$
\dim V=\dim\ker T+\dim\operatorname{im}T .
$$

证明是“扩基法”的标准套路。取 $\ker T$ 的基 $u_1,\dots,u_k$，扩充成 $V$ 的基 $u_1,\dots,u_k,v_1,\dots,v_{n-k}$。断言 $Tv_1,\dots,Tv_{n-k}$ 是 $\operatorname{im}T$ 的基。

生成：任意 $Tv$，把 $v$ 按基展开，$Tu_i=0$，只剩 $Tv_j$ 的组合。无关：若 $\sum\beta_jTv_j=0$，则 $\sum\beta_jv_j\in\ker T$，用 $u_i$ 表出，与基的线性无关性矛盾。

这条定理贯穿全书。矩阵情形是 $n=r+(n-r)$，微分方程情形是“通解 = 特解 + 齐次解”，积分方程里有 Fredholm 二择一，都是它。

## 第五章 二次型

> [← 返回总目录](#目录)

### 5.1 二次型与矩阵表示

$n$ 元二次齐次多项式

$$
q(x_1,\dots,x_n)=\sum_{i\le j}a_{ij}x_ix_j
$$

可以写成 $q(x)=x^{\mathsf T}Ax$，其中 $A$ 对称，$a_{ii}$ 放对角，$a_{ij}$ 的一半放 $(i,j)$ 和 $(j,i)$。取对称矩阵是为了唯一：反对称部分对 $x^{\mathsf T}Ax$ 没有贡献。

合同：若存在可逆 $C$ 使 $B=C^{\mathsf T}AC$，称 $A$ 与 $B$ 合同。合同对应“作可逆线性替换 $x=Cy$”，二次型的秩不变。

### 5.2 化标准形

配方法最直接。有平方项就配，没有平方项就先做一个 $x_i=y_i+y_j,\ x_j=y_i-y_j$ 把平方项造出来。

例：$q=2x_1x_2+2x_1x_3-6x_2x_3$。先令 $x_1=y_1+y_2,\ x_2=y_1-y_2$，得 $2y_1^2-2y_2^2+2(y_1+y_2)y_3-6(y_1-y_2)y_3$，合并后再配方。

初等变换法更机械：对 $A$ 做一次行变换，紧接着做同样的列变换。即

$$
A\longrightarrow E^{\mathsf T}AE,
$$

$E$ 是初等矩阵。这样做下去，$A$ 化成对角形，同时右边的 $E$ 累乘起来就是所求的 $C$。实际操作时把 $A$ 和 $I$ 并排放，对 $A$ 做行列同步变换，对 $I$ 只做列变换。

标准形不唯一，但惯性指数唯一（见下）。

### 5.3 惯性定理

实二次型经可逆线性替换化成

$$
q=y_1^2+\cdots+y_p^2-y_{p+1}^2-\cdots-y_{p+q}^2,
$$

$p$ 叫正惯性指数，$q$ 叫负惯性指数，$p-q$ 叫符号差，$p+q$ 是秩。惯性定理说 $p,q$ 由 $q$ 本身决定，和替换无关。

证明用反证。设有两种化法，正项个数分别是 $p$ 和 $p'$，$p>p'$。第一种化法下，正项对应的子空间 $V_+$ 维数为 $p$，在其上 $q>0$（除原点）。第二种化法下，非正项对应的子空间 $V_{\le0}$ 维数为 $n-p'$，在其上 $q\le0$。两个子空间维数之和

$$
p+(n-p')>n,
$$

必有非零交向量，于是同一个向量既满足 $q>0$ 又满足 $q\le0$，矛盾。

复数域上只有规范形 $y_1^2+\cdots+y_r^2$，因为没有正负之分。实数域上合同分类由 $(p,q)$ 完全决定，这是二次型理论的核心结论。

### 5.4 正定性

$A$ 正定指对一切 $x\ne0$ 有 $x^{\mathsf T}Ax>0$。等价条件一长串，常用的有：

- 正惯性指数 $p=n$。
- 存在可逆 $C$ 使 $A=C^{\mathsf T}C$。
- $A$ 的特征值全为正。
- 各阶顺序主子式全大于零（Sylvester 判别法）。
- 存在正定矩阵 $B$ 使 $A=B^2$。

顺序主子式判别只对正定好用。必要性：把 $q$ 限制在前 $k$ 个坐标张成的子空间上，仍然是正定的，其矩阵就是 $k$ 阶顺序主子阵，行列式为正。充分性对 $n$ 归纳，写

$$
A=\begin{pmatrix}A_{n-1}&b\\b^{\mathsf T}&a\end{pmatrix},
$$

由归纳 $A_{n-1}$ 正定，作合同变换消去 $b$，剩下 Schur 补 $a-b^{\mathsf T}A_{n-1}^{-1}b=\dfrac{\det A}{\det A_{n-1}}>0$，于是 $A$ 合同于 $\operatorname{diag}(A_{n-1},\,c)$，$c>0$，正定。

半正定的判别要小心：条件是所有主子式（不只是顺序主子式）都 $\ge0$。看这个例子：

$$
A=\begin{pmatrix}0&0&1\\0&0&0\\1&0&0\end{pmatrix},
$$

顺序主子式全是 $0$，看上去“非负”，但特征值是 $1,0,-1$，不是半正定。取 $x=(1,0,-1)$，$x^{\mathsf T}Ax=-2$，二次型直接取到负值。所以半正定必须查所有主子式。

> [!warning] 常见错误
> “顺序主子式全 $\ge0$”不能推出半正定，只有“全 $>0$”才能推出正定。负定的判别是 $(-1)^k\Delta_k>0$，即奇数阶为负、偶数阶为正。

### 5.5 正交变换与主轴定理

实对称矩阵可以用正交矩阵对角化：

$$
Q^{\mathsf T}AQ=\operatorname{diag}(\lambda_1,\dots,\lambda_n),\qquad Q^{\mathsf T}Q=I .
$$

令 $x=Qy$，则

$$
q=x^{\mathsf T}Ax=\lambda_1y_1^2+\cdots+\lambda_ny_n^2 .
$$

这就是主轴定理。几何上，二次曲面的主轴方向就是特征向量方向，半轴长由特征值决定。和配方法相比，正交变换不改变长度和角度，所以能直接读出曲面的形状。

### 5.6 双线性函数视角

二次型可以看成对称双线性函数在对角线上的取值：

$$
f(x,y)=x^{\mathsf T}Ay,\qquad q(x)=f(x,x).
$$

反过来，特征不等于 $2$ 时由 $q$ 恢复 $f$ 的极化公式：

$$
f(x,y)=\frac12\bigl(q(x+y)-q(x)-q(y)\bigr).
$$

所以“对称双线性函数”和“二次型”是同一件事的两种说法，第六章之后会用这个观点统一处理。

## 第六章 线性空间

> [← 返回总目录](#目录)

### 6.1 定义与例子

$V$ 是数域 $K$ 上的非空集合，有加法 $V\times V\to V$ 和数乘 $K\times V\to V$，满足八条：

1. $x+y=y+x$；
2. $(x+y)+z=x+(y+z)$；
3. 有零元 $0$，$x+0=x$；
4. 每个 $x$ 有负元 $-x$；
5. $1x=x$；
6. $k(lx)=(kl)x$；
7. $k(x+y)=kx+ky$；
8. $(k+l)x=kx+lx$。

前四条说 $(V,+)$ 是交换群，后四条说数乘与加法相容。

由公理能推出：零元唯一；负元唯一；$0x=0$；$k0=0$；$(-1)x=-x$；$kx=0$ 则 $k=0$ 或 $x=0$。这些结论证明都是“把等式两边加同一个东西”这类小操作，不用背，考场现推。

标准例子：$K^n$；$K^{m\times n}$；多项式空间 $K[x]$ 与次数不超过 $n$ 的 $K[x]_n$；连续函数空间 $C[a,b]$；所有实数列。反例也要心里有数：$\{(x,y):x,y\ge0\}$ 对加法封闭但对负数乘不封闭，不是线性空间；$\{x\in\mathbb{R}:x>0\}$ 按普通加法不是，但按“对数加法”可以做成线性空间，这说明运算可以换。

### 6.2 子空间

$W\subseteq V$ 是子空间，若它在 $V$ 的运算下自己构成线性空间。判定只要三条：$0\in W$；对加法封闭；对数乘封闭。合成一条就是：对任意 $k,l\in K$ 和 $x,y\in W$，$kx+ly\in W$。

子空间的交仍是子空间。子空间的并通常不是，比如 $x$ 轴并 $y$ 轴，$(1,0)+(0,1)=(1,1)$ 跑出去了。子空间的和

$$
U+W=\{u+w:u\in U,w\in W\}
$$

是子空间，而且它是包含 $U\cup W$ 的最小子空间。

维数公式：

$$
\dim(U+W)=\dim U+\dim W-\dim(U\cap W).
$$

证明用扩基：取 $U\cap W$ 的基 $x_1,\dots,x_k$，分别扩充成 $U$ 的基和 $W$ 的基，合起来就是 $U+W$ 的基。线性无关性的验证要用到“交的基”这个中介：若组合为零，把 $W$ 部分移到一边，它同时在 $U$ 和 $W$ 里，故属于交，再用基的无关性。

### 6.3 直和

若 $U\cap W=\{0\}$，称 $U+W$ 为直和，记 $U\oplus W$。等价条件：

- $U\cap W=\{0\}$；
- 每个 $v\in U+W$ 的分解 $v=u+w$ 唯一；
- $\dim(U+W)=\dim U+\dim W$。

多个子空间的直和要小心：两两交为零不够，必须要求每个 $W_i$ 与其余子空间的和的交为零：

$$
W_i\cap\Bigl(\sum_{j\ne i}W_j\Bigr)=\{0\}.
$$

反例：在 $\mathbb{R}^2$ 中取三条过原点的不同直线，两两交为零，但三个子空间的和不是直和，因为总维数只有 $2$ 而三个一维子空间无法独立。

### 6.4 基、维数与坐标

向量组 $\alpha_1,\dots,\alpha_m$ 线性无关：$\sum k_i\alpha_i=0$ 只有零解。线性相关等价于其中某个向量能由其余向量线性表出。

基是线性无关的生成组。有限维空间一定有基（从有限生成组里逐个删去多余向量），并且任意两组基含相同个数的向量，这个数叫维数。证明用替换定理：$n$ 维空间里任意 $n+1$ 个向量必相关。

基扩充定理：线性无关组可以扩充成基；生成组可以缩小成基。

取定基 $\varepsilon_1,\dots,\varepsilon_n$ 后，每个向量有唯一坐标

$$
\alpha=x_1\varepsilon_1+\cdots+x_n\varepsilon_n,\qquad (\alpha)_\varepsilon=(x_1,\dots,x_n)^{\mathsf T}.
$$

于是抽象的 $V$ 与 $K^n$ 同构：加法对应坐标相加，数乘对应坐标数乘。线性问题都可以搬到坐标上算。

### 6.5 基变换与坐标变换

设旧基 $\varepsilon$、新基 $\eta$，过渡矩阵 $P$ 由

$$
(\eta_1,\dots,\eta_n)=(\varepsilon_1,\dots,\varepsilon_n)P
$$

定义。$P$ 可逆，因为两组基等价。同一向量的坐标满足

$$
(\alpha)_\varepsilon=P(\alpha)_\eta,\qquad (\alpha)_\eta=P^{-1}(\alpha)_\varepsilon .
$$

推导就一句话：把 $\alpha$ 用两种方式展开，比较系数。

注意方向。很多人记反，原因是不写矩阵等式只背“乘 $P$ 还是乘 $P^{-1}$”。考试时把 $(\eta)=(\varepsilon)P$ 写出来，再写 $\alpha=(\eta)X_\eta=(\varepsilon)PX_\eta$，方向自然就对了。

线性变换的矩阵在换基下是相似：$A'=P^{-1}AP$。双线性函数的矩阵在换基下是合同：$B'=P^{\mathsf T}BP$。这两个式子的差别是全书的主线之一。

### 6.6 向量组的秩

向量组的极大线性无关组所含向量个数叫秩。秩等于由这组向量生成的子空间的维数。求法是把向量作为列（或行）排成矩阵，做初等行变换化阶梯形，非零行数就是秩，主元所在列给出极大无关组。

矩阵的秩也可以这样理解：行秩是行向量组的秩，列秩是列向量组的秩，两者相等。

### 6.7 商空间

$U$ 是 $V$ 的子空间，定义陪集 $v+U=\{v+u:u\in U\}$。所有陪集构成商空间 $V/U$，运算为

$$
(v+U)+(w+U)=(v+w)+U,\qquad k(v+U)=kv+U .
$$

需要验证运算与代表元选取无关：若 $v'-v\in U$，$w'-w\in U$，则 $(v'+w')-(v+w)\in U$，所以和相同。

维数公式：

$$
\dim(V/U)=\dim V-\dim U .
$$

取 $U$ 的基 $u_1,\dots,u_k$，扩充成 $V$ 的基 $u_1,\dots,u_k,v_1,\dots,v_m$，则 $v_1+U,\dots,v_m+U$ 是 $V/U$ 的基。生成显然；无关是因为 $\sum k_jv_j\in U$ 迫使所有 $k_j=0$。

商空间看起来抽象，其实就是“把 $U$ 里的向量都当成零”。模掉零空间就得到同构 $\operatorname{im}T\cong V/\ker T$，这是同构基本定理的线性版本。

## 第七章 线性变换

> [← 返回总目录](#目录)

### 7.1 线性映射与线性变换

$T:V\to W$ 线性，若

$$
T(x+y)=T(x)+T(y),\qquad T(kx)=kT(x).
$$

等价于 $T(kx+ly)=kTx+lTy$。$V=W$ 时叫线性变换。所有 $V\to W$ 的线性映射构成线性空间 $\mathcal{L}(V,W)$，维数是 $mn$。

核 $\ker T=\{x:Tx=0\}$，像 $\operatorname{im}T=\{Tx\}$。$T$ 单射 $\iff\ker T=\{0\}$；$T$ 满射 $\iff\operatorname{im}T=W$。有限维且维数相同时，单射、满射、同构三者等价。

### 7.2 矩阵表示

取 $V$ 的基 $\varepsilon_1,\dots,\varepsilon_n$ 和 $W$ 的基 $\eta_1,\dots,\eta_m$，$T$ 的矩阵 $A$ 由

$$
T(\varepsilon_1,\dots,\varepsilon_n)=(\eta_1,\dots,\eta_m)A
$$

定义。第 $j$ 列就是 $T\varepsilon_j$ 的坐标。

$T$ 的复合对应矩阵乘法，$T$ 的数乘对应矩阵数乘，可逆变换对应可逆矩阵。取定基后，$\mathcal{L}(V,W)$ 与 $K^{m\times n}$ 是同构。

同一线性变换在不同基下的矩阵相似：

$$
A'=P^{-1}AP,
$$

$P$ 是两组基之间的过渡矩阵。推导：

$$
T(\eta)=T(\varepsilon P)=(T\varepsilon)P=(\eta)A'P,
$$

又 $T(\varepsilon)=(\eta)A$，所以 $(\eta)AP=(\eta)A'P$，即 $A'=P^{-1}AP$。

### 7.3 秩-零度定理（映射版）

$$
\dim V=\dim\ker T+\dim\operatorname{im}T .
$$

[4.4 节](#_4-4-秩-零度定理)已经证过。矩阵形式的直接推论：

$$
\dim N(A)=n-\operatorname{rank}A .
$$

线性映射的分解：$T$ 诱导同构 $\bar T:V/\ker T\to\operatorname{im}T$。于是任何线性映射都能拆成一个满射（商映射）接一个单射（嵌入），这是同构基本定理。

### 7.4 不变子空间

$W\subseteq V$ 在 $T$ 下不变，若 $T(W)\subseteq W$。$T$ 在 $W$ 上的限制仍线性，并且在商空间 $V/W$ 上诱导线性变换

$$
\bar T(v+W)=Tv+W .
$$

若 $V=W_1\oplus\cdots\oplus W_s$ 且每个 $W_i$ 不变，取各子空间的基合并，$T$ 的矩阵是分块对角。若只有 $W$ 不变，取 $W$ 的基再扩充成 $V$ 的基，矩阵是分块上三角。

对角化就是找一维不变子空间。Jordan 形则是把空间分解成“特征值 + 幂零”的不变子空间。

### 7.5 特征值与特征多项式

$Tv=\lambda v$，$v\ne0$，$\lambda$ 是特征值，$v$ 是特征向量。等价于 $(T-\lambda I)$ 不可逆，即

$$
\det(\lambda I-A)=0 .
$$

特征多项式取 $p_A(\lambda)=\det(\lambda I-A)$，是首一的 $n$ 次多项式：

$$
p_A(\lambda)=\lambda^n-(\operatorname{tr}A)\lambda^{n-1}+\cdots+(-1)^n\det A .
$$

$\lambda^{n-1}$ 的系数是 $-\operatorname{tr}A$。按定义展开，只有取全部对角元的那一项 $\prod_i(a_{ii}-\lambda)$ 能贡献到 $n-1$ 次，它的 $\lambda^{n-1}$ 系数是 $-\sum a_{ii}$；其他任何排列至少漏掉两个对角元，次数至多 $n-2$。也可以用 $p_A(\lambda)=\prod_i(\lambda-\lambda_i)$ 直接看，$\lambda^{n-1}$ 的系数就是 $-\sum\lambda_i=-\operatorname{tr}A$。

另一种写法 $\det(A-\lambda I)=(-1)^n\lambda^n+(-1)^{n-1}\operatorname{tr}A\,\lambda^{n-1}+\cdots+\det A$ 只是整体乘了 $(-1)^n$。用哪个都行，但同一份推导里不要混。

相似矩阵有相同的特征多项式、迹、行列式、秩。反过来不成立：$\begin{pmatrix}1&1\\0&1\end{pmatrix}$ 和 $I_2$ 特征多项式相同但不相似。

特征值的性质：$\sum\lambda_i=\operatorname{tr}A$，$\prod\lambda_i=\det A$。实矩阵的复特征值成共轭对出现。

Gershgorin 圆盘定理：特征值都落在

$$
\bigcup_i\Bigl\{z:|z-a_{ii}|\le\sum_{j\ne i}|a_{ij}|\Bigr\}
$$

里。证明取特征向量中绝对值最大的分量 $x_k$，由第 $k$ 个方程

$$
(\lambda-a_{kk})x_k=\sum_{j\ne k}a_{kj}x_j
$$

取模，除以 $|x_k|$，用 $|x_j|/|x_k|\le1$ 即得。这个定理估计特征值位置特别方便，不用真的解特征方程。

正矩阵还有一个更强的结论（Perron-Frobenius）：存在正实数特征值，其重数为 $1$，对应特征向量可取全正分量，且它是所有特征值中模最大的。马尔可夫链的平稳分布、Google PageRank 都靠它。

### 7.6 对角化

$A$ 可对角化 $\iff$ 有 $n$ 个线性无关的特征向量 $\iff$ $V$ 有由特征向量组成的基。

不同特征值的特征向量线性无关。归纳证明：设 $\sum k_iv_i=0$，两边作用 $A$ 得 $\sum k_i\lambda_iv_i=0$，再减去 $\lambda_s$ 倍原式，前 $s-1$ 项系数变成 $k_i(\lambda_i-\lambda_s)$，由归纳全为零，$\lambda_i\ne\lambda_s$ 给出 $k_i=0$，最后 $k_s=0$。

所以有 $n$ 个互不相同的特征值时一定可对角化。反之不成立，$I$ 就有重特征值但已经是对角阵。

重数的关系：代数重数 $AM$ 是特征多项式中 $\lambda$ 的重数，几何重数是

$$
GM=\dim\ker(A-\lambda I)=n-\operatorname{rank}(A-\lambda I).
$$

总有 $1\le GM\le AM$。上界这样证：取特征子空间的基 $v_1,\dots,v_g$，扩充成整个空间的基，矩阵形如

$$
\begin{pmatrix}\lambda I_g&B\\0&C\end{pmatrix},
$$

特征多项式是 $(\lambda-\mu)^g\det(C-\mu I)$，所以 $\lambda$ 至少是 $g$ 重。

于是

$$
A\text{ 可对角化}\iff \text{对每个特征值 }GM=AM\iff \sum GM=n .
$$

另外一个常用判据是最小多项式无重根，见 [7.7 节](#_7-7-最小多项式与-cayley-hamilton)。

可交换且各自可对角化的矩阵可以同时对角化。证明取 $A$ 的特征子空间，由于 $AB=BA$，$B$ 把每个特征子空间映到自身，在里头再对角化。量子力学里一组对易可观测量能同时测量，就是这条定理。

### 7.7 最小多项式与 Cayley-Hamilton

最小多项式 $m_A(x)$ 是使 $m_A(A)=0$ 的最低次首一多项式。它整除任何零化多项式，特别地

$$
m_A(x)\mid p_A(x).
$$

理由：带余除 $p_A=q\,m_A+r$，代入 $A$ 得 $r(A)=0$，若 $r\ne0$ 就与最小性矛盾。

$m_A$ 与 $p_A$ 有相同的根（不计重数）。设 $\lambda$ 是特征值，$Av=\lambda v$，则 $m_A(A)v=m_A(\lambda)v=0$，所以 $m_A(\lambda)=0$。反过来由 $m_A\mid p_A$，$m_A$ 的根都是 $p_A$ 的根。

Cayley-Hamilton 定理：

$$
p_A(A)=0 .
$$

伴随矩阵证法。令 $B(\lambda)=\operatorname{adj}(\lambda I-A)$，则

$$
B(\lambda)(\lambda I-A)=p_A(\lambda)I .
$$

$B$ 的元素是次数不超过 $n-1$ 的多项式，写成 $B=\sum_{k=0}^{n-1}B_k\lambda^k$，$p_A=\lambda^n+\sum_{k=0}^{n-1}c_k\lambda^k$。比较 $\lambda$ 的各次幂：

$$
B_{n-1}=I,\qquad B_{k-1}-B_kA=c_kI\ (1\le k\le n-1),\qquad -B_0A=c_0I .
$$

第 $k$ 式右乘 $A^k$ 后对 $k=1,\dots,n-1$ 求和，左边望远镜式相消，再加最后一式，得

$$
-B_{n-1}A^n=\sum_{k=0}^{n-1}c_kA^k,
$$

即 $-A^n=\sum_{k<n}c_kA^k$，也就是 $p_A(A)=0$。

这个证明第一次看容易晕，抓住“比较系数 + 望远镜求和”就行。还有一条更几何的路：对 Jordan 形验证，再用相似不变性。

可对角化的最小多项式判据：$A$ 可对角化 $\iff$ $m_A$ 在 $K$ 上分解为互不相同的线性因子之积。若 $m_A$ 有重根，就存在非平凡的 Jordan 块；反之若 $m_A=\prod(x-\lambda_i)$ 互异，则 $A$ 满足一个无重根的多项式，空间可分解成各特征子空间的直和。

### 7.8 幂零变换与循环子空间

$N$ 幂零，若 $N^m=0$ 对某个 $m$ 成立。最小这样的 $m$ 叫幂零指数。$n$ 维空间上幂零指数不超过 $n$。

幂零矩阵的特征多项式是 $\lambda^n$，特征值全为零。反过来，特征值全为零时由 Cayley-Hamilton 得 $A^n=0$，所以也是幂零。$I-N$ 一定可逆，逆是

$$
(I-N)^{-1}=I+N+N^2+\cdots+N^{m-1}.
$$

由 $x$ 生成的循环子空间是

$$
C_x=\operatorname{span}\{x,Nx,N^2x,\dots\}.
$$

若 $r$ 是使 $N^rx=0$ 的最小正整数，则 $x,Nx,\dots,N^{r-1}x$ 是 $C_x$ 的基。无关性：设最低次非零项是 $N^kx$，作用 $N^{r-1-k}$ 得系数乘 $N^{r-1}x\ne0$，矛盾。

在这组基下，$N$ 的矩阵是一个 $r$ 阶幂零 Jordan 块，对角为零，上对角为 $1$。

### 7.9 Jordan 标准形

复数域（更一般地，特征多项式在 $K$ 上分裂的域）上，任何方阵都相似于 Jordan 形：

$$
J=\operatorname{diag}\bigl(J_1,\dots,J_s\bigr),\qquad
J_i=\begin{pmatrix}
\lambda_i&1&&\\
&\lambda_i&\ddots&\\
&&\ddots&1\\
&&&\lambda_i
\end{pmatrix}.
$$

存在性分两步。第一步，把空间分解成根子空间直和：

$$
V=R_{\lambda_1}\oplus\cdots\oplus R_{\lambda_s},\qquad
R_\lambda=\{x:(A-\lambda I)^kx=0\ \text{对某个 }k\}.
$$

这一步用中国剩余式的多项式互素论证：令 $p_i(x)=\prod_{j\ne i}(x-\lambda_j)^{m_j}$，它们互素，存在 $q_i$ 使 $\sum q_ip_i=1$，代入 $A$ 得恒等分解，每个 $q_i(A)p_i(A)x$ 落在对应的根子空间里。直和性用“若 $\beta_1+\cdots+\beta_s=0$，乘上消灭其余项的算子”论证。

第二步，在每个根子空间里 $N=A-\lambda I$ 幂零，取循环子空间分解，每个循环子空间给一个 Jordan 块。

唯一性：不计块的排列，Jordan 形唯一。块的大小分布由秩决定：

$$
\#\{\text{大小}\ge k\text{ 的 }\lambda\text{ 块}\}=\dim\ker(A-\lambda I)^k-\dim\ker(A-\lambda I)^{k-1}.
$$

等价地，大小恰为 $k$ 的块数是

$$
\bigl(\dim\ker N^k-\dim\ker N^{k-1}\bigr)-\bigl(\dim\ker N^{k+1}-\dim\ker N^k\bigr).
$$

所以只要算出各次幂的零空间维数（或秩），Jordan 形就定死了。实际计算通常先求初等因子，见 [第八章](#第八章-λ-矩阵与相似标准形)。

最小多项式从 Jordan 形看最清楚：

$$
m_A(x)=\prod_i(x-\lambda_i)^{k_i},
$$

$k_i$ 是 $\lambda_i$ 的最大块的大小。特征多项式则是 $\prod(x-\lambda_i)^{m_i}$，$m_i$ 是块大小之和（代数重数）。

Jordan 块的数量、最大块的尺寸、几何重数三者的关系：

$$
GM_\lambda=\#\{\lambda\text{ 的块}\},\qquad AM_\lambda=\sum\text{块的大小}.
$$

### 7.10 应用举例

矩阵函数。若 $f$ 在 $A$ 的谱上定义（在特征值处有足够高阶导数），可以用 Jordan 形定义 $f(A)$。对 Jordan 块 $J=\lambda I+N$，

$$
f(J)=\sum_{k=0}^{m-1}\frac{f^{(k)}(\lambda)}{k!}N^k .
$$

指数矩阵是最常用的：

$$
e^{Jt}=e^{\lambda t}\left(I+tN+\frac{t^2}{2}N^2+\cdots\right).
$$

线性微分方程组 $\dot x=Ax$ 的解是 $x(t)=e^{At}x(0)$，Jordan 形把解的长期行为说清楚了：$e^{\lambda t}$ 乘多项式，实部为负就衰减，为正就爆炸，纯虚数就振荡。

开平方。可逆矩阵若有平方根，可以用 Jordan 形逐块开：对 $\lambda\ne0$ 的块，$\sqrt{\lambda I+N}=\sqrt\lambda\bigl(I+\frac{1}{2\lambda}N-\frac{1}{8\lambda^2}N^2+\cdots\bigr)$。

PageRank。把网页转移矩阵 $P$ 做阻尼修正 $G=\alpha P+(1-\alpha)\frac{1}{n}J$，$G$ 是正矩阵，由 Perron-Frobenius 有唯一平稳分布，迭代 $x_{k+1}=Gx_k$ 收敛到它，收敛速度由第二特征值决定。

## 第八章 λ-矩阵与相似标准形

> [← 返回总目录](#目录)

### 8.1 λ-矩阵

元素是 $\lambda$ 的多项式的矩阵叫 $\lambda$-矩阵。它的秩、行列式、子式的概念和数字矩阵一样，只是都在 $K[\lambda]$ 里取值。

初等变换有三类：交换两行（列）；某行（列）乘非零常数；某行（列）加另一行（列）的多项式倍。注意第三类允许乘多项式，这比数字矩阵宽，因为 $K[\lambda]$ 里只有常数可逆，不能乘任意多项式还保持等价。

初等变换不改变“秩”和“各阶行列式因子的最大公因式”。这两条是后面不变因子的基础。

### 8.2 Smith 标准形

任何 $\lambda$-矩阵都等价于

$$
\begin{pmatrix}
\operatorname{diag}(d_1(\lambda),\dots,d_r(\lambda))&0\\
0&0
\end{pmatrix},
$$

其中 $d_i$ 是首一多项式，$d_1\mid d_2\mid\cdots\mid d_r$，$r$ 是秩。这叫 Smith 标准形，$d_i$ 叫不变因子。

求法就是做初等变换，把左上角化成一个多项式，再消去它所在的行和列，递归下去。每一步用辗转相除把两个多项式的公因式提到对角上。三阶以内的题手算可行，高阶的实际用行列式因子算更快。

### 8.3 行列式因子、不变因子、初等因子

$k$ 阶行列式因子 $D_k(\lambda)$ 是所有 $k$ 阶子式的首一最大公因式。约定 $D_0=1$；$k$ 超过秩时 $D_k=0$。则

$$
d_k(\lambda)=\frac{D_k(\lambda)}{D_{k-1}(\lambda)}.
$$

原因是初等变换不改变各阶子式的公因式，而在 Smith 标准形里 $k$ 阶子式的公因式显然是 $d_1\cdots d_k$。

初等因子：把每个非常数不变因子分解成

$$
d_i(\lambda)=\prod_j p_j(\lambda)^{e_{ij}},
$$

把所有出现的 $p_j^{e_{ij}}$（$e_{ij}>0$）收集起来，就是初等因子组。初等因子是“带重数的不可约因子”，比不变因子更适合直接写 Jordan 形。

三者的关系可以这样记：不变因子是“按整除链排好的积木”，初等因子是把积木拆散，行列式因子是积木的前缀积。已知初等因子，按每个不可约因子的指数从大到小排成列，就能重组不变因子。

### 8.4 相似判定

$$
A\sim B\iff \lambda I-A \text{ 与 } \lambda I-B \text{ 等价}\iff \text{有相同的不变因子}.
$$

等价的说法还有：相同的行列式因子、相同的初等因子（在分裂域上）、相同的秩和各阶行列式因子。

为什么特征矩阵能判定相似？若 $A\sim B$，$B=P^{-1}AP$，则

$$
\lambda I-B=P^{-1}(\lambda I-A)P,
$$

$P$ 和 $P^{-1}$ 都是可逆常数矩阵，属于初等矩阵之积，所以两个特征矩阵等价。反过来，若特征矩阵等价，可以证明 $A\sim B$，这一步用有理标准形作中介：两边都相似于由不变因子决定的有理标准形。

注意：特征多项式相同只是必要条件。$\begin{pmatrix}1&1\\0&1\end{pmatrix}$ 与 $I_2$ 的特征多项式都是 $(\lambda-1)^2$，但特征矩阵的 Smith 形不同，前者不变因子是 $1,\ (\lambda-1)^2$，后者是 $\lambda-1,\ \lambda-1$。

### 8.5 有理标准形

设 $d(\lambda)=\lambda^k+c_{k-1}\lambda^{k-1}+\cdots+c_0$ 是首一多项式，它的伴侣矩阵是

$$
C(d)=\begin{pmatrix}
0&0&\cdots&0&-c_0\\
1&0&\cdots&0&-c_1\\
0&1&\cdots&0&-c_2\\
\vdots&&\ddots&&\vdots\\
0&0&\cdots&1&-c_{k-1}
\end{pmatrix}.
$$

它的特征多项式和最小多项式都等于 $d$。若 $A$ 的不变因子为 $1,\dots,1,d_1,\dots,d_s$（去掉等于 $1$ 的），则

$$
A\sim\operatorname{diag}\bigl(C(d_1),\dots,C(d_s)\bigr).
$$

这就是有理标准形（Frobenius 标准形）。它不需要特征值在 $K$ 中，所以在任意数域上都成立，这一点比 Jordan 形强。

### 8.6 Jordan 形与有理标准形的关系

在 $\mathbb{C}$ 上，初等因子是 $(\lambda-\lambda_i)^{e}$。每个初等因子给一个 $e$ 阶 Jordan 块。把所有块拼起来就是 Jordan 形。

有理标准形则把同一个不变因子的所有初等因子打包成一个伴侣矩阵。所以两者是同一组数据的两种排法：Jordan 形按“不可约因子”拆得最细，有理标准形按“不变因子”合得最整。

一个例子看得最清楚。初等因子是 $(\lambda-1)^2,(\lambda-2)$ 时，Jordan 形是 $J_2(1)\oplus J_1(2)$；而这两个初等因子合起来只给出一个非平凡不变因子 $d=(\lambda-1)^2(\lambda-2)$，所以有理标准形就是一个 $3$ 阶伴侣矩阵。数据是同一套，只是一个拆得细，一个合得整。

## 第九章 欧氏空间

> [← 返回总目录](#目录)

### 9.1 内积与度量

实线性空间上的内积是二元实值函数 $\langle\cdot,\cdot\rangle$，满足对称性、对第一变元线性、正定性：

$$
\langle x,x\rangle\ge0,\qquad \langle x,x\rangle=0\iff x=0 .
$$

带内积的实线性空间叫欧氏空间。复情形把对称性换成共轭对称 $\langle x,y\rangle=\overline{\langle y,x\rangle}$，叫酉空间。

范数 $\|x\|=\sqrt{\langle x,x\rangle}$。Cauchy-Schwarz 不等式：

$$
|\langle x,y\rangle|\le\|x\|\|y\| .
$$

证明用二次函数恒非负。对任意 $t$，

$$
0\le\|x+ty\|^2=\|x\|^2+2t\langle x,y\rangle+t^2\|y\|^2 .
$$

这是 $t$ 的二次式，判别式不大于零：

$$
4\langle x,y\rangle^2-4\|x\|^2\|y\|^2\le0 .
$$

等号成立当且仅当 $x,y$ 线性相关。$y=0$ 时单独验证。

由此得三角不等式：

$$
\|x+y\|^2=\|x\|^2+2\langle x,y\rangle+\|y\|^2\le(\|x\|+\|y\|)^2 .
$$

夹角由 $\cos\theta=\dfrac{\langle x,y\rangle}{\|x\|\|y\|}$ 定义，Cauchy-Schwarz 保证它落在 $[-1,1]$ 里。距离 $d(x,y)=\|x-y\|$。

### 9.2 Gram 矩阵

基 $\varepsilon_1,\dots,\varepsilon_n$ 的 Gram 矩阵是 $G=(\langle\varepsilon_i,\varepsilon_j\rangle)$。它是实对称正定矩阵。任意两向量的内积用坐标算：

$$
\langle x,y\rangle=X^{\mathsf T}GY .
$$

换基 $\eta=\varepsilon P$ 时，

$$
G_\eta=P^{\mathsf T}G_\varepsilon P,
$$

即 Gram 矩阵合同。反过来，任何正定矩阵都可以作为某组基的 Gram 矩阵（对标准内积做 Cholesky 分解即可）。

$G$ 正定这一点很关键：若 $X^{\mathsf T}GX=0$，则 $\|\sum x_i\varepsilon_i\|^2=0$，由正定性 $X=0$。

### 9.3 标准正交基与 Gram-Schmidt

基 $\varepsilon_1,\dots,\varepsilon_n$ 标准正交，指

$$
\langle\varepsilon_i,\varepsilon_j\rangle=\delta_{ij}.
$$

此时 Gram 矩阵是 $I$，内积就是坐标的点积，范数是坐标的欧氏范数。这是最舒服的坐标系。

Gram-Schmidt 正交化：给定线性无关组 $\alpha_1,\dots,\alpha_n$，令

$$
\beta_k=\alpha_k-\sum_{j=1}^{k-1}\frac{\langle\alpha_k,\beta_j\rangle}{\langle\beta_j,\beta_j\rangle}\beta_j,\qquad
e_k=\frac{\beta_k}{\|\beta_k\|}.
$$

$\beta_k$ 是 $\alpha_k$ 减去它在前面张成空间上的投影，所以垂直于前面所有向量。$\beta_k\ne0$，否则 $\alpha_k$ 在前面的张成空间里，与线性无关矛盾。

矩阵语言：$A=QR$，$Q$ 的列标准正交，$R$ 上三角。$A$ 列满秩时 $R$ 的对角元为正，分解唯一。这就是 QR 分解。

### 9.4 正交补与投影

$W$ 的正交补

$$
W^\perp=\{x:\langle x,w\rangle=0,\ \forall w\in W\}.
$$

有限维时

$$
V=W\oplus W^\perp,\qquad \dim W^\perp=n-\dim W .
$$

证明：取 $W$ 的标准正交基 $e_1,\dots,e_k$，对任意 $v$，令

$$
P_Wv=\sum_{i=1}^{k}\langle v,e_i\rangle e_i,
$$

则 $v-P_Wv$ 与每个 $e_i$ 正交，故属于 $W^\perp$。分解存在。唯一性由 $W\cap W^\perp=\{0\}$ 保证（若 $x$ 同时在两者中，$\langle x,x\rangle=0$）。

$P_W$ 是正交投影，满足 $P_W^2=P_W$，$P_W^{\mathsf T}=P_W$，$\ker P_W=W^\perp$，$\operatorname{im}P_W=W$。

投影是最佳逼近：对 $w\in W$，

$$
\|v-w\|^2=\|v-P_Wv\|^2+\|P_Wv-w\|^2\ge\|v-P_Wv\|^2 .
$$

所以 $P_Wv$ 是 $W$ 中离 $v$ 最近的点。最小二乘就是这件事的矩阵版。

正交分解还有一条常用性质：若 $W\subseteq U$，则

$$
U=W\oplus(U\cap W^\perp).
$$

### 9.5 正交矩阵与正交变换

$Q^{\mathsf T}Q=I$ 叫正交矩阵。等价条件：列向量标准正交；行向量标准正交；$Q^{-1}=Q^{\mathsf T}$；保持内积。

正交变换保持长度、距离、夹角。反过来，保持长度的线性变换一定是正交变换，用极化恒等式

$$
\langle x,y\rangle=\frac14\bigl(\|x+y\|^2-\|x-y\|^2\bigr)
$$

即可。

正交矩阵的行列式是 $\pm1$。$SO(n)$ 是行列式为 $1$ 的那一半，叫旋转群。特征值的模都是 $1$；实特征值只能是 $\pm1$；复特征值成共轭对。

二维情形：行列式 $1$ 是旋转

$$
\begin{pmatrix}\cos\theta&-\sin\theta\\ \sin\theta&\cos\theta\end{pmatrix},
$$

行列式 $-1$ 是反射，关于某条过原点的直线。

三维情形：$SO(3)$ 的非平凡元素是绕过原点某条轴的旋转，旋转角由迹决定：

$$
\operatorname{tr}Q=1+2\cos\theta .
$$

这条公式在刚体运动学里天天用。旋转矩阵对时间求导给出反对称的角速度矩阵，见 [附录 C](#附录-c-矩阵求导)。

Cartan-Dieudonné 定理：$n$ 维欧氏空间的任何正交变换都能写成不超过 $n$ 个反射的复合。二维时旋转是两个反射的复合，这条定理把它推到了高维。

### 9.6 实对称矩阵

实对称矩阵有三个硬结论：

1. 特征值全是实数。
2. 不同特征值的特征向量正交。
3. 存在正交矩阵 $Q$ 使 $Q^{\mathsf T}AQ=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$。

第一条：若 $Ax=\lambda x$，$x\ne0$，则

$$
\lambda\|x\|^2=\langle Ax,x\rangle=\langle x,Ax\rangle=\bar\lambda\|x\|^2,
$$

所以 $\lambda=\bar\lambda$。

第二条：$Ax=\lambda x$，$Ay=\mu y$，$\lambda\ne\mu$，则

$$
\lambda\langle x,y\rangle=\langle Ax,y\rangle=\langle x,Ay\rangle=\mu\langle x,y\rangle,
$$

故 $(\lambda-\mu)\langle x,y\rangle=0$，只能 $\langle x,y\rangle=0$。

第三条对维数归纳。特征多项式在 $\mathbb{C}$ 上有根，而第一条已经说明任何复特征值都是实数，所以 $A$ 一定有实特征值，取单位特征向量 $e_1$。则 $e_1^\perp$ 在 $A$ 下不变：若 $\langle x,e_1\rangle=0$，则 $\langle Ax,e_1\rangle=\langle x,Ae_1\rangle=\lambda\langle x,e_1\rangle=0$。在 $e_1^\perp$ 上 $A$ 仍是实对称，用归纳假设。

这条定理是二次型主轴、SVD、PCA、谱聚类等一系列东西的源头。

### 9.7 伴随算子

对 $T\in\mathcal{L}(V,W)$，存在唯一的 $T^*\in\mathcal{L}(W,V)$ 使

$$
\langle Tv,w\rangle_W=\langle v,T^*w\rangle_V .
$$

存在性：固定 $w$，$v\mapsto\langle Tv,w\rangle$ 是 $V$ 上的线性泛函。有限维内积空间上，任何线性泛函都能写成 $\langle\cdot,u\rangle$（Riesz 表示），取这个 $u$ 作为 $T^*w$ 即可。唯一性由内积非退化保证；线性性由表示的唯一性推出来。

在标准正交基下，$T$ 的矩阵是 $A$，$T^*$ 的矩阵就是 $A^*$（共轭转置）。实情形验一下：

$$
\langle Ax,y\rangle=y^{\mathsf T}Ax=(A^{\mathsf T}y)^{\mathsf T}x=\langle x,A^{\mathsf T}y\rangle .
$$

常用性质：

- $(T^*)^*=T$，$(S+T)^*=S^*+T^*$，$(ST)^*=T^*S^*$，$(kT)^*=\bar kT^*$。
- $\ker T^*=(\operatorname{im}T)^\perp$，$\operatorname{im}T^*=(\ker T)^\perp$。

第一条的证明是一串等价：

$$
w\in\ker T^*\iff T^*w=0\iff\forall v,\ \langle v,T^*w\rangle=0
\iff\forall v,\ \langle Tv,w\rangle=0\iff w\perp\operatorname{im}T .
$$

第二条由第一条取正交补得到。

按 $T$ 与 $T^*$ 的关系给算子分类：$T=T^*$ 叫自伴（实对称、Hermite）；$T^*T=TT^*$ 叫正规；$T^*T=I$ 叫等距。这三类的谱性质一类比一类好：自伴的特征值全实，正规的可酉对角化，等距的特征值全在单位圆上。

### 9.8 酉空间与正规矩阵

复空间上的内积共轭对称，$A^*=\bar A^{\mathsf T}$ 是共轭转置。$A$ 酉，若 $A^*A=I$。$A$ 是 Hermite 矩阵，若 $A^*=A$。

Hermite 矩阵的特征值全为实，不同特征值的特征向量正交，可以用酉矩阵对角化。酉矩阵的特征值模为 $1$，也可以酉对角化。

更一般地，Schur 定理：任何复方阵都酉相似于上三角阵。于是

$$
A\text{ 正规（}A^*A=AA^*\text{）}\iff A\text{ 可酉对角化}.
$$

正规矩阵包括 Hermite、反 Hermite、酉矩阵，以及它们的实情形。这条定理统一了实对称和正交矩阵的对角化结论。

### 9.9 奇异值分解

任意 $A\in\mathbb{C}^{m\times n}$ 都能写成

$$
A=U\Sigma V^*,
$$

$U,V$ 是酉矩阵，$\Sigma$ 是对角线上有 $\sigma_1\ge\cdots\ge\sigma_r>0$ 的 $m\times n$ 矩阵，其余为零。

推导。$A^*A$ 是 Hermite 半正定，有酉对角化

$$
A^*AV=V\operatorname{diag}(\sigma_1^2,\dots,\sigma_r^2,0,\dots,0).
$$

奇异值 $\sigma_i=\sqrt{\lambda_i(A^*A)}$。对 $i\le r$ 令 $u_i=\dfrac{1}{\sigma_i}Av_i$，验证标准正交：

$$
\langle u_i,u_j\rangle=\frac{1}{\sigma_i\sigma_j}\langle Av_i,Av_j\rangle
=\frac{1}{\sigma_i\sigma_j}\langle A^*Av_i,v_j\rangle
=\frac{\sigma_i}{\sigma_j}\delta_{ij}=\delta_{ij}.
$$

把 $u_1,\dots,u_r$ 扩充成 $\mathbb{C}^m$ 的标准正交基，拼成 $U$。逐列验证 $Av_j=\sigma_ju_j$（$j\le r$），$Av_j=0$（$j>r$），即得 $A=U\Sigma V^*$。

几个直接结论：

$$
\operatorname{rank}A=r,\qquad \|A\|_2=\sigma_1,\qquad \|A\|_F^2=\sum_{i=1}^r\sigma_i^2,
$$

$$
\kappa_2(A)=\frac{\sigma_1}{\sigma_n}\quad(A\text{ 可逆}).
$$

Eckart-Young 定理：截断 SVD

$$
A_k=\sum_{i=1}^{k}\sigma_iu_iv_i^*
$$

是所有秩不超过 $k$ 的矩阵中在谱范数下离 $A$ 最近的，误差 $\|A-A_k\|_2=\sigma_{k+1}$。Frobenius 范数下误差是 $\sqrt{\sigma_{k+1}^2+\cdots+\sigma_r^2}$。

证明用维数交。设 $\operatorname{rank}B\le k$，则 $\dim\ker B\ge n-k$。取 $v_1,\dots,v_{k+1}$ 张成的子空间，与 $\ker B$ 的交维数至少

$$
(k+1)+(n-k)-n=1,
$$

取交中单位向量 $z=\sum_{i\le k+1}\alpha_iv_i$，$Bz=0$。于是

$$
\|A-B\|_2^2\ge\|(A-B)z\|^2=\|Az\|^2=\sum_{i\le k+1}|\alpha_i|^2\sigma_i^2\ge\sigma_{k+1}^2 .
$$

下界被 $A_k$ 取到，故最优。

SVD 的用途很广：图像压缩（只留前几个奇异值）、推荐系统（隐语义）、主成分分析（对中心化数据做 SVD）、求广义逆、判断病态程度。这些应用的共同点是：大的奇异值对应的方向携带主要信息，小的方向可以砍掉。

### 9.10 极分解、广义逆与矩阵范数

极分解：可逆矩阵 $A$ 可以写成

$$
A=UP,\qquad U\text{ 酉（正交）},\quad P\text{ 正定}.
$$

取 $P=\sqrt{A^*A}$，$U=AP^{-1}$，则 $U^*U=P^{-1}A^*AP^{-1}=I$。

一般（可以奇异）情形：只保留非零奇异值，写 $A=U_r\Sigma_rV_r^*$，则

$$
A=\bigl(U_rV_r^*\bigr)\bigl(V_r\Sigma_rV_r^*\bigr),
$$

前一个是部分等距：把行空间等距地送到列空间，非零奇异值全是 $1$；后一个是半正定。所以任何矩阵都是“等距部分 + 正半定部分”。

这和复数的极坐标 $z=re^{i\theta}$ 是一回事，只不过这里的“模”是正定矩阵，“相位”是酉矩阵。

Moore-Penrose 广义逆：满足四条

$$
AXA=A,\quad XAX=X,\quad (AX)^*=AX,\quad (XA)^*=XA
$$

的唯一矩阵，记 $A^+$。用 SVD 写最清楚：

$$
A^+=V\Sigma^+U^*,
$$

$\Sigma^+$ 是把非零奇异值取倒数再转置。$A$ 可逆时 $A^+=A^{-1}$；列满秩时 $A^+=(A^*A)^{-1}A^*$；行满秩时 $A^+=A^*(AA^*)^{-1}$。

$A^+b$ 是最小二乘解中范数最小的那个，这就是它在线性回归里的用处。

矩阵范数：诱导范数由向量范数定义

$$
\|A\|_p=\max_{x\ne0}\frac{\|Ax\|_p}{\|x\|_p}.
$$

常用的两个有显式公式：

$$
\|A\|_1=\max_j\sum_i|a_{ij}|,\qquad \|A\|_\infty=\max_i\sum_j|a_{ij}| .
$$

$\|A\|_1$ 是最大列和，$\|A\|_\infty$ 是最大行和，$\|A\|_2$ 是最大奇异值。Frobenius 范数不是诱导范数，但满足相容性。

条件数与误差放大：$Ax=b$，$b$ 有扰动 $\Delta b$，则

$$
\frac{\|\Delta x\|}{\|x\|}\le\kappa(A)\frac{\|\Delta b\|}{\|b\|},\qquad \kappa(A)=\|A\|\|A^{-1}\| .
$$

推导：$\Delta x=A^{-1}\Delta b$，取范数得 $\|\Delta x\|\le\|A^{-1}\|\|\Delta b\|$；又 $\|b\|\le\|A\|\|x\|$，即 $1/\|x\|\le\|A\|/\|b\|$。两式相乘即得。

$\kappa$ 大表示矩阵接近奇异，输入的小误差会被放大成大误差。Hilbert 矩阵是经典病态例子，$n=12$ 时条件数已经到 $10^{16}$，双精度下基本没法用。

矩阵序列按元素收敛。谱半径 $\rho(A)=\max_i|\lambda_i|$ 控制幂的长期行为：

$$
\rho(A)=\lim_{k\to\infty}\|A^k\|^{1/k}.
$$

$\rho(A)<1$ 时 $A^k\to0$，这也是迭代法收敛的判据。Jordan 形一眼就能看出原因：$\lambda^k$ 乘多项式，$|\lambda|<1$ 必然衰减。

### 9.11 最小二乘与 QR

解超定方程 $Ax=b$（$A$ 列满秩，方程比未知数多）时通常无解，退而求

$$
\min_x\|Ax-b\|^2 .
$$

把 $b$ 正交投影到 $C(A)$，残差垂直于列空间：

$$
A^{\mathsf T}(b-A\hat x)=0 .
$$

这就是正规方程

$$
A^{\mathsf T}A\hat x=A^{\mathsf T}b,\qquad \hat x=(A^{\mathsf T}A)^{-1}A^{\mathsf T}b .
$$

也可以从求导得到：把 $\|Ax-b\|^2$ 展开成 $x^{\mathsf T}A^{\mathsf T}Ax-2x^{\mathsf T}A^{\mathsf T}b+b^{\mathsf T}b$，对 $x$ 求梯度令其为零。

数值上不直接求 $A^{\mathsf T}A$ 的逆，因为条件数会平方。用 QR：$A=QR$，则

$$
\|Ax-b\|^2=\|Rx-Q^{\mathsf T}b\|^2+\text{常数},
$$

回代解上三角方程 $R\hat x=Q^{\mathsf T}b$ 即可，稳定得多。也可以用 SVD，$\hat x=V\Sigma^+U^{\mathsf T}b$，病态时还能截断小奇异值做正则化。

## 第十章 双线性函数与对偶空间

> [← 返回总目录](#目录)

### 10.1 线性函数与对偶空间

线性函数（线性泛函）是 $f:V\to K$ 且

$$
f(kx+ly)=kf(x)+lf(y).
$$

所有线性函数构成对偶空间 $V^*=\mathcal{L}(V,K)$，$\dim V^*=\dim V=n$。

取定基 $\varepsilon_1,\dots,\varepsilon_n$，定义坐标函数

$$
\varepsilon^i\Bigl(\sum_jx_j\varepsilon_j\Bigr)=x_i .
$$

则 $\varepsilon^1,\dots,\varepsilon^n$ 是 $V^*$ 的基，叫对偶基，满足

$$
\varepsilon^i(\varepsilon_j)=\delta^i_j .
$$

任何 $f\in V^*$ 都能写成 $f=\sum f(\varepsilon_i)\varepsilon^i$。

对偶基的变换要小心。若新基 $\eta_j=\sum_ip_{ij}\varepsilon_i$，即 $(\eta)=(\varepsilon)P$，则对偶基满足

$$
(\eta^*)=(\varepsilon^*)(P^{-1})^{\mathsf T}.
$$

验证：$\eta^{*j}(\eta_i)=\sum_k(P^{-1})^{\mathsf T}_{jk}\varepsilon^{*k}\bigl(\sum_lp_{li}\varepsilon_l\bigr)=\sum_k(P^{-1})_{kj}p_{ki}=\delta_{ji}$。

也就是说，对偶基的过渡矩阵是原过渡矩阵的逆转置。坐标变换里也是这个方向：$(\alpha)_\eta=P^{-1}(\alpha)_\varepsilon$。

### 10.2 双线性函数

$f:V\times V\to K$ 双线性，指固定一个变元后对另一个变元线性：

$$
f(kx+ly,z)=kf(x,z)+lf(y,z),\qquad f(x,ky+lz)=kf(x,y)+lf(x,z).
$$

取定基后，$f$ 由矩阵 $A=(f(\varepsilon_i,\varepsilon_j))$ 完全决定：

$$
f(x,y)=X^{\mathsf T}AY .
$$

换基 $(\eta)=(\varepsilon)P$ 时，

$$
A_\eta=P^{\mathsf T}A_\varepsilon P .
$$

所以双线性函数在换基下合同，这和线性变换的相似形成对照：

| 对象 | 换基后的矩阵关系 |
|---|---|
| 线性变换 | $A'=P^{-1}AP$（相似） |
| 双线性函数、二次型 | $A'=P^{\mathsf T}AP$（合同） |
| 欧氏空间的内积（Gram 矩阵） | $G'=P^{\mathsf T}GP$（合同且正定） |

$f$ 非退化，指 $f(x,y)=0$ 对一切 $y$ 成立只能 $x=0$，等价于 $A$ 可逆。左核和右核在非退化时都是零。

对称双线性函数满足 $f(x,y)=f(y,x)$，矩阵对称；反对称满足 $f(x,y)=-f(y,x)$，矩阵反对称。特征不等于 $2$ 时任何双线性函数都能唯一拆成对称部分加反对称部分。

### 10.3 对称双线性函数与二次型

对称双线性函数和二次型是一一对应的，见 [5.6 节](#_5-6-双线性函数视角)的极化公式。

对称双线性函数一定有正交基（特征不等于 $2$）。证明对维数归纳。若 $f$ 恒为零，随便取基都正交。否则存在 $v$ 使 $f(v,v)\ne0$：取 $x,y$ 使 $f(x,y)\ne0$，则 $f(x,x),f(y,y),f(x+y,x+y)$ 中至少一个非零，因为

$$
f(x+y,x+y)=f(x,x)+2f(x,y)+f(y,y),
$$

若前两个都为零，第三个就是 $2f(x,y)\ne0$。

有了 $v$，$v^\perp$ 的维数是 $n-1$（映射 $u\mapsto f(u,v)$ 非零），在 $v^\perp$ 上用归纳假设，再并上 $v$ 即可。

正交基下矩阵是对角阵，对角元就是各基向量的“长度平方”。对角元可能为零（迷向向量），这时二次型在实数域上的正负惯性指数仍然良定。

### 10.4 反对称双线性函数与辛空间

反对称双线性函数满足 $f(x,x)=0$（特征不等于 $2$ 时这等价于反对称）。矩阵是反对称的：$A^{\mathsf T}=-A$。

反对称矩阵的秩一定是偶数。实反对称矩阵的特征值是纯虚数或零，复特征值成共轭对，非零特征值总是成对出现，所以秩为偶数。从下面的标准形也能直接看出来：非退化部分总是若干个二阶块的直和。

标准形：存在基使

$$
A=\operatorname{diag}\left(\begin{pmatrix}0&1\\-1&0\end{pmatrix},\dots,\begin{pmatrix}0&1\\-1&0\end{pmatrix},0,\dots,0\right).
$$

非退化时没有零块，$\dim V=2r$ 必须是偶数。这样的基叫辛基，记 $e_1,\dots,e_r,f_1,\dots,f_r$，满足

$$
f(e_i,f_j)=\delta_{ij},\qquad f(e_i,e_j)=f(f_i,f_j)=0 .
$$

带非退化反对称双线性函数的空间叫辛空间。辛几何是哈密顿力学的几何语言，位置和动量就是辛基下的配对坐标。

构造辛基的办法和正交化类似：取 $e_1,f_1$ 使 $f(e_1,f_1)=1$，然后取它们在 $f$ 下的正交补，维数降 $2$，归纳。

### 10.5 张量积

张量积是把两个空间“乘”起来的最小空间，使得双线性映射都能分解。严格构造：以 $V\times W$ 为基的自由向量空间，模去由

$$
(v_1+v_2,w)-(v_1,w)-(v_2,w),\quad (v,w_1+w_2)-(v,w_1)-(v,w_2),\\
(kv,w)-k(v,w),\quad (v,kw)-k(v,w)
$$

生成的子空间。等价类记 $v\otimes w$。

万有性质：对任何双线性映射 $\varphi:V\times W\to U$，存在唯一的线性映射 $\bar\varphi:V\otimes W\to U$ 使 $\bar\varphi(v\otimes w)=\varphi(v,w)$。这句话可以当成张量积的定义，因为它把“双线性”转化成了“线性”。

维数：若 $e_1,\dots,e_m$ 是 $V$ 的基，$f_1,\dots,f_n$ 是 $W$ 的基，则

$$
\{e_i\otimes f_j\}
$$

是 $V\otimes W$ 的基，所以

$$
\dim(V\otimes W)=mn .
$$

无关性的证明用泛性质造坐标泛函：对每组 $(\alpha,\beta)$ 定义双线性 $\varphi_{\alpha\beta}\bigl(\sum a_ie_i,\sum b_jf_j\bigr)=a_\alpha b_\beta$，它诱导 $V\otimes W\to K$ 的线性函数，作用在 $\sum c_{ij}e_i\otimes f_j$ 上得到 $c_{\alpha\beta}$，故所有系数为零。

几个常用同构：

$$
K^m\otimes K^n\cong K^{mn},\qquad K[x]\otimes K[y]\cong K[x,y],
$$

$$
\mathcal{L}(V,W)\cong V^*\otimes W,\qquad (V\otimes W)^*\cong V^*\otimes W^* .
$$

矩阵的 Kronecker 积 $A\otimes B=(a_{ij}B)$ 就是 $K^m\otimes K^n$ 上算子的矩阵表示。它的特征值是 $\lambda_i(A)\mu_j(B)$，这个结论在解矩阵方程 $AX-XB=C$ 时很有用。

### 10.6 张量代数、对称代数、外代数

张量代数 $T(V)=\bigoplus_{k\ge0}V^{\otimes k}$，乘法就是张量积。它是“非交换的多项式代数”。

对称代数 $S(V)=T(V)/\langle v\otimes w-w\otimes v\rangle$，把张量积变成交换的。$S(V)$ 可以看成 $V^*$ 上的多项式函数空间，$\dim S^k(V)=\binom{n+k-1}{k}$。

外代数 $\Lambda(V)=T(V)/\langle v\otimes v\rangle$。关系 $v\wedge v=0$ 推出 $v\wedge w=-w\wedge v$（特征不等于 $2$），所以外积反对称。

$\dim\Lambda^k(V)=\binom{n}{k}$，$\dim\Lambda(V)=2^n$。$\Lambda^n(V)$ 是一维的，行列式就住在这里。

行列式的外代数定义：$A$ 诱导 $\Lambda^n(V)$ 上的线性映射 $\Lambda^nA$，因为空间一维，它等于某个数乘。这个数就是 $\det A$。于是

$$
\Lambda^n A(e_1\wedge\cdots\wedge e_n)=\det A\,(e_1\wedge\cdots\wedge e_n),
$$

乘法定理 $\det(AB)=\det A\det B$ 就是“一维空间上的线性映射复合，系数相乘”，一行都不用算。这条观点在微分形式和流形上的积分里会再次出现。

Pfaffian 是反对称矩阵的“半边行列式”，满足 $\operatorname{Pf}(A)^2=\det A$。$2n$ 阶反对称矩阵的 Pfaffian 写成

$$
\operatorname{Pf}(A)=\frac{1}{2^nn!}\sum_{\sigma\in S_{2n}}\operatorname{sgn}(\sigma)\prod_{i=1}^{n}a_{\sigma(2i-1),\sigma(2i)} .
$$

它在统计物理和拓扑里出现，高代课上一般只作为外代数的例子提一句。

## 第十一章 解析几何

> [← 返回总目录](#目录)

### 11.1 向量代数

三维欧氏空间中，设 $\vec a=(a_1,a_2,a_3)$，$\vec b=(b_1,b_2,b_3)$。

数量积（点积）：

$$
\vec a\cdot\vec b=a_1b_1+a_2b_2+a_3b_3=|\vec a||\vec b|\cos\theta .
$$

向量积（叉积）：

$$
\vec a\times\vec b=
\begin{vmatrix}
\vec i&\vec j&\vec k\\
a_1&a_2&a_3\\
b_1&b_2&b_3
\end{vmatrix},
\qquad |\vec a\times\vec b|=|\vec a||\vec b|\sin\theta .
$$

$|\vec a\times\vec b|$ 是以 $\vec a,\vec b$ 为邻边的平行四边形面积，方向由右手定则给出。$\vec a\times\vec b=0$ 就是共线。

混合积：

$$
(\vec a,\vec b,\vec c)=\vec a\cdot(\vec b\times\vec c)=
\begin{vmatrix}
a_1&a_2&a_3\\
b_1&b_2&b_3\\
c_1&c_2&c_3
\end{vmatrix}.
$$

它的绝对值是以三个向量为棱的平行六面体体积。三向量共面 $\iff$ 混合积为零。轮换不变号，交换两个变号。

双重向量积：

$$
\vec a\times(\vec b\times\vec c)=\vec b(\vec a\cdot\vec c)-\vec c(\vec a\cdot\vec b).
$$

这条公式在刚体动力学里几乎每页都有。

和后文联系：$\vec a\times$ 作用在 $\vec b$ 上，可以写成反对称矩阵乘 $\vec b$：

$$
\vec a\times\vec b=
\begin{pmatrix}
0&-a_3&a_2\\
a_3&0&-a_1\\
-a_2&a_1&0
\end{pmatrix}\vec b .
$$

这个反对称矩阵就是角速度的“叉乘矩阵”，它的平方和旋转矩阵的 Rodrigues 公式有直接关系。

### 11.2 平面与直线

平面：过点 $P_0(x_0,y_0,z_0)$，法向量 $\vec n=(A,B,C)$，

$$
A(x-x_0)+B(y-y_0)+C(z-z_0)=0,
$$

即 $Ax+By+Cz+D=0$。法向量就是平面方程的一次项系数。

直线：过 $P_0$，方向向量 $\vec s=(m,n,p)$，

$$
\frac{x-x_0}{m}=\frac{y-y_0}{n}=\frac{z-z_0}{p},
$$

或参数式 $(x,y,z)=(x_0,y_0,z_0)+t(m,n,p)$。也可写成两个平面的交线。

位置关系：

- 两平面：法向量平行则平行或重合，否则相交于一条直线。
- 直线与平面：$\vec s\cdot\vec n=0$ 时平行或含于平面，否则交于一点。
- 两直线：方向向量叉积为零则平行或重合；否则看混合积 $(\vec s_1,\vec s_2,\overrightarrow{P_1P_2})$ 是否为零，为零则共面相交，不为零则异面。

### 11.3 距离

点到平面 $Ax+By+Cz+D=0$ 的距离：

$$
d=\frac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}} .
$$

点到直线 $P_0+\vec s\,t$ 的距离：

$$
d=\frac{|\overrightarrow{P_0P}\times\vec s|}{|\vec s|} .
$$

叉积的模是平行四边形面积，除以底边长度就是高。

异面直线的距离：

$$
d=\frac{|(\vec s_1,\vec s_2,\overrightarrow{P_1P_2})|}{|\vec s_1\times\vec s_2|} .
$$

混合积是平行六面体体积，$\vec s_1\times\vec s_2$ 的模是底面积，相除就是高。分子为零时两直线共面，距离为零。

### 11.4 柱面、锥面、旋转曲面

柱面：母线平行于某方向，准线是平面曲线。方程里缺一个变量就表示母线平行于该变量对应的坐标轴。例如 $F(x,y)=0$ 在空间中表示母线平行于 $z$ 轴的柱面。$x^2+y^2=R^2$ 是圆柱面，$y^2=2px$ 是抛物柱面，$\frac{x^2}{a^2}-\frac{y^2}{b^2}=1$ 是双曲柱面。

锥面：所有母线过同一个顶点。顶点在原点时，方程是齐次的：

$$
F(x,y,z)=0,\qquad F(tx,ty,tz)=t^kF(x,y,z).
$$

齐次性保证整条射线都在曲面上。$x^2+y^2=z^2$ 是圆锥面。

旋转曲面：曲线绕轴旋转。绕 $z$ 轴旋转时，把曲线方程里的 $y$ 换成 $\pm\sqrt{x^2+y^2}$：

$$
f(y,z)=0\ \longrightarrow\ f\bigl(\pm\sqrt{x^2+y^2},\,z\bigr)=0 .
$$

例如 $yz$ 平面上的抛物线 $y^2=2pz$ 绕 $z$ 轴转，得 $x^2+y^2=2pz$，旋转抛物面。椭圆绕轴转得旋转椭球面，双曲线绕虚轴转得单叶双曲面，绕实轴转得双叶双曲面。

### 11.5 二次曲面

一般二次曲面是

$$
x^{\mathsf T}Ax+2b^{\mathsf T}x+c=0,
$$

$A$ 是三阶实对称矩阵。用正交变换消去交叉项，再用平移消去一次项，就化成标准形。这正是第五章主轴定理的几何应用：$A$ 的特征值决定二次项的正负，特征向量给出主轴方向。

标准形与名称：

| 方程 | 曲面 |
|---|---|
| $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}+\dfrac{z^2}{c^2}=1$ | 椭球面 |
| $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}-\dfrac{z^2}{c^2}=1$ | 单叶双曲面 |
| $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}-\dfrac{z^2}{c^2}=-1$ | 双叶双曲面 |
| $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=2z$ | 椭圆抛物面 |
| $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=2z$ | 双曲抛物面（马鞍面） |
| $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}-\dfrac{z^2}{c^2}=0$ | 二次锥面 |
| $\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1$ | 椭圆柱面 |
| $\dfrac{x^2}{a^2}-\dfrac{y^2}{b^2}=1$ | 双曲柱面 |
| $x^2=2py$ | 抛物柱面 |

单叶双曲面是直纹面，可以由两族直线织成，冷却塔就是这个形状。双曲抛物面也是直纹面，马鞍面。这两种曲面在建筑里很常见，因为直纹面可以用直钢筋搭出来。

判断形状的实用办法是截痕法：用平行于坐标平面的平面去截，看截线是什么二次曲线。比如 $z=k$ 截单叶双曲面得椭圆，截双叶双曲面时 $|k|$ 太小时无截线。

### 11.6 二次曲线的不变量

平面二次曲线

$$
a_{11}x^2+2a_{12}xy+a_{22}y^2+2a_{13}x+2a_{23}y+a_{33}=0
$$

在平移和旋转下，下面三个量不变：

$$
I_1=a_{11}+a_{22},\qquad
I_2=\begin{vmatrix}a_{11}&a_{12}\\a_{12}&a_{22}\end{vmatrix},\qquad
I_3=\begin{vmatrix}a_{11}&a_{12}&a_{13}\\a_{12}&a_{22}&a_{23}\\a_{13}&a_{23}&a_{33}\end{vmatrix}.
$$

分类：

- $I_2>0$：椭圆型。$I_1I_3<0$ 为椭圆，$I_3=0$ 为一点，$I_1I_3>0$ 为虚椭圆。
- $I_2<0$：双曲型。$I_3\ne0$ 为双曲线，$I_3=0$ 为两条相交直线。
- $I_2=0$：抛物型。$I_3\ne0$ 为抛物线，$I_3=0$ 退化为两条平行直线或一条直线。

这套不变量就是二次型惯性定理在二维仿射情形下的具体化。$I_2$ 是二次项矩阵的行列式，$I_3$ 是增广矩阵的行列式。

## 附录 A 定理与证明手法

> [← 返回总目录](#目录)

| 定理 | 证明的抓手 |
|---|---|
| 带余除法 | 对次数归纳，首项消去 |
| Bézout | 辗转相除反代 |
| 唯一分解 | 不可约的素性 + 次数归纳 |
| 重因式判别 | 求导后模 $p$ 看括号 |
| Eisenstein | 模 $p$ 约化，看常数项被 $p^2$ 整除 |
| 范德蒙德 | 逐行相减提因子，归纳降阶 |
| 乘法定理 | 初等矩阵分解，或列的多重线性 |
| Cramer | 列线性 + 重复列为零 |
| Jacobi 公式 | 偏导等于代数余子式，链式求和 |
| 惯性定理 | 正负子空间维数之和超过 $n$，必有非零交 |
| 正定判别 | Schur 补 + 归纳 |
| 维数公式 | 交的基分别扩充，验证合起来是基 |
| 秩-零度 | 核的基扩充，像的基是扩充部分 |
| 不同特征值特征向量无关 | 作用 $A$ 后作差，归纳 |
| $GM\le AM$ | 特征子空间基扩充，矩阵分块上三角 |
| Cayley-Hamilton | 伴随矩阵比较系数，望远镜求和 |
| Jordan 存在性 | 根子空间直和 + 幂零循环基 |
| Jordan 唯一性 | 块数由 $\dim\ker N^k$ 的差决定 |
| 相似判定 | 特征矩阵等价，用有理标准形作中介 |
| Cauchy-Schwarz | 二次式判别式非正 |
| Gram-Schmidt | 减去投影，验证正交 |
| 实对称可对角化 | 取实特征向量，正交补不变，归纳 |
| SVD | $A^*A$ 谱分解，$Av_i/\sigma_i$ 标准正交 |
| Eckart-Young | 维数交取非零向量，范数下界 |
| Sylvester 不等式 | 限制映射的核维数估计 |
| Gershgorin | 取最大分量，除法取模 |
| 张量积维数 | 泛性质造坐标泛函，证明基无关 |

## 附录 B 计算套路

> [← 返回总目录](#目录)

行列式。先看能不能化三角；有范德蒙德结构就用公式；三对角写递推；除对角线外全相同就写成 $(a-b)I+bJ$；有分块零块就用 Schur 补。

秩。行变换化阶梯形，非零行数是秩；要证秩不等式就用线性映射的核像维数。

逆矩阵。小阶用伴随矩阵；大阶用 $[A\mid I]$ 行变换；分块三角用 Schur 补公式。

二次型。先写出对称矩阵；要标准形用配方法或行列同步变换；要判正定用顺序主子式；要知道形状用特征值。

Jordan 形。先算特征多项式；再算各 $(\lambda I-A)^k$ 的秩（或零空间维数）；由差值得块数和块大小；需要具体变换矩阵时逐个解 $(A-\lambda I)v=0$ 和广义特征向量链。

不变因子。算各阶行列式因子 $D_k$（所有 $k$ 阶子式的 gcd），再相除；三阶以内直接做 Smith 化也行。

最小多项式。从特征多项式的因子中试，或者看 Jordan 块的最大尺寸；用初等因子也行，每个特征值取最大指数。

正定。顺序主子式全正最省事；含参数时把行列式写成参数的多项式，再解不等式。

SVD。算 $A^{\mathsf T}A$ 的特征值和特征向量；奇异值开方；$u_i=Av_i/\sigma_i$；不够的基向量用正交补补。

证明可对角化。数不同特征值够不够 $n$；不够就比 $GM$ 与 $AM$；或者看最小多项式有没有重根。

证明不可约。先试有理根（一次因子）；再试 Eisenstein（可能要平移）；最后试模 $p$。

## 附录 C 矩阵求导

> [← 返回总目录](#目录)

约定分母布局，梯度是列向量。

标量对向量：

$$
\frac{\partial(a^{\mathsf T}x)}{\partial x}=a,\qquad
\frac{\partial(x^{\mathsf T}Ax)}{\partial x}=(A+A^{\mathsf T})x,
$$

$A$ 对称时是 $2Ax$。

向量对向量（Jacobian）：

$$
\frac{\partial(Ax)}{\partial x}=A,\qquad
\frac{\partial g(f(x))}{\partial x}=\frac{\partial g}{\partial y}\frac{\partial f}{\partial x}.
$$

矩阵对时间：

$$
\frac{d}{dt}(AB)=\dot AB+A\dot B,\qquad
\frac{d}{dt}A^{-1}=-A^{-1}\dot AA^{-1}.
$$

第二条从 $AA^{-1}=I$ 两边求导得到。

旋转矩阵与角速度：若 $R(t)\in SO(3)$，则

$$
\dot R=R\widetilde\omega,
$$

$\widetilde\omega$ 是角速度的反对称矩阵。因为 $R^{\mathsf T}R=I$ 求导得 $R^{\mathsf T}\dot R$ 反对称，把它记成 $\widetilde\omega$ 即可。

Rodrigues 公式：绕单位轴 $n$ 转 $\theta$，

$$
R=I\cos\theta+\widetilde n\sin\theta+nn^{\mathsf T}(1-\cos\theta).
$$

对 $\theta$ 求导：

$$
\frac{\partial R}{\partial\theta}=-I\sin\theta+\widetilde n\cos\theta+nn^{\mathsf T}\sin\theta .
$$

这些公式在做刚体动力学、机械臂运动学、SLAM 的姿态更新时会反复出现，和前面的反对称矩阵、正交矩阵是一套东西。

## 附录 D 讲义里超出考纲的部分

> [← 返回总目录](#目录)

李思的讲义后面还有几章，课程不讲，但用的全是前面的东西，顺手记一下。

矩阵群与 Lie 代数。$GL(n),SL(n),O(n),SO(n),U(n),SU(n)$ 都是矩阵群。$SO(n)$ 在单位阵处的切空间是反对称矩阵空间，指数映射把 $\widetilde\omega$ 送成旋转矩阵 $e^{\widetilde\omega}$，角速度积分出姿态就靠这个。BCH 公式说两个小旋转复合的对数约等于

$$
X+Y+\frac12[X,Y]+\cdots,
$$

李括号就是矩阵交换子 $[X,Y]=XY-YX$。

线性规划。约束是线性不等式，可行域是多面体，最优值在顶点取到，单纯形法沿着顶点走。对偶问题把

$$
\min c^{\mathsf T}x\ \text{s.t.}\ Ax\ge b
\quad\longleftrightarrow\quad
\max b^{\mathsf T}y\ \text{s.t.}\ A^{\mathsf T}y\le c
$$

配对，强弱对偶背后的 Farkas 引理和分离定理，本质上还是线性代数加凸性。

量子力学。量子态是复内积空间里的单位向量，可观测量是 Hermite 矩阵，测量结果是特征值，概率是投影的模方。自旋用 Pauli 矩阵描述：

$$
\sigma_1=\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad
\sigma_2=\begin{pmatrix}0&-i\\i&0\end{pmatrix},\quad
\sigma_3=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$

它们和单位阵一起张成 $2\times2$ 的 Hermite 矩阵空间。复合系统用张量积，纠缠和 Bell 不等式就是第十章那套线性代数。
