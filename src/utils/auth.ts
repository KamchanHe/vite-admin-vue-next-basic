import storage from '@/utils/storage';

const TokenKey = 'Admin-Token';
const TenantKey = 'Admin-Tenant';

export function getToken() {
  return storage.localGet(TokenKey);
}

export function setToken(token) {
  return storage.localSet(TokenKey, token);
}

export function removeToken() {
  return storage.localRemove(TokenKey);
}

export function getTenant() {
  return storage.localGet(TenantKey);
}

export function setTenant(tenant) {
  return storage.localSet(TenantKey, tenant);
}

export function removeTenant() {
  return storage.localRemove(TenantKey);
}
