import transformThemeValue from "tailwindcss/lib/util/transformThemeValue";

function generateProperties(properties, value) {
  return properties.reduce((obj, name) => {
    if (Array.isArray(name)) {
      return Object.assign(obj, {
        [name[0]]: name[1],
      });
    }
    return Object.assign(obj, {
      [name]: value,
    });
  }, {});
}

export default function createUtilityPluginRtl(
  themeKey,
  utilityVariations = [[themeKey, [themeKey]]],
  { filterDefault = false, ...options } = {}
) {
  let transformValue = transformThemeValue(themeKey);
  return function ({ matchUtilities, theme }) {
    for (let utilityVariation of utilityVariations) {
      let group = Array.isArray(utilityVariation[0])
        ? utilityVariation
        : [utilityVariation];

      matchUtilities(
        group.reduce((obj, [classPrefix, rtlProperties, ltrProperties]) => {
          // console.log(classPrefix, "rtl", rtlProperties);
          // console.log(classPrefix, "ltr", ltrProperties);
          return Object.assign(obj, {
            [classPrefix]: (value) => {
              if (!ltrProperties) {
                return generateProperties(rtlProperties, transformValue(value));
              }
              return {
                '[dir="rtl"] &': generateProperties(
                  rtlProperties,
                  transformValue(value)
                ),
                '[dir="ltr"] &': generateProperties(
                  ltrProperties,
                  transformValue(value)
                ),
              };
            },
          });
        }, {}),
        {
          ...options,
          values: filterDefault
            ? Object.fromEntries(
                Object.entries(theme(themeKey) ?? {}).filter(
                  ([modifier]) => modifier !== "DEFAULT"
                )
              )
            : theme(themeKey),
        }
      );
    }
  };
}
