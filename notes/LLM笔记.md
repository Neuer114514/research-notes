# LLM 笔记（Python 语法检索表 + 线性神经网络）

> 对应：动手学深度学习 · 代码配套 ｜ 2026-11-09 ~ 11-10（更新）
> 来源：课题组任务/LLM笔记.docx

---

PYTHON语法检索表

|     |                                       |                                                    |
|-----|---------------------------------------|----------------------------------------------------|
| \#  | 语法点                                | 在你贴的代码里                                     |
| 1   | import / from x import y as z         | from mxnet import autograd, np, npx                |
| 2   | def 定义函数、参数                    | def data\_iter(batch\_size, features, labels)      |
| 3   | return 返回多个值（元组）             | return X, y.reshape(-1, 1)                         |
| 4   | yield** 生成器**                      | data\_iter 里那个 yield                            |
| 5   | for + range(起点, 终点, 步长)         | range(0, num\_examples, batch\_size)               |
| 6   | 切片 + min()                          | indices\[i : min(i+batch\_size, n)\]               |
| 7   | 列表                                  | list(range(num\_examples))                         |
| 8   | if / break                            | 演示循环里那个 break                               |
| 9   | with** 上下文管理器**                 | with torch.no\_grad():、with autograd.record():    |
| 10  | f-string 格式化                       | f'epoch {epoch + 1}, loss {...:f}'                 |
| 11  | 函数可以当参数、列表里装张量          | sgd(\[w, b\], lr, batch\_size)                     |
| 12  | 方法调用 / 属性（面向对象的最小知识） | .shape .backward() .grad .zero\_() net\[0\].weight |
| 13  | 变量作用域（循环变量泄漏）            | 最后那个 X 是最后一批                              |
| 14  | 装饰器 / 注释标记                     | \#@save（**其实只是注释，不执行**）                |

线性神经网络

1.从零开始实现

（1）人造数据集

建立模型：

y=Xw+b+e

例如：

**def** synthetic\_data(w, b, num\_examples): *\#@save*

*"""生成y=Xw+b+噪声"""*

X = np.random.normal(0, 1, (num\_examples, len(w)))

y = np.dot(X, w) + b

y += np.random.normal(0, 0.01, y.shape)

**return** X, y.reshape((-1, 1))

true\_w = np.array(\[2, -3.4\])

true\_b = 4.2

features, labels = synthetic\_data(true\_w, true\_b, 1000)

print('features:', features\[0\],'**\\n**label:', labels\[0\])*\#里面的数字用于取样本*

2.  小批量读取数据

    在下面的代码中，我们定义一个data\_iter函数， 该函数接收批量大小、特征矩阵和标签向量作为输入，生成大小为batch\_size的小批量。 每个小批量包含一组特征和标签

**def** data\_iter(batch\_size, features, labels):

num\_examples = len(features)

indices = list(range(num\_examples))

*\# 这些样本是随机读取的，没有特定的顺序*

random.shuffle(indices)

**for** i **in** range(0, num\_examples, batch\_size):

batch\_indices = np.array(

indices\[i: min(i + batch\_size, num\_examples)\])

**yield** features\[batch\_indices\], labels\[batch\_indices\]

**别和 **true\_w** / **true\_b** 混淆：**

|                                 |                                      |                            |
|---------------------------------|--------------------------------------|----------------------------|
|                                 | 是什么                               | 训练中是否可见             |
| true\_w=\[2,-3.4\], true\_b=4.2 | 生成数据用的**真实答案**             | 不可见，只在最后对答案     |
| w, b                            | 模型**待猜的未知数**，从随机小值起步 | 就是这四个数字在被不断更新 |

\*前两节负责准备数据 这一节负责准备参数

3.4 softmax回归

分类上使用热度编码 即向量中只有一个值被设置为1，其余值均为0

\*为什么不用0，1，2区分？

模型会误认为它们之间有大小远近关系 使用向量会使得它们并列

计算条件概率使用仿射函数（类似线性代数的方程组）

特征(x) 权重(w) 注：此处权重代表不了其重要性 只能说明它对于结论的影响性的占比

b为偏置 对应输出的常数项

而w的下标代表输出/输入第几项：例：w22代表第二个输出 第二个输入<img src="img-llm/media/image1.png" style="width:5.76458in;height:1.29306in" />

Softmax运算：

