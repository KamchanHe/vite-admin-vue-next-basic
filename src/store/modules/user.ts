import { defineStore } from 'pinia';
import { login, logout, getInfo } from '@/api/user';
import {
  getToken as authGetToken,
  setToken as authSetToken,
  removeToken as authRemoveToken
} from '@/utils/auth';
import { resetRouter } from '@/router';

const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: authGetToken(),
    nickname: '',
    avatar: '',
    roles: []
  }),
  actions: {
    async RESET_STATE() {
      this.$reset();
    },
    /**
     * 登录
     */
    login(loginData) {
      const { username, password } = loginData;
      return new Promise((resolve, reject) => {
        login({
          username: username.trim(),
          password: password
        })
          .then(({ data }) => {
            const { token } = data;
            authSetToken(token);
            this.token = token;
            resolve(token);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     *  获取用户信息（昵称、头像、角色集合、权限集合）
     */
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getInfo(this.token)
          .then(({ data }) => {
            if (!data) {
              reject(new Error('Verification failed, please Login again.'));
            }

            const { roles, name, avatar } = data;

            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
              reject(new Error('getInfo: roles must be a non-null array!'));
            }
            this.nickname = name;
            this.avatar = avatar;
            this.roles = roles;
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    /**
     *  注销
     */
    logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            authRemoveToken();
            this.RESET_STATE();
            resetRouter();
            resolve(null);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    /**
     * 清除 Token
     */
    resetToken() {
      return new Promise((resolve) => {
        authRemoveToken();
        this.RESET_STATE();
        resolve(null);
      });
    }
  }
});

export default useUserStore;
