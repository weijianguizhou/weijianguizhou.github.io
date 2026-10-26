---
title: LaTeX 入门指南
description: 写作与排版 · 从装 TeX Live、配 VSCode 到公式、表格与交叉引用的学习记录
---

# LaTeX 入门指南

> 谨以此篇献给小顾同学。也留给以后忘了命令怎么写的自己。

第一次认真读别人用 LaTeX 排出来的文档，脑子里冒出来的念头是：排版怎么可以这么好看。后来读到 Christos Papadimitriou 的一句话，才发现这不只是我一个人的错觉：

> Every time I read a LaTeX document, I think, wow, this must be correct!
>
> ——Christos Papadimitriou

于是就有了后面这一堆折腾。下面按我自己的学习顺序写：先讲为什么用，再讲怎么装、怎么配，最后是真正开始写文档以后用得最多的那部分语法。

## 一、我为什么开始用 LaTeX

LaTeX 是在 TeX 基础上封装的排版系统，由 Leslie Lamport 在 20 世纪 80 年代开发。它和 Word 不是一类东西：Word 是「所见即所得」的字处理软件，LaTeX 是标记语言——你写代码描述文档的结构，再让编译器（pdfLaTeX 或 XeLaTeX）把它变成 PDF。

缺点摆在明面上：它像编程，不直观，第一次用会觉得「我到底在写什么」。但 Word 的排版效果和公式编辑器，确实比不过它在复杂数学公式和长文档上的表现。后来 Markdown 这类更轻的标记语言出现了，日常记笔记确实更顺手；可一旦要交给老师、要打印、要排版几十页的报告，我还是会打开 LaTeX。

现在回头总结，我留下的理由就三条：

- **专业**：公式和版式是出版级的水准，不用手调对齐；
- **省事**：目录、参考文献、公式编号、交叉引用全部自动；
- **稳定**：几百页的文档也不会突然卡住或者格式错乱。

::: tip 一句实话
如果不是为了排版，只是随手记点东西，Markdown 比 LaTeX 舒服得多。这个站点的文章就全是 Markdown 写的——工具要挑合适的，不必硬上。
:::

我第一次接触 LaTeX 其实很被动：物理竞赛的时候，老师直接发来一个 CTeX 的安装包。当时照着装完就用了，后来才知道 CTeX 早已停止更新，安装包里塞了不少过时的宏包，容易出兼容问题。所以下面直接从 TeX Live 重新开始。

## 二、装环境：TeX Live、清华源，和等了一晚上的安装

### 发行版和下载

主流的 LaTeX 发行版是 **TeX Live** 和 **MiKTeX**，任选其一。我选 TeX Live，因为它的宏包最全，装一次能用很久。

下载地址我用的是清华镜像：

```text
https://mirrors.tuna.tsinghua.edu.cn/CTAN/systems/texlive/Images/
```

进去直接下 `texlive.iso` 就行。

说起来有点丢人：我第一次是从官网下的，整整下了 20 个小时。后来同学告诉我，走清华源半个小时就完事。所以现在有人问我装 LaTeX，我第一句都是「先换清华源」。

### 安装步骤

1. 用解压软件把 `.iso` 解压到一个文件夹（我用的是 360 压缩，能用就行）；
2. 右键 **以管理员身份运行** 解压目录里的 `install-tl-windows.bat`；
3. 按提示一路点下去，等它装完。

如果图形界面一直卡在加载界面——我就卡过——可以改用纯文本模式安装。方法是开一个命令行：

```text
# 1. 进入解压后的目录（假设在 G 盘）
cd /d G:\Texlive2025

# 2. 以纯文本模式启动安装程序
install-tl-windows.bat --no-gui
```

启动之后按提示操作：

- 输入 `I`：按默认路径直接安装；
- 输入 `D`：先改安装路径。

进入路径设置后，输入 `1`，会看到 `New value for TEXDIR [C:/texlive/2025]:`，在冒号后面填自己的路径（比如 `D:/Software/texlive/2025`），输入 `R` 返回，最后输入 `I` 开始安装。

::: remark 安装时的两个提醒
安装包有好几个 G，装之前先确认目标盘空间够、也留出足够时间；如果安装时改了 `TEXDIR`，装完记得把它的 `bin` 目录加进系统环境变量，否则命令行里找不到 `xelatex`、`pdflatex`。装好后敲一句 `xelatex --version`，能看到版本号就说明没问题了。
:::

## 三、选编译器：中文就用 XeLaTeX

装好发行版之后，第一个要做的选择是用哪个编译器。

