class SoundManager {
  private clickAudio: HTMLAudioElement | null = null;
  private alarmAudio: HTMLAudioElement | null = null;
  private initialized = false;

  init() {
    if (this.initialized) return;

    // Hardcoded URLs
    this.clickAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/1109/1109-preview.mp3');
    this.alarmAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/600/600-preview.mp3');

    // Preload them
    this.clickAudio.load();
    this.alarmAudio.load();

    // Silently play and pause to unlock audio on mobile/browsers
    const silentPlay = () => {
      this.clickAudio?.play().then(() => {
        this.clickAudio?.pause();
        this.clickAudio!.currentTime = 0;
      }).catch(() => {});
      
      this.alarmAudio?.play().then(() => {
        this.alarmAudio?.pause();
        this.alarmAudio!.currentTime = 0;
      }).catch(() => {});
      
      this.initialized = true;
      window.removeEventListener('click', silentPlay);
      window.removeEventListener('keydown', silentPlay);
    };

    window.addEventListener('click', silentPlay);
    window.addEventListener('keydown', silentPlay);
  }

  playClick() {
    if (this.clickAudio) {
      this.clickAudio.currentTime = 0;
      this.clickAudio.play().catch(e => console.log("Audio play blocked:", e));
    }
  }

  playAlarm() {
    if (this.alarmAudio) {
      this.alarmAudio.currentTime = 0;
      this.alarmAudio.play().catch(e => console.log("Audio play blocked:", e));
    }
  }
}

export const soundManager = new SoundManager();
