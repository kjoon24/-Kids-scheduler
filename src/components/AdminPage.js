// 어드민 페이지 컴포넌트
import {
  loadData,
  addChild,
  updateChild,
  removeChild,
  addSchedule,
  updateSchedule,
  removeSchedule,
  resetData,
  loadPresets,
  saveAsPreset,
  loadPreset,
  deletePreset,
  getActivePresetName,
} from "../data/store.js";
import { navigate } from "../utils/router.js";
import { toggleTheme } from "../main.js";

const EMOJI_OPTIONS = ["👧", "👦", "👶", "🧒", "👸", "🤴", "🧒"];
const ICON_OPTIONS = [
  { icon: "🏫", label: "학교" },
  { icon: "📚", label: "학원" },
  { icon: "🎹", label: "피아노" },
  { icon: "🔢", label: "수학" },
  { icon: "🥋", label: "태권도" },
  { icon: "🎨", label: "미술" },
  { icon: "🩰", label: "발레" },
  { icon: "⚽", label: "축구" },
  { icon: "🏊", label: "수영" },
  { icon: "🇺🇸", label: "영어" },
  { icon: "✏️", label: "논술" },
  { icon: "🧪", label: "과학" },
  { icon: "💻", label: "코딩" },
  { icon: "🌈", label: "유치원" },
];

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

let editingSchedule = null; // { childId, scheduleId } 또는 null
let activeChildTab = null; // 현재 선택된 아이 ID

export function renderAdminPage() {
  const data = loadData();

  // 활성 탭 초기화 (데이터가 있으면 첫째 아이)
  if (activeChildTab === null && data.length > 0) {
    activeChildTab = data[0].id;
  }
  // 삭제 등으로 현재 탭이 없어진 경우
  if (data.length > 0 && !data.find((c) => c.id === activeChildTab)) {
    activeChildTab = data[0].id;
  }

  const activeChild = data.find((c) => c.id === activeChildTab);

  // 탭 버튼
  const tabsHtml = data
    .map(
      (child) => `
    <button class="child-tab ${child.id === activeChildTab ? "child-tab-active" : ""}"
            data-action="switch-tab" data-child-id="${child.id}"
            style="--tab-color: ${child.color}">
      <span class="child-tab-emoji">${child.emoji}</span>
      <span class="child-tab-name">${child.name}</span>
    </button>
  `
    )
    .join("");

  // 선택된 아이의 카드만 렌더
  const activeCardHtml = activeChild
    ? `
    <div class="admin-child-card" style="--child-color: ${activeChild.color}">
      <div class="admin-child-header">
        <div class="admin-child-info">
          <span class="admin-child-emoji">${activeChild.emoji}</span>
          <input type="text" class="admin-child-name-input" value="${activeChild.name}" 
                 data-child-id="${activeChild.id}" placeholder="이름 입력" />
        </div>
        <div class="admin-child-actions">
          <select class="admin-emoji-select" data-child-id="${activeChild.id}">
            ${EMOJI_OPTIONS.map(
              (e) => `<option value="${e}" ${e === activeChild.emoji ? "selected" : ""}>${e}</option>`
            ).join("")}
          </select>
          <button class="btn btn-danger btn-sm" data-action="delete-child" data-child-id="${activeChild.id}">
            🗑️ 삭제
          </button>
        </div>
      </div>

      <div class="admin-schedules">
        <div class="admin-schedules-header">
          <h3>📅 일정 목록</h3>
          <button class="btn btn-primary btn-sm" data-action="add-schedule" data-child-id="${activeChild.id}">
            + 일정 추가
          </button>
        </div>

        ${
          activeChild.schedules.length === 0
            ? '<p class="admin-empty">등록된 일정이 없습니다</p>'
            : activeChild.schedules
                .map((s) => renderScheduleForm(activeChild.id, s))
                .join("")
        }
      </div>
    </div>
  `
    : '<p class="admin-empty">아이를 추가해 주세요</p>';

  return `
    <header class="dashboard-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="header-title">
            <span class="header-icon">⚙️</span>
            스케줄 관리
          </h1>
          <p class="header-subtitle">아이 등록 및 일정 관리</p>
        </div>
        <div class="header-right" style="display: flex; align-items: center; gap: 16px;">
          <button class="btn btn-ghost" id="btn-toggle-theme-admin" title="테마 변경" style="font-size: 1.5rem; padding: 8px;">
            ${document.documentElement.classList.contains("light-theme") ? "🌙" : "☀️"}
          </button>
          <button class="btn btn-ghost" id="btn-back-dashboard">
            📋 대시보드로 돌아가기
          </button>
        </div>
      </div>
    </header>

    <main class="admin-container">
      ${renderPresetSection()}

      <div class="admin-toolbar">
        <button class="btn btn-primary" id="btn-add-child">
          👶 아이 추가
        </button>
        <button class="btn btn-outline btn-danger-outline" id="btn-reset-data">
          🔄 기본값으로 초기화
        </button>
      </div>

      ${data.length > 0 ? `<div class="child-tabs">${tabsHtml}</div>` : ""}

      <div class="admin-children">
        ${activeCardHtml}
      </div>
    </main>
  `;
}

