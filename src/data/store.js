// localStorage 기반 데이터 저장/로드 관리
import { childrenData as defaultData } from "./schedules.js";

const STORAGE_KEY = "kids-schedule-data";

/**
 * localStorage에서 데이터 로드 (없으면 기본값 사용)
 */
export function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn("데이터 로드 실패, 기본값 사용:", e);
  }
  // 첫 실행: 기본 데이터 저장 후 반환
  saveData(defaultData);
  return [...defaultData];
}

/**
 * localStorage에 데이터 저장
 */
export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("데이터 저장 실패:", e);
    return false;
  }
}

/**
 * 아이 추가
 */
export function addChild(child) {
  const data = loadData();
  const newId = data.length > 0 ? Math.max(...data.map((c) => c.id)) + 1 : 1;

  const colors = [
    { color: "#6C5CE7", colorLight: "rgba(108, 92, 231, 0.15)", colorGlow: "rgba(108, 92, 231, 0.4)" },
    { color: "#00B894", colorLight: "rgba(0, 184, 148, 0.15)", colorGlow: "rgba(0, 184, 148, 0.4)" },
    { color: "#E17055", colorLight: "rgba(225, 112, 85, 0.15)", colorGlow: "rgba(225, 112, 85, 0.4)" },
    { color: "#0984E3", colorLight: "rgba(9, 132, 227, 0.15)", colorGlow: "rgba(9, 132, 227, 0.4)" },
    { color: "#FDCB6E", colorLight: "rgba(253, 203, 110, 0.15)", colorGlow: "rgba(253, 203, 110, 0.4)" },
  ];
  const colorSet = colors[(newId - 1) % colors.length];

  const newChild = {
    id: newId,
    name: child.name,
    emoji: child.emoji || "👧",
    ...colorSet,
    schedules: [],
  };

  data.push(newChild);
  saveData(data);
  return newChild;
}

/**
 * 아이 정보 수정
 */
export function updateChild(childId, updates) {
  const data = loadData();
  const idx = data.findIndex((c) => c.id === childId);
  if (idx === -1) return null;

  data[idx] = { ...data[idx], ...updates };
  saveData(data);
  return data[idx];
}

/**
 * 아이 삭제
 */
export function removeChild(childId) {
  const data = loadData();
  const filtered = data.filter((c) => c.id !== childId);
  saveData(filtered);
  return filtered;
}

/**
 * 스케줄 추가
 */
export function addSchedule(childId, schedule) {
  const data = loadData();
  const child = data.find((c) => c.id === childId);
  if (!child) return null;

  const newId = `s${childId}-${Date.now()}`;
  const newSchedule = {
    id: newId,
    type: schedule.type || "academy",
    name: schedule.name,
    icon: schedule.icon || "📚",
    departureTime: schedule.departureTime,
    arrivalTime: schedule.arrivalTime,
    pickupTime: schedule.pickupTime,
    returnTime: schedule.returnTime,
    days: schedule.days || [],
    tasks: schedule.tasks || [],
    supplies: schedule.supplies || [],
    suppliesByDay: schedule.suppliesByDay || {},
  };

  child.schedules.push(newSchedule);
  saveData(data);
  return newSchedule;
}

/**
 * 스케줄 수정
 */
export function updateSchedule(childId, scheduleId, updates) {
  const data = loadData();
  const child = data.find((c) => c.id === childId);
  if (!child) return null;

  const idx = child.schedules.findIndex((s) => s.id === scheduleId);
  if (idx === -1) return null;

  child.schedules[idx] = { ...child.schedules[idx], ...updates };
  saveData(data);
  return child.schedules[idx];
}

/**
 * 스케줄 삭제
 */
export function removeSchedule(childId, scheduleId) {
  const data = loadData();
  const child = data.find((c) => c.id === childId);
  if (!child) return null;

  child.schedules = child.schedules.filter((s) => s.id !== scheduleId);
  saveData(data);
  return child;
}

/**
 * 데이터 초기화 (기본값으로 복원)
 */
export function resetData() {
  saveData(defaultData);
  return [...defaultData];
}

// ===== 프리셋 (일정 세트) 관리 =====

const PRESETS_KEY = "kids-schedule-presets";
const ACTIVE_PRESET_KEY = "kids-schedule-active-preset";

/**
 * 모든 프리셋 목록 로드
 * @returns {{ [presetName: string]: childrenData[] }}
 */
export function loadPresets() {
  try {
    const stored = localStorage.getItem(PRESETS_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn("프리셋 로드 실패:", e);
  }
  return {};
}

/**
 * 프리셋 저장
 */
function savePresets(presets) {
  localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
}

/**
 * 현재 활성 프리셋 이름 조회
 */
export function getActivePresetName() {
  return localStorage.getItem(ACTIVE_PRESET_KEY) || "";
}

/**
 * 활성 프리셋 이름 설정
 */
export function setActivePresetName(name) {
  localStorage.setItem(ACTIVE_PRESET_KEY, name);
}

/**
 * 현재 스케줄을 프리셋으로 저장
 */
export function saveAsPreset(name) {
  const presets = loadPresets();
  const currentData = loadData();
  presets[name] = JSON.parse(JSON.stringify(currentData)); // deep copy
  savePresets(presets);
  setActivePresetName(name);
  return presets;
}

/**
 * 프리셋 불러오기 (현재 스케줄을 교체)
 */
export function loadPreset(name) {
  const presets = loadPresets();
  if (!presets[name]) return null;
  const presetData = JSON.parse(JSON.stringify(presets[name]));
  saveData(presetData);
  setActivePresetName(name);
  return presetData;
}

/**
 * 프리셋 삭제
 */
export function deletePreset(name) {
  const presets = loadPresets();
  delete presets[name];
  savePresets(presets);
  if (getActivePresetName() === name) {
    setActivePresetName("");
  }
  return presets;
}

/**
 * 프리셋 이름 변경
 */
export function renamePreset(oldName, newName) {
  const presets = loadPresets();
  if (!presets[oldName] || presets[newName]) return null;
  presets[newName] = presets[oldName];
  delete presets[oldName];
  savePresets(presets);
  if (getActivePresetName() === oldName) {
    setActivePresetName(newName);
  }
  return presets;
}
