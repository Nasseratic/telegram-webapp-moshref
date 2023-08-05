export const SESSION_ID =
  (window as any)?.Telegram.WebApp?.initDataUnsafe?.start_param ?? 22;

export const USERNAME =
  (window as any)?.Telegram.WebApp?.initDataUnsafe?.user?.username ??
  "@test123456";

export const NAME = `${
  (window as any)?.Telegram.WebApp?.initDataUnsafe?.user?.first_name
} ${(window as any)?.Telegram.WebApp?.initDataUnsafe?.user?.last_name}`;
