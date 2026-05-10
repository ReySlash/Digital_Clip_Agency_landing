import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  assertLoginAttemptAllowed,
  clearFailedLoginAttempts,
  getRemainingAttempts,
  recordFailedLoginAttempt,
} from "@/lib/login-abuse-protection";

describe("login abuse protection", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("assertLoginAttemptAllowed", () => {
    it("allows the first attempt", () => {
      expect(() =>
        assertLoginAttemptAllowed("192.168.1.1", "admin@example.com")
      ).not.toThrow();
    });

    it("allows attempts below the threshold", () => {
      for (let i = 0; i < 4; i++) {
        recordFailedLoginAttempt("192.168.1.2", "user@example.com");
      }

      expect(() =>
        assertLoginAttemptAllowed("192.168.1.2", "user@example.com")
      ).not.toThrow();
    });

    it("throws after the threshold is reached", () => {
      for (let i = 0; i < 5; i++) {
        recordFailedLoginAttempt("192.168.1.3", "target@example.com");
      }

      expect(() =>
        assertLoginAttemptAllowed("192.168.1.3", "target@example.com")
      ).toThrow("RateLimited");
    });

    it("ignores email case", () => {
      recordFailedLoginAttempt("192.168.1.4", "Mixed@example.com");

      expect(() =>
        assertLoginAttemptAllowed("192.168.1.4", "mixed@example.com")
      ).not.toThrow();
    });

    it("allows after the window expires", () => {
      for (let i = 0; i < 5; i++) {
        recordFailedLoginAttempt("192.168.1.5", "old@example.com");
      }

      vi.advanceTimersByTime(15 * 60 * 1000 + 1);

      expect(() =>
        assertLoginAttemptAllowed("192.168.1.5", "old@example.com")
      ).not.toThrow();
    });
  });

  describe("getRemainingAttempts", () => {
    it("returns 5 when no attempts have been made", () => {
      expect(
        getRemainingAttempts("192.168.1.10", "fresh@example.com")
      ).toBe(5);
    });

    it("decrements on each failed attempt", () => {
      recordFailedLoginAttempt("192.168.1.11", "counter@example.com");
      expect(
        getRemainingAttempts("192.168.1.11", "counter@example.com")
      ).toBe(4);

      recordFailedLoginAttempt("192.168.1.11", "counter@example.com");
      expect(
        getRemainingAttempts("192.168.1.11", "counter@example.com")
      ).toBe(3);
    });

    it("returns 0 when the threshold is reached", () => {
      for (let i = 0; i < 5; i++) {
        recordFailedLoginAttempt("192.168.1.12", "full@example.com");
      }

      expect(
        getRemainingAttempts("192.168.1.12", "full@example.com")
      ).toBe(0);
    });
  });

  describe("clearFailedLoginAttempts", () => {
    it("resets the counter to full after a successful login", () => {
      recordFailedLoginAttempt("192.168.1.20", "reset@example.com");
      recordFailedLoginAttempt("192.168.1.20", "reset@example.com");
      recordFailedLoginAttempt("192.168.1.20", "reset@example.com");

      expect(
        getRemainingAttempts("192.168.1.20", "reset@example.com")
      ).toBe(2);

      clearFailedLoginAttempts("192.168.1.20", "reset@example.com");

      expect(
        getRemainingAttempts("192.168.1.20", "reset@example.com")
      ).toBe(5);
    });
  });
});
