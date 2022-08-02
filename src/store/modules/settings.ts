import { defineStore } from 'pinia';
import defaultSettings from '../../settings';
import storage from '@/utils/storage';

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;
const el = document.documentElement;

export const useSettingStore = defineStore({
  id: 'setting',
  state: () => ({
    theme:
      storage.localGet('theme') ||
      getComputedStyle(el).getPropertyValue('--el-color-primary'),
    showSettings: showSettings,
    tagsView:
      storage.localGet('tagsView') != null
        ? storage.localGet('tagsView')
        : tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
  }),
  actions: {
    async changeSetting({ key, value }) {
      if (Object.prototype.hasOwnProperty.call(this, [key])) {
        this[key] = value;
      }
    }
  }
});

export default useSettingStore;
