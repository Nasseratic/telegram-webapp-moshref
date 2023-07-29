export const SESSION_ID = (window as any)?.Telegram.WebApp?.initDataUnsafe
  ?.start_param;

export const USERNAME = (window as any)?.Telegram.WebApp?.initDataUnsafe?.user
  ?.username;

export const NAME = `${
  (window as any)?.Telegram.WebApp?.initDataUnsafe?.user?.first_name
} ${(window as any)?.Telegram.WebApp?.initDataUnsafe?.user?.last_name}`;
