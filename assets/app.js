/* ============================================================
 *  学习进程看板 —— 渲染逻辑
 *  页面所有内容都来自 data/progress.js，改数据即可，不用动这里。
 * ============================================================ */
(function () {
  "use strict";

  var D = window.LEARNING_DATA || {};
  var profile = D.profile || {};
  var modules = D.modules || [];
  var daily = (D.daily || []).slice().sort(function (a, b) {
    return a.date < b.date ? -1 : 1;
  });
  var timeline = (D.timeline || []).slice().sort(function (a, b) {
    return a.date < b.date ? 1 : -1;
  });

  /* ---------------- 日期工具 ---------------- */
  function parseDate(s) {
    var p = String(s).split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function fmt(d) {
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" + m : m) + "-" + (day < 10 ? "0" + day : day);
  }
  function addDays(d, n) {
    var x = new Date(d.getTime());
    x.setDate(x.getDate() + n);
    return x;
  }
  function daysBetween(a, b) {
    return Math.round((b - a) / 86400000);
  }
  function one(n) {
    return Math.round(n * 10) / 10;
  }

  var dailyMap = {};
  daily.forEach(function (d) { dailyMap[d.date] = d.hours; });

  var totalHours = daily.reduce(function (s, d) { return s + d.hours; }, 0);
  var activeDays = daily.filter(function (d) { return d.hours > 0; }).length;
  var totalTasks = modules.reduce(function (s, m) { return s + m.total; }, 0);
  var doneTasks = modules.reduce(function (s, m) { return s + m.done; }, 0);
  var percent = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  /* 连续打卡天数（从最后一天往前数） */
  var streak = 0;
  for (var i = daily.length - 1; i >= 0; i--) {
    if (daily[i].hours > 0) streak++;
    else if (i === daily.length - 1) continue;
    else break;
  }
  var last7 = daily.slice(-7).reduce(function (s, d) { return s + d.hours; }, 0);

  /* ---------------- 头部 ---------------- */
  function renderHero() {
    document.title = profile.title || "学习进程看板";
    set("brandTitle", profile.title || "学习进程看板");
    set("heroEyebrow", "Learning Progress");
    set("heroTitle", (profile.name ? profile.name + " 的" : "") + "编程学习进程");
    set("heroSubtitle", profile.subtitle || "");
    set("heroMotto", profile.motto ? "「" + profile.motto + "」" : "");

    var meta = [];
    if (profile.startDate) meta.push("开始于 " + profile.startDate);
    if (profile.targetDate) {
      var left = daysBetween(new Date(), parseDate(profile.targetDate));
      meta.push(left >= 0 ? "距离目标还有 " + left + " 天" : "目标日期已过 " + -left + " 天");
    }
    meta.push("共 " + modules.length + " 个学习模块");
    set("heroMeta", meta.map(function (t) { return '<span class="chip">' + t + "</span>"; }).join(""));

    if (profile.repoUrl) {
      var a = document.getElementById("repoLink");
      a.href = profile.repoUrl;
    } else {
      var r = document.getElementById("repoLink");
      if (r) r.style.display = "none";
    }

    var ring = document.getElementById("ringFg");
    var C = 2 * Math.PI * 56;
    ring.setAttribute("stroke-dasharray", C.toFixed(2));
    setTimeout(function () {
      ring.setAttribute("stroke-dashoffset", (C * (1 - percent / 100)).toFixed(2));
    }, 150);
    countUp(document.getElementById("ringPercent"), percent, "%");
  }

  function set(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function countUp(el, target, suffix) {
    if (!el) return;
    var cur = 0, step = Math.max(1, Math.ceil(target / 40));
    var t = setInterval(function () {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = cur + (suffix || "");
    }, 25);
  }

  /* ---------------- 统计卡片 ---------------- */
  function renderStats() {
    var cards = [
      { label: "累计学习时长", value: one(totalHours) + "<small> 小时</small>", ratio: Math.min(1, totalHours / 150) },
      { label: "完成任务", value: doneTasks + "<small> / " + totalTasks + "</small>", ratio: percent / 100 },
      { label: "连续打卡", value: streak + "<small> 天</small>", ratio: Math.min(1, streak / 30) },
      { label: "近 7 天时长", value: one(last7) + "<small> 小时</small>", ratio: Math.min(1, last7 / 20) },
    ];
    document.getElementById("stats").innerHTML = cards.map(function (c) {
      return '<div class="stat"><div class="label">' + c.label + '</div>' +
        '<div class="value">' + c.value + '</div>' +
        '<div class="bar"><i style="width:' + (c.ratio * 100).toFixed(0) + '%"></i></div></div>';
    }).join("");

    var extra = "活跃 " + activeDays + " 天 · 平均每天 " + (activeDays ? one(totalHours / activeDays) : 0) + " 小时";
    set("modulesHint", "共 " + totalTasks + " 个任务，已完成 " + doneTasks + " 个（" + extra + "）");
  }

  /* ---------------- 模块进度 ---------------- */
  function renderModules() {
    document.getElementById("moduleList").innerHTML = modules.map(function (m) {
      var p = m.total ? Math.round((m.done / m.total) * 100) : 0;
      return '<div class="module">' +
        '<div class="module-top"><span class="module-dot" style="background:' + m.color + '"></span>' +
        '<span class="module-name">' + esc(m.name) + '</span>' +
        '<span class="module-pct" style="color:' + m.color + '">' + p + '%</span></div>' +
        '<p class="module-desc">' + esc(m.desc || "") + '</p>' +
        '<div class="module-bar"><i data-w="' + p + '" style="background:' + m.color + '"></i></div>' +
        '<div class="module-foot"><span>' + m.done + " / " + m.total + " 个任务</span><span>" + (m.hours || 0) + " 小时</span></div>" +
        "</div>";
    }).join("");

    requestAnimationFrame(function () {
      document.querySelectorAll(".module-bar i").forEach(function (el) {
        el.style.width = el.dataset.w + "%";
      });
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---------------- 热力图 ---------------- */
  function renderHeatmap() {
    var WEEKS = 17;
    var last = daily.length ? parseDate(daily[daily.length - 1].date) : new Date();
    var end = new Date() > last ? new Date() : last;
    var idx = (end.getDay() + 6) % 7;            // 周一 = 0
    var endOfWeek = addDays(end, 6 - idx);
    var start = addDays(endOfWeek, -(WEEKS * 7 - 1));

    var html = '<div class="heatmap"><div class="weekday-label">' +
      ["一", "二", "三", "四", "五", "六", "日"].map(function (w, i) {
        return "<span>" + (i % 2 === 0 ? w : "") + "</span>";
      }).join("") + "</div>";

    for (var w = 0; w < WEEKS; w++) {
      html += '<div class="week">';
      for (var d = 0; d < 7; d++) {
        var day = addDays(start, w * 7 + d);
        var key = fmt(day);
        var h = dailyMap[key] || 0;
        var lv = h === 0 ? 0 : h < 1.5 ? 1 : h < 2.5 ? 2 : h < 3.5 ? 3 : 4;
        var future = day > end;
        html += '<div class="day lv' + lv + '" title="' + key + "：" + h + " 小时" + '"' +
          (future ? ' style="opacity:.25"' : "") + "></div>";
      }
      html += "</div>";
    }
    html += "</div>";
    document.getElementById("heatmapWrap").innerHTML = html;
  }

  /* ---------------- 近 14 天柱状图 ---------------- */
  function renderChart() {
    var data = daily.slice(-14);
    if (!data.length) return;
    var W = 340, H = 150, pad = 22;
    var max = Math.max(4, Math.max.apply(null, data.map(function (d) { return d.hours; })));
    var bw = (W - pad) / data.length;
    var svg = '<svg viewBox="0 0 ' + W + " " + H + '">';

    [0, 0.5, 1].forEach(function (r) {
      var y = pad + (H - pad * 2) * r;
      svg += '<line x1="' + pad + '" x2="' + W + '" y1="' + y + '" y2="' + y +
        '" stroke="currentColor" stroke-opacity=".08" stroke-width="1"/>';
    });

    data.forEach(function (d, i) {
      var h = (d.hours / max) * (H - pad * 2);
      var x = pad + i * bw;
      var y = H - pad - h;
      svg += '<rect class="bar" x="' + (x + bw * 0.18).toFixed(1) + '" y="' + (H - pad) +
        '" width="' + (bw * 0.64).toFixed(1) + '" height="0" rx="3" fill="url(#barGrad)" data-y="' + y.toFixed(1) +
        '" data-h="' + Math.max(h, 1.5).toFixed(1) + '"><title>' + d.date + "：" + d.hours + " 小时</title></rect>";
      if (i % 2 === 0) {
        svg += '<text class="axis-text" x="' + (x + bw / 2).toFixed(1) + '" y="' + (H - 6) +
          '" text-anchor="middle">' + d.date.slice(5) + "</text>";
      }
    });

    svg += '<defs><linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#4f7cff"/><stop offset="100%" stop-color="#a55eea"/>' +
      "</linearGradient></defs></svg>";

    document.getElementById("chartWrap").innerHTML = svg;
    requestAnimationFrame(function () {
      document.querySelectorAll("#chartWrap .bar").forEach(function (r) {
        r.setAttribute("y", r.dataset.y);
        r.setAttribute("height", r.dataset.h);
      });
    });
    set("chartHint", "共 " + one(data.reduce(function (s, d) { return s + d.hours; }, 0)) + " 小时 · 日均 " +
      one(data.reduce(function (s, d) { return s + d.hours; }, 0) / data.length) + " 小时");
  }

  /* ---------------- 时间线 ---------------- */
  function renderTimeline() {
    document.getElementById("timelineList").innerHTML = timeline.map(function (t) {
      var tags = (t.tags || []).map(function (g) { return '<span class="tag">' + esc(g) + "</span>"; }).join("");
      var link = t.log && profile.repoUrl
        ? '<a class="tl-link" href="' + profile.repoUrl + "/blob/main/" + t.log + '" target="_blank" rel="noopener">查看日志 →</a>'
        : '<span class="tl-link">暂无单独日志</span>';
      return '<li class="tl-item">' +
        '<div class="tl-date">' + t.date + "</div>" +
        '<div class="tl-title">' + esc(t.title) + "</div>" +
        '<p class="tl-summary">' + esc(t.summary || "") + "</p>" +
        '<div class="tl-tags">' + tags + link + "</div></li>";
    }).join("");
    set("timelineHint", "共 " + timeline.length + " 个里程碑 · 最新：" + (timeline[0] ? timeline[0].date : "—"));
  }

  /* ---------------- 主题 ---------------- */
  function initTheme() {
    var saved = localStorage.getItem("lp-theme");
    if (!saved) saved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    applyTheme(saved);
    document.getElementById("themeToggle").addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("lp-theme", next);
    });
  }
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    document.getElementById("themeIcon").textContent = t === "dark" ? "☀️" : "🌙";
  }

  /* ---------------- 启动 ---------------- */
  renderHero();
  renderStats();
  renderModules();
  renderHeatmap();
  renderChart();
  renderTimeline();
  initTheme();
  set("footerText", "© " + new Date().getFullYear() + " " + (profile.name || "") + " · 用 Git 记录每一步成长");
})();
