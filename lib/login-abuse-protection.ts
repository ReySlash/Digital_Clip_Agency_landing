const LOGIN_ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 5;

type LoginAttemptEntry = {
  count: number;
  expiresAt: number;
};

const attemptStore = new Map<string, LoginAttemptEntry>();

function deriveKey(ip: string, email: string): string {
  return `${ip}::${email.toLowerCase()}`;
}

function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of attemptStore.entries()) {
    if (entry.expiresAt <= now) {
      attemptStore.delete(key);
    }
  }
}

export function assertLoginAttemptAllowed(ip: string, email: string): void {
  cleanupExpiredEntries();

  const entry = attemptStore.get(deriveKey(ip, email));

  if (entry && entry.expiresAt > Date.now()) {
    if (entry.count >= LOGIN_MAX_ATTEMPTS) {
      throw new Error("RateLimited");
    }
  }
}

export function recordFailedLoginAttempt(ip: string, email: string): void {
  cleanupExpiredEntries();

  const key = deriveKey(ip, email);
  const entry = attemptStore.get(key);
  const now = Date.now();

  if (entry && entry.expiresAt > now) {
    entry.count += 1;
  } else {
    attemptStore.set(key, {
      count: 1,
      expiresAt: now + LOGIN_ATTEMPT_WINDOW_MS,
    });
  }
}

export function clearFailedLoginAttempts(ip: string, email: string): void {
  attemptStore.delete(deriveKey(ip, email));
}

export function getRemainingAttempts(ip: string, email: string): number {
  cleanupExpiredEntries();

  const entry = attemptStore.get(deriveKey(ip, email));
  const now = Date.now();

  if (!entry || entry.expiresAt <= now) {
    return LOGIN_MAX_ATTEMPTS;
  }

  return Math.max(0, LOGIN_MAX_ATTEMPTS - entry.count);
}
