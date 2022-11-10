import { LocalStorageCurrentCompanyKey } from './constants';

export function readCurrentCompanyId(): string {
  return window.localStorage.getItem(LocalStorageCurrentCompanyKey) || '';
}

export function saveCurrentCompanyId(id?: string) {
  window.localStorage.setItem(LocalStorageCurrentCompanyKey, id || '');
}
