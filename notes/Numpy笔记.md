# NumPy 笔记

> 对应：第 1 周 · 数据基础（NumPy） ｜ 2026-10-22 ~ 11-04（11-09 更新）

---

Arrange array reshape

矩阵转置：

矩阵名字.T

\*注意不能对矩阵转置

数组翻转

两种反转方法：上下翻转和左右翻转

向量翻转：.flipud

矩阵翻转：.filpud/filplr

数组重塑

.reshape

数组拼接

1.  向量拼接：.concatenate

2.  矩阵拼接：

<!-- -->

1.  按行拼接：

    <img src="img-numpy/media/image1.png" style="width:2.90694in;height:0.83194in" /> <img src="img-numpy/media/image2.png" style="width:1.23611in;height:1.05556in" />

2.  按列拼接：

    <img src="img-numpy/media/image3.png" style="width:2.34722in;height:0.68194in" /> <img src="img-numpy/media/image4.png" style="width:2.43056in;height:0.72569in" />

    数组的分裂

<!-- -->

1.  向量的分裂

2.  矩阵的分裂

<!-- -->

1.  按行分裂

    <img src="img-numpy/media/image5.png" style="width:1.89583in;height:0.44444in" />

2.  按列分裂

    <img src="img-numpy/media/image6.png" style="width:2.26319in;height:0.46181in" />

    数组的运算

    加减乘除同上

    \*\*n（n次方） //（取整） %（取余）

    还可以使用逻辑运算符（== ！=）

    赋予其一个变量 例如：a = X==Y 打印出来即为布尔值

    数组间的运算同上

    广播

    向量与矩阵相互运算 向量会变为行矩阵

    行矩阵/列矩阵会被改为适配另一个矩阵的形式 此称为广播

    例：

    <img src="img-numpy/media/image7.png" style="width:1.50833in;height:0.45278in" /> <img src="img-numpy/media/image8.png" style="width:0.97014in;height:0.64306in" />

数组的函数

向量的乘积.dot（）

全是线代。。。

数学函数.abs( )绝对值函数

.sin/.cos/.tan（三角函数）

e的x次方：.exp

Log使用换底公式除法运算

聚合函数

最大/最小值函数：max/min（加axis参数可按行/列计算 不加则算整体最大值）

求和函数：sum

均值函数：.mean

标准差函数：.std

布尔型数组

创建布尔型数组（比较）

同维数组比较或与常量比较

有关True的函数：.sum/.any/.all

sum统计True的数量 any用来查看有没有True的元素 all检查是否全部True

布尔型数组作为掩码

筛选：arr\[条件（例如：arr&gt;4）\]退化为向量

.where寻找需要的元素位置

数组与张量

数组转化为张量：torch.tensor(数组名)

张量转化为数组：np.array(张量名)

连结：concatanate( \[向量，向量\] , axis=0/1(行向量/列向量))

几个矩阵叠加在一起可以理解为张量 多了一个轴（矩阵形状一定要一样）

节省内存

Z = np.zeros\_like(Y) \# 创建一个和Y形状一样、全是0的张量Z

print('id(Z):', id(Z)) \# 打印Z这个对象的内存编号

Z\[:\] = X + Y \# 把X+Y的结果，放进Z原来的内存里（原地覆盖）

print('id(Z):', id(Z)) \# 再打印，id和上面一模一样！

转换为其他python对象

可以使用item( ),float,int等类型转换
