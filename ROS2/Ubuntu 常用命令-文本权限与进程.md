# Ubuntu 常用命令：文本权限与进程

## grep 命令

强大的文本搜索命令，全称 Global Regular Expression Print，即全局正则表达式搜索。它在文件或多个文件中搜索字符串模板，结果输出到标准输出，不改变原文件内容。

**grep 常用参数**

```bash
grep -c    计算符合样式的列数
grep -i    忽略大小写
grep -l    只列出文件名
grep -n    显示匹配行所在行号
grep -R    递归查找文件夹
```

实例：

**查找指定进程**

```bash
ps -ef | grep svn
```

**从文件夹递归查找以 grep 开头的行, 只列出文件**

```bash
grep -lR '^grep' /tmp
```

**显示包含 ed 或 at 内容的行为**

```bash
grep -E 'ed|at' test.txt
```

## wc 命令

wc(word count) 用于统计指定文件中字节数、单词数、行数，并将统计结果输出。

**wc 常用参数**

```bash
wc -c    统计字节数
wc -l    统计行数
wc -m    统计字符数
wc -w    统计单词数
```

实例：

**统计文件的 行数 单词数 字节数**

```bash
wc text.txt
```

**统计输出的行数**

```bash
cat test.txt | wc -l
```

## chmod 命令

用于改变 Linux 系统文件或目录的访问权限。权限用 r(读)、w(写)、x(执行)表示，对应数字为 4、2、1。每一文件有三组权限：属主、属组、其他用户。

**chmod 常用参数**

```bash
chmod -R    递归处理目录及子目录下所有文件
```

权限代号：

**权限数字对应**

```bash
r = 4    读
w = 2    写
x = 1    执行
```

实例：

**增加文件 t.log 所有用户的可执行权限**

```bash
chmod a+x t.log
```

**属主读写执行(7), 属组读执行(5), 其他执行(1)**

```bash
chmod 751 t.log
```

**将 test 目录及子目录所有文件添加可读权限**

```bash
chmod u+r,g+r,o+r -R text/
```

## tar 命令

用来打包和解压文件。注意 tar 本身只打包不压缩，压缩与解压是调用其他工具（如 gzip、bzip2）完成的。常用的两招是 *tar zcvf* 打包压缩、*tar zxvf* 解压。

**tar 常用参数**

```bash
-c    建立新的压缩文件
-x    从压缩包中解压
-t    显示压缩文件中的内容
-z    支持 gzip 压缩
-j    支持 bzip2 压缩
-v    显示操作过程
-f    指定压缩文件名
```

实例：

**将文件全部打包成 tar 包**

```bash
tar -cvf log.tar log1.log log2.log
```

**将 /etc 下所有文件和目录打包并用 gz 压缩**

```bash
tar -zcvf /tmp/etc.tar.gz /etc
```

**查看刚打包的文件内容(必须加 z, 因为用 gzip 压缩)**

```bash
tar -ztvf /tmp/etc.tar.gz
```

**解压**

```bash
tar -zxvf filename.tar.gz
```

## ps 命令

ps(process status) 用来查看当前运行的进程状态，一次性查看。如需动态连续结果，用 *top*。

**ps 常用参数**

```bash
ps -A    显示所有进程
ps -e    显示所有进程(等同 -A)
ps -f    显示进程间的关系(完整格式)
ps -aux  显示所有包含其他信息的进程
```

实例：

**显示当前所有进程环境变量及进程间关系**

```bash
ps -ef
```

**与 grep 联用查找某进程**

```bash
ps -aux | grep apache
```

## top 命令

动态显示当前系统正在执行的进程信息，包括进程 ID、CPU 占用率、内存占用率等。交互界面里按 *q* 退出。

**top 常用参数**

```bash
top -p <进程号>    指定进程显示
top -n <次数>      循环显示次数
```

**top 交互命令**

```bash
P    按 CPU 使用率排序
M    按内存使用率排序
q    退出
```

## free 命令

显示系统内存使用情况，包括物理内存、交换区内存(swap)和内核缓冲区内存。

**free 常用参数**

```bash
free -m    以 MB 为单位显示
free -g    以 GB 为单位显示
free -s <秒>  每隔多少秒持续显示
```

实例：

**显示内存使用情况**

```bash
free -m
```

## df 命令

显示磁盘空间使用情况，获取硬盘已占用多少、还剩多少等信息。

**df 常用参数**

```bash
df -h    以易读方式显示
df -T    列出文件系统类型
df -a    全部文件系统列表
```

实例：

**以易读方式列出所有文件系统及其类型**

```bash
df -haT
```

## du 命令

查看文件和目录的磁盘使用空间，与 df 不同，du 针对的是具体文件或目录。

**du 常用参数**

```bash
du -h    以易读方式显示文件大小
du -s    仅显示总计
du -a    显示目录中所有文件大小
```

实例：

**以易读方式显示文件夹内及子文件夹大小**

```bash
du -h scf/
```

**显示几个文件各自占用空间并统计总和**

```bash
du -hc test/ scf/
```

## ln 命令

为文件在另一个位置建立一个链接。软链接(*ln -s*)类似于 Windows 里的快捷方式，可跨文件系统、可用于目录；硬链接(*ln*)以文件副本形式存在，但同一文件系统内才可创建，且不占用实际空间。无论改哪一处，其余链接都会同步变化。

**ln 常用参数**

```bash
ln -s    软链接(符号链接)
ln -v    显示详细处理过程
```

实例：

**给文件创建软链接并显示操作信息**

```bash
ln -sv source.log link.log
```

## date 与 cal 命令

date 显示或设定系统的日期与时间；cal 显示公历（阳历）日历。

**date 常用格式**

```bash
%Y    年份(四位数)
%m    月份(01-12)
%d    日期(01-31)
%H    小时(00-23)
%M    分钟(00-59)
```

实例：

**显示指定日期格式**

```bash
date +%Y%m%d
```

**显示下一天**

```bash
date -d "+1 day" +%Y%m%d
```

**显示 2013 年每个月的日历**

```bash
cal -y 2013
```

**将星期一作为第一列, 显示前中后三月**

```bash
cal -3m
```

## kill 命令

发送指定信号给相应进程。默认发送 SIGTERM(15) 终止指定进程，若无法终止可用 *-KILL*（发送 SIGKILL，9）强制结束进程。用 ps 或 jobs 查看进程号；root 用户可影响所有用户的进程，普通用户只能影响自己。

**kill 常用参数**

```bash
kill -l           列出全部信号名称
kill -9 <PID>     强制结束进程
```

实例：

**先查找进程 pro1, 然后强制杀掉**

```bash
kill -9 $(ps -ef | grep pro1)
```

## 用自然语言来使用Unbuntu

AI时代，古法编程的艺术仍在流传，但Vibe Coding已经成为主流。我选择在保留自己读写代码能力的同时，先装一个npm,再装上opencode，然后美美使用中文使用Unbuntu（doge）

![[Unbuntu中的opencode.png]]
*图：Unbuntu中的opencode*
