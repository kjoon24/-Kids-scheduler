// 아이별 카드 컴포넌트
import { categorizeSchedules, sortByTime, getTodaySchedules } from "../utils/scheduler.js";
import { renderScheduleItem } from "./ScheduleItem.js";
import { renderTimeline } from "./Timeline.js";

export function renderChildCard(child, now) {
  const todaySchedules = sortByTime(getTodaySchedules(child, now));
  const { previous, current, upcoming } = categorizeSchedules(child, now);
  const hasSchedules = todaySchedules.length > 0;

  // 이전 스케줄 (최근 1개만)
  const prevHtml =
    previous.length > 0
      ? `
    <div class="schedule-section section-previous">
      <div class="section-label">
        <span class="section-dot completed"></span>
        이전 일정
      </div>
      ${previous
        .slice(-1)
        .map((s) => renderScheduleItem(s, child.color, now))
        .join("")}
    </div>
  `
      : "";

  // 현재 스케줄
  const currentHtml =
    current.length > 0
      ? `
    <div class="schedule-section section-current">
      <div class="section-label">
        <span class="section-dot active"></span>
        현재 진행 중
      </div>
      ${current.map((s) => renderScheduleItem(s, child.color, now)).join("")}
    </div>
  `
      : "";

  // 다음 스케줄 (최대 2개)
  const nextHtml =
    upcoming.length > 0
      ? `
    <div class="schedule-section section-upcoming">
      <div class="section-label">
        <span class="section-dot upcoming"></span>
        다음 일정
      </div>
      ${upcoming
        .slice(0, 2)
        .map((s) => renderScheduleItem(s, child.color, now))
        .join("")}
    </div>
  `
      : "";

  // 일정 없을 때
  const noScheduleHtml = !hasSchedules
    ? `<div class="no-schedule">
        <span class="no-schedule-icon">🎉</span>
        <p>오늘은 일정이 없어요!</p>
      </div>`
    : "";

  // 모든 일정 완료
  const allDoneHtml =
    hasSchedules && current.length === 0 && upcoming.length === 0
      ? `<div class="all-done">
          <span class="all-done-icon">✨</span>
          <p>오늘 일정을 모두 마쳤어요!</p>
        </div>`
      : "";

  return `
    <div class="child-card" style="--child-color: ${child.color}; --child-color-light: ${child.colorLight}; --child-color-glow: ${child.colorGlow}" data-child-id="${child.id}">
      <div class="child-card-header">
        <div class="child-avatar" style="background: ${child.color}">
          ${child.emoji}
        </div>
        <div class="child-info">
          <h2 class="child-name">${child.name}</h2>
          <span class="child-schedule-count">${todaySchedules.length}개 일정</span>
        </div>
      </div>

      <div class="child-timeline" data-child-timeline="${child.id}">
        ${renderTimeline(todaySchedules, child.color, now)}
      </div>

      <div class="child-schedules" data-child-schedules="${child.id}">
        ${noScheduleHtml}
        ${prevHtml}
        ${currentHtml}
        ${nextHtml}
        ${allDoneHtml}
      </div>
    </div>
  `;
}
