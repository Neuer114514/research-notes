"""第 2 天 · Python 基础练习：文本统计脚本

功能：统计一个文本文件的行数、词数、字符数、最长行，以及出现频率最高的 N 个词。
用法：
    python code/week1/text_stats.py <文件路径> [-n 10]

涉及知识点：函数、文件读写（with open + encoding）、异常处理（try/except）、类与对象。
"""

import argparse
import re
import sys
from collections import Counter
from pathlib import Path


class TextStats:
    """把一个文本文件读进来，提供若干统计方法。"""

    def __init__(self, path: str) -> None:
        self.path = Path(path)
        self.text = self._read()

    def _read(self) -> str:
        """读取文本。Windows 默认编码是 GBK，必须显式指定 utf-8。"""
        try:
            with open(self.path, "r", encoding="utf-8", errors="ignore") as f:
                return f.read()
        except FileNotFoundError:
            print(f"[错误] 文件不存在：{self.path}")
            sys.exit(1)
        except PermissionError:
            print(f"[错误] 没有读取权限：{self.path}")
            sys.exit(1)

    @property
    def lines(self):
        """非空行列表。"""
        return [line for line in self.text.splitlines() if line.strip()]

    def line_count(self) -> int:
        return len(self.lines)

    def char_count(self) -> int:
        return len(self.text)

    def longest_line(self):
        """返回 (行号, 行内容, 长度)，文件为空时返回 None。"""
        if not self.lines:
            return None
        idx = max(range(len(self.lines)), key=lambda i: len(self.lines[i]))
        return idx + 1, self.lines[idx], len(self.lines[idx])

    def word_freq(self, top_n: int = 10):
        """统计词频，忽略大小写，只保留中英文与数字。"""
        words = re.findall(r"[A-Za-z0-9]+|[\u4e00-\u9fff]", self.text.lower())
        return Counter(words).most_common(top_n)


def main() -> None:
    parser = argparse.ArgumentParser(description="统计文本文件的行数、词数与高频词")
    parser.add_argument("file", help="要统计的文本文件路径")
    parser.add_argument("-n", "--top", type=int, default=10, help="显示前 N 个高频词，默认 10")
    args = parser.parse_args()

    stats = TextStats(args.file)

    print("=" * 46)
    print(f"文件：{stats.path}")
    print("=" * 46)
    print(f"非空行数：{stats.line_count()}")
    print(f"字符总数：{stats.char_count()}")

    longest = stats.longest_line()
    if longest:
        no, content, length = longest
        print(f"最长行　：第 {no} 行，长度 {length}")
        print(f"　　　　　{content[:60]}{'...' if length > 60 else ''}")

    print("-" * 46)
    print(f"高频词 TOP {args.top}：")
    for word, count in stats.word_freq(args.top):
        print(f"  {word:<12} {count}")


if __name__ == "__main__":
    main()
