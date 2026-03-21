// 硫붿씤 ??吏꾩엯?????쇱슦??湲곕컲
import { loadData } from "./data/store.js";
import { renderHeader, updateHeaderTime, bindHeaderEvents } from "./components/Header.js";
import { renderChildCard } from "./components/ChildCard.js";
import { renderAdminPage, bindAdminEvents } from "./components/AdminPage.js";
import { registerRoute, initRouter, navigate } from "./utils/router.js";
import { requestWakeLock } from "./utils/wakeLock.js";
import { requestNotificationPermission, checkAndNotify } from "./utils/notifier.js";
import "./styles/index.css";
import "./styles/admin.css";

const app = document.getElementById("app");
let updateInterval = null;

// ===== ?뚮쭏 愿由?=====
export function toggleTheme() {
  const root = document.documentElement;
  const isLight = root.classList.toggle("light-theme");
  localStorage.setItem("kids-schedule-theme", isLight ? "light" : "dark");
  
  // 踰꾪듉 ?꾩씠肄??낅뜲?댄듃 ?대깽?몃? ?몃━嫄?(UI ?숆린?붿슜)
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
 * ??쒕낫???섏씠吏 ?뚮뜑留? */
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
    <button class="nav-admin-btn" id="btn-go-admin" title="?ㅼ?以?愿由?>
      ?숋툘
    </button>
  `;

  // ?대뱶誘?踰꾪듉 ?대깽??  document.getElementById("btn-go-admin")?.addEventListener("click", () => {
    navigate("/admin");
  });

  // ?ㅻ뜑 ?대깽??(?뚮쭏 ?좉? ?ы븿) 諛붿씤??  bindHeaderEvents();

  // ?ㅼ떆媛??낅뜲?댄듃 ?쒖옉
  startRealtimeUpdate(data);
}

/**
 * ?대뱶誘??섏씠吏 ?뚮뜑留? */
function renderAdmin() {
  // ?ㅼ떆媛??낅뜲?댄듃 以묒?
  stopRealtimeUpdate();

  const rerender = () => {
    app.innerHTML = renderAdminPage();
    bindAdminEvents(rerender);
  };

  // 珥덇린 ?뚮뜑留?+ ?대깽??諛붿씤??(??踰덈쭔)
  rerender();
}

/**
 * ?ㅼ떆媛??낅뜲?댄듃 (1珥?媛꾧꺽)
 */
function startRealtimeUpdate(data) {
  stopRealtimeUpdate();

  updateInterval = setInterval(() => {
    const now = new Date();
    const currentData = loadData();

    // ?ㅻ뜑 ?쒓컙 ?낅뜲?댄듃
    updateHeaderTime(now);
    checkAndNotify(currentData, now);

    // ?ㅼ?以?移대뱶 ?댁슜 ?낅뜲?댄듃
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

// ?쇱슦???깅줉
registerRoute("/", renderDashboard);
registerRoute("/admin", renderAdmin);

// 湲곕낯 ?ㅼ젙 珥덇린??initTheme();
requestWakeLock();
requestNotificationPermission();

// ?쇱슦??珥덇린??initRouter();

