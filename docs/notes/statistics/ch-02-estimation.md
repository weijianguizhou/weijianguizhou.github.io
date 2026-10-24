---
title: 第二章 参数估计
description: 数理统计 · 第二章 参数估计
---

# 第二章 参数估计

## 参数估计的概念 

- **定义 (估计量 $\hat{\theta}$):** 设 $X_{1}, \ldots, X_{n}$ 是总体 $X$ 的一个样本，其分布函数为 $F(x;\theta)$，其中 $\theta\in\Theta$ 为未知参数，$\Theta$ 为参数空间。若统计量 $g(X_{1},\cdot\cdot\cdot,X_{n})$ 可作为 $\theta$ 的一个估计，则称其为 $\theta$ 的**估计量**，记为 $\hat{\theta}$ 。
    
    - **公式:** $\hat{\theta}=g(X_{1},\cdot\cdot\cdot,X_{n})$ 。
        
    - **注:** $F(x;\theta)$ 也可用分布律或密度函数代替 。
        
- **估计值:** 若 $x_{1}, \ldots, x_{n}$ 是样本的一个观测值，则 $\hat{\theta}=g(x_{1},\cdot\cdot\cdot,x_{n})$ 称为 $\theta$ 的**估计值** 。
    
- **点估计:** 由于 $\hat{\theta}$ 的估计值是一个实数域上的点，故称这种估计为**点估计** 。
    
- **经典方法:** 点估计的经典方法是**矩估计法**与**极大似然估计法** 。
    

### 矩估计法 (简称“矩法”) 

- **关键点:**
    
    1. 用样本矩作为$\text{总体同阶矩}$ 的估计
        
        - **公式:** $\hat{E(X^{k})} = \frac{1}{n}\sum_{i=1}^{n}X_{i}^{k}$ 。
            
    2. 若 $\hat{\theta}$ 是 $\theta$ 的矩估计，则 $g(\theta)$ 的矩估计为 $g(\hat{\theta})$ 。
        
- $\text{\color{blue}{例1}}$ (二项分布 $B(m,p)$): 求 $p$ 的矩估计 。
    
    - $E(X)=mp \Rightarrow p=\frac{1}{m}E(X)$ 
        
    - $\hat{E(X)}=\overline{X}$ 
        
    - **矩估计:** $\hat{p}=\frac{1}{m}\overline{X}$ 
        
- **例2 (拉普拉斯分布):** 密度函数 $f(x)=\frac{1}{2\sigma}e^{-\frac{\vert x\vert }{\sigma}}$ 。求 $\sigma$ 的矩估计。
    
    - $E(X)=\int_{-\infty}^{\infty}\frac{x}{2\sigma}e^{-\frac{\vert x\vert }{\sigma}}dx=0$ 
        
    - $E(X^{2})=\int_{-\infty}^{\infty}\frac{x^{2}}{2\sigma}e^{-\frac{\vert x\vert }{\sigma}}dx=\frac{1}{\sigma}\int_{0}^{\infty}x^{2}e^{-\frac{x}{\sigma}}dx$ 
        
    - 积分计算过程: $=-\int_{0}^{\infty}x^{2}de^{-\frac{x}{\sigma}}=\int_{0}^{\infty}2xe^{-\frac{x}{\sigma}}dx=-2\sigma\int_{0}^{\infty}xde^{-\frac{x}{\sigma}} =2\sigma\int_{0}^{\infty}e^{-\frac{x}{\sigma}}dx=2\sigma^{2}$ 
        
    - $\sigma=\sqrt{\frac{E(X^{2})}{2}}$ 
        
    - $\hat{E(X^{k})} = \frac{1}{n}\sum_{i=1}^{n}X_{i}^{k}$  
        
    - **矩估计:** $\hat{\sigma}=\sqrt{\frac{\sum_{i=1}^{n}X_{i}^{2}}{2n}}$ 
        
