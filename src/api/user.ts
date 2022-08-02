import { _get, _post } from '@/utils/request';

export function login(data) {
  return _post('/vue-admin-template/user/login', data);
}

export function getInfo(token) {
  return _get('/vue-admin-template/user/info', { token });
}

export function logout() {
  return _post('/vue-admin-template/user/logout');
}
