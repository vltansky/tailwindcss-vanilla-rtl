# [tailwindcss-vanilla-rtl](https://www.npmjs.com/package/tailwindcss-vanilla-rtl)

[![npm](https://img.shields.io/npm/v/tailwindcss-vanilla-rtl.svg)](https://www.npmjs.com/package/tailwindcss-vanilla-rtl) [![Build status](https://github.com/thibaudcolas/tailwindcss-vanilla-rtl/workflows/CI/badge.svg)](https://github.com/thibaudcolas/tailwindcss-vanilla-rtl/actions)

Simple right-to-left (RTL) language support for Tailwind, switching vanilla utilities to [CSS logical properties and values](https://rtlstyling.com/posts/rtl-styling#css-logical-properties).

## Usage

This plugin overrides Tailwind’s core’s utility classes, making it very straightforward to add RTL support. Have a look at the [browser support](#browser-support), [design decisions](#design-decisions), and [alternatives](#alternatives) to confirm which is the right fit for your project.

Install the package, add it to the `plugins`, and disable the `corePlugins` it overrides.

```bash
npm install tailwindcss-vanilla-rtl --save-dev
```

```js
const vanillaRTL = require("tailwindcss-vanilla-rtl");

module.exports = {
  plugins: [
    // […]
    vanillaRTL,
  ],
  corePlugins: {
    ...vanillaRTL.disabledCorePlugins,
  },
};
```

That’s it. Since the plugin uses the same utility classes as Tailwind core (`ml-4`, `px-10`, etc.), there are no new utilities to learn, no code to change.

The plugin is compatible with Tailwind v3.2 and up. For compatibility with older releases of Tailwind (starting with v3.0), use older releases of the package. See our [CHANGELOG](https://github.com/thibaudcolas/tailwindcss-vanilla-rtl/blob/main/CHANGELOG.md) to learn which release is compatible with each version of Tailwind.

## Browser support

Browser support for CSS logical properties and values is still very recent. This plugin has full support for Safari 15, Chrome/Edge 89, and Firefox 68.

We also support older browser versions (down to Safari 14.1, Chrome 87, Firefox 63), but with a few properties only working as expected for left-to-right languages:

- [border-radius](https://caniuse.com/?search=border-start-start-radius):
  - macOS Safari 15 (2021-09-21) and up
  - iOS Safari 15.1 (2021-09-21) and up
  - Chrome 89 (2021-03-01) and up
  - Edge 89 (2021-03-04) and up
  - Firefox 66 (2019-03-19) and up
- [scroll-padding](https://caniuse.com/?search=scroll-padding-inline-start):
  - macOS Safari 15 (2021-09-21) and up
  - iOS Safari 15.1 (2021-09-21) and up
  - Chrome 69 (2018-09-04) and up
  - Edge 79 (2020-01-15) and up
  - Firefox 68 (2019-07-09) and up

In those two cases, we add fallbacks for LTR languages only. To provide full support for RTL languages nonetheless, consider using [postcss-logical](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-logical) to automatically create fallbacks for all scenarios.

Two other utilities in particular will only work in very recent browsers, with _no additional fallback styles for left-to-right languages_:

- [`left` / `right` positioning](https://caniuse.com/?search=inset-inline-start):
  - macOS Safari 14.1 (2021-04-26) and up
  - iOS Safari 14.5 (2021-04-26) and up
  - Chrome 87 (2020-11-17) and up
  - Edge 87 (2020-11-20) and up
  - Firefox 63 (2018-10-23) and up
- [scroll-margin](https://caniuse.com/?search=scroll-margin-inline-start):
  - macOS Safari 14.1 (2021-04-26) and up
  - iOS Safari 14.5 (2021-04-26) and up
  - Chrome 69 (2018-09-04) and up
  - Edge 79 (2020-01-15) and up
  - Firefox 68 (2019-07-09) and up

## Design decisions

### RTL only

We only use logical properties and values that pertain to left and right styles, not top/bottom. Although this would be possible, we believe it’s rare enough for UI components to need to support all of LTR, RTL, and [top-to-bottom (TTB) languages](https://www.w3.org/International/questions/qa-scripts#directions) (Simplified Chinese, Traditional Chinese, Japanese, Korean) interchangeably. It’s also more complex to support a 90º rotation in text direction – all styles need to be written with logical properties and values.

### Vanilla utility class names

This plugin retains Tailwind’s utility class names for layout, even though they are changed to output CSS logical properties and values. Retaining the same class names means less to learn and no code to change, but it implies that:

- It’s not apparent from the classes alone that a component is built for RTL support.
- There is no way to mix and match physical and logical styles within a given project – it’s completely impossible to write physical direction or dimension styles.
- Code is authored from the LTR languages’ perspective (even if both LTR and LTR are supported).

### No float support

As of now, there is very little browser support for [flow-relative float values](https://caniuse.com/mdn-css_properties_float_flow_relative_values) (`float: inline-start` and `float: inline-end`). We recommend to avoid float layouts entirely, by disabling the corresponding core plugins:

```js
module.exports = {
  corePlugins: {
    // […]
    float: false,
    clear: false,
  },
};
```

### LTR-only fallbacks

For the four properties mentioned in [Browser support](#browser-support), we only provide fallbacks for two, and only for LTR languages. This is done to simplify maintenance of this plugin, and because [postcss-logical](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-logical) is a great way to add thorough fallbacks for projects needing it.

Note postcss-logical will create styles with `[dir=rtl]` and `[dir=ltr]` attribute selectors, which will have a higher specificity than single-class utilities, and risk behaving differently when combined with non-utility CSS.

### Tailwind corePlugins copy-paste

All utilities generated with this plugin are built with a copy-paste of Tailwind’s own [corePlugins.js](https://github.com/tailwindlabs/tailwindcss/blob/master/src/corePlugins.js). This is to simplify maintenance – as we override core plugins, it’s important for our utilities to match Tailwind’s like-for-like. Defining plugins with the least changes from core allows us to use git conflict resolution when merging in corePlugins changes in newer releases.

## Alternatives

There are a lot of interesting alternatives worth considering.

### tailwindcss-rtl

[tailwindcss-rtl](https://github.com/20lives/tailwindcss-rtl) introduces new utility classes using CSS logical properties and values for RTL support. It’s a good alternative for projects wanting to:

- Use different utilities from those of Tailwind core, to make RTL support more explicit.
- Author styles in a language-agnostic way, rather than the LTR perspective.

Since tailwindcss-rtl uses separate classes, it’s possible to mix and match with existing left/right/top/bottom utilities. It’s however not possible to fully disable those utilities, since they have to be used for top/bottom positioning.

### tailwindcss-logical

[tailwindcss-logical](https://github.com/stevecochrane/tailwindcss-logical) introduces new utility classes to support all CSS logical properties and values, for RTL as well as TTB support. It’s an excellent alternative for projects that want to:

- Use different utilities form those of Tailwind core, to make RTL support more explicit.
- Write _all_ layout styles with logical properties and values (for TTB scripts support), not just LTR-RTL mirroring.
- Author styles in a language-agnostic way, rather than the LTR perspective.

Since tailwindcss-logical uses separate classes, it’s possible to mix and match with existing left/right/top/bottom utilities. It’s also possible to fully disable the corresponding core utilities, to ensure logical properties and values are used consistently.

### Tailwind 3.0 built-in RTL support

[Tailwind’s built-in RTL support](https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support) is based on `rtl:` and `ltr:` modifiers. The only advantage of this approach is in how explicit it is, but it’s also very verbose and error-prone to always have to separately add mirrored styles.

### Future Tailwind support

Follow the conversation in Tailwind discussion [#1483 \[Feature Proposal\] CSS Logical Properties](https://github.com/tailwindlabs/tailwindcss/discussions/1483), we’ll see where this goes.

### Comparison table

This comparison table reviews utility class names across Tailwind plugins built with [CSS logical properties and values](https://rtlstyling.com/posts/rtl-styling#css-logical-properties).

| tailwindcss-vanilla-rtl                                           | tailwindcss-rtl | tailwindcss-logical |
| ----------------------------------------------------------------- | --------------- | ------------------- |
| **[Margin](https://tailwindcss.com/docs/margin)**                 |                 |                     |
| `mx-0`                                                            | N/A             | `mli-0`             |
| `mr-0`                                                            | `me-0`          | `mie-0`             |
| `ml-0`                                                            | `ms-0`          | `mis-0`             |
| **[Padding](https://tailwindcss.com/docs/padding)**               |                 |                     |
| `px-0`                                                            | N/A             | `pli-0`             |
| `pr-0`                                                            | `pe-0`          | `pie-0`             |
| `pl-0`                                                            | `ps-0`          | `pis-0`             |
| **[Inset](https://tailwindcss.com/docs/top-right-bottom-left)**   |                 |                     |
| `inset-0`                                                         | N/A             | N/A                 |
| `inset-x-0`                                                       | N/A             | `inset-inline-0`    |
| `right-0`                                                         | `end-0`         | `inline-end-0`      |
| `left-0`                                                          | `start-0`       | `inline-start-0`    |
| **[Space Between](https://tailwindcss.com/docs/space)**           |                 |                     |
| `space-x-0`                                                       | N/A             | `space-i-0`         |
| **[Scroll Margin](https://tailwindcss.com/docs/scroll-margin)**   |                 |                     |
| `scroll-mx-0`                                                     | N/A             | N/A                 |
| `scroll-mr-0`                                                     | N/A             | N/A                 |
| `scroll-ml-0`                                                     | N/A             | N/A                 |
| **[Scroll Padding](https://tailwindcss.com/docs/scroll-padding)** |                 |                     |
| `scroll-px-0`                                                     | N/A             | N/A                 |
| `scroll-pr-0`                                                     | N/A             | N/A                 |
| `scroll-pl-0`                                                     | N/A             | N/A                 |
| **[Border Radius](https://tailwindcss.com/docs/border-radius)**   |                 |                     |
| `rounded-t-0`                                                     | N/A             | `rounded-bs-0`      |
| `rounded-r-0`                                                     | `rounded-e-0`   | `rounded-ie-0`      |
| `rounded-b-0`                                                     | N/A             | `rounded-be-0`      |
| `rounded-l-0`                                                     | `rounded-s-0`   | `rounded-is-0`      |
| `rounded-tl-0`                                                    | `rounded-ts-0`  | `rounded-ss-0`      |
| `rounded-tr-0`                                                    | `rounded-te-0`  | `rounded-se-0`      |
| `rounded-br-0`                                                    | `rounded-be-0`  | `rounded-ee-0`      |
| `rounded-bl-0`                                                    | `rounded-bs-0`  | `rounded-es-0`      |
| **[Border Width](https://tailwindcss.com/docs/border-width)**     |                 |                     |
| `border-x-0`                                                      | N/A             | `border-li-0`       |
| `border-r-0`                                                      | `border-e-0`    | `border-ie-0`       |
| `border-l-0`                                                      | `border-s-0`    | `border-is-0`       |
| **[Border Color](https://tailwindcss.com/docs/border-color)**     |                 |                     |
| `border-x-black`                                                  | N/A             | `border-li-black`   |
| `border-r-black`                                                  | N/A             | `border-ie-black`   |
| `border-l-black`                                                  | N/A             | `border-is-black`   |
| **[Divide Width](https://tailwindcss.com/docs/divide-width)**     |                 |                     |
| `divide-x-0`                                                      | N/A             | `divide-i-0`        |
| **[Text Align](https://tailwindcss.com/docs/text-align)**         |                 |                     |
| `text-right`                                                      | `text-end`      | `text-end`          |
| `text-left`                                                       | `text-start`    | `text-start`        |

## Keeping up with Tailwind releases

This project’s plugins definition is a copy-paste of Tailwind’s `corePlugins.js`, with the least possible changes to use logical properties and values.

Parts of `corePlugins.js` which shouldn’t be redefined by this plugin are commented out, so the line-by-line diff with the official file is as small as possible. This makes it straightforward to keep this plugin compatible with releases, by making a diff of the changes and applying them the customised `corePlugins.js`.

1. Checkout the first commit, where `corePlugins.js` was initially copied as-is: `git checkout 2aa1d21`.
2. Copy the `corePlugins.js` file for that release, for example `wget https://raw.githubusercontent.com/tailwindlabs/tailwindcss/v3.1.8/src/corePlugins.js`.
3. Paste the official `corePlugins.js` into the repository’s corePlugins.js file: `cp corePlugins.js src/`
4. Generate a patch with `git diff > corePlugins.patch`.
5. Go back to the main branch with `git checkout -- src/corePlugins.js && git checkout main`.
6. Apply the patch with `git apply --3way --whitespace=fix corePlugins.patch`.
7. Fix any conflicts or other issues (with closing comments in particular).
8. Review all occurrences of `left` and `right` in the file to double check they are all accounted for.