- **例3 (均匀分布 $U(a, b)$):** 求 $a$ 和 $b$ 的矩估计 
    
    - $E(X)=\frac{a+b}{2}$，$D(X)=\frac{1}{12}(b-a)^{2}$ 
        
    - 参数与矩的关系: $\begin{cases}a=E(X)-\sqrt{3D(X)}\\ b=E(X)+\sqrt{3D(X)}\end{cases}$ 
        
    - 用样本矩估计总体矩: $\hat{E(X)}=\overline{X}$，$\hat{D(X)}=\frac{1}{n}\sum_{i=1}^{n}(X_{i}-\overline{X})^{2}$ 
        
    - **矩估计 $\hat{a}$ 和 $\hat{b}$:**
        
        - $\hat{a}=\overline{X}-\sqrt{\frac{3}{n}\sum_{i=1}^{n}(X_{i}-\overline{X})^{2}}$ 
            
        - $\hat{b}=\overline{X}+\sqrt{\frac{3}{n}\sum_{i=1}^{n}(X_{i}-\overline{X})^{2}}$ 
            

## 极大似然估计法 

- **极大似然思想:** 如果事件 $A$ 发生了，那么未知参数 $\theta$ 的值应该是在 $\Theta$ 中使事件 $A$ 发生的概率 $P(A\vert \theta)$ 达到最大的那个值 

- **似然函数 $L(\theta)$ :**
    
    - 设 $X_1, \ldots, X_n$ 是总体 $X$ 的 i.i.d. 样本，密度（或分布律）为 $f(x;\theta)$ 
        
    - **定义:** $L(\theta)=L(x_{1}, \ldots, x_{n};\theta)=\prod_{i=1}^{n}f(x_{i};\theta)$ 称为似然函数 
        
    - **离散型:** 似然函数为样本联合分布律 $\prod_{i=1}^{n}P_{\theta}\{x_{i}\}$ 
        
    - **连续型:** 似然函数为样本联合密度 
        
- **极大似然估计 (MLE) $\hat{\theta}_{MLE}$ :**
    
    - **定义:** 若有 $\hat{\theta} \in \Theta$ 使得 $\sup_{\theta \in \Theta} L(\theta) = L(\hat{\theta})$ ，则称 $\hat{\theta}$ 为 $\theta$ 的极大似然估计，记为 $\hat{\theta}_{MLE}$ 
        
- **$\text{求MLE 的步骤}$** 
    
    1. **做似然函数:** $L(\theta)=\prod_{i=1}^{n}f(x_{i};\theta)$ 
        
    2. **做对数似然函数:** $\ln L(\theta)=\sum_{i=1}^{n}\ln f(x_{i};\theta)$ 
        
    3. **列似然方程:** 令 $\frac{d}{d\theta}[\ln L(\theta)]=0$ 
        
    4. 若方程有解，其解即为 $\hat{\theta}_{MLE}$ 
        
- **$\text{\color{blue}{例5}}$ (泊松分布 $P(\lambda)$):** 求 $\lambda$ 的 MLE。
    
    - $L(\lambda)=\prod_{i=1}^{n}P\{X_i=x_i\}=\prod_{i=1}^{n}\frac{\lambda^{x_{i}}}{x_{i}!}e^{-\lambda} = \frac{\lambda^{\sum_{i=1}^{n}x_{i}} e^{-n\lambda}}{\prod_{i=1}^{n}x_{i}!}$ 
        
    - $\ln L(\lambda) = (\sum_{i=1}^{n}x_{i})\ln \lambda - n\lambda - \sum_{i=1}^{n}\ln(x_{i}!)$ 
        
    - 似然方程: $\frac{d}{d\lambda}[\ln L(\lambda)] = \frac{\sum_{i=1}^{n}x_{i}}{\lambda} - n = 0$ 
        
    - **MLE:** $\hat{\lambda}_{MLE} = \frac{1}{n}\sum_{i=1}^{n}X_{i} = \overline{X}$ 
        
