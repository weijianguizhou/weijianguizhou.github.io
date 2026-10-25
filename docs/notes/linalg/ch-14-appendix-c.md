---
title: 附录 C 矩阵求导
description: 高等代数 · 附录 C 矩阵求导
---

# 附录 C 矩阵求导

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
