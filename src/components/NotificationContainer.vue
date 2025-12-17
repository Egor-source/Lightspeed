<script setup lang="ts">
import BannerComponent from "@/components/UI/BannerComponent.vue";
import { useStore } from "vuex";
import { RootState } from "@/store/interfaces/RootState";
import { computed, ref } from "vue";
import { Notification } from "@/interfaces/Notification";

const store = useStore<RootState>();
const notifications = computed(
  () => store.getters["notification/getNotifications"]
);
const removeNotification = (notificationId: Notification["id"]) => {
  store.commit("notification/removeNotification", notificationId);
};

const translateX = ref(0);
const draggingNotificationId = ref<Notification["id"]>(null);
let startX = 0;

const startSwipe = (e: PointerEvent, notificationId: Notification["id"]) => {
  startX = e.clientX;
  draggingNotificationId.value = notificationId;
};
const move = (event: PointerEvent) => {
  if (!draggingNotificationId.value) return;
  translateX.value = Math.max(event.clientX - startX, 0);
};

const end = () => {
  if (translateX.value > 100) {
    removeNotification(draggingNotificationId.value);
  }
  translateX.value = 0;
  draggingNotificationId.value = null;
  startX = 0;
};
</script>

<template>
  <div
    class="notifications"
    @pointermove="move"
    @pointerup="end"
    @pointercancel="end"
    @mouseleave="end"
  >
    <transition-group name="notification" tag="div" class="notifications__list">
      <banner-component
        v-for="notification in notifications"
        :key="notification.id"
        class="notification"
        :style="{
          '--translate-x': `${
            draggingNotificationId === notification.id ? translateX : 0
          }px`,
        }"
        :type="notification.type"
        @remove="() => removeNotification(notification.id)"
        @pointerdown="(e: PointerEvent)=>startSwipe(e, notification.id)"
      >
        {{ notification.text }}
      </banner-component>
    </transition-group>
  </div>
</template>

<style scoped>
.notifications {
  position: fixed;
  top: 70px;
  right: 15px;
  width: 290px;
  z-index: 1000;
}

.notification {
  touch-action: pan-y;
  user-select: none;
  transform: translateX(var(--translate-x));
}

.notifications__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notifications__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notification-enter-from {
  transform: translateX(120%);
  opacity: 0;
}
.notification-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.notification-enter-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.notification-leave-from {
  transform: translateX(var(--translate-x));
  opacity: 1;
}
.notification-leave-to {
  transform: translateX(120%);
  opacity: 0;
}
.notification-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>
