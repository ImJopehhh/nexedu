import { prisma } from "./prisma";

const RATE_LIMIT_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

// Note: In a production environment with multiple instances,
// use Redis or a database-backed rate limiter.
// For this base, we'll use a simple in-memory map or a dedicated DB table.
// Let's use a simple in-memory approach for demonstration, 
// but mention it should be moved to Redis for production.

interface RateLimitRecord {
    attempts: number;
    lastAttempt: number;
    lockUntil: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remainingAttempts: number; retryAfter?: number }> {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record) {
        rateLimitMap.set(ip, { attempts: 0, lastAttempt: now, lockUntil: 0 });
        return { allowed: true, remainingAttempts: RATE_LIMIT_ATTEMPTS };
    }

    if (record.lockUntil > now) {
        return { allowed: false, remainingAttempts: 0, retryAfter: Math.ceil((record.lockUntil - now) / 1000) };
    }

    // Reset if last attempt was long ago (e.g. over duration)
    if (now - record.lastAttempt > LOCKOUT_DURATION_MS) {
        record.attempts = 0;
    }

    if (record.attempts >= RATE_LIMIT_ATTEMPTS) {
        record.lockUntil = now + LOCKOUT_DURATION_MS;
        return { allowed: false, remainingAttempts: 0, retryAfter: LOCKOUT_DURATION_MS / 1000 };
    }

    return { allowed: true, remainingAttempts: RATE_LIMIT_ATTEMPTS - record.attempts };
}

export async function registerLoginAttempt(ip: string, success: boolean) {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record) {
        if (!success) {
            rateLimitMap.set(ip, { attempts: 1, lastAttempt: now, lockUntil: 0 });
        }
        return;
    }

    if (success) {
        rateLimitMap.delete(ip);
    } else {
        record.attempts += 1;
        record.lastAttempt = now;
        if (record.attempts >= RATE_LIMIT_ATTEMPTS) {
            record.lockUntil = now + LOCKOUT_DURATION_MS;
        }
    }
}
