# Adapt Boson to your design system

This guide will help you adapt Boson to your design system. The recommended steps vary a lot depending on wether the design system you need to adapt to comes from BAM's design system or not.

## If your design system comes from BAM's DS

In this case, it should be pretty easy to update your DS because you'll have the same naming for colors, the same structure for Typographies and every component should pretty much already use the right colors and have the correct props. Here is what you should do in that scenario:

- update the `colors.ts` file so that it matches the colors from your DS
- change the `fonts.ts` file if needed (don't forget to delete every unused font file).
- rework each component so that they perfectly fit your needs

If you meet some challenges or take different steps, please add your feedback in this [database](https://www.notion.so/m33/469e439795494c498cde0fe85d244423?v=6e50f09283434d01a11654887206da6c).

## If the design system is made by external designers

This scenario is more tricky, so it is advised to carefully follow the following steps:

### Create new colors file

You want the colors in your code to have the same name than the colors in Figma, otherwise designing components will be a nightmare.

⚠️ If the names of the colors does not use primary / secondary but rather purple / yellow you may want to challenge designers and ask them to rename them for better long term maintainability

The naming of the colors in Figma is probably not matching the ones from Boson. Trying to map boson colors to the ones of your DS is a very difficult excercise and it's likely unfeasible so don't do it. Instead what you should do is:

- change the `colors` key name in the theme to `bosonColors` (use rename symbol in VSCode otherwise you'll need to change it in every component as well)
- create another colors file that will look like the one from Boson but with the color names and values from your DS
- put this object under the `colors` field of the theme
- mark bosonColors as deprecated

Your theme should now look like this

```ts
import { fonts } from './fonts';
import { bosonColors } from './bosonColors';
import { colors } from './colors';
import { spaces } from './spaces';

export const theme = {
  /** @deprecated use theme.colors instead */
  bosonColors,
  spaces,
  fonts,
  colors,
} as const;
```

Now whenever you'll rework some component in the future, you'll just need to use the colors from `theme.colors`. Once `bosonColors` is not used anymore delete it.

### Adapt Typography component

Once your colors are set, the next step is to rework the Typography component.

- Start by updating the `fontFamilies` and the `fontFiles` objects with the fonts you need. Delete the ones that are now unused.
- Update the `fonts` object. You need to have in there the style for each of your different typos.
- In `Typography.tsx` file, export one component for each different typo you have that uses the style you added in the previous step. When replacing existing components, use rename symbol to rename them so that every component in Boson is updated and now uses one of your newly created Typo. There may not be a perfect matching but you want to delete Boson's typos and replace them by yours anyway and you'll eventually rework other componenents afterwards.

**✅ Check**

- you don't have any typescript issues
- every font file in the fonts folder is used

### Rework other components

Once you've got your colors and typos set, you can start reworking the components you need one by one. If you face any difficulties or find a nice method to adapt some component or think of a better implementation for that component that would make it easier to change, then please either contact someone working on Boson or add your feedback in this [database](https://www.notion.so/m33/469e439795494c498cde0fe85d244423?v=6e50f09283434d01a11654887206da6c). Of course contributions are welcome so feel free to open a PR
