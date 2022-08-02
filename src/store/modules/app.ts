import storage from '@/utils/storage';
import { defineStore } from 'pinia';

const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    device: 'desktop',
    sidebar: {
      opened: storage.localGet('sidebarStatus')
        ? !!+storage.localGet('sidebarStatus')
        : true,
      withoutAnimation: false
    },
    size: storage.localGet('size') || 'default'
  }),
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        storage.localSet('sidebarStatus', 1);
      } else {
        storage.localSet('sidebarStatus', 0);
      }
    },
    closeSideBar(withoutAnimation) {
      storage.localSet('sidebarStatus', 0);
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleDevice(device) {
      this.device = device;
    },
    setSize(size) {
      this.size = size;
      storage.localSet('size', size);
    }
  }
});

export default useAppStore;
