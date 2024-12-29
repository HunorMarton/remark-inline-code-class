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

  it("should add class to inline code only if class name is listed", () => {
    const processor = unified()
      .use(parse)
      .use(inlineCodeClass, { classNames: ["class1", "class2"] })
      .use(stringify);

    const input = "`class1:example`";
    const expectedOutput = '<code class="class1">example</code>';

    const result = processor.processSync(input).toString().trim();
    expect(result).toBe(expectedOutput);
  });

  it("should not add class to inline code with unlisted class name", () => {
    const processor = unified()
      .use(parse)
      .use(inlineCodeClass, { classNames: ["class1", "class2"] })
      .use(stringify);

    const input = "`class3:example`";
    const expectedOutput = "`class3:example`";

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
