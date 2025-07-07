import { describe, it, expect } from "vitest";
import { unified } from "unified";
import parse from "remark-parse";
import stringify from "remark-stringify";
import inlineCodeClass from "../src/index";

describe("remark-inline-code-class", () => {
  it("should not modify inline code without prefix nor inline class specified", () => {
    const processor = unified().use(parse).use(inlineCodeClass).use(stringify);

    const input = "`example`";
    const expectedOutput = "`example`";

    const result = processor.processSync(input).toString().trim();
    expect(result).toBe(expectedOutput);
  });

  it("should add inline class if specified", () => {
    const processor = unified()
      .use(parse)
      .use(inlineCodeClass, { inlineClass: "inline" })
      .use(stringify);

    const input = "`example`";
    const expectedOutput = '<code class="inline">example</code>';

    const result = processor.processSync(input).toString().trim();
    expect(result).toBe(expectedOutput);
  });

  it("should add prefix as class name", () => {
    const processor = unified().use(parse).use(inlineCodeClass).use(stringify);

    const input = "`my-class:example`";
    const expectedOutput = '<code class="my-class">example</code>';

    const result = processor.processSync(input).toString().trim();
    expect(result).toBe(expectedOutput);
  });

  it("should add inline class and prefix as class name", () => {
    const processor = unified()
      .use(parse)
      .use(inlineCodeClass, { inlineClass: "inline" })
      .use(stringify);

    const input = "`my-class:example`";
    const expectedOutput = '<code class="inline my-class">example</code>';

    const result = processor.processSync(input).toString().trim();
    expect(result).toBe(expectedOutput);
  });

  it("should respect custom separator", () => {
    const processor = unified()
      .use(parse)
      .use(inlineCodeClass, { separator: "::" })
      .use(stringify);

    const input = "`my-class::example`";
    const expectedOutput = '<code class="my-class">example</code>';

    const result = processor.processSync(input).toString().trim();
    expect(result).toBe(expectedOutput);
  });
});