优化参数，即将数据变为非负数，统一符号，并且所有数据总和为1，梯度表现为y^（预测值）-y（实际值），保证其不会卡住可运行

<img src="img-llm/media/image2.png" style="width:3.38542in;height:0.55486in" />（也称分配函数）

（下为模型运行笔记）

四、多层感知机

在python中建成的大模型是在终端跑吗 如果我要微调要怎么实现呢

11:04

已完成已完成，用时 22秒

两个问题分开答，第二个是重点。

# **一、模型「在哪」—— 不在终端里，在进程的显存里**

终端（PowerShell）只是**启动器**。你敲 python finetune\_lora.py 之后发生的事是：

代码块

终端 → 启动一个 python.exe 进程 → 进程把 1GB 权重读进显存 → 模型"活"在这个进程里

**进程一退出，模型就从显存里消失了**（每次重跑都要重新加载）。所以「模型在哪」的准确答案是：**在某个正在运行的 Python 进程的显存里**，终端只是按下开关的那根手指。

那根手指可以是任何东西：

|        |                                               |                                               |                  |
|--------|-----------------------------------------------|-----------------------------------------------|------------------|
| 形态   | 怎么启动                                      | 特点                                          | 你现在的阶段     |
| 脚本   | 终端敲命令 / PyCharm 右键 Run                 | 跑完就退出，模型随之卸载                      | ✅ 你现在就是这样 |
| 交互式 | Jupyter / PyCharm 的 Python Console / ipython | 模型常驻内存，可以反复问，不用重复加载        | 调参时最舒服     |
| 服务化 | FastAPI / gradio / vLLM / ollama              | 常驻进程，浏览器或 curl 调用，像 ChatGPT 那样 | 部署时才需要     |

所以你之前跑 pretrain.py、python -c "import torch..."、以及接下来要跑的 finetune\_lora.py，**本质上是同一件事**：启动一个进程 → 加载权重 → 做事 → 退出。

> 想「一直对话」不要写循环 input() 的脚本，而应该选第二种（Jupyter）或第三种（gradio 起个网页）。

# **二、微调到底是怎么实现的**

## **一句话**

**拿别人的权重当起点，用你的数据继续跑「预测下一个 token + 反向传播」，但只让一部分参数更新。**

代码上，微调和你第五章写的 pretrain.py / sft.py **只差三处**：

|            |                              |                                                      |
|------------|------------------------------|------------------------------------------------------|
|            | 预训练（第五章 pretrain.py） | 微调（第六章 / 我们搭的 LoRA）                       |
| 权重从哪来 | 随机初始化 std=0.02          | from\_pretrained("Qwen/Qwen2.5-0.5B-Instruct")       |
| 数据形式   | 裸文本 {"text": "..."}       | 对话 messages + chat\_template + **只对回复算 loss** |
| 训哪些参数 | 全部                         | **全部**（Full SFT）或 **只有 LoRA 旁路**（LoRA）    |

结构一行都不用改 —— 微调改的是**数值**，不是**结构**。

## **三个层次，按显存从高到低**

|                          |                          |               |                        |                 |
|--------------------------|--------------------------|---------------|------------------------|-----------------|
| 方式                     | 训什么                   | 0.5B 需要显存 | 7B 需要显存            | 对应第六章文件  |
| **Full SFT**（全参微调） | 全部参数                 | 4\~6 GB       | 60GB+（要多卡 + ZeRO） | finetune.py     |
| **LoRA**                 | 只训旁路低秩矩阵（0.1%） | **2\~4 GB**   | 20 GB                  | 我们搭的        |
| **QLoRA**                | LoRA + 基座 4bit         | **1.5\~2 GB** | 6\~8 GB                | 需 bitsandbytes |

这三者是同一套训练循环，差异只在「哪些参数 requires\_grad=True」和「基座存成几 bit」。

## **最小实现：20 行骨架**

python

model = AutoModelForCausalLM.from\_pretrained("Qwen/Qwen2.5-0.5B-Instruct", dtype=torch.bfloat16)inject\_lora(model, r=8, alpha=16) \# ← 唯一的新东西：给 q/k/v/o 挂旁路矩阵mark\_only\_lora\_as\_trainable(model) \# ← 冻结基座，只训旁路opt = torch.optim.AdamW(\[p for p in model.parameters() if p.requires\_grad\], lr=1e-3)for batch in loader: \# batch = (input\_ids, labels, attention\_mask) with torch.autocast("cuda", dtype=torch.bfloat16): loss = model(\*\*batch).loss / accum \# labels 里 prompt 位置是 -100，不参与损失 loss.backward() opt.step(); opt.zero\_grad()

