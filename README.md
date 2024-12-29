# @hunormarton/remark-inline-code-class

[Remark](https://github.com/remarkjs/remark) plugin that allows you to assign class names to inline code elements. You can assign different classes to different code elements.

For example in the following example, you can see that the word `circle` is highlighted in green, because the circle an element, the words `cx`, `cy`, and `r` are highlighted in purple, because they represent properties, and the numbers `100` and `120` are highlighted in blue, because they represent property values. [Link to live example](https://svg-tutorial.com/svg/basic-shapes#how-to-draw-a-circle-in-svg).

[![example image](./example.png)](https://svg-tutorial.com/svg/basic-shapes#how-to-draw-a-circle-in-svg)

With this plugin we can write our markdown as follows:

```markdown
The `element:circle` element's radius is set with the `property:r` property.
```

The result will be as follows:

```html
The <code class="element">circle</code> element's radius is set with the
<code class="property">r</code> property.
```

This plugin doesn't do any styling on its own, but you can define your style for example as follows:

```css
code {
  padding: 2px 5px;
  border-radius: 2px;
  border: 1px solid;
}

code.element {
  border-color: rgb(133, 232, 157, 1);
  background-color: rgb(133, 232, 157, 0.1);
}

code.property {
  border-color: rgb(179, 146, 240, 1);
  background-color: rgb(179, 146, 240, 0.1);
}

code.value {
  border-color: rgb(158, 203, 255, 1);
  background-color: rgb(158, 203, 255, 0.1);
}
```

## Installation

```sh
npm install @hunormarton/remark-inline-code-class
```

## Usage with Astro

Extend your Astro config file:

```js
import { defineConfig } from "astro/config";
import remarkInlineCodeClass from "remark-inline-code-class";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkInlineCodeClass],
  },
});
```

Then define your class styles with global CSS.

## Usage with Unified

This package is a [unified](https://github.com/unifiedjs/unified) [remark](https://github.com/remarkjs/remark) plugin so you can also use it as follows:

```js
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkInlineCodeClass from "remark-inline-code-class";

const file = await unified()
  .use(remarkParse)
  .use(remarkInlineCodeClass)
  .use(remarkStringify)
  .process('This is an inline `red:element` with the class "red"');

console.log(String(file));
```

### Options

The plugin comes with the following optional options:

- **separator**: Custom separator string, if you don't want to use the (default: `:`)
- **classNames**: If you want to restrict the potential class names you can set an array with accepted class names (default: anything)

## License

[MIT](LICENSE) © [Hunor Márton Borbély](https://hunormarton.com/)