| 编译器 | 命令 | 特点 |
| --- | --- | --- |
| pdfLaTeX | `pdflatex` | 最经典、速度最快；对 Unicode 支持是打补丁式的，处理中文要额外配 CJK 宏包，适合纯英文 |
| XeLaTeX | `xelatex` | 原生支持 Unicode，能直接调用系统里的字体，配 `ctex` 宏包就能自由换中文字体，**中文首选** |
| LuaLaTeX | `lualatex` | 内嵌 Lua，排版能力最强，但编译偏慢，目前还在过渡阶段 |

我这份笔记里的文档用了中文和系统字体，所以必须用 `xelatex` 编译。对应到 VSCode 里，就是把它放在编译配方（recipes）的第一个。

## 四、编辑器：VSCode 加 LaTeX Workshop

LaTeX 本身只负责编译，写代码还得有个顺手的编辑器。我用的是 VSCode：先装中文语言包，再装 **LaTeX Workshop** 插件——语法高亮、自动补全、错误检查、PDF 预览它都有。

装完插件要告诉它编译命令和配方。打开 `settings.json`，把下面这段放进去（只保留了我最常用的几项）：

```json
{
  "latex-workshop.latex.recipes": [
    { "name": "xelatex", "tools": ["xelatex"] },
    { "name": "xelatex -> bibtex -> xelatex*2", "tools": ["xelatex", "bibtex", "xelatex", "xelatex"] }
  ],
  "latex-workshop.latex.tools": [
    {
      "name": "xelatex",
      "command": "xelatex",
      "args": ["-shell-escape", "-synctex=1", "-interaction=nonstopmode", "-file-line-error", "%DOCFILE%"]
    },
    { "name": "bibtex", "command": "bibtex", "args": ["%DOCFILE%"] }
  ],
  "latex-workshop.latex.autoBuild.run": "onSave",
  "latex-workshop.view.pdf.viewer": "tab",
  "latex-workshop.view.pdf.internal.synctex.keybinding": "double-click"
}
```

- `command` 要按自己装的发行版改：TeX Live 一般就是 `xelatex`；MiKTeX 可能要写完整路径；
- 配好之后按 `Ctrl + Alt + B` 编译，PDF 会在 VSCode 的标签页里打开；
- 双击 PDF 里的内容，可以跳回对应的源码行（反向搜索），查错特别方便；
- 我把「保存时自动编译」也开了，写一段存一次，比手动按快捷键省心。

不想折腾配置的话，也可以直接用 **TeXStudio**：它自带编译器和预览，装完就能写。只是我个人更习惯 VSCode 的插件生态。

## 五、Hello, 小顾：第一份文档

学编程从 Hello World 开始，学 LaTeX 也差不多。先看结构：一份 LaTeX 文档分两块——

- **导言区（preamble）**：`\documentclass` 和 `\begin{document}` 之间的部分，用来加载宏包、设置全局格式、写标题作者；
- **正文区（body）**：`document` 环境里面，真正会印到 PDF 上的内容。

每个文档都以 `\documentclass` 开头，声明文档类型：

| 文档类 | 适用场景 |
| --- | --- |
| `article` / `ctexart` | 论文、作业，轻量，没有「章」的概念 |
| `report` / `ctexrep` | 较长的实验报告、本科毕业论文，支持「章」 |
| `book` / `ctexbook` | 出版级、默认双面打印，会自动处理奇偶页页码 |
| `beamer` | PDF 幻灯片，学术报告用 |

常用的选项有：`10pt` / `11pt` / `12pt` 设置字号，`a4paper` 设置纸张，`twocolumn` 双栏，`draft` 开启调试、跳过图片渲染。例如：

```latex
\documentclass[12pt, a4paper]{article}
```

宏包就是 LaTeX 的扩展模块，需要什么加什么：

```latex
\usepackage{graphicx}   % 插图
\usepackage{amsmath}    % 数学公式
\usepackage{ctex}       % 中文支持
```

也可以在这里做全局设置，比如首行缩进两个字符、段落之间留 1em：

```latex
\setlength{\parindent}{2em}
\setlength{\parskip}{1em}
```

小顾的第一份文档，保存成 `hello_gu.tex`，用 XeLaTeX 编译：

```latex
% ===== 1. 导言区 =====
\documentclass{ctexart} % 支持中文的文档类

% ===== 2. 正文区 =====
\begin{document}

Hello, Gu!
你好，小顾！

\end{document}
```

`ctexart` 是专门为中文优化过的文档类；`document` 环境是分界线，只有夹在 `\begin{document}` 和 `\end{document}` 之间的内容才会被打印出来。

## 六、基础排版：标题、正文和字体

### 标题分级

LaTeX 用命令表示层级：`\chapter{}`、`\section{}`、`\subsection{}`、`\subsubsection{}`。`article` 里没有「章」，`report` / `book` 里 `\section` 才会和 `\chapter` 配合使用。不想让标题带编号（前言、致谢、附录常用），在命令后面加个星号：