对比第五章你的 train\_epoch，你会发现**后半段一模一样**（梯度累积、裁剪、lr 调度、存 ckpt 全都在）。真正新增的只有 inject\_lora 和 mark\_only\_lora\_as\_trainable 两行。

## **已经给你实现好了**

E:\\线性神经网络\\chapter6-lora\\finetune\_lora.py 就是上面这套的完整版，lora.py 是那 60 行手写 LoRA（我已跑过自检，四条性质全对）。

所以对你这个问题的**直接回答是**：

> 微调**不需要你自己从零写**。我已经把实现写好了，你要做的是换数据、调参数、然后把结果接上你的场景。

# **三、你的实际路径（按顺序）**

代码块

现在 → 跑通我们搭的 LoRA 微调（就是一次真正的微调）

↓

改数据：把 data/sft\_lora.jsonl 换成你业务场景的问答（几十条就能试）

↓

调参：--r 8/16、--lr 1e-3/2e-4、--target\_modules 加不加 MLP 层

↓

部署：写个 gradio 网页，把 chat\_lora.py 的 load() + chat() 挂上去 → 浏览器对话

# **四、三个常见误区**

|                            |                                                                     |
|----------------------------|---------------------------------------------------------------------|
| 误区                       | 事实                                                                |
| 「微调 = 改模型结构」      | ❌ 结构不动，改的是权重的数值                                        |
| 「微调能让模型学会新知识」 | ⚠️ 主要是学**格式、风格、任务套路**；灌知识该用 **RAG**（外挂检索） |
| 「必须多卡/大显存」        | ❌ 0.5B + LoRA 单卡 8GB 绰绰有余；QLoRA 甚至能在 6GB 上跑 7B         |

**下一步就一条命令**（先确认 LoRA 那套能跑起来，再谈改数据）：

powershell

cd E:\\线性神经网络\\chapter6-lora..\\happy-llm-chapter5\\.venv\\Scripts\\python.exe selfcheck\_lora.py

跑通之后 make\_sft\_data.py → finetune\_lora.py，那一步就是**你在真正微调一个开源的 Qwen 模型**。

要不要我顺手加一个 app\_gradio.py，让你微调完能直接在浏览器里对话（而不是每次敲终端命令）？

用量 358K tok11:04

我去哪里进行微调参数呢 以及换什么数据 能否说仔细点

11:05

已完成已完成，用时 2分13秒

两个问题都拆开讲，并且我已经把「换数据」这一步的工具做好、实测过了。

# **一、参数在哪里改**

## **位置 1：命令行（推荐，不动代码）**

所有超参都已经暴露成命令行参数，**在终端加 **--xxx** 就等于改了**，代码一个字不用动：

powershell

.\\.venv\\Scripts\\python.exe finetune\_lora.py --data data/my\_qa.jsonl --r 16 --alpha 32 --lr 2e-4 --epochs 5

## **位置 2：改代码里的默认值（以后不带参数直接跑）**

打开 finetune\_lora.py，**第 110\~121 行**就是全部参数定义：

python

p.add\_argument("--r", type=int, default=8) \# ← 把 8 改成 16p.add\_argument("--lr", type=float, default=1e-3) \# ← 把 1e-3 改成 2e-4p.add\_argument("--epochs",type=int, default=3)...

改完保存，以后直接 python finetune\_lora.py 就是你调好的配置。

## **位置 3：两处不在命令行里的（进阶才动）**

|                       |                                                     |                                                          |
|-----------------------|-----------------------------------------------------|----------------------------------------------------------|
| 位置                  | 内容                                                | 什么时候改                                               |
| finetune\_lora.py:147 | targets = ("q\_proj","k\_proj","v\_proj","o\_proj") | 想连 MLP 一起训：加 "gate\_proj","up\_proj","down\_proj" |
| finetune\_lora.py:33  | ChatSFTDataset                                      | 数据是多轮对话/带工具调用时才要改                        |

## **全部参数表（14 个）**

