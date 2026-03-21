let wakeLockObj = null;

export async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      wakeLockObj = await navigator.wakeLock.request('screen');
      console.log('Wake Lock is active!');
      
      document.addEventListener('visibilitychange', async () => {
        if (wakeLockObj !== null && document.visibilityState === 'visible') {
          wakeLockObj = await navigator.wakeLock.request('screen');
        }
      });
    }
  } catch (err) {
    console.error(Wake Lock Error: , );
  }
}
