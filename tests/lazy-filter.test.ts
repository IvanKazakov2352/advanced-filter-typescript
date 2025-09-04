import { LazyFilter } from "../src/modules";
import { User } from "./mock";

describe("LazyFilter", () => {
  let filter: LazyFilter<User>;

  beforeEach(() => {
    filter = new LazyFilter<User>();
  });

  describe("methods", () => {
    test("streamFilter method exists", () => {
      expect(filter.streamFilter).toBeDefined();
      expect(typeof filter.streamFilter).toBe("function");
    });

    test("batchFilter method exists", () => {
      expect(filter.batchFilter).toBeDefined();
      expect(typeof filter.batchFilter).toBe("function");
    });
  });
});