- **$\text{\color{blue}{例6}}$ (正态分布 $N(\mu, \sigma^2)$):** 求 $\mu, \sigma^2$ 的 MLE。
    
    - $\ln L(\mu, \sigma^2) = -\frac{n}{2}\ln(2\pi) - \frac{n}{2}\ln(\sigma^{2}) - \frac{1}{2\sigma^{2}}\sum_{i=1}^{n}(x_{i}-\mu)^{2}$ 
        
    - 似然方程组:
        
        - $\frac{\partial \ln L}{\partial \mu} = \frac{1}{\sigma^{2}}\sum_{i=1}^{n}(x_{i}-\mu) = 0$ 
            
        - $\frac{\partial \ln L}{\partial \sigma^{2}} = -\frac{n}{2\sigma^{2}} + \frac{1}{2\sigma^{4}}\sum_{i=1}^{n}(x_{i}-\mu)^{2} = 0$ 
            
    - **MLE:** $\hat{\mu}_{MLE} = \overline{X}$ ，$\hat{\sigma}^{2}_{MLE} = \frac{1}{n}\sum_{i=1}^{n}(X_{i}-\overline{X})^{2}$
- $\text{注1:}$ **若概率函数中含有多个未知参数，则可解方程组**：

$$\frac{\partial\bf{L}}{\partial \theta_j}\text{或}\frac{\partial \ln \bf{L}}{\partial \theta_j}=0$$

        
- **$\text{注2 (不变性):}$***若 $\hat{\theta}$ 是 $\theta$ 的 MLE， $u(\theta)$ 是 $\theta$ 的严格单调函数，则 $u(\theta)$ 的 MLE 为 $u(\hat{\theta})$ 

- $\text{注3:}$由似然方程解不出$\theta$的似然估计时，可由定义通过分析直接推求。事实上$\hat \theta_{MLE}$满足

$$\bf{L}({\hat \theta_{MLE}})=\max_{\theta \in \Theta}\bf{L}(\theta)$$

    
- **$\text{\color{blue}{例7}}$** (指数分布 $E(\lambda)$):求 $p=P\{X<a\}$ 的 MLE。
    
    - $p = P\{X<a\} = 1 - e^{-\lambda a}$ 。
        
    - $\lambda$ 的似然方程: $\frac{d}{d\lambda}[\ln L(\lambda)] = \frac{n}{\lambda} - \sum_{i=1}^{n}x_{i} = 0$。
        
    - $\hat{\lambda}_{MLE} = \frac{1}{\overline{X}}$ 。
        
    - **MLE:** $\hat{p}_{MLE} = 1 - e^{-\hat{\lambda}a} = 1 - e^{-\frac{a}{\overline{X}}}$ 
        
- **$\text{\color{blue}{例8}}$ (均匀分布 $U(0, \theta)$):** 求 $\theta$ 的 MLE。
    
    - $L(\theta) = \begin{cases} 1/\theta^n & 0 < x_i < \theta \text{ for all } i \\ 0 & \text{others} \end{cases}$ 
        
    - 似然方程 $\frac{d}{d\theta}[\ln L(\theta)] = -\frac{n}{\theta} = 0$ **无解** 
        
    - 通过分析 $L(\theta)$ 发现，为使 $L(\theta) \neq 0$，需 $\theta \in (\max(x_i), \infty)$。在此区间 $L(\theta)=1/\theta^n$ 单调递减，故当 $\theta$ 取最小值 $\max(x_i)$ 时，$L(\theta)$ 最大 
        
    - **MLE:** $\hat{\theta}_{MLE} = \max(X_i)$ 
        

## 估计量的评选标准 

### **$\text{无偏性 }$

- **定义:** 若 $\theta$ 的估计量 $\hat{\theta}$ 满足 $E(\hat{\theta}) = \theta$，则称 $\hat{\theta}$ 是 $\theta$ 的**无偏估计量** 
    
- **例1 (均匀分布 $U(0, \theta)$):** $\hat{\theta}_M = 2\overline{X}$ 和 $\hat{\theta}_{MLE} = \max(X_i)$
    
    - **$\hat{\theta}_M = 2\overline{X}$:** $E(\hat{\theta}_M) = 2E(X) = 2 \cdot \frac{\theta}{2} = \theta$。**无偏** 
        
    - **$\hat{\theta}_{MLE} = \max(X_i)$:** $E(\hat{\theta}_{MLE}) = \frac{n}{n+1}\theta \neq \theta$。**非无偏** 
        
    - **无偏性修正:** 取 $\theta^* = \frac{n+1}{n}\hat{\theta}_{MLE}$，则 $\theta^*$ 是 $\theta$ 的无偏估计 
        

