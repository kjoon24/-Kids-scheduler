// 간단한 SPA 라우터
const routes = {};
let currentRoute = null;

/**
 * 라우트 등록
 */
export function registerRoute(path, handler) {
  routes[path] = handler;
}

/**
 * 페이지 이동
 */
export function navigate(path) {
  if (currentRoute === path) return;
  currentRoute = path;
  window.location.hash = path;
  renderCurrentRoute();
}

/**
 * 현재 라우트 렌더링
 */
function renderCurrentRoute() {
  const path = currentRoute || "/";
  const handler = routes[path];
  if (handler) {
    handler();
  }
}

/**
 * 라우터 초기화
 */
export function initRouter() {
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.slice(1) || "/";
    currentRoute = hash;
    renderCurrentRoute();
  });

  // 초기 라우트
  const initialHash = window.location.hash.slice(1) || "/";
  currentRoute = initialHash;
  renderCurrentRoute();
}

export function getCurrentRoute() {
  return currentRoute || "/";
}
