/* ============================================================
 *  科研入门一个月学习进程 —— 数据文件
 *  依据《科研入门一个月学习指南 v2》组织：4 周 · 28 天
 *  ------------------------------------------------------------
 *  平时只需要改这里：
 *    1. daily    → 每天实际学习时长（热力图 / 柱状图）
 *    2. plan     → 28 天任务清单，把当天那条 status 由 "todo" 改成 "done"
 *    3. weeks    → 每周已完成的天数（done / total）
 *    4. timeline → 里程碑，一条一天，可关联 daily/ 下的日志
 *  改完保存，页面自动更新。
 * ============================================================ */

window.LEARNING_DATA = {
  /* ---------------- 基本信息 ---------------- */
  profile: {
    name: "Neuer114514",
    title: "科研入门学习进程",
    subtitle: "一个月冲刺版 · 四周学习计划（第 1—28 天）",
    startDate: "2026-10-24",
    targetDate: "2026-11-20",
    motto: '以"动手跑通"为主线，把检索、阅读、复现、汇报串成一条完整链路',
    // 换成你自己的 GitHub 仓库地址（指南第 3 天要求建的 research-notes）
    repoUrl: "https://github.com/Neuer114514/research-notes",
  },

  /* ---------------- 四周总览（模块进度） ---------------- */
  weeks: [
    {
      id: "w1",
      name: "第 1 周 · 环境、Python 与科研习惯",
      theme: "第 1—7 天",
      color: "#4f7cff",
      total: 7,
      done: 4,
      hours: 14,
      desc: "配好环境与虚拟环境，掌握 Python 与 NumPy/Pandas，建立笔记仓库，学会检索与用 AI 工具",
    },
    {
      id: "w2",
      name: "第 2 周 · 神经网络、深度学习与 PyTorch",
      theme: "第 8—14 天",
      color: "#00b894",
      total: 7,
      done: 0,
      hours: 0,
      desc: "前向/反向传播与梯度下降，PyTorch 训练与微调，CNN/ResNet，Self-Attention 与 Transformer",
    },
    {
      id: "w3",
      name: "第 3 周 · 大模型、多模态、智能体与强化学习",
      theme: "第 15—21 天",
      color: "#ff9f43",
      total: 7,
      done: 0,
      hours: 0,
      desc: "Transformer 工程细节，Hugging Face 推理与 LoRA 微调，多模态 / Agent / RL 概念与选题",
    },
    {
      id: "w4",
      name: "第 4 周 · 论文复现、结果分析与汇报",
      theme: "第 22—28 天",
      color: "#a55eea",
      total: 7,
      done: 0,
      hours: 0,
      desc: "选定论文精读并定位代码，跑通完整实验，做结果对比分析，完成 10—15 分钟汇报",
    },
  ],

  /* ---------------- 每日实际学习时长（小时） ---------------- */
  daily: [
    { date: "2026-10-24", hours: 4.0 },   // 第 1 天 环境配置
    { date: "2026-10-25", hours: 4.0 },   // 第 2 天 Python 基础
    { date: "2026-10-26", hours: 3.0 },   // 第 3 天 版本管理与笔记
    { date: "2026-10-27", hours: 3.0 },   // 第 4 天 数据基础
  ],

  /* ---------------- 四周任务清单（28 天） ---------------- */
  /* status: done=已完成 / doing=进行中 / next=下一步 / todo=未开始 */
  plan: [
    // ===== 第 1 周 =====
    { day: 1, week: 1, date: "2026-10-24", title: "环境配置", status: "done",
      points: "装 Miniconda/VS Code/Python 3.10；创建虚拟环境 research；安装 numpy/pandas/matplotlib/jupyter/torch(CPU)；跑通第一个脚本与 Notebook；注册 Google/GitHub/HuggingFace",
      output: "虚拟环境已激活 + Notebook 能输出结果" },
    { day: 2, week: 1, date: "2026-10-25", title: "Python 基础", status: "done",
      points: "变量与类型、条件循环、函数、列表/字典/集合、字符串；文件读写与 try/except；类与对象；写文本统计脚本（≥50 行）",
      output: "一个能运行的 Python 小脚本" },
    { day: 3, week: 1, date: "2026-10-26", title: "版本管理与笔记", status: "done",
      points: "git init/add/commit/push/pull/clone、分支与 .gitignore；建 GitHub 仓库 research-notes；Markdown 语法；目录 daily/ papers/ code/ faq.md；写第一篇日志",
      output: "线上笔记仓库可用（3 个目录 + 1 篇日志）" },
    { day: 4, week: 1, date: "2026-10-27", title: "数据基础", status: "done",
      points: "NumPy：ndarray/索引切片/广播/矩阵乘法；Pandas：读入筛选分组统计缺失值；Matplotlib：折线/散点/柱状/子图；练一个公开 CSV",
      output: "一份含 3 张以上图表的 Notebook" },
    { day: 5, week: 1, date: "2026-10-28", title: "检索能力", status: "next",
      points: "Google 高级语法（双引号/site:/filetype:pdf/-排除）；Google Scholar 按引用排序与追被引；B 站找 2—3 个长期跟学的 UP 主；粗读 1 篇中文综述；判断资料质量",
      output: "1 篇综述粗读笔记（含 3 个待查概念）" },
    { day: 6, week: 1, date: "2026-10-29", title: "AI 工具上手", status: "todo",
      points: "安装配置 Codex/Claude Code；用 AI 解释陌生代码、定位报错、重构代码；故意让 AI 写 bug 再自己找；学写清晰提示词；写 AI 使用与验证记录",
      output: "一份「AI 使用与验证」记录（≥3 条）" },
    { day: 7, week: 1, date: "2026-10-30", title: "复盘周", status: "todo",
      points: "补齐本周内容、整理笔记与代码仓库；自测 5 个检查点；为下周找 2 篇论文；写周总结与下周计划",
      output: "周总结 + 下周计划（各 1 页）" },

    // ===== 第 2 周 =====
    { day: 8, week: 2, date: "2026-10-31", title: "神经网络原理", status: "todo",
      points: "李沐《动手学深度学习》第 2—3 章；手推梯度与更新公式；用 NumPy 从零写线性回归；理解学习率/批大小/轮数",
      output: "NumPy 版线性回归代码 + 损失曲线" },
    { day: 9, week: 2, date: "2026-11-01", title: "PyTorch 入门", status: "todo",
      points: "张量、autograd、nn.Module、优化器；用 PyTorch 重写线性回归；train()/eval()、no_grad、保存加载；GPU 设备；学会看训练日志",
      output: "PyTorch 版线性回归 + 训练日志" },
    { day: 10, week: 2, date: "2026-11-02", title: "图像分类实战", status: "todo",
      points: "CNN 卷积/池化/感受野；跑通 MNIST 或 Fashion-MNIST；自定义 Dataset 与 train/val 划分；加验证集评估观察过拟合；看李沐读论文 CNN 一集",
      output: "一个图像分类训练脚本（含验证集评估）" },
    { day: 11, week: 2, date: "2026-11-03", title: "经典论文精读", status: "todo",
      points: "精读 ResNet 与 Batch Normalization 并做笔记；用论文笔记模板；torchvision 预训练 ResNet 做迁移学习；对比从零训练与微调",
      output: "2 篇论文笔记 + 迁移学习对比结果" },
    { day: 12, week: 2, date: "2026-11-04", title: "序列模型（选做）", status: "todo",
      points: "RNN/LSTM/GRU 的动机与局限（梯度消失、难并行）；跑通文本分类或字符级语言模型小实验；读 Attention 论文引言与结论",
      output: "1 篇论文粗读笔记" },
    { day: 13, week: 2, date: "2026-11-05", title: "Attention 与 Transformer", status: "todo",
      points: "精读 Attention Is All You Need；配合 B 站讲解；用 PyTorch 实现最小自注意力模块；消融：去掉位置编码 / 改成单头",
      output: "手写 Self-Attention 代码 + 消融实验结果" },
    { day: 14, week: 2, date: "2026-11-06", title: "复盘周", status: "todo",
      points: "整理 code/week2/ 并写 README；自测反向传播/训练循环/Self-Attention；复查实验日志异常；写周总结并预习 Hugging Face 文档",
      output: "干净可复现的代码仓库 + 周总结" },

    // ===== 第 3 周 =====
    { day: 15, week: 3, date: "2026-11-07", title: "大模型基础", status: "todo",
      points: "Happy-LLM 前半：Transformer 到大模型架构演进；Decoder-only 与 Encoder-Decoder；GPT/LLaMA/Qwen 差异；Tokenizer(BPE) 与位置编码(RoPE)",
      output: "大模型架构对比表（自绘）" },
    { day: 16, week: 3, date: "2026-11-08", title: "Hugging Face 实践", status: "todo",
      points: "AutoModel/AutoTokenizer + pipeline；加载 Qwen2.5-0.5B/1.5B 做文本生成；对比贪心/beam/temperature/top-p；完成一个下游任务评估",
      output: "可运行的推理脚本 + 解码策略对比结果" },
    { day: 17, week: 3, date: "2026-11-09", title: "微调实践", status: "todo",
      points: "全量微调 vs LoRA/QLoRA；用 peft + transformers 在小数据集做 LoRA 微调；记录显存与耗时；对比微调前后输出质量",
      output: "LoRA 微调脚本 + 微调前后对比案例" },
    { day: 18, week: 3, date: "2026-11-10", title: "论文与检索日", status: "todo",
      points: "「方向 + survey/review/tutorial」检索综述；选读 2 篇 2024—2025 综述；用 Google Scholar 追被引；列出 3 个复现候选及仓库 Star 数",
      output: "3 个复现候选论文清单（含仓库链接与算力评估）" },
    { day: 19, week: 3, date: "2026-11-11", title: "多模态（选做）", status: "todo",
      points: "Happy-LLM 多模态部分 + HF Vision Language Models；粗读 CLIP/BLIP-2/LLaVA；看串讲视频；用一个小型 VLM 做图文问答推理",
      output: "多模态方法脉络图 + 1 次推理结果" },
    { day: 20, week: 3, date: "2026-11-12", title: "Agent（选做）", status: "todo",
      points: "Hello-Agents：工具调用、记忆、规划；精读 ReAct；跑通最小 Agent Demo；了解 Multi-Agent 协作",
      output: "可运行的 Agent Demo + 轨迹日志" },
    { day: 21, week: 3, date: "2026-11-13", title: "强化学习（选做）", status: "todo",
      points: "《动手学强化学习》前几章：状态/动作/奖励/策略/价值函数；理解 DQN 与 PPO；跑通 DQN Notebook；复盘并确定第 4 周复现论文",
      output: "复现论文确定 + 第 3 周周总结" },

    // ===== 第 4 周 =====
    { day: 22, week: 4, date: "2026-11-14", title: "选题与读论文", status: "todo",
      points: "从候选清单确定 1 篇并向导师确认可行性；三遍读法（摘要图表→方法→实验与代码）；完成论文笔记；检索引用与被引",
      output: "论文笔记（含方法流程图草稿）" },
    { day: 23, week: 4, date: "2026-11-15", title: "环境与数据", status: "todo",
      points: "克隆官方仓库读 README 与配置；配环境（依赖与 CUDA 版本）；下载数据集核对格式；算力不足就换同系列小模型；标出代码入口",
      output: "环境配置说明 + 代码结构地图" },
    { day: 24, week: 4, date: "2026-11-16", title: "跑通最小流程", status: "todo",
      points: "小规模设置先跑通（少样本/小模型/少轮数）；逐行理解数据加载与前向；观察显存与单步耗时；报错先自己查再问 AI",
      output: "一次完整的最小可运行实验（哪怕是 toy 设置）" },
    { day: 25, week: 4, date: "2026-11-17", title: "正式实验", status: "todo",
      points: "按论文设置在选定数据集跑完整实验；记录超参数/随机种子/耗时/硬件；保存日志与权重不覆盖；结果异常先查评价脚本与数据划分",
      output: "主实验的完整日志与结果文件" },
    { day: 26, week: 4, date: "2026-11-18", title: "结果分析与对比", status: "todo",
      points: "与论文结果做对照表并标注差异；分析差异原因；做 1—2 个自己的小实验（消融/换超参）；整理主结果表、训练曲线、失败案例",
      output: "结果对比表 + 训练曲线 + 案例分析" },
    { day: 27, week: 4, date: "2026-11-19", title: "制作 PPT", status: "todo",
      points: "按提纲搭结构，控制在 12—18 页；少字多图、示意图自己重画；准备「我的结果与思考」；核对论文信息完整性",
      output: "PPT 初稿（含复现结果页）" },
    { day: 28, week: 4, date: "2026-11-20", title: "试讲与提交", status: "todo",
      points: "计时试讲 1—2 遍并删减；请同学听一遍收集 3 个提问；整理交付物（PPT/代码/实验记录/复现说明）；联系导师预约汇报",
      output: "完整交付物 + 汇报预约" },
  ],

  /* ---------------- 里程碑（时间线，新的在上） ---------------- */
  timeline: [
    {
      date: "2026-10-27",
      title: "第 4 天 · 数据基础：NumPy / Pandas / Matplotlib",
      summary: "用鸢尾花数据集跑通「读取 → 清洗 → 分组统计 → 绘图」，产出含 3 张图表的 Notebook。",
      tags: ["第 1 周", "数据基础"],
      log: "daily/2026-10-27.md",
    },
    {
      date: "2026-10-26",
      title: "第 3 天 · 版本管理与笔记：Git + Markdown 仓库",
      summary: "建好 research-notes 仓库，按 daily/ papers/ code/ faq.md 组织，写下第一篇日志。",
      tags: ["第 1 周", "Git"],
      log: "daily/2026-10-26.md",
    },
    {
      date: "2026-10-25",
      title: "第 2 天 · Python 基础：语法、文件读写与面向对象",
      summary: "写完文本统计脚本（词频 / 行数 / 最长行），理清 try/except 与类的基本用法。",
      tags: ["第 1 周", "Python"],
      log: "daily/2026-10-25.md",
    },
    {
      date: "2026-10-24",
      title: "第 1 天 · 环境配置：Conda + VS Code + 第一个 Notebook",
      summary: "创建虚拟环境 research，装好 numpy/pandas/matplotlib/jupyter/torch(CPU)，跑通第一个脚本与 Notebook。",
      tags: ["第 1 周", "环境"],
      log: "daily/2026-10-24.md",
    },
  ],
};
