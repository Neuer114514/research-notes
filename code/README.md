# 练习代码

按周组织，每周一个目录，目录内附运行说明。运行前先激活虚拟环境：

```bash
conda activate research
```

## code/week1（第 1 周）

| 文件 | 对应天数 | 说明 | 运行命令 |
|------|---------|------|---------|
| `week1/text_stats.py` | 第 2 天 | 文本统计脚本：词频、行数、最长行；含函数、文件读写、异常处理与类 | `python code/week1/text_stats.py 文件路径 -n 10` |
| `week1/day04_iris_analysis.py` | 第 4 天 | 鸢尾花数据集：读取 → 清洗 → 分组统计 → 绘图（3 张图） | `python code/week1/day04_iris_analysis.py` |

运行后会生成 `week1/output/` 目录，图表保存在其中。

## code/week2（第 8—14 天）

- `week2/`：线性回归（NumPy 版 + PyTorch 版）、CNN 训练脚本、Self-Attention 最小实现

## 说明

- 每个脚本顶部注明对应天数与产出要求
- 依赖写在 `requirements.txt`（第 1 周：numpy / pandas / matplotlib / torch）
