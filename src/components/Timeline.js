// 타임라인 컴포넌트
import { parseTime, getScheduleStatus } from "../utils/timeUtils.js";
import { getTimeRange } from "../utils/scheduler.js";

export function renderTimeline(schedules, childColor, now) {
  if (schedules.length === 0) {
    return `<div class="timeline-empty">오늘 일정이 없습니다 😊</div>`;
  }

  const range = getTimeRange(schedules);
  const rangeStart = parseTime(range.start);
  const rangeEnd = parseTime(range.end);
  const totalMs = rangeEnd - rangeStart;

  // 현재 시간 위치
  const nowPos = Math.min(100, Math.max(0, ((now - rangeStart) / totalMs) * 100));

  // 스케줄 블록
  const blocks = schedules
    .map((s) => {
      const start = ((parseTime(s.departureTime) - rangeStart) / totalMs) * 100;
      const end = ((parseTime(s.returnTime) - rangeStart) / totalMs) * 100;
      const width = end - start;
      const status = getScheduleStatus(s, now);
      const isActive = ["departing", "in-class", "returning"].includes(status);
      const isCompleted = status === "completed";

      return `
      <div class="timeline-block ${isActive ? "timeline-active" : ""} ${isCompleted ? "timeline-completed" : ""}"
           style="left: ${start}%; width: ${width}%; --block-color: ${childColor}"
           title="${s.name}: ${s.departureTime} ~ ${s.returnTime}">
        <span class="timeline-block-label">${s.icon}</span>
      </div>
    `;
    })
    .join("");

  // 시간 마커
  const startHour = rangeStart.getHours();
  const endHour = rangeEnd.getHours() + 1;
  let markers = "";
  for (let h = startHour; h <= endHour; h++) {
    const hTime = parseTime(`${String(h).padStart(2, "0")}:00`);
    const pos = ((hTime - rangeStart) / totalMs) * 100;
    if (pos >= 0 && pos <= 100) {
      markers += `<span class="timeline-marker" style="left: ${pos}%">${h}시</span>`;
    }
  }

  return `
    <div class="timeline-container">
      <div class="timeline-track">
        ${blocks}
        <div class="timeline-now" style="left: ${nowPos}%">
          <div class="timeline-now-dot"></div>
          <div class="timeline-now-line"></div>
        </div>
      </div>
      <div class="timeline-markers">
        ${markers}
      </div>
    </div>
  `;
}
