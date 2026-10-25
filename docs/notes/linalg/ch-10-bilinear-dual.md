---
title: 第十章 双线性函数与对偶空间
description: 高等代数 · 第十章 双线性函数与对偶空间
---

# 第十章 双线性函数与对偶空间

## 10.1 线性函数与对偶空间

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

## 10.2 双线性函数

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

## 10.3 对称双线性函数与二次型

对称双线性函数和二次型是一一对应的，见 [5.6 节](/notes/linalg/ch-05-quadratic-forms.html#_5-6-双线性函数视角)的极化公式。

对称双线性函数一定有正交基（特征不等于 $2$）。证明对维数归纳。若 $f$ 恒为零，随便取基都正交。否则存在 $v$ 使 $f(v,v)\ne0$：取 $x,y$ 使 $f(x,y)\ne0$，则 $f(x,x),f(y,y),f(x+y,x+y)$ 中至少一个非零，因为

$$
f(x+y,x+y)=f(x,x)+2f(x,y)+f(y,y),
$$

若前两个都为零，第三个就是 $2f(x,y)\ne0$。

有了 $v$，$v^\perp$ 的维数是 $n-1$（映射 $u\mapsto f(u,v)$ 非零），在 $v^\perp$ 上用归纳假设，再并上 $v$ 即可。

正交基下矩阵是对角阵，对角元就是各基向量的“长度平方”。对角元可能为零（迷向向量），这时二次型在实数域上的正负惯性指数仍然良定。

## 10.4 反对称双线性函数与辛空间

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

## 10.5 张量积

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

## 10.6 张量代数、对称代数、外代数

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
