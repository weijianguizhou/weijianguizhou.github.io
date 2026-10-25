---
title: 第九章 欧氏空间
description: 高等代数 · 第九章 欧氏空间
---

# 第九章 欧氏空间

## 9.1 内积与度量

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

## 9.2 Gram 矩阵

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

## 9.3 标准正交基与 Gram-Schmidt

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

## 9.4 正交补与投影

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

## 9.5 正交矩阵与正交变换

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

## 9.6 实对称矩阵

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

## 9.7 伴随算子

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

## 9.8 酉空间与正规矩阵

复空间上的内积共轭对称，$A^*=\bar A^{\mathsf T}$ 是共轭转置。$A$ 酉，若 $A^*A=I$。$A$ 是 Hermite 矩阵，若 $A^*=A$。

Hermite 矩阵的特征值全为实，不同特征值的特征向量正交，可以用酉矩阵对角化。酉矩阵的特征值模为 $1$，也可以酉对角化。

更一般地，Schur 定理：任何复方阵都酉相似于上三角阵。于是

$$
A\text{ 正规（}A^*A=AA^*\text{）}\iff A\text{ 可酉对角化}.
$$

正规矩阵包括 Hermite、反 Hermite、酉矩阵，以及它们的实情形。这条定理统一了实对称和正交矩阵的对角化结论。

## 9.9 奇异值分解

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

## 9.10 极分解、广义逆与矩阵范数

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

## 9.11 最小二乘与 QR

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
