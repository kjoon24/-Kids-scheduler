// Header 컴포넌트
import { formatCurrentTime, formatCurrentDate } from "../utils/timeUtils.js";
import { toggleTheme } from "../main.js";

export function renderHeader(now) {
  return `
    <header class="dashboard-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="header-title">
            <span class="header-icon">📋</span>
            우리 아이 스케줄
          </h1>
          <p class="header-subtitle">오늘의 등하원 일정을 한눈에</p>
        </div>
        <div class="header-right" style="display: flex; align-items: center; gap: 16px;">
          <div>
            <div class="header-date">${formatCurrentDate(now)}</div>
            <div class="header-time" id="header-time">${formatCurrentTime(now)}</div>
          </div>
          <button class="btn btn-ghost" id="btn-toggle-theme" title="테마 변경" style="font-size: 1.5rem; padding: 8px;">
            ${document.documentElement.classList.contains("light-theme") ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  `;
}

export function updateHeaderTime(now) {
  const el = document.getElementById("header-time");
  if (el) el.textContent = formatCurrentTime(now);
}

export function bindHeaderEvents() {
  const toggleBtn = document.getElementById("btn-toggle-theme");
  if (toggleBtn) {
    // 테마 토글 버튼 클릭 이벤트
    toggleBtn.addEventListener("click", () => {
      toggleTheme();
    });

    // 테마 변경 이벤트 발생 시 아이콘 업데이트
    document.addEventListener("theme-changed", (e) => {
      toggleBtn.textContent = e.detail.isLight ? "🌙" : "☀️";
    });
  }
}