```latex
\section*{前言}
```

### 换行、分段与间距

写正文时最容易困惑的是「回车到底算不算换行」：

- 源码里连续多个空格，编译后只算一个；
- 行末按一次回车，也只当空格；
- **空一行**才是新段落，也可以用 `\par`；
- 某段不想首行缩进，段首写 `\noindent`；想强制缩进，用 `\indent`。

需要手动干预布局时：

- `\\` 或 `\newline` 强制换行（注意换行后的新行不会自动缩进）；
- `\clearpage` / `\newpage` 强制换页，章节结束时推荐用前者，它会先把还没排完的图片和表格处理掉；
- `\smallskip`、`\medskip`、`\bigskip` 是预设的垂直间距，`\vspace{10pt}` 可以精确指定。

行距一般在导言区用 `setspace` 宏包统一调：

```latex
\usepackage{setspace}
\onehalfspacing      % 1.5 倍行距
\setstretch{1.25}    % 或者自己定倍数
```

常用的长度单位：`pt`（点）、`cm` / `mm`、`em`（当前字体的 M 宽，适合水平间距）、`ex`（当前字体的 x 高，适合垂直间距）。

### 特殊字符

有些字符在 LaTeX 里有特殊含义，直接敲会报错，得转义：

| 字符 | 输入方式 | 作用 |
| --- | --- | --- |
| `#` | `\#` | 参数引导符 |
| `$` | `\$` | 进入数学模式 |
| `%` | `\%` | 注释 |
| `&` | `\&` | 表格列分隔 |
| `_` | `\_` | 数学下标 |
| `{` `}` | `\{` `\}` | 参数界定 |
| `~` | `\textasciitilde` | 不换行空格 |
| `^` | `\textasciicircum` | 上标 |
| `\` | `\textbackslash` | 命令引导符 |

`%` 还能当注释用；要注释一大段，可以加载 `verbatim` 宏包用 `comment` 环境。

### 字体、字号与颜色

- 粗体 `\textbf{}`、斜体 `\textit{}`（中文里通常显示为楷体）、等宽 `\texttt{}`（代码和路径用它）、下划线 `\uline{}`（需要 `ulem` 宏包）；
- 字号从 `\tiny`、`\small`、`\normalsize` 到 `\large`、`\huge`；用 `ctex` 宏包时还可以直接写中文号数：`\zihao{4}` 是四号，`\zihao{-4}` 是小四；
- 颜色用 `xcolor` 宏包的 `\textcolor{red}{...}`，组合效果可以嵌套，比如 `\textbf{\textit{\textcolor{purple}{...}}}`。

想要自己的标题样式，可以用 `titlesec` 宏包，比如把一级标题改成红色粗体、编号后带冒号：

```latex
\usepackage{titlesec}
\usepackage{xcolor}

\titleformat{\section}
  {\color{red}\bfseries\Large}  % 字体、字号、颜色
  {\thesection:\quad}           % 编号格式
  {0pt}                         % 编号与标题的间距
  {}                            % 标题前的附加代码
```

## 七、数学公式：LaTeX 的主场

到这一节才算是 LaTeX 真正的主场。公式分两类：

- **行内公式**：写在正文里的短表达式，用一对 `$...$` 包起来，或者写 `\(...\)`。比如设 $x_i$ 表示第 $i$ 个数据点，$y^2$ 表示 $y$ 的平方。
- **块级公式**：单独占一行、居中显示，用 `\[...\]` 或 `equation` 环境。写材料力学报告时，我经常要这样排：

$$
\sigma = \frac{F}{A}, \qquad \varepsilon = \frac{\Delta l}{l}
$$

`equation` 环境会自动编号，还能用 `\label` 定义标签、`\eqref` 引用：

```latex
\begin{equation}
\label{eq:quadratic}
ax^2+bx+c=0
\end{equation}
```

多个相关公式要对齐等号，用 `amsmath` 宏包提供的 `align` 环境：

```latex
\begin{equation}
\begin{aligned}
(a+b)^2 &= a^2 + 2ab + b^2 \\
(a-b)^2 &= a^2 - 2ab + b^2
\end{aligned}
\end{equation}
```

矩阵也常用。方括号矩阵用 `bmatrix`，圆括号用 `pmatrix`，行列式那种双竖线用 `vmatrix`：

```latex
\begin{equation}
A = \begin{bmatrix}
  a_{11} & a_{12} \\
  a_{21} & a_{22}