### **$\text{有效性 }$ 

- **定义:** 设 $\hat{\theta}_1$ 和 $\hat{\theta}_2$ 是 $\theta$ 的两个无偏估计量。若 $D(\hat{\theta}_1) < D(\hat{\theta}_2)$，则称 $\hat{\theta}_1$ **比 $\hat{\theta}_2$ 更有效** 
    
- **例 (均匀分布 $U(0, \theta)$):** 比较 $\hat{\theta}_M = 2\overline{X}$ 和修正后的 $\hat{\theta}_{MLE}^* = \frac{n+1}{n}\hat{\theta}_{MLE}$。
    
    - $D(\hat{\theta}_M) = \frac{\theta^2}{3n}$ 
        
    - $D(\hat{\theta}_{MLE}^*) = \frac{\theta^2}{n(n+2)}$ 
        
    - 比较方差比: $\frac{D(\hat{\theta}_M)}{D(\hat{\theta}_{MLE}^*)} = \frac{n+2}{3} \ge 1$。
        
    - 结论: 修正后的极大似然估计 $\hat{\theta}_{MLE}^*$ **更有效** 
        

### $\text{一致性 }$

- **定义:** 设 $\hat{\theta}_n$ 是 $\theta$ 的估计量。若 $\hat{\theta}_n \xrightarrow{P} \theta$ (依概率收敛于 $\theta$)，则称 $\hat{\theta}_n$ 是 $\theta$ 的**一致估计量** 
    
- **例2 (二项分布 $B(m,p)$):** 讨论 $p$ 的 MLE $\hat{p}_{MLE}$ 的一致性 
    
    - $\hat{p}_{MLE} = \frac{\overline{X}}{m}$ 
        
    - 由辛钦大数定理，$\overline{X} \xrightarrow{P} E(X) = mp$ 
        
    - $\hat{p}_{MLE} = \frac{\overline{X}}{m} \xrightarrow{P} \frac{mp}{m} = p$ 
        
    - 结论: $\hat{p}_{MLE}$ 是**一致估计量** 
        

### 附加例题 (最优无偏估计)

- **问题:** $\overline{X}_1, \overline{X}_2$ 为来自总体 $X$ 的两个样本均值，$a>0, b>0, a+b=1$。证明 $\hat{\mu} = a\overline{X}_1 + b\overline{X}_2$ 是 $E(X)$ 的无偏估计，并求使 $\hat{\mu}$ 最有效的 $a, b$ 
    
- **无偏性:** $E(a\overline{X}_1 + b\overline{X}_2) = aE(\overline{X}_1) + bE(\overline{X}_2) = (a+b)E(X) = E(X)$ 
    
- **有效性 (最小化方差):** 设 $D(X)=\sigma^2$。
    
    - $D(\hat{\mu}) = a^2D(\overline{X}_1) + b^2D(\overline{X}_2) = \frac{a^2\sigma^2}{n_1} + \frac{b^2\sigma^2}{n_2}$ 
        
    - 令 $h(a) = \sigma^2 [\frac{a^2}{n_1} + \frac{(1-a)^2}{n_2}]$
        
    - 令 $\frac{d}{da}h(a) = 0$，解得 $a = \frac{n_1}{n_1 + n_2}$ 
        
    - **最有效的 $a, b$:** $a = \frac{n_1}{n_1 + n_2}$，$b = \frac{n_2}{n_1 + n_2}$ 
        

## 区间估计 

### 概念 

- **定义:** 设总体 $X$ 的分布函数 $F(x;\theta)$ 含有未知参数 $\theta$。对于给定置信度 $1-\alpha$ ($0 < \alpha < 1$)，若由样本确定的两个统计量 $\underline{\theta}, \overline{\theta}$ 使 $P\{\underline{\theta} < \theta < \overline{\theta}\} = 1-\alpha$ ，则称随机区间 $(\underline{\theta}, \overline{\theta})$ 为 $\theta$ 的**置信度为 $1-\alpha$ 的置信区间** 
    
    - $\underline{\theta}$ 和 $\overline{\theta}$ 分别称为置信下限和置信上限 
        