function renderPresetSection() {
  const presets = loadPresets();
  const activePreset = getActivePresetName();
  const presetNames = Object.keys(presets);

  const presetListHtml = presetNames.length > 0
    ? presetNames.map((name) => `
      <div class="preset-item ${name === activePreset ? 'preset-active' : ''}">
        <div class="preset-info">
          <span class="preset-icon">${name === activePreset ? '✅' : '📁'}</span>
          <span class="preset-name">${name}</span>
          ${name === activePreset ? '<span class="preset-badge">사용 중</span>' : ''}
        </div>
        <div class="preset-actions">
          ${name !== activePreset ? `
            <button class="btn btn-ghost btn-sm" data-action="load-preset" data-preset-name="${name}">
              📂 불러오기
            </button>
          ` : `
            <button class="btn btn-ghost btn-sm" data-action="update-preset" data-preset-name="${name}">
              💾 덮어쓰기
            </button>
          `}
          <button class="btn btn-danger btn-sm" data-action="delete-preset" data-preset-name="${name}">
            🗑️
          </button>
        </div>
      </div>
    `).join('')
    : '<p class="preset-empty">저장된 프리셋이 없습니다. 현재 일정을 프리셋으로 저장해 보세요!</p>';

  return `
    <div class="preset-section">
      <div class="preset-header">
        <div class="preset-title">
          <span>📋</span>
          <h3>일정 세트 (프리셋)</h3>
          ${activePreset ? `<span class="preset-current-badge">${activePreset}</span>` : ''}
        </div>
        <button class="btn btn-primary btn-sm" id="btn-save-preset">
          💾 현재 일정 저장
        </button>
      </div>
      <div class="preset-list">
        ${presetListHtml}
      </div>
    </div>
  `;
}

function renderScheduleForm(childId, schedule) {
  const isEditing =
    editingSchedule &&
    editingSchedule.childId === childId &&
    editingSchedule.scheduleId === schedule.id;

  if (isEditing) {
    return renderScheduleEditForm(childId, schedule);
  }

  const dayTags = schedule.days
    .map((d) => `<span class="day-tag active">${DAY_LABELS[d]}</span>`)
    .join("");

  const supplyTags = schedule.supplies
    .map((s) => `<span class="supply-tag">${s}</span>`)
    .join("");

  const taskTags = schedule.tasks
    .map((t) => `<span class="task-item">${t}</span>`)
    .join("");

  return `
    <div class="admin-schedule-item" data-schedule-id="${schedule.id}">
      <div class="admin-schedule-main">
        <div class="admin-schedule-info">
          <span class="admin-schedule-icon">${schedule.icon}</span>
          <div>
            <div class="admin-schedule-name">${schedule.name}</div>
            <div class="admin-schedule-type">${schedule.type === "school" ? "학교/유치원" : "학원"}</div>
          </div>
        </div>
        <div class="admin-schedule-actions">
          <button class="btn btn-ghost btn-sm" data-action="edit-schedule" 
                  data-child-id="${childId}" data-schedule-id="${schedule.id}">
            ✏️ 수정
          </button>
          <button class="btn btn-danger btn-sm" data-action="delete-schedule" 
                  data-child-id="${childId}" data-schedule-id="${schedule.id}">
            🗑️
          </button>
        </div>
      </div>
      <div class="admin-schedule-details">
        <div class="admin-detail-row">
          <span class="admin-detail-label">등원</span>
          <span>${schedule.departureTime} → ${schedule.arrivalTime}</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-label">하원</span>
          <span>${schedule.pickupTime} → ${schedule.returnTime}</span>
        </div>
        <div class="admin-detail-row">
          <span class="admin-detail-label">요일</span>
          <div class="day-tags">${dayTags}</div>
        </div>
        ${supplyTags ? `<div class="admin-detail-row"><span class="admin-detail-label">준비물</span><div class="supply-tags">${supplyTags}</div></div>` : ""}
        ${taskTags ? `<div class="admin-detail-row"><span class="admin-detail-label">할 일</span><div class="task-tags">${taskTags}</div></div>` : ""}
      </div>
    </div>
  `;
}

/**
 * 시/분 셀렉트 HTML 생성 (10분 단위)
 */
function renderTimeSelect(fieldName, timeValue) {
  const [h, m] = timeValue.split(":").map(Number);
  // 가장 가까운 10분 단위로 반올림
  const roundedMin = Math.round(m / 10) * 10 >= 60 ? 0 : Math.round(m / 10) * 10;

  const hourOptions = Array.from({ length: 24 }, (_, i) =>
    `<option value="${i}" ${i === h ? "selected" : ""}>${String(i).padStart(2, "0")}</option>`
  ).join("");

  const minOptions = [0, 10, 20, 30, 40, 50]
    .map((v) =>
      `<option value="${v}" ${v === roundedMin ? "selected" : ""}>${String(v).padStart(2, "0")}</option>`
    )
    .join("");

  return `
    <div class="time-select-group">
      <select class="form-select" data-time-field="${fieldName}" data-time-part="hour">
        ${hourOptions}
      </select>
      <span class="time-select-separator">:</span>
      <select class="form-select" data-time-field="${fieldName}" data-time-part="min">
        ${minOptions}
      </select>
    </div>
  `;
}

