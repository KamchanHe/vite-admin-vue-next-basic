import { defineStore } from 'pinia';

const useErrorLogStore = defineStore({
  id: 'errorLog',
  state: () => ({
    logs: []
  }),
  actions: {
    addErrorLog(log) {
      this.logs.push(log);
    },
    clearErrorLog() {
      this.logs.splice(0);
    }
  }
});

export default useErrorLogStore;