\end{bmatrix}
\end{equation}
```

分数 `\frac{分子}{分母}`、根号 `\sqrt{x}`、上下标 `x^2` / `x_1`，这些用几次就记住了。连分数用 `\cfrac`，嵌套起来比普通 `\frac` 好看。

::: tip 写公式的小抄
实在记不住符号，我现在有两个去处：一是 [latexlive](https://www.latexlive.com/home)，手写或者点选符号，能直接把公式转成 LaTeX 代码；二是 VSCode 侧边栏里 LaTeX Workshop 自带的符号表，照着点就行。
:::

## 八、表格、图片与浮动体

表格先加载 `booktabs` 宏包，用三线表（`\toprule` / `\midrule` / `\bottomrule`）比默认的网格线专业得多：

```latex
\begin{table}[H]
  \centering
  \caption{三线表样式演示}
  \begin{tabular}{ccc}
    \toprule
    \textbf{实验组} & \textbf{参数 A} & \textbf{结果 B} \\
    \midrule
    Control & 1.00 & 0.85 \\
    Group 1 & 2.50 & 1.12 \\
    \bottomrule
  \end{tabular}
\end{table}
```

表格内容多的时候，用 [latex-tables.com](https://www.latex-tables.com/) 把 Excel 或网页表格转成 LaTeX 代码，比手敲省事。

插图用 `\includegraphics`，我习惯把所有图片放在 `Figure/` 文件夹里统一管理：

```latex
\begin{figure}[H]
  \centering
  \includegraphics[width=0.6\textwidth]{Figure/1.jpg}
  \caption{这是第一张独立图片}
  \label{fig:first}
\end{figure}
```

`figure` 和 `table` 是「浮动体」：位置参数 `[h]` 表示尽量放在当前处，`[H]` 表示强制钉在这里（需要 `float` 宏包）。图片多、编译慢的时候，可以在 `\documentclass` 里临时加 `draft` 选项跳过图片渲染。

## 九、自动化：交叉引用、文献与目录

LaTeX 最让人省心的，是「编号全部自动」这件事。

**交叉引用**：给图、表、公式、章节加一个 `\label`，正文里用 `\ref` 引用。以后增删内容，编号会自动重排，引用不会失效。

```latex
如图 \ref{fig:first} 所示，系统的核心组成部分是……
```

**参考文献**：用 BibTeX 管理。先在 `.bib` 文件里存文献条目：

```bibtex
@article{Einstein1905,
  author  = "Albert Einstein",
  title   = "Does the Inertia of a Body Depend upon Its Energy-Content?",
  journal = "Annalen der Physik",
  year    = "1905"
}
```

正文里 `\cite{Einstein1905}`，文末指定样式并引入数据库，参考文献列表就自动生成了。

**目录**：正确使用 `\chapter`、`\section` 这些命令之后，`\tableofcontents` 会自动提取标题、生成带页码的目录；`\listoffigures`、`\listoftables` 分别生成图表清单。

**超链接**：加载 `hyperref` 宏包，目录和交叉引用都会变成可点击的链接，外部网址用 `\href{链接}{显示文字}`，文档内部跳转用 `\hypertarget` 和 `\hyperlink` 自己设锚点。

```latex
\usepackage[colorlinks=true, linkcolor=blue, urlcolor=blue, citecolor=blue]{hyperref}
```

::: warning 记得编译两次
LaTeX 要先扫描标签、再把编号填回去。凡是用了交叉引用、目录、参考文献，都要**编译两次**结果才完整——第一次生成的页码和编号还可能是旧的。
:::

**脚注**：`\footnote{这里写注释}`，编号和页底的位置 LaTeX 都会自动处理。以前在 Word 里插脚注调格式调到烦，现在一行命令解决。

## 十、还没写完的两章：Beamer 与 TikZ

原稿的文件夹里还留着两章的提纲：一章讲 **Beamer 做幻灯片**（frame 结构、主题、`\pause` 与 overlay 动效），一章讲 **TikZ 画矢量图**（坐标系、路径、node 画流程图、和 PGFPlots 联动画函数图）。这两章目前只有标题，还没有正文——我还没真正用它们做过东西，硬写只能是抄文档。

等哪天要用 Beamer 做组会汇报、或者用 TikZ 重画一张受力图，再回来把这两章补上。先在这里立个旗。

## 十一、用到现在的几条习惯

- **先找模板，再改内容**。排版格式花的时间，不如拿去改论文本身；学校有模板就用学校的。
- **编译不过，先看第一个报错**。LaTeX 的报错会连着一串，但真正的原因通常只在第一条。
- **给源文件留个备份**。`.tex` 是纯文本，丢进 Git 里管，比压缩包靠谱。
- **公式先在纸上写清楚**。LaTeX 只负责排得好看，不负责帮我想明白。

写到这里才发现，从「被老师塞了一个 CTeX 安装包」到现在，已经过去挺久了。这篇就当是给自己的速查表——下次忘了某个命令怎么打，直接翻到这里。
