---
title: 第二章 行列式
description: 高等代数 · 第二章 行列式
---

# 第二章 行列式

## 2.1 排列与定义

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

## 2.2 基本性质

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

## 2.3 展开定理与 Laplace 定理

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

## 2.4 乘法定理

$$
\det(AB)=\det A\det B .
$$

三种证法各有用途。

初等矩阵法：先证对每类初等矩阵 $E$ 有 $\det(EB)=\det E\det B$。倍加型 $\det E=1$，由倍加不变性成立；交换型 $\det E=-1$，由换行变号成立；倍乘型 $\det E=k$，由行线性成立。可逆矩阵能写成初等矩阵之积，累乘即得。对奇异矩阵 $A$，若 $\det(AB)\ne0$，则 $AB$ 可逆，设其逆为 $C$，则 $A(BC)=I$，$A$ 有右逆；方阵有右逆就可逆，矛盾。所以两边都是 $0$。

直接展开法：把 $(AB)_{ik}=\sum_ja_{ij}b_{jk}$ 代进定义，用行列式对列的多重线性把和拆开，再利用“列重复则为零”，剩下的正好是 $\det A\det B$。

分块三角法：对 $\begin{pmatrix}A&0\\-I&B\end{pmatrix}$ 用两种方式算行列式，也能得到结论。

推论：$A$ 可逆 $\iff\det A\ne0$，且 $\det(A^{-1})=1/\det A$。

## 2.5 伴随矩阵、逆矩阵与 Cramer 法则

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

## 2.6 计算技巧

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

## 2.7 Jacobi 公式与 Jacobi 行列式

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
