import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export interface Notification {
  id?: string;
  status: boolean;
  title: string;
  text: string;
}

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notifications: [] as Notification[],
  }),
  actions: {
    pushNotification(notification: Notification) {
      const store = useNotificationStore();
      const item = { id: uuidv4(), ...notification };
      this.notifications.push(item);

      setTimeout(() => {
        store.removeNotification(item);
      }, 3000);
    },
    removeNotification(notification: Notification) {
      // console.log("remove", notification);
      // console.log(this);
      this.notifications = this.notifications.filter((el) => {
        //   console.log("current", el);
        return el.id !== notification.id;
      });
    },
  },

  getters: {
    getNotifications(state) {
      return state.notifications;
    },
  },
});
