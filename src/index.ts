import { visit } from "unist-util-visit";
import { Node, Literal, Parent } from "unist";

type Options = Partial<{
  baseClass: string;
  separator: string;
}>;

export default function remarkInlineCodeClass(options?: Options) {
  const baseClass = options?.baseClass;
  const separator = options?.separator ?? ":";

  return (tree: Node) => {
    visit(
      tree,
      "inlineCode",
      (node: Literal, index: number, parent: Parent) => {
        if (typeof node.value !== "string") return;

        // Break down the content into class name and value
        const regex = new RegExp(`^([^${separator}]+)${separator}(.+)$`);
        const match = regex.exec(node.value);
        if (match) {
          const [, className, codeValue] = match;

          const classes = baseClass ? `${baseClass} ${className}` : className;

          const codeNode = {
            type: "html",
            value: `<code class="${classes}">${codeValue}</code>`,
          };

          // Replace node with HTML snippet
          parent.children.splice(index, 1, codeNode);
        } else if (!!baseClass) {
          const codeNode = {
            type: "html",
            value: `<code class="${baseClass}">${node.value}</code>`,
          };

          parent.children.splice(index, 1, codeNode);
        }
      }
    );
  };
}