|                  |                            |                                |                                              |
|------------------|----------------------------|--------------------------------|----------------------------------------------|
| 参数             | 默认                       | 作用                           | 调大 / 调小会怎样                            |
| --data           | data/sft\_lora.jsonl       | **数据路径（你最常改的）**     | —                                            |
| --model          | Qwen/Qwen2.5-0.5B-Instruct | 基座模型                       | 换 1.5B/3B 要相应降 batch                    |
| --out\_dir       | lora\_qwen05b              | 适配器输出目录                 | 换项目就换个名字                             |
| --r              | 8                          | **LoRA 秩**（旁路矩阵多宽）    | 16/32 = 容量大、参数翻倍；4 = 更省但易欠拟合 |
| --alpha          | 16                         | 缩放，实际生效 alpha/r         | 惯例取 2×r                                   |
| --lr             | 1e-3                       | 学习率                         | 训崩→2e-4；纹丝不动→2e-3                     |
| --epochs         | 3                          | 轮数                           | 数据&lt;200 可到 5\~10；数据多会「背题」     |
| --batch\_size    | 2                          | 每步样本                       | **显存不够第一个降它**                       |
| --grad\_accum    | 4                          | 梯度累积（等效 batch = 2×4=8） | 不占显存，想稳就调大                         |
| --max\_len       | 384                        | 单条最大 token                 | 超长被左截断；**显存不够第二降它**           |
| --warmup         | 20                         | 预热步数                       | 数据多可到总步数 5%                          |
| --dtype          | bfloat16                   | 精度                           | 老卡改 float16                               |
| --log\_interval  | 10                         | 日志间隔                       | 调小看更密                                   |
| --save\_interval | 100                        | 存盘间隔                       | 调小方便中途 Ctrl+C                          |

**显存不够时的降级顺序**：batch\_size 2→1 → max\_len 384→256 → r 8→4。

## **最常调的 5 个（记住这个就够）**

代码块

--data 换数据（最重要，效果 80% 靠它）

--r 8 → 16 数据多、任务复杂时加容量

--lr 1e-3 → 2e-3 学不动；→ 2e-4 训崩了

--epochs 3 → 5\~10 数据少

--batch\_size / --max\_len 显存不够时降

# **二、数据怎么换**

## **格式规范（严格照这个写）**

**一行 = 一条样本 = 一个 JSON 数组**，UTF-8，**最后一条必须是 **assistant：

json

\[{"role":"system","content":"你是一个简洁、准确的中文助手。"}, {"role":"user","content":"你们的退货政策是什么？"}, {"role":"assistant","content":"商品签收后 7 天内可无理由退货，生鲜和定制商品除外。"}\]

|                                            |                                                                          |
|--------------------------------------------|--------------------------------------------------------------------------|
| 规则                                       | 违反的后果                                                               |
| role 只能是 system/user/assistant          | 校验报错                                                                 |
| content 非空字符串                         | 报错                                                                     |
| user/assistant 成对，**以 assistant 结尾** | 没有学习目标，等于白训                                                   |
| 一行一个 JSON（答案里的换行用 \\n）        | JSON 解析失败，该行被跳过                                                |
| **system 要和推理时一致**                  | 微调效果打折（chat\_lora.py 默认也是「你是一个简洁、准确的中文助手。」） |

## **用多少条**

|                 |                                          |
|-----------------|------------------------------------------|
| 数量            | 效果                                     |
| &lt; 50         | 只能验证流程                             |
| **200 \~ 2000** | **实用区间**：能学到格式、风格、固定任务 |
| &gt; 10000      | 容易过拟合到模板，要重调参               |

## **三个数据来源**

**① 自己的业务数据（最有用）** —— 客服记录、FAQ、产品文档问答，整理成两列 CSV（问题,答案）或 {"q":..,"a":..} 的 jsonl。 我放了一份示例 data/example\_qa.jsonl（12 条电商客服问答），**你可以直接照着它的格式写你的**。

**② 公开数据集**

powershell

$env:HF\_ENDPOINT='https://hf-mirror.com'pip install datasets -i https://pypi.tuna.tsinghua.edu.cn/simple --progress-bar offpython -c "from datasets import load\_dataset; ds=load\_dataset('BelleGroup/train\_0.5M\_CN', split='train\[:500\]'); ds.to\_json('data/belle\_500.jsonl')"

