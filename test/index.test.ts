import { describe, it, expect } from "vitest";
import { unified } from "unified";
import parse from "remark-parse";
import stringify from "remark-stringify";
import inlineCodeClass from "../src/index";

describe("remark-inline-code-class", () => {
  it("should add class name to inline code if class names are not restricted", () => {
    const processor = unified().use(parse).use(inlineCodeClass).use(stringify);

    const input = "`my-class:example`";
    const expectedOutput = '<code class="my-class">example</code>';

    const result = processor.processSync(input).toString().trim();
    expect(result).toBe(expectedOutput);
  });

  it("should add class to inline code with custom separator", () => {
    const processor = unified()
      .use(parse)
      .use(inlineCodeClass, { separator: "::" })
      .use(stringify);

    const input = "`my-class::example`";
    const expectedOutput = '<code class="my-class">example</code>';

    const result = processor.processSync(input).toString().trim();
    expect(result).toBe(expectedOutput);
  });

  it("should not modify inline code without prefix", () => {
    const processor = unified().use(parse).use(inlineCodeClass).use(stringify);

    const input = "`example`";
    const expectedOutput = "`example`";

    const result = processor.processSync(input).toString().trim();
    expect(result).toBe(expectedOutput);
  });
});
