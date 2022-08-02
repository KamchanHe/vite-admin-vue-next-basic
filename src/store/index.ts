import useUserStore from './modules/user';
import useErrorLogStore from './modules/errorLog';
import useAppStore from './modules/app';
import usePermissionStore from './modules/permission';
import useSettingStore from './modules/settings';
import useTagsViewStore from './modules/tagsView';

const useStore = () => ({
  user: useUserStore(),
  errorLog: useErrorLogStore(),
  app: useAppStore(),
  permission: usePermissionStore(),
  setting: useSettingStore(),
  tagsView: useTagsViewStore()
});

export default useStore;
