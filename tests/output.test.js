import postcss from "postcss";
import vanillaRTL from "../dist";
import tailwindcss from "tailwindcss";

const rules = {
  "mx-[JIT_VALUE]":
    ".mx-\\[JIT_VALUE\\] { margin-inline-start: JIT VALUE; margin-inline-end: JIT VALUE }",
  "ml-[JIT_VALUE]": `.ml-\\[JIT_VALUE\\] { margin-inline-start: JIT VALUE }`,
  "mr-[JIT_VALUE]": `.mr-\\[JIT_VALUE\\] { margin-inline-end: JIT VALUE }`,
  "px-[JIT_VALUE]":
    ".px-\\[JIT_VALUE\\] { padding-inline-start: JIT VALUE; padding-inline-end: JIT VALUE }",
  "pl-[JIT_VALUE]": `.pl-\\[JIT_VALUE\\] { padding-inline-start: JIT VALUE }`,
  "pr-[JIT_VALUE]": `.pr-\\[JIT_VALUE\\] { padding-inline-end: JIT VALUE }`,
  "inset-[JIT_VALUE]":
    ".inset-\\[JIT_VALUE\\] { top: JIT VALUE; inset-inline-end: JIT VALUE; bottom: JIT VALUE; inset-inline-start: JIT VALUE }",
  "inset-x-[JIT_VALUE]":
    ".inset-x-\\[JIT_VALUE\\] { inset-inline-start: JIT VALUE; inset-inline-end: JIT VALUE }",
  "right-[JIT_VALUE]": ".right-\\[JIT_VALUE\\] { inset-inline-end: JIT VALUE }",
  "left-[JIT_VALUE]": ".left-\\[JIT_VALUE\\] { inset-inline-start: JIT VALUE }",
  "space-x-[JIT_VALUE]":
    ".space-x-\\[JIT_VALUE\\] > :not([hidden]) ~ :not([hidden]) { --tw-space-x-reverse: 0; margin-inline-end: calc(JIT VALUE * var(--tw-space-x-reverse)); margin-inline-start: calc(JIT VALUE * calc(1 - var(--tw-space-x-reverse))) }",
  "scroll-mr-[JIT_VALUE]":
    ".scroll-mr-\\[JIT_VALUE\\] { scroll-margin-inline-end: JIT VALUE }",
  "scroll-ml-[JIT_VALUE]":
    ".scroll-ml-\\[JIT_VALUE\\] { scroll-margin-inline-start: JIT VALUE }",
  "scroll-pr-[JIT_VALUE]":
    ".scroll-pr-\\[JIT_VALUE\\] { scroll-padding-right: JIT VALUE; scroll-padding-inline-end: JIT VALUE }",
  "scroll-pl-[JIT_VALUE]":
    ".scroll-pl-\\[JIT_VALUE\\] { scroll-padding-left: JIT VALUE; scroll-padding-inline-start: JIT VALUE }",
  "rounded-t-[JIT_VALUE]":
    ".rounded-t-\\[JIT_VALUE\\] { border-top-left-radius: JIT VALUE; border-start-start-radius: JIT VALUE; border-top-right-radius: JIT VALUE; border-start-end-radius: JIT VALUE }",
  "rounded-r-[JIT_VALUE]":
    ".rounded-r-\\[JIT_VALUE\\] { border-top-right-radius: JIT VALUE; border-start-end-radius: JIT VALUE; border-bottom-right-radius: JIT VALUE; border-end-end-radius: JIT VALUE }",
  "rounded-b-[JIT_VALUE]":
    ".rounded-b-\\[JIT_VALUE\\] { border-bottom-right-radius: JIT VALUE; border-end-end-radius: JIT VALUE; border-bottom-left-radius: JIT VALUE; border-end-start-radius: JIT VALUE }",
  "rounded-l-[JIT_VALUE]":
    ".rounded-l-\\[JIT_VALUE\\] { border-top-left-radius: JIT VALUE; border-start-start-radius: JIT VALUE; border-bottom-left-radius: JIT VALUE; border-end-start-radius: JIT VALUE }",
  "rounded-tl-[JIT_VALUE]":
    ".rounded-tl-\\[JIT_VALUE\\] { border-top-left-radius: JIT VALUE; border-start-start-radius: JIT VALUE }",
  "rounded-tr-[JIT_VALUE]":
    ".rounded-tr-\\[JIT_VALUE\\] { border-top-right-radius: JIT VALUE; border-start-end-radius: JIT VALUE }",
  "rounded-br-[JIT_VALUE]":
    ".rounded-br-\\[JIT_VALUE\\] { border-bottom-right-radius: JIT VALUE; border-end-end-radius: JIT VALUE }",
  "rounded-bl-[JIT_VALUE]":
    ".rounded-bl-\\[JIT_VALUE\\] { border-bottom-left-radius: JIT VALUE; border-end-start-radius: JIT VALUE }",
  "border-x-[5px]":
    ".border-x-\\[5px\\] { border-inline-start-width: 5px; border-inline-end-width: 5px }",
  "border-r-[5px]": ".border-r-\\[5px\\] { border-inline-end-width: 5px }",
  "border-l-[5px]": ".border-l-\\[5px\\] { border-inline-start-width: 5px }",
  "border-x-[#ccc]":
    ".border-x-\\[\\#ccc\\] { --tw-border-opacity: 1; border-inline-start-color: rgb(204 204 204 / var(--tw-border-opacity)); border-inline-end-color: rgb(204 204 204 / var(--tw-border-opacity)) }",
  "border-r-[#ccc]":
    ".border-r-\\[\\#ccc\\] { --tw-border-opacity: 1; border-inline-end-color: rgb(204 204 204 / var(--tw-border-opacity)) }",
  "border-l-[#ccc]":
    ".border-l-\\[\\#ccc\\] { --tw-border-opacity: 1; border-inline-start-color: rgb(204 204 204 / var(--tw-border-opacity)) }",
  "divide-x-[JIT_VALUE]":
    ".divide-x-\\[JIT_VALUE\\] > :not([hidden]) ~ :not([hidden]) { --tw-divide-x-reverse: 0; border-inline-end-width: calc(JIT VALUE * var(--tw-divide-x-reverse)); border-inline-start-width: calc(JIT VALUE * calc(1 - var(--tw-divide-x-reverse))) }",
  "text-right": ".text-right { text-align: end }",
  "text-left": ".text-left { text-align: start }",
};

const trimmer = (val) => val.replace(/\s+/g, " ").trim();
Object.entries(rules).forEach(([className, expected]) => {
  it(className, () => {
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

    expect(trimmer(output)).toBe(trimmer(expected));
  });
});
