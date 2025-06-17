import { newHashTable } from "./index.ts";

describe("HashTable", () => {
  let hashTable: ReturnType<typeof newHashTable>;

  beforeEach(() => {
    hashTable = newHashTable(10);
  });

  test("put and get", () => {
    hashTable.put("key1", "value1");
    expect(hashTable.get("key1")).toBe("value1");

    hashTable.put("key2", { value: "value2" });
    expect(hashTable.get("key2")).toEqual({ value: "value2" });
  });

  test("get non-existing key", () => {
    expect(hashTable.get("nonExistingKey")).toBeUndefined();
  });

  test("remove existing key", () => {
    hashTable.put("key1", "value1");
    hashTable.remove("key1");
    expect(hashTable.get("key1")).toBeUndefined();
  });

  test("remove non-existing key", () => {
    hashTable.remove("nonExistingKey");
    expect(hashTable.size).toBe(0);
  });

  test("put with existing key updates value", () => {
    hashTable.put("key1", "value1");
    hashTable.put("key1", "newValue1");
    expect(hashTable.get("key1")).toBe("newValue1");
  });

  test("size of the hash table", () => {
    expect(hashTable.size).toBe(0);
    hashTable.put("key1", "value1");
    expect(hashTable.size).toBe(1);
    hashTable.put("key2", "value2");
    expect(hashTable.size).toBe(2);
    hashTable.remove("key1");
    expect(hashTable.size).toBe(1);
  });
});
