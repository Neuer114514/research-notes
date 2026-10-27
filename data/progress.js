/* ============================================================
 *  学习数据文件 —— 平时只需要改这一个文件
 *  ------------------------------------------------------------
 *  改法：
 *    1. modules  → 学习模块（名称 / 任务总数 / 已完成数 / 累计小时）
 *    2. daily    → 每天的学习时长，用于热力图和柱状图
 *    3. timeline → 学习里程碑，一条一行，可关联 logs/ 下的日志
 *  改完保存 → 页面会自动更新，不需要动 HTML 和 CSS。
 * ============================================================ */

window.LEARNING_DATA = {
  /* ---------------- 基本信息 ---------------- */
  profile: {
    name: "Neuer114514",
    title: "编程学习进程看板",
    subtitle: "从零开始学编程：Python · 算法 · Web 开发 · Git",
    startDate: "2026-09-01",
    targetDate: "2027-01-31",
    motto: "每天进步一点点，剩下的交给时间。",
    // 仓库地址，用于拼接「查看日志」链接（换成你自己的用户名/仓库名）
    repoUrl: "https://github.com/Neuer114514/learning-progress",
  },

  /* ---------------- 学习模块 ---------------- */
  modules: [
    {
      id: "python",
      name: "Python 基础",
      color: "#4f7cff",
      total: 12,
      done: 10,
      hours: 34,
      desc: "语法、函数、文件读写、异常处理、常用标准库",
    },
    {
      id: "algo",
      name: "数据结构与算法",
      color: "#00b894",
      total: 15,
      done: 7,
      hours: 26,
      desc: "数组链表、栈队列、哈希表、二分、双指针、动态规划入门",
    },
    {
      id: "web",
      name: "Web 前端基础",
      color: "#ff9f43",
      total: 14,
      done: 6,
      hours: 22,
      desc: "HTML 语义化、CSS 布局与动画、原生 JavaScript 与 DOM",
    },
    {
      id: "git",
      name: "Git 与 GitHub",
      color: "#a55eea",
      total: 6,
      done: 5,
      hours: 8,
      desc: "版本控制、分支与合并、协作流程、GitHub Pages 部署",
    },
    {
      id: "sql",
      name: "数据库与 SQL",
      color: "#fd5c63",
      total: 8,
      done: 2,
      hours: 6,
      desc: "建表、增删改查、聚合分组、多表联查",
    },
    {
      id: "project",
      name: "项目实战",
      color: "#0abde3",
      total: 5,
      done: 1,
      hours: 9,
      desc: "把学到的东西做成能跑、能展示的完整小项目",
    },
  ],

  /* ---------------- 每日学习时长（小时） ---------------- */
  daily: [
    { date: "2026-09-28", hours: 1.5 },
    { date: "2026-09-29", hours: 2.0 },
    { date: "2026-09-30", hours: 0.0 },
    { date: "2026-10-01", hours: 3.0 },
    { date: "2026-10-02", hours: 2.5 },
    { date: "2026-10-03", hours: 1.0 },
    { date: "2026-10-04", hours: 0.0 },
    { date: "2026-10-05", hours: 2.0 },
    { date: "2026-10-06", hours: 1.5 },
    { date: "2026-10-07", hours: 2.0 },
    { date: "2026-10-08", hours: 0.5 },
    { date: "2026-10-09", hours: 0.0 },
    { date: "2026-10-10", hours: 3.0 },
    { date: "2026-10-11", hours: 2.0 },
    { date: "2026-10-12", hours: 1.5 },
    { date: "2026-10-13", hours: 2.5 },
    { date: "2026-10-14", hours: 3.0 },
    { date: "2026-10-15", hours: 1.0 },
    { date: "2026-10-16", hours: 0.0 },
    { date: "2026-10-17", hours: 2.0 },
    { date: "2026-10-18", hours: 3.5 },
    { date: "2026-10-19", hours: 1.5 },
    { date: "2026-10-20", hours: 2.0 },
    { date: "2026-10-21", hours: 2.5 },
    { date: "2026-10-22", hours: 3.0 },
    { date: "2026-10-23", hours: 1.0 },
    { date: "2026-10-24", hours: 0.0 },
    { date: "2026-10-25", hours: 2.5 },
    { date: "2026-10-26", hours: 2.0 },
    { date: "2026-10-27", hours: 3.0 },
  ],

  /* ---------------- 学习里程碑（时间线，新的写在最上面） ---------------- */
  timeline: [
    {
      date: "2026-10-27",
      title: "完成「学习进程看板」项目搭建",
      summary: "用 HTML/CSS/JS 做可视化看板，配置 GitHub Actions 自动部署到 GitHub Pages。",
      tags: ["前端", "项目"],
      log: "logs/2026-10-27.md",
    },
    {
      date: "2026-10-25",
      title: "掌握 Git 分支与合并",
      summary: "理解 branch / checkout / merge 与冲突解决，能在独立分支上安全改代码。",
      tags: ["Git"],
      log: "logs/2026-10-25.md",
    },
    {
      date: "2026-10-22",
      title: "完成二分查找与双指针专题",
      summary: "刷完 12 道相关题目，总结出「先写框架再填条件」的解题套路。",
      tags: ["算法"],
      log: "logs/2026-10-22.md",
    },
    {
      date: "2026-10-18",
      title: "用 CSS Grid 复刻响应式布局",
      summary: "实现一套在手机和桌面都能看的卡片布局，理解 fr、minmax、auto-fit。",
      tags: ["前端"],
      log: null,
    },
    {
      date: "2026-10-14",
      title: "Python 文件读写与异常处理",
      summary: "学会 with open 的正确姿势，以及 try/except/finally 的层级关系。",
      tags: ["Python"],
      log: "logs/2026-10-14.md",
    },
    {
      date: "2026-10-10",
      title: "学会 SQL 基础查询与联表",
      summary: "掌握 WHERE / GROUP BY / ORDER BY 和 INNER JOIN、LEFT JOIN 的区别。",
      tags: ["数据库"],
      log: null,
    },
    {
      date: "2026-10-05",
      title: "首次把代码提交到 GitHub",
      summary: "完成 git init → add → commit → push 全流程，配好 SSH 免密登录。",
      tags: ["Git"],
      log: null,
    },
    {
      date: "2026-09-28",
      title: "制定学习计划并完成环境搭建",
      summary: "装好 Python、VS Code、Git，把大目标拆成 6 个可量化的模块。",
      tags: ["计划"],
      log: null,
    },
  ],
};
