const rateLimit = new Map();

/**
 * Check if a request is within the rate limit.
 * @param {string} key - Unique key (e.g., IP hash + action)
 * @param {number} limit - Max requests allowed in the window
 * @param {number} windowMs - Time window in milliseconds
 * @returns {boolean} true if allowed, false if rate limited
 */
export function checkRateLimit(key, limit, windowMs) {
  const now = Date.now();
  const timestamps = rateLimit.get(key) || [];
  const valid = timestamps.filter((t) => now - t < windowMs);

  if (valid.length >= limit) return false;

  valid.push(now);
  rateLimit.set(key, valid);
  return true;
}
