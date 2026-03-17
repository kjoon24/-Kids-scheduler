// 시간 관련 유틸리티 함수

/**
 * "HH:MM" 문자열을 오늘 날짜의 Date 객체로 변환
 */
export function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
}

/**
 * 두 시각 사이의 진행률 (0~100)
 */
export function getProgressPercentage(startTime, endTime, now = new Date()) {
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  const total = end - start;
  const elapsed = now - start;

  if (total <= 0) return 0;
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

/**
 * 남은 시간을 문자열로 반환
 */
export function getTimeRemaining(targetTime, now = new Date()) {
  const target = parseTime(targetTime);
  const diff = target - now;

  if (diff <= 0) return "지남";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) return `${hours}시간 ${minutes}분 남음`;
  return `${minutes}분 남음`;
}

/**
 * 현재 시각을 "HH:MM:SS" 형식으로 반환
 */
export function formatCurrentTime(now = new Date()) {
  return now.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

/**
 * 현재 날짜를 "YYYY년 M월 D일 (요일)" 형식으로 반환
 */
export function formatCurrentDate(now = new Date()) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = days[now.getDay()];
  return `${year}년 ${month}월 ${date}일 (${day})`;
}

/**
 * 스케줄 상태 판별
 * "completed" | "departing" | "in-class" | "returning" | "upcoming" | "inactive"
 */
export function getScheduleStatus(schedule, now = new Date()) {
  const departure = parseTime(schedule.departureTime);
  const arrival = parseTime(schedule.arrivalTime);
  const pickup = parseTime(schedule.pickupTime);
  const returnT = parseTime(schedule.returnTime);

  if (now >= returnT) return "completed";
  if (now >= pickup) return "returning";
  if (now >= arrival) return "in-class";
  if (now >= departure) return "departing";

  // 30분 전부터 upcoming
  const thirtyMinBefore = new Date(departure.getTime() - 30 * 60 * 1000);
  if (now >= thirtyMinBefore) return "upcoming";

  return "inactive";
}

/**
 * 스케줄 상태 한글 라벨
 */
export function getStatusLabel(status) {
  const labels = {
    completed: "완료",
    departing: "이동 중",
    "in-class": "수업 중",
    returning: "귀가 중",
    upcoming: "곧 출발",
    inactive: "예정",
  };
  return labels[status] || status;
}

/**
 * 스케줄 상태에 따른 CSS 클래스
 */
export function getStatusClass(status) {
  const classes = {
    completed: "status-completed",
    departing: "status-active",
    "in-class": "status-active",
    returning: "status-active",
    upcoming: "status-upcoming",
    inactive: "status-inactive",
  };
  return classes[status] || "";
}
