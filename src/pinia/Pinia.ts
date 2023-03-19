import { defineStore } from 'pinia';

export const useStore = defineStore("MyPinia", {
  // 状态变量
  state: () => {
    return {
      Timer: 1000 * 60,
      TimeSlot: Date.now()
    };
  }
});