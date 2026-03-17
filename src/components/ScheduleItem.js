// 개별 스케줄 항목 컴포넌트
import {
  getScheduleStatus,
  getStatusLabel,
  getStatusClass,
  getProgressPercentage,
  getTimeRemaining,
} from "../utils/timeUtils.js";
import { getTodaySupplies } from "../utils/scheduler.js";

export function renderScheduleItem(schedule, childColor, now) {
  const status = getScheduleStatus(schedule, now);
  const statusLabel = getStatusLabel(status);
  const statusClass = getStatusClass(status);
  const supplies = getTodaySupplies(schedule, now);
  const isActive = ["departing", "in-class", "returning"].includes(status);
  const isCompleted = status === "completed";

  // 진행 바 계산
  let progressHtml = "";
  let timeRemainingHtml = "";

  if (status === "departing") {
    const pct = getProgressPercentage(schedule.departureTime, schedule.arrivalTime, now);
    const remaining = getTimeRemaining(schedule.arrivalTime, now);
    progressHtml = `
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${pct}%; background: ${childColor}"></div>
      </div>
    `;
    timeRemainingHtml = `<span class="time-remaining">${remaining}</span>`;
  } else if (status === "in-class") {
    const pct = getProgressPercentage(schedule.arrivalTime, schedule.pickupTime, now);
    const remaining = getTimeRemaining(schedule.pickupTime, now);
    progressHtml = `
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${pct}%; background: ${childColor}"></div>
      </div>
    `;
    timeRemainingHtml = `<span class="time-remaining">${remaining}</span>`;
  } else if (status === "returning") {
    const pct = getProgressPercentage(schedule.pickupTime, schedule.returnTime, now);
    const remaining = getTimeRemaining(schedule.returnTime, now);
    progressHtml = `
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${pct}%; background: ${childColor}"></div>
      </div>
    `;
    timeRemainingHtml = `<span class="time-remaining">${remaining}</span>`;
  } else if (status === "upcoming") {
    const remaining = getTimeRemaining(schedule.departureTime, now);
    timeRemainingHtml = `<span class="time-remaining upcoming-remaining">${remaining}</span>`;
  }

  // 준비물 & 할일
  const suppliesHtml =
    supplies.length > 0
      ? `
    <div class="schedule-supplies">
      <span class="supplies-label">🎒 준비물</span>
      <div class="supplies-list">
        ${supplies.map((s) => `<span class="supply-tag">${s}</span>`).join("")}
      </div>
    </div>
  `
      : "";

  const tasksHtml =
    schedule.tasks.length > 0
      ? `
    <div class="schedule-tasks">
      <span class="tasks-label">✅ 할 일</span>
      <div class="tasks-list">
        ${schedule.tasks.map((t) => `<span class="task-item">${t}</span>`).join("")}
      </div>
    </div>
  `
      : "";

  return `
    <div class="schedule-item ${statusClass} ${isActive ? "active-glow" : ""}" 
         style="${isActive ? `--child-color: ${childColor}` : ""}"
         data-schedule-id="${schedule.id}">
      <div class="schedule-header">
        <div class="schedule-name">
          <span class="schedule-icon">${schedule.icon}</span>
          <span>${schedule.name}</span>
        </div>
        <div class="schedule-status-badge ${statusClass}">
          ${isActive ? '<span class="pulse-dot"></span>' : ""}
          ${statusLabel}
          ${timeRemainingHtml}
        </div>
      </div>
      
      <div class="schedule-times">
        <div class="time-block">
          <span class="time-label">등원</span>
          <span class="time-value">${schedule.departureTime}</span>
          <span class="time-arrow">→</span>
          <span class="time-value">${schedule.arrivalTime}</span>
        </div>
        <div class="time-block">
          <span class="time-label">하원</span>
          <span class="time-value">${schedule.pickupTime}</span>
          <span class="time-arrow">→</span>
          <span class="time-value">${schedule.returnTime}</span>
        </div>
      </div>

      ${progressHtml}

      <div class="schedule-details ${isCompleted ? "details-dimmed" : ""}">
        ${suppliesHtml}
        ${tasksHtml}
      </div>
    </div>
  `;
}
