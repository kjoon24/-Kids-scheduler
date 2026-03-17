// 메인 앱 진입점 — 라우터 기반
import { loadData } from "./data/store.js";
import { renderHeader, updateHeaderTime, bindHeaderEvents } from "./components/Header.js";
import { renderChildCard } from "./components/ChildCard.js";
import { renderAdminPage, bindAdminEvents } from "./components/AdminPage.js";
import { registerRoute, initRouter, navigate } from "./utils/router.js";
import "./styles/index.css";
import "./styles/admin.css";

const app = document.getElementById("app");
let updateInterval = null;

// ===== 테마 관리 =====
export function toggleTheme() {
  const root = document.documentElement;
  const isLight = root.classList.toggle("light-theme");
  localStorage.setItem("kids-schedule-theme", isLight ? "light" : "dark");
  
  // 버튼 아이콘 업데이트 이벤트를 트리거 (UI 동기화용)
  document.dispatchEvent(new CustomEvent("theme-changed", { detail: { isLight } }));
}

function initTheme() {
  const savedTheme = localStorage.getItem("kids-schedule-theme");
  if (savedTheme === "light") {
    document.documentElement.classList.add("light-theme");
  }
}
// ====================

/**
 * 대시보드 페이지 렌더링
 */
function renderDashboard() {
  const now = new Date();
  const data = loadData();

  const childrenCards = data
    .map((child) => renderChildCard(child, now))
    .join("");

  app.innerHTML = `
    ${renderHeader(now)}
    <main class="dashboard-grid">
      ${childrenCards}
    </main>
    <button class="nav-admin-btn" id="btn-go-admin" title="스케줄 관리">
      ⚙️
    </button>
  `;

  // 어드민 버튼 이벤트
  document.getElementById("btn-go-admin")?.addEventListener("click", () => {
    navigate("/admin");
  });

  // 헤더 이벤트 (테마 토글 포함) 바인딩
  bindHeaderEvents();

  // 실시간 업데이트 시작
  startRealtimeUpdate(data);
}

/**
 * 어드민 페이지 렌더링
 */
function renderAdmin() {
  // 실시간 업데이트 중지
  stopRealtimeUpdate();

  const rerender = () => {
    app.innerHTML = renderAdminPage();
    bindAdminEvents(rerender);
  };

  // 초기 렌더링 + 이벤트 바인딩 (한 번만)
  rerender();
}

/**
 * 실시간 업데이트 (1초 간격)
 */
function startRealtimeUpdate(data) {
  stopRealtimeUpdate();

  updateInterval = setInterval(() => {
    const now = new Date();
    const currentData = loadData();

    // 헤더 시간 업데이트
    updateHeaderTime(now);

    // 스케줄 카드 내용 업데이트
    currentData.forEach((child) => {
      const schedulesEl = document.querySelector(
        `[data-child-schedules="${child.id}"]`
      );
      const timelineEl = document.querySelector(
        `[data-child-timeline="${child.id}"]`
      );

      if (schedulesEl) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = renderChildCard(child, now);

        const newSchedules = tempDiv.querySelector(
          `[data-child-schedules="${child.id}"]`
        );
        const newTimeline = tempDiv.querySelector(
          `[data-child-timeline="${child.id}"]`
        );

        if (newSchedules && schedulesEl.innerHTML !== newSchedules.innerHTML) {
          schedulesEl.innerHTML = newSchedules.innerHTML;
        }

        if (timelineEl && newTimeline && timelineEl.innerHTML !== newTimeline.innerHTML) {
          timelineEl.innerHTML = newTimeline.innerHTML;
        }
      }
    });
  }, 1000);
}

function stopRealtimeUpdate() {
  if (updateInterval) {
    clearInterval(updateInterval);
    updateInterval = null;
  }
}

// 라우트 등록
registerRoute("/", renderDashboard);
registerRoute("/admin", renderAdmin);

// 기본 설정 초기화
initTheme();

// 라우터 초기화
initRouter();