**③ 用大模型批量生成** —— 给 DeepSeek 一段提示词，让它按你的场景生成 200 条 QA。 ⚠️ **必须人工过一遍**：模型编错的答案会被 LoRA 原样学进去。

## **两个现成工具（我已经实测过）**

我写了两个脚本并跑通了：

### make\_data\_from\_qa.py** —— 把你的一问一答转成训练格式**

支持 .jsonl（{"q","a"}，键名还兼容 question/instruction/answer/output…）、.csv、.tsv：

powershell

.\\.venv\\Scripts\\python.exe make\_data\_from\_qa.py --src data/example\_qa.jsonl --dst data/my\_qa.jsonl --val\_ratio 0.05

我实跑的输出：

代码块

读入 12 条 (q, a)

过滤超长: 去掉 0 条

去重: 去掉 0 条

写入 10 条 -&gt; data/my\_qa.jsonl

写入 2 条 -&gt; data/my\_qa.val.jsonl ← 5% 验证集（这里 12 条取了 2 条）

### check\_data.py** —— 训练前校验，挡住 90% 的「训完没效果」**

powershell

.\\.venv\\Scripts\\python.exe check\_data.py --data data/my\_qa.jsonl --model Qwen/Qwen2.5-0.5B-Instruct

实跑输出（好数据）：

代码块

可解析行数: 10 JSON 错误: 0

合法样本: 10

角色分布: {'system': 10, 'user': 10, 'assistant': 10}

长度(approx token): 最小 32 / 中位 41 / 最大 48

超过 max\_len(384) 会被截断的样本: 0 条 (0.0%)

完全重复的样本: 0 条

\[通过\] 可以拿去训练：python finetune\_lora.py --data data/my\_qa.jsonl

坏数据它会精确到行号（我故意造了 5 类错误，全部被抓出来）：

代码块

第 2 行: JSON 解析失败: Unterminated string ...

第 3 行: 最后一条必须是 assistant（现在是 user），否则等于没有学习目标

第 4 行: 第 1 条 content 为空

第 5 行: 应该是 list，实际是 dict

\[失败\] 4 条样本格式不合法，修好再训练

# **三、一次完整的「改参数 + 换数据」实操**

假设你要做一个「电商客服助手」：

powershell

cd E:\\线性神经网络\\chapter6-lora\# ① 把你的 FAQ 整理成 data/my\_faq.jsonl（{"q":..,"a":..}，2000 条以内）\# 先照着 data/example\_qa.jsonl 的样子写\# ② 转换格式 + 切验证集..\\happy-llm-chapter5\\.venv\\Scripts\\python.exe make\_data\_from\_qa.py \` --src data/my\_faq.jsonl --dst data/faq\_train.jsonl --val\_ratio 0.05 \` --system "你是某电商平台的客服，回答简洁准确，不确定就建议联系人工客服。"\# ③ 校验（这一步别跳）..\\happy-llm-chapter5\\.venv\\Scripts\\python.exe check\_data.py \` --data data/faq\_train.jsonl --model Qwen/Qwen2.5-0.5B-Instruct\# ④ 用新数据 + 调过的参数训练..\\happy-llm-chapter5\\.venv\\Scripts\\python.exe finetune\_lora.py \` --data data/faq\_train.jsonl --out\_dir lora\_faq \` --r 16 --alpha 32 --lr 2e-4 --epochs 5 --max\_len 512\# ⑤ 试效果..\\happy-llm-chapter5\\.venv\\Scripts\\python.exe chat\_lora.py \` --adapter lora\_faq/lora\_adapter.pt --prompt "我要退货，怎么操作？"

## **两个最容易踩的坑**

|                                  |                                         |                                                                                 |
|----------------------------------|-----------------------------------------|---------------------------------------------------------------------------------|
| 坑                               | 后果                                    | 正确做法                                                                        |
| 训练数据的 system 和推理时不一致 | 效果明显打折                            | 两边都改成同一句（make\_data\_from\_qa.py --system + chat\_lora.py 里改默认值） |
| 数据太少/重复太多                | loss 掉到 0.00x，但问新问题就崩（背题） | ≥200 条、答案要有变化；用 check\_data.py 看重复率                               |

**你现在可以先做这件事**：把 data/example\_qa.jsonl 里的 12 条换成你自己领域的 20 条（先少一点试通），然后跑 ②③④⑤ 那四条命令。全程 10 分钟，能立刻看到「换数据 → 换行为」的效果
