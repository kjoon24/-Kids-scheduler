export function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
    return;
  }
  if (Notification.permission !== "denied" && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

const notifiedSchedules = new Set();

export function checkAndNotify(childList, now) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  childList.forEach(child => {
    child.schedules.forEach(schedule => {
      const todayKey = ${now.getFullYear()}--_;
      if (notifiedSchedules.has(todayKey)) return;

      if (!schedule.departureTime) return;
      
      const [depH, depM] = schedule.departureTime.split(':').map(Number);
      const depMinutes = depH * 60 + depM;
      
      if (depMinutes - currentMinutes <= 5 && depMinutes - currentMinutes >= 0) {
        new Notification(스케줄 알림: , {
          body: ${schedule.name} 스케줄 시작 5분 전입니다. ()
        });
        notifiedSchedules.add(todayKey);
      }
    });
  });
}
