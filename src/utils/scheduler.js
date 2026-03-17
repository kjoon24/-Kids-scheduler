// 스케줄 필터링 및 정렬 유틸리티

import { parseTime, getScheduleStatus } from "./timeUtils.js";

/**
 * 오늘 요일에 해당하는 스케줄만 필터링
 */
export function getTodaySchedules(child, now = new Date()) {
  const dayOfWeek = now.getDay(); // 0=일, 1=월, ...
  return child.schedules.filter((s) => s.days.includes(dayOfWeek));
}

/**
 * 시간순 정렬
 */
export function sortByTime(schedules) {
  return [...schedules].sort((a, b) => {
    return parseTime(a.departureTime) - parseTime(b.departureTime);
  });
}

/**
 * 오늘 준비물 목록 (요일별 준비물 포함)
 */
export function getTodaySupplies(schedule, now = new Date()) {
  const dayOfWeek = now.getDay();
  const base = [...schedule.supplies];
  const extra = schedule.suppliesByDay?.[dayOfWeek] || [];
  return [...base, ...extra];
}

/**
 * 이전/현재/다음 스케줄 분류
 */
export function categorizeSchedules(child, now = new Date()) {
  const todaySchedules = sortByTime(getTodaySchedules(child, now));

  const previous = [];
  const current = [];
  const upcoming = [];

  for (const schedule of todaySchedules) {
    const status = getScheduleStatus(schedule, now);

    if (status === "completed") {
      previous.push({ ...schedule, status });
    } else if (["departing", "in-class", "returning"].includes(status)) {
      current.push({ ...schedule, status });
    } else {
      upcoming.push({ ...schedule, status });
    }
  }

  return { previous, current, upcoming, all: todaySchedules };
}

/**
 * 타임라인용 전체 시간 범위 계산
 */
export function getTimeRange(schedules) {
  if (schedules.length === 0) return { start: "08:00", end: "18:00" };

  let earliest = parseTime(schedules[0].departureTime);
  let latest = parseTime(schedules[0].returnTime);

  for (const s of schedules) {
    const dep = parseTime(s.departureTime);
    const ret = parseTime(s.returnTime);
    if (dep < earliest) earliest = dep;
    if (ret > latest) latest = ret;
  }

  // 30분 여유
  earliest = new Date(earliest.getTime() - 30 * 60 * 1000);
  latest = new Date(latest.getTime() + 30 * 60 * 1000);

  const fmtH = (d) => String(d.getHours()).padStart(2, "0");
  const fmtM = (d) => String(d.getMinutes()).padStart(2, "0");

  return {
    start: `${fmtH(earliest)}:${fmtM(earliest)}`,
    end: `${fmtH(latest)}:${fmtM(latest)}`,
  };
}
