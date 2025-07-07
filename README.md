# remark-inline-code-class

[Remark](https://github.com/remarkjs/remark) plugin that lets you assign class names to inline code elements. This way you can style inline code elements by class.

For example, on [SVG-Tutorial.com](https://svg-tutorial.com/), the elements are highlighted in green, the properties are highlighted in purple, and the values are highlighted in blue. [Link to live example](https://svg-tutorial.com/svg/basic-shapes#how-to-draw-a-circle-in-svg).

[![example image](https://github.com/HunorMarton/remark-inline-code-class/raw/main/example.png)](https://svg-tutorial.com/svg/basic-shapes#how-to-draw-a-circle-in-svg)

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
npm install remark-inline-code-class
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

## Options

The plugin lets you set the `baseClass` string that sets a class for every inline code element.

This is useful, when you want to threat inline code elements separate from code blocks:

```html
<p>This is an inline <code class="inline">code</code> element</p>
<pre>
  <code>
    And this is a code block.
  </code>
</pre>
```

You can set it in the Astro config file:

```js "separator"
import { defineConfig } from "astro/config";
import remarkInlineCodeClass from "remark-inline-code-class";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [[remarkInlineCodeClass, { baseClass: "inline" }]],
  },
});
```

Or when using it with Unist:

```js
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkInlineCodeClass from "remark-inline-code-class";

const file = await unified()
  .use(remarkParse)
  .use(remarkInlineCodeClass, { baseClass: "inline" })
  .use(remarkStringify)
  .process('This is an inline `red:element` with the class "red"');

console.log(String(file));
```

## How does it work?

Read more about it on my [tech blog](https://hunormarton.com/blog/remark-inline-code-class).

## License

[MIT](LICENSE) © [Hunor Márton Borbély](https://hunormarton.com/)
