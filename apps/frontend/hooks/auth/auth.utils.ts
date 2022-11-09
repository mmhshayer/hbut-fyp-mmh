import {
  LocalStorageAccessTokenKey,
  LocalStorageBackupAccessTokenKey,
} from './constants';

export function readAuthToken(): string {
  return window.localStorage.getItem(LocalStorageAccessTokenKey) || '';
}

export function saveAuthToken(token?: string) {
  window.localStorage.setItem(LocalStorageAccessTokenKey, token || '');
}

export function readBackupAuthToken(): string {
  return window.localStorage.getItem(LocalStorageBackupAccessTokenKey) || '';
}

export function saveBackupAuthToken(token?: string) {
  window.localStorage.setItem(LocalStorageBackupAccessTokenKey, token || '');
}
