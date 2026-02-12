import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval + 100));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});

test("Cache stores and retrieves multiple entries", () => {
  const cache = new Cache(5000);

  cache.add("key1", "value1");
  cache.add("key2", { data: "value2" });
  cache.add("key3", [1, 2, 3]);

  expect(cache.get("key1")).toBe("value1");
  expect(cache.get("key2")).toEqual({ data: "value2" });
  expect(cache.get("key3")).toEqual([1, 2, 3]);

  cache.stopReapLoop();
});

test("Cache returns undefined for non-existent key", () => {
  const cache = new Cache(5000);

  const result = cache.get("nonexistent");
  expect(result).toBe(undefined);

  cache.stopReapLoop();
});

test("Cache can update existing entries", () => {
  const cache = new Cache(5000);

  cache.add("key", "original");
  expect(cache.get("key")).toBe("original");

  cache.add("key", "updated");
  expect(cache.get("key")).toBe("updated");

  cache.stopReapLoop();
});
