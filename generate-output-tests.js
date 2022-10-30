const postcss = require("postcss");
const tailwindcss = require("tailwindcss");
const vanillaRTL = require("./dist");

const rules = {
  "mx-[JIT_VALUE]":
    ".mx-\\[JIT_VALUE\\] { margin-left: JIT VALUE; margin-right: JIT VALUE }",
  "ml-[JIT_VALUE]":
    'body[dir="rtl"] .ml-\\[JIT_VALUE\\] { margin-left: JIT VALUE } body[dir="ltr"] .ml-\\[JIT_VALUE\\] { margin-right: JIT VALUE }',
  "mr-[JIT_VALUE]":
    'body[dir="rtl"] .mr-\\[JIT_VALUE\\] { margin-right: JIT VALUE } body[dir="ltr"] .mr-\\[JIT_VALUE\\] { margin-left: JIT VALUE }',
  "px-[JIT_VALUE]":
    ".px-\\[JIT_VALUE\\] { padding-left: JIT VALUE; padding-right: JIT VALUE }",
  "pl-[JIT_VALUE]":
    'body[dir="rtl"] .pl-\\[JIT_VALUE\\] { padding-left: JIT VALUE } body[dir="ltr"] .pl-\\[JIT_VALUE\\] { padding-right: JIT VALUE }',
  "pr-[JIT_VALUE]":
    'body[dir="rtl"] .pr-\\[JIT_VALUE\\] { padding-right: JIT VALUE } body[dir="ltr"] .pr-\\[JIT_VALUE\\] { padding-left: JIT VALUE }',
  "inset-[JIT_VALUE]":
    ".inset-\\[JIT_VALUE\\] { top: JIT VALUE; right: JIT VALUE; bottom: JIT VALUE; left: JIT VALUE }",
  "inset-x-[JIT_VALUE]":
    ".inset-x-\\[JIT_VALUE\\] { left: JIT VALUE; right: JIT VALUE }",
  "right-[JIT_VALUE]":
    'body[dir="rtl"] .right-\\[JIT_VALUE\\] { right: JIT VALUE } body[dir="ltr"] .right-\\[JIT_VALUE\\] { left: JIT VALUE }',
  "left-[JIT_VALUE]":
    'body[dir="rtl"] .left-\\[JIT_VALUE\\] { left: JIT VALUE } body[dir="ltr"] .left-\\[JIT_VALUE\\] { right: JIT VALUE }',
  "space-x-[JIT_VALUE]":
    ".space-x-\\[JIT_VALUE\\] > :not([hidden]) ~ :not([hidden]) { --tw-space-x-reverse: 0; margin-right: calc(JIT VALUE * var(--tw-space-x-reverse)); margin-left: calc(JIT VALUE * calc(1 - var(--tw-space-x-reverse))) }",
  "scroll-mr-[JIT_VALUE]":
    'body[dir="rtl"] .scroll-mr-\\[JIT_VALUE\\] { scroll-margin-right: JIT VALUE } body[dir="ltr"] .scroll-mr-\\[JIT_VALUE\\] { scroll-margin-left: JIT VALUE }',
  "scroll-ml-[JIT_VALUE]":
    'body[dir="rtl"] .scroll-ml-\\[JIT_VALUE\\] { scroll-margin-left: JIT VALUE } body[dir="ltr"] .scroll-ml-\\[JIT_VALUE\\] { scroll-margin-right: JIT VALUE }',
  "scroll-pr-[JIT_VALUE]":
    'body[dir="rtl"] .scroll-pr-\\[JIT_VALUE\\] { scroll-padding-right: JIT VALUE } body[dir="ltr"] .scroll-pr-\\[JIT_VALUE\\] { scroll-padding-left: JIT VALUE }',
  "scroll-pl-[JIT_VALUE]":
    'body[dir="rtl"] .scroll-pl-\\[JIT_VALUE\\] { scroll-padding-left: JIT VALUE } body[dir="ltr"] .scroll-pl-\\[JIT_VALUE\\] { scroll-padding-right: JIT VALUE }',
  "rounded-t-[JIT_VALUE]":
    ".rounded-t-\\[JIT_VALUE\\] { border-top-left-radius: JIT VALUE; border-top-right-radius: JIT VALUE }",
  "rounded-r-[JIT_VALUE]":
    'body[dir="rtl"] .rounded-r-\\[JIT_VALUE\\] { border-top-right-radius: JIT VALUE; border-bottom-right-radius: JIT VALUE } body[dir="ltr"] .rounded-r-\\[JIT_VALUE\\] { border-top-left-radius: JIT VALUE; border-bottom-left-radius: JIT VALUE }',
  "rounded-b-[JIT_VALUE]":
    ".rounded-b-\\[JIT_VALUE\\] { border-bottom-right-radius: JIT VALUE; border-bottom-left-radius: JIT VALUE }",
  "rounded-l-[JIT_VALUE]":
    'body[dir="rtl"] .rounded-l-\\[JIT_VALUE\\] { border-top-left-radius: JIT VALUE; border-bottom-left-radius: JIT VALUE } body[dir="ltr"] .rounded-l-\\[JIT_VALUE\\] { border-top-right-radius: JIT VALUE; border-bottom-right-radius: JIT VALUE }',
  "rounded-tl-[JIT_VALUE]":
    'body[dir="rtl"] .rounded-tl-\\[JIT_VALUE\\] { border-top-left-radius: JIT VALUE } body[dir="ltr"] .rounded-tl-\\[JIT_VALUE\\] { border-top-right-radius: JIT VALUE }',
  "rounded-tr-[JIT_VALUE]":
    'body[dir="rtl"] .rounded-tr-\\[JIT_VALUE\\] { border-top-right-radius: JIT VALUE } body[dir="ltr"] .rounded-tr-\\[JIT_VALUE\\] { border-top-left-radius: JIT VALUE }',
  "rounded-br-[JIT_VALUE]":
    'body[dir="rtl"] .rounded-br-\\[JIT_VALUE\\] { border-bottom-right-radius: JIT VALUE } body[dir="ltr"] .rounded-br-\\[JIT_VALUE\\] { border-bottom-left-radius: JIT VALUE }',
  "rounded-bl-[JIT_VALUE]":
    'body[dir="rtl"] .rounded-bl-\\[JIT_VALUE\\] { border-bottom-left-radius: JIT VALUE } body[dir="ltr"] .rounded-bl-\\[JIT_VALUE\\] { border-bottom-right-radius: JIT VALUE }',
  "border-x-[5px]":
    ".border-x-\\[5px\\] { border-left-width: 5px; border-right-width: 5px }",
  "border-r-[5px]": ".border-r-\\[5px\\] { border-right-width: 5px }",
  "border-l-[5px]": ".border-l-\\[5px\\] { border-left-width: 5px }",
  "border-x-[#ccc]":
    ".border-x-\\[\\#ccc\\] { --tw-border-opacity: 1; border-left-color: rgb(204 204 204 / var(--tw-border-opacity)); border-right-color: rgb(204 204 204 / var(--tw-border-opacity)) }",
  "border-r-[#ccc]":
    ".border-r-\\[\\#ccc\\] { --tw-border-opacity: 1; border-right-color: rgb(204 204 204 / var(--tw-border-opacity)) }",
  "border-l-[#ccc]":
    ".border-l-\\[\\#ccc\\] { --tw-border-opacity: 1; border-left-color: rgb(204 204 204 / var(--tw-border-opacity)) }",
  "divide-x-[JIT_VALUE]":
    ".divide-x-\\[JIT_VALUE\\] > :not([hidden]) ~ :not([hidden]) { --tw-divide-x-reverse: 0; border-right-width: calc(JIT VALUE * var(--tw-divide-x-reverse)); border-left-width: calc(JIT VALUE * calc(1 - var(--tw-divide-x-reverse))) }",
  "text-right":
    'body[dir="rtl"] .text-right { text-align: right } body[dir="ltr"] .text-right { text-align: left }',
  "text-left":
    'body[dir="rtl"] .text-left { text-align: left } body[dir="ltr"] .text-left { text-align: right }',
};

const trimmer = (val) => val.replace(/\s+/g, " ").trim();
const obj = Object.keys(rules).reduce((obj, className) => {
  const output = postcss([
    tailwindcss({
      content: [
        {
          raw: className,
        },
      ],
      plugins: [vanillaRTL],
      corePlugins: {
        ...vanillaRTL.disabledCorePlugins,
      },
    }),
  ]).process("@tailwind utilities").css;

  obj[className] = trimmer(output);
  return obj;
}, {});
console.log(obj);
