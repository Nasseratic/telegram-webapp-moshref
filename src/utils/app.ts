export const SESSION_ID = (window as any)?.Telegram.WebApp?.initDataUnsafe
  ?.start_param;

export const USERNAME = (window as any)?.Telegram.WebApp?.initDataUnsafe?.user
  ?.username;
