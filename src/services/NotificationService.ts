import { useWaterStore } from '../store/waterStore';

class NotificationService {
  private static instance: NotificationService;
  private timer: number | null = null;
  private lastNotificationTime: number = 0;

  private constructor() {
    // Private constructor for singleton
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  private isWithinTimeRange(startTime: string, endTime: string): boolean {
    const now = new Date();
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    const start = new Date(now);
    start.setHours(startHour, startMinute, 0);
    
    const end = new Date(now);
    end.setHours(endHour, endMinute, 0);

    return now >= start && now <= end;
  }

  startReminders(intervalMinutes: number, startTime: string, endTime: string) {
    this.stopReminders();

    this.timer = window.setInterval(() => {
      const now = Date.now();
      const timeSinceLastNotification = now - this.lastNotificationTime;
      const minimumInterval = intervalMinutes * 60 * 1000;

      if (
        timeSinceLastNotification >= minimumInterval &&
        this.isWithinTimeRange(startTime, endTime)
      ) {
        this.checkAndNotify();
        this.lastNotificationTime = now;
      }
    }, 60 * 1000); // Check every minute
  }

  stopReminders() {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }

  private checkAndNotify() {
    if (Notification.permission !== 'granted') return;

    const { getTodayTotal, dailyGoal } = useWaterStore.getState();
    const todayTotal = getTodayTotal();
    const progress = (todayTotal / dailyGoal) * 100;
    
    let message = 'Remember to drink water and stay hydrated!';
    
    if (progress < 25) {
      message = "You're way behind your daily goal! Time to catch up on hydration!";
    } else if (progress < 50) {
      message = "You're less than halfway to your goal. Keep drinking water!";
    } else if (progress < 75) {
      message = "Good progress, but still more to go! Stay hydrated!";
    } else if (progress < 100) {
      message = "Almost there! Just a bit more to reach your daily goal!";
    }

    new Notification('Time to Hydrate! 💧', {
      body: message,
      icon: '/vite.svg',
      badge: '/vite.svg',
      tag: 'hydration-reminder',
      renotify: true
    });
  }
}

export const notificationService = NotificationService.getInstance();