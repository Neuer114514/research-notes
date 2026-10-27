"""第 4 天 · 数据基础练习：鸢尾花数据集全流程

流程：读取 → 清洗 → 分组统计 → 绘图（3 张图）
用法：
    python code/week1/day04_iris_analysis.py

依赖：numpy、pandas、matplotlib（scikit-learn 可选，缺失时自动改用在线 CSV）
"""

from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd

# 中文显示：不设置的话标题会变成方框
plt.rcParams["font.sans-serif"] = ["SimHei", "Microsoft YaHei", "Arial Unicode MS"]
plt.rcParams["axes.unicode_minus"] = False

OUT_DIR = Path(__file__).resolve().parent / "output"


def load_data() -> pd.DataFrame:
    """优先用 sklearn 自带的鸢尾花数据，装不了就联网读 CSV。"""
    try:
        from sklearn.datasets import load_iris

        df = load_iris(as_frame=True).frame
    except Exception:
        url = "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv"
        df = pd.read_csv(url)
    return df


def clean(df: pd.DataFrame) -> pd.DataFrame:
    """清洗：查看缺失值与重复行，并去掉缺失值。"""
    print("缺失值统计：")
    print(df.isna().sum())
    print(f"重复行数：{df.duplicated().sum()}")
    return df.dropna().drop_duplicates().reset_index(drop=True)


def describe_by_group(df: pd.DataFrame) -> pd.DataFrame:
    """分组统计：只统计数值列，否则字符串列会报 TypeError。"""
    numeric_cols = df.select_dtypes("number").columns.tolist()
    grouped = df.groupby("target")[numeric_cols].mean()
    print("\n按类别分组的均值：")
    print(grouped)
    return grouped


def plot_all(df: pd.DataFrame) -> None:
    """画 3 张图：散点图、按类别柱状图、折线图。"""
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    x_col, y_col = df.select_dtypes("number").columns[0], df.select_dtypes("number").columns[1]

    fig, axes = plt.subplots(1, 3, figsize=(15, 4))

    # 1. 散点图：看类别是否可分
    for name, group in df.groupby("target"):
        axes[0].scatter(group[x_col], group[y_col], label=str(name), alpha=0.7)
    axes[0].set(title="散点图：花萼长度 vs 花萼宽度", xlabel=x_col, ylabel=y_col)
    axes[0].legend(title="类别")

    # 2. 柱状图：各类别的花瓣长度均值
    petal = df.select_dtypes("number").columns[2]
    means = df.groupby("target")[petal].mean()
    axes[1].bar([str(i) for i in means.index], means.values, color=["#4f7cff", "#00b894", "#ff9f43"])
    axes[1].set(title=f"柱状图：各类别 {petal} 均值", ylabel="均值")

    # 3. 折线图：按样本序号观察花萼长度趋势
    axes[2].plot(df.index, df[x_col], color="#a55eea", linewidth=1)
    axes[2].set(title="折线图：样本序号 vs 花萼长度", xlabel="样本序号", ylabel=x_col)

    plt.tight_layout()
    out = OUT_DIR / "iris_overview.png"
    plt.savefig(out, dpi=120)
    print(f"\n图表已保存到：{out}")


def main() -> None:
    df = load_data()
    print(f"数据形状：{df.shape}")
    print(df.head())

    df = clean(df)
    describe_by_group(df)
    plot_all(df)


if __name__ == "__main__":
    main()
