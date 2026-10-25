---
title: 第七章 线性变换
description: 高等代数 · 第七章 线性变换
---

# 第七章 线性变换

## 7.1 线性映射与线性变换

$T:V\to W$ 线性，若

$$
T(x+y)=T(x)+T(y),\qquad T(kx)=kT(x).
$$

等价于 $T(kx+ly)=kTx+lTy$。$V=W$ 时叫线性变换。所有 $V\to W$ 的线性映射构成线性空间 $\mathcal{L}(V,W)$，维数是 $mn$。

核 $\ker T=\{x:Tx=0\}$，像 $\operatorname{im}T=\{Tx\}$。$T$ 单射 $\iff\ker T=\{0\}$；$T$ 满射 $\iff\operatorname{im}T=W$。有限维且维数相同时，单射、满射、同构三者等价。

## 7.2 矩阵表示

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

## 7.3 秩-零度定理（映射版）

$$
\dim V=\dim\ker T+\dim\operatorname{im}T .
$$

[4.4 节](/notes/linalg/ch-04-linear-systems.html#_4-4-秩-零度定理)已经证过。矩阵形式的直接推论：

$$
\dim N(A)=n-\operatorname{rank}A .
$$

线性映射的分解：$T$ 诱导同构 $\bar T:V/\ker T\to\operatorname{im}T$。于是任何线性映射都能拆成一个满射（商映射）接一个单射（嵌入），这是同构基本定理。

## 7.4 不变子空间

$W\subseteq V$ 在 $T$ 下不变，若 $T(W)\subseteq W$。$T$ 在 $W$ 上的限制仍线性，并且在商空间 $V/W$ 上诱导线性变换

$$
\bar T(v+W)=Tv+W .
$$

若 $V=W_1\oplus\cdots\oplus W_s$ 且每个 $W_i$ 不变，取各子空间的基合并，$T$ 的矩阵是分块对角。若只有 $W$ 不变，取 $W$ 的基再扩充成 $V$ 的基，矩阵是分块上三角。

对角化就是找一维不变子空间。Jordan 形则是把空间分解成“特征值 + 幂零”的不变子空间。

## 7.5 特征值与特征多项式

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

## 7.6 对角化

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

另外一个常用判据是最小多项式无重根，见 [7.7 节](/notes/linalg/ch-07-linear-transformations.html#_7-7-最小多项式与-cayley-hamilton)。

可交换且各自可对角化的矩阵可以同时对角化。证明取 $A$ 的特征子空间，由于 $AB=BA$，$B$ 把每个特征子空间映到自身，在里头再对角化。量子力学里一组对易可观测量能同时测量，就是这条定理。

## 7.7 最小多项式与 Cayley-Hamilton

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

## 7.8 幂零变换与循环子空间

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

## 7.9 Jordan 标准形

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

## 7.10 应用举例

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