function renderScheduleEditForm(childId, schedule) {
  return `
    <div class="admin-schedule-edit" data-schedule-id="${schedule.id}">
      <div class="edit-form">
        <div class="form-row">
          <div class="form-group">
            <label>유형</label>
            <select class="form-select" data-field="type">
              <option value="school" ${schedule.type === "school" ? "selected" : ""}>학교/유치원</option>
              <option value="academy" ${schedule.type === "academy" ? "selected" : ""}>학원</option>
            </select>
          </div>
          <div class="form-group">
            <label>아이콘</label>
            <select class="form-select" data-field="icon">
              ${ICON_OPTIONS.map(
                (o) =>
                  `<option value="${o.icon}" ${o.icon === schedule.icon ? "selected" : ""}>${o.icon} ${o.label}</option>`
              ).join("")}
            </select>
          </div>
          <div class="form-group flex-grow">
            <label>이름</label>
            <input type="text" class="form-input" data-field="name" value="${schedule.name}" placeholder="예: 한빛초등학교" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>출발</label>
            ${renderTimeSelect("departureTime", schedule.departureTime)}
          </div>
          <div class="form-group">
            <label>도착</label>
            ${renderTimeSelect("arrivalTime", schedule.arrivalTime)}
          </div>
          <div class="form-group">
            <label>하원</label>
            ${renderTimeSelect("pickupTime", schedule.pickupTime)}
          </div>
          <div class="form-group">
            <label>귀가</label>
            ${renderTimeSelect("returnTime", schedule.returnTime)}
          </div>
        </div>
        <div class="form-row">
          <div class="form-group full-width">
            <label>요일</label>
            <div class="day-selector">
              ${DAY_LABELS.map(
                (label, i) =>
                  `<button type="button" class="day-btn ${schedule.days.includes(i) ? "active" : ""}" data-day="${i}">${label}</button>`
              ).join("")}
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group flex-grow">
            <label>준비물 <span class="form-hint">(쉼표로 구분)</span></label>
            <input type="text" class="form-input" data-field="supplies" 
                   value="${schedule.supplies.join(", ")}" placeholder="교과서, 필기도구, 물통" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group flex-grow">
            <label>할 일 <span class="form-hint">(쉼표로 구분)</span></label>
            <input type="text" class="form-input" data-field="tasks" 
                   value="${schedule.tasks.join(", ")}" placeholder="알림장 확인, 숙제 챙기기" />
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" data-action="save-schedule" 
                  data-child-id="${childId}" data-schedule-id="${schedule.id}">
            💾 저장
          </button>
          <button class="btn btn-ghost" data-action="cancel-edit">
            취소
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * 어드민 이벤트 바인딩 — AbortController로 중복 방지
 */
let currentAbortController = null;

export function bindAdminEvents(rerender) {
  // 이전 리스너 모두 해제
  if (currentAbortController) {
    currentAbortController.abort();
  }
  currentAbortController = new AbortController();
  const { signal } = currentAbortController;

  const app = document.getElementById("app");

  // 액션 버튼 클릭 (data-action 기반)
  app.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;
    const childId = btn.dataset.childId ? Number(btn.dataset.childId) : null;
    const scheduleId = btn.dataset.scheduleId || null;

    switch (action) {
      case "delete-child":
        if (confirm("정말 이 아이를 삭제하시겠어요?")) {
          removeChild(childId);
          rerender();
        }
        break;

      case "add-schedule": {
        const newSchedule = addSchedule(childId, {
          type: "academy",
          name: "새 일정",
          icon: "📚",
          departureTime: "15:00",
          arrivalTime: "15:15",
          pickupTime: "16:00",
          returnTime: "16:15",
          days: [1, 2, 3, 4, 5],
          tasks: [],
          supplies: [],
        });
        if (newSchedule) {
          editingSchedule = { childId, scheduleId: newSchedule.id };
          rerender();
        }
        break;
      }

      case "edit-schedule":
        editingSchedule = { childId, scheduleId };
        rerender();
        break;

      case "cancel-edit":
        editingSchedule = null;
        rerender();
        break;

      case "save-schedule":
        saveScheduleFromForm(childId, scheduleId);
        editingSchedule = null;
        rerender();
        break;

      case "delete-schedule":
        if (confirm("이 일정을 삭제하시겠어요?")) {
          removeSchedule(childId, scheduleId);
          rerender();
        }
        break;

      case "switch-tab":
        activeChildTab = childId;
        editingSchedule = null;
        rerender();
        break;

      case "load-preset": {
        const presetName = btn.dataset.presetName;
        if (confirm(`'${presetName}' 일정을 불러오시겠습니까? 현재 일정은 덮어쓰여집니다.`)) {
          loadPreset(presetName);
          rerender();
        }
        break;
      }

      case "update-preset": {
        const presetName = btn.dataset.presetName;
        if (confirm(`현재 일정을 '${presetName}'에 덮어쓰시겠습니까?`)) {
          saveAsPreset(presetName);
          rerender();
        }
        break;
      }

      case "delete-preset": {
        const presetName = btn.dataset.presetName;
        if (confirm(`'${presetName}' 일정을 삭제하시겠습니까?`)) {
          deletePreset(presetName);
          rerender();
        }
        break;
      }
    }
  }, { signal });

  // Day selector toggle
  app.addEventListener("click", (e) => {
    if (e.target.classList.contains("day-btn")) {
      e.target.classList.toggle("active");
    }
  }, { signal });

  // 아이 이름 변경
  app.addEventListener("change", (e) => {
    if (e.target.classList.contains("admin-child-name-input")) {
      const childId = Number(e.target.dataset.childId);
      updateChild(childId, { name: e.target.value });
    }
    if (e.target.classList.contains("admin-emoji-select")) {
      const childId = Number(e.target.dataset.childId);
      updateChild(childId, { emoji: e.target.value });
    }
  }, { signal });

  // 대시보드 돌아가기
  const backBtn = document.getElementById("btn-back-dashboard");
  if (backBtn) {
    backBtn.addEventListener("click", () => navigate("/"), { signal });
  }

  // 테마 변경
  const themeBtn = document.getElementById("btn-toggle-theme-admin");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      toggleTheme();
    }, { signal });

    // 테마 변경 시 아이콘 즉시 반영 (자신이 눌렀을 때도 포함)
    document.addEventListener("theme-changed", (e) => {
      themeBtn.textContent = e.detail.isLight ? "🌙" : "☀️";
    }, { signal });
  }

  // 아이 추가
  const addBtn = document.getElementById("btn-add-child");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      addChild({ name: "새 아이", emoji: "🧒" });
      rerender();
    }, { signal });
  }

  // 데이터 초기화
  const resetBtn = document.getElementById("btn-reset-data");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("모든 데이터를 기본값으로 초기화하시겠어요?\n현재 변경사항이 모두 사라집니다.")) {
        resetData();
        rerender();
      }
    }, { signal });
  }

  // 현재 일정 저장 (새 프리셋)
  const savePresetBtn = document.getElementById("btn-save-preset");
  if (savePresetBtn) {
    savePresetBtn.addEventListener("click", () => {
      const name = prompt("저장할 일정 세트의 이름을 입력하세요\n(예: 방학 스케줄, 새학기)");
      if (name && name.trim()) {
        saveAsPreset(name.trim());
        rerender();
      }
    }, { signal });
  }
}

/**
 * 어드민 이벤트 해제
 */
export function unbindAdminEvents() {
  if (currentAbortController) {
    currentAbortController.abort();
    currentAbortController = null;
  }
}

function saveScheduleFromForm(childId, scheduleId) {
  const editEl = document.querySelector(
    `.admin-schedule-edit[data-schedule-id="${scheduleId}"]`
  );
  if (!editEl) return;

  const getValue = (field) => {
    const el = editEl.querySelector(`[data-field="${field}"]`);
    return el ? el.value : "";
  };

  const activeDays = [];
  editEl.querySelectorAll(".day-btn.active").forEach((btn) => {
    activeDays.push(Number(btn.dataset.day));
  });

  const suppliesStr = getValue("supplies");
  const tasksStr = getValue("tasks");

  // 시/분 셀렉트에서 시간 값 수집
  const getTimeValue = (fieldName) => {
    const hourEl = editEl.querySelector(`[data-time-field="${fieldName}"][data-time-part="hour"]`);
    const minEl = editEl.querySelector(`[data-time-field="${fieldName}"][data-time-part="min"]`);
    if (!hourEl || !minEl) return "00:00";
    return `${String(hourEl.value).padStart(2, "0")}:${String(minEl.value).padStart(2, "0")}`;
  };

  const updates = {
    type: getValue("type"),
    icon: getValue("icon"),
    name: getValue("name"),
    departureTime: getTimeValue("departureTime"),
    arrivalTime: getTimeValue("arrivalTime"),
    pickupTime: getTimeValue("pickupTime"),
    returnTime: getTimeValue("returnTime"),
    days: activeDays.sort(),
    supplies: suppliesStr
      ? suppliesStr.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
    tasks: tasksStr
      ? tasksStr.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
  };

  updateSchedule(childId, scheduleId, updates);
}
