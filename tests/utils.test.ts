import { GeneratorUtils } from "../src/modules";
import { generateLargeUserDataset } from "./mock";

describe("Utils", () => {
  describe("generator utils", () => {
    test("toArray", () => {
      const data = generateLargeUserDataset(10);
      const result = GeneratorUtils.toArray(data);

      expect(result).toHaveLength(10);
    });

    test("take", () => {
      const data = generateLargeUserDataset(10);
      const takedResult = GeneratorUtils.take(data, 5);
      const result = GeneratorUtils.toArray(takedResult)

      expect(result).toHaveLength(5);
    });

    test("skip", () => {
      const data = generateLargeUserDataset(10);
      const takedResult = GeneratorUtils.skip(data, 2);
      const result = GeneratorUtils.toArray(takedResult)

      expect(result).toHaveLength(8);
    });
  });
});
