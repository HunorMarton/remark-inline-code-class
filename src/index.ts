import { visit } from "unist-util-visit";
import { Node, Literal, Parent } from "unist";

type Options = Partial<{
  separator: string;
  classNames: string[];
}>;

export default function remarkInlineCodeClass(options?: Options) {
  return (tree: Node) => {
    visit(
      tree,
      "inlineCode",
      (node: Literal, index: number, parent: Parent) => {
        if (typeof node.value !== "string") return;

        const separator = options?.separator || ":";
        const classNames = options?.classNames || [];
        const classNamesPattern =
          classNames.length > 0 ? `(${classNames.join("|")})` : `([^:]+)`;
        const regex = new RegExp(`^${classNamesPattern}${separator}(.+)$`);
        const match = regex.exec(node.value);
        if (match) {
          const [, className, codeValue] = match;

          const codeNode = {
            type: "html",
            value: `<code class="${className}">${codeValue}</code>`,
          };

          parent.children.splice(index, 1, codeNode);
        }
      }
    );
  };
}
