# 踩坑记录（faq.md）

> 原则：同一个坑不踩第二次。每条记录「报错 → 原因 → 解决办法 → 怎么验证」。

## 第 1 周

| # | 报错 / 现象 | 原因 | 解决办法 | 验证方式 |
|---|------------|------|---------|---------|
| 1 | `CommandNotFoundError: Your shell has not been properly configured to use 'conda activate'.` | PowerShell 没有初始化 conda | `conda init powershell` 后重开终端，或直接用 Anaconda Prompt | 命令行前缀出现 `(research)` |
| 2 | `pip install torch` → `ReadTimeoutError` | 默认源在国外，下载超时 | 换清华镜像：`pip install torch -i https://pypi.tuna.tsinghua.edu.cn/simple` | `python -c "import torch; print(torch.__version__)"` |
| 3 | `UnicodeDecodeError: 'gbk' codec can't decode byte ...` | Windows 默认用 GBK 读文本 | 所有 `open()` / `read_csv()` 显式写 `encoding="utf-8"` | 再用含中文的 txt 跑一遍脚本，正常输出 |
| 4 | `git@github.com: Permission denied (publickey).` | 本地没配 SSH key | `ssh-keygen -t ed25519 -C "邮箱"`，公钥加到 GitHub → SSH and GPG keys | `ssh -T git@github.com` 返回 Hi xxx |
| 5 | `TypeError: Could not convert string 'setosa' to numeric` | `groupby().mean()` 对字符串列求均值 | 只对数值列统计：`df.groupby("target")[numeric_cols].mean()` 或加 `numeric_only=True` | 分组均值按样本数加权 ≈ `df.describe()` 的总体均值 |
| 6 | Matplotlib 中文显示成方框：`Glyph ... missing from current font` | 默认字体不含中文 | `plt.rcParams["font.sans-serif"] = ["SimHei", "Microsoft YaHei"]` + `axes.unicode_minus = False` | 重新运行脚本，中文标题正常 |

## 第 2 周（待补充）

| # | 报错 / 现象 | 原因 | 解决办法 | 验证方式 |
|---|------------|------|---------|---------|
|   |            |      |         |         |

## 通用对策（来自学习指南）

- 环境装不上、依赖冲突 → 用虚拟环境隔离；实在无解就换 Docker 或先跑小一号模型。
- 算力不够 → 换同系列小模型（32B → 1.5B）、减少数据量/轮数、用 LoRA 代替全量微调，汇报时说明设置变化。
- 代码跑不出论文结果 → 先确认评价脚本与数据划分一致，检查随机种子；差 1—2 个点正常，差很多先怀疑设置。
- AI 给的结果"太好" → 警惕忽略失败样本、放宽判定条件、数据泄漏；回到原始日志自己重跑。
- 单点问题超过 1 小时没解决 → 先换方案绕过，把问题记在这里，带着具体报错去问人。