### 正态总体的抽样分布定理 (枢轴量) 

1. **$\frac{\overline{X} - \mu}{\sigma/\sqrt{n}} \sim N(0, 1)$** ( $\sigma^2$ 已知) 
    
2. **$\chi^2 = \frac{(n-1)S^2}{\sigma^2} \sim \chi^2(n-1)$** ( $\overline{X}$ 和 $S^2$ 相互独立) 
    
3. **$T = \frac{\overline{X} - \mu}{S/\sqrt{n}} \sim t(n-1)$** ( $\sigma^2$ 未知) 
    
4. **两个样本 $(\sigma_1^2 = \sigma_2^2 = \sigma^2$ 假定):** $T = \frac{(\overline{X}-\overline{Y}) - (\mu_1 - \mu_2)}{S_w \sqrt{1/n_1 + 1/n_2}} \sim t(n_1+n_2-2)$，其中 $S_w$ 是混合样本方差的方根 
    
5. **方差比:** $F = \frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2} \sim F(n_1-1, n_2-1)$ 
    

### 正态总体参数的区间估计 

| **待估参数**                  | **条件**                       | **枢轴量 (Pivot Quantity)**                                                                                 | **置信区间 (θ​,θ)**                                                                                                           | **示例计算 (例1)**                                                                                                                      |
| ------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| $\mu$                     | $\sigma^2$ 已知                | $U = \frac{\overline{X} - \mu}{\sigma/\sqrt{n}} \sim N(0, 1)$                                            | $(\overline{X} - U_{\alpha/2}\frac{\sigma}{\sqrt{n}}, \overline{X} + U_{\alpha/2}\frac{\sigma}{\sqrt{n}})$                | $n=16, \overline{x}=2.125, \sigma=0.01, \alpha=0.1$. $U_{0.05}=1.645$. $(2.1209, 2.1291)$ 99                                       |
| $\mu$                     | $\sigma^2$ 未知                | $T = \frac{\overline{X} - \mu}{S/\sqrt{n}} \sim t(n-1)$                                                  | $(\overline{X} - t_{\alpha/2}(n-1)\frac{S}{\sqrt{n}}, \overline{X} + t_{\alpha/2}(n-1)\frac{S}{\sqrt{n}})$                | $n=16, \overline{x}=2.125, s=0.017, \alpha=0.1$. $t_{0.05}(15)=1.7531$. $(2.117, 2.132)$ 102                                       |
| $\sigma^2$                | $\mu$ 未知                     | $\eta = \frac{(n-1)S^2}{\sigma^2} \sim \chi^2(n-1)$                                                      | $(\frac{(n-1)S^2}{\chi^2_{\alpha/2}(n-1)}, \frac{(n-1)S^2}{\chi^2_{1-\alpha/2}(n-1)})$                                    | $n=16, s^2=0.00029, \alpha=0.05$. $\chi^2_{0.025}(15)=27.488$, $\chi^2_{0.975}(15)=6.262$. **$\sigma$ 的区间**：$(0.0127, 0.0265)$ 105 |
| $\mu_1 - \mu_2$           | $\sigma_1^2 = \sigma_2^2$ 未知 | $T = \frac{(\overline{X} - \overline{Y}) - (\mu_1 - \mu_2)}{S_w \sqrt{1/n_1 + 1/n_2}} \sim t(n_1+n_2-2)$ | $(\overline{X} - \overline{Y}) \pm t_{\alpha/2}(n_1+n_2-2) S_w \sqrt{\frac{1}{n_1} + \frac{1}{n_2}}$                      | -                                                                                                                                  |
| $\sigma_1^2 / \sigma_2^2$ | $\mu_1, \mu_2$ 未知            | $F = \frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2} \sim F(n_1-1, n_2-1)$                                     | $(\frac{S_1^2}{S_2^2} \frac{1}{F_{\alpha/2}(n_1-1, n_2-1)}, \frac{S_1^2}{S_2^2} \frac{1}{F_{1-\alpha/2}(n_1-1, n_2-1)})$  |                                                                                                                                    |
