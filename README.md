# Eternal Notations

Eternal Notations is a JavaScript library that abbreviates large numbers in various notations, intended for use in incremental games. It's sort of a "sequel" to [Antimatter Dimensions Notations](https://github.com/antimatter-dimensions/notations/tree/master), but whereas that library is built on [break_infinity.js](https://github.com/Patashu/break_infinity.js), which goes up to 10^10^16, Eternal Notations is built on [break_eternity.js](https://github.com/Patashu/break_eternity.js), which goes up to 10^^(10^308), i.e. a power-tower of 10^308 10's. Try out the various notations (actually presets; more on what the difference is in a moment) [here](mathcookie17.github.io/Eternal-Notations).

## Setup

I don't know how things like NPM work yet, so for now just download eternal_notations.js or eternal_notations.min.js from the dist folder and include it as a script in your HTML file. Eternal Notations requires break_eternity.js to be included, and will not run without it. Eternal Notations only works with break_eternity. If your game uses break_infinity, use Antimatter Dimensions Notations instead. Including eternal_notations.js or eternal_notations.min.js should be sufficient to use all of the notations and almost all of the presets, but if you wish to use Colored Dominoes, you need to include the eternal_notations_images folder in your project and include the dominoes.css file inside as a CSS stylesheet in your HTML file.

## Use

Like in Antimatter Dimensions Notations, all notations are included inside a single object, EternalNotations. The main method you'll be using is ```format(value)```:

```js
new EternalNotations.ScientificNotation().format(1e100);
EternalNotations.Presets.Standard.format("ee50");
```

Unlike in Antimatter Dimensions Notations, only the value is provided as an argument to format. Eternal Notations applies its notations to all numbers, not just ones above 1,000, and the amount of decimal places is a property of the notations themselves, not of the format method.

**There are two ways to use this library**. If you're looking for something like AD Notations, i.e. a bunch of notations that are easy to quickly add to your incremental game, use the *presets*, which are included in the ```EternalNotations.Presets``` and ```EternalNotations.HTMLPresets``` objects. Use ```EternalNotations.Presets``` if you're outputting to plain text, use ```EternalNotations.HTMLPresets``` if you're outputting to innerHTML. These two objects contain the same presets (with the exception of the aforementioned ColoredDominoes, which only exists in HTMLPresets).

The actual *notations*, unlike in Antimatter Dimensions Notations, have parameters in their constructors, which allows for a much greater amount of customization. For example, in

```js
new EternalNotations.StandardNotation(1, true)
```

the first argument is the "dialect", which controls what set of abbreviations for the -illions is being used, and the second argument controls whether the short or long scale is being used. StandardNotation has six arguments, but only the first two are specified here: most parameters have default values they'll take when left undefined, though a select few notations may require their first parameter be defined. Different notations have different parameters, and some have many more than others! In particular, many notations have an ```InnerNotation``` parameter, which controls how leftover numbers within that notation are themselves formatted, allowing you to mix together notations.

Every notation ends with the word "Notation" to make it clear that it's a notation, not a preset. You do use the ```new``` operator when making a new instance of a notation, but you do not use ```new``` when accessing presets.

If I've counted correctly, Eternal Notations includes 124 presets and 49 notations, plus some additional utility functions. This includes several (but not all) of the notations from Antimatter Dimensions Notations as presets, and many more than aren't in Antimatter Dimensions Notations, including notations based on tetration, factorials, super-roots, the SI prefixes, and much more. If you just want a reasonable way to notate large numbers similar to how games like Prestige Tree Rewritten do so, use ```DefaultNotation``` (its preset is ```EternalNotations.Presets.Default```), which goes from unabbreviated to scientific to hyperscientific. (```DefaultNotation``` is the default ```InnerNotation``` value for most notations). Otherwise, have fun exploring the many presets and notations Eternal Notations has to offer!

For information on individual presets, notations, and functions, see the [documentation page](mathcookie17.github.io/Eternal-Notations/documentation).

## Contributing

If you wish to add new presets or notations to Eternal Notations, first decide which of those two things your contribution is going to be. If your idea can be created using the notations that already exist and you're not looking to make something customizable, you probably want to add a preset. If you want to make something that can't be made with the notations that already exist and you have customization options to include for it, you probably want to add a notation. Here are some guidelines for contributing:

* **Include customization for Notations, but not for Presets**. The presets are meant to be easy to use, so you probably shouldn't give them parameters. There are a few presets that do have one parameter, but only do so if that parameter is fundamental to the nature of the preset (examples that currently exist include the degree of a root, the base of a logarithm, and the base of an alternate number base). Notations, on the other hand, are meant to be very customizable, so if you can't think of any customization options, you should probably just make a preset, not a notation. In particular, your notation will probably have an innerNotation parameter - if it doesn't, consider whether what you're making should be a preset instead.
* **Do not use CustomNotation when making a preset.** CustomNotation exists for users who want to make their own notation for use within their project. It should not be used within the library itself. If you find yourself needing CustomNotation to make a preset because the notations that currently exist aren't sufficient to make that preset, you should create a new notation instead.
* **Try to avoid making a preset that just messes with the super-logarithm and calls it a day.** This one isn't a rule, but it is a recommendation. Many notations in Antimatter Dimensions Notations (Zalgo, Bar, and Blobs, for example) work by doing something with the number's logarithm rather than the number itself, which results in them being boring on smaller numbers. In Eternal Notations, the equivalent would require you to do something with the number's super-logarithm rather than the number itself, which would result in a preset that's boring for all but the largest numbers. It's fine if your notation is explicitly themed around tetration and super-logarithms, but chances are such a notation would fall under the ones that already exist. In general, presets should be interesting for the smaller numbers too!
* **Do something original.** The presets shouldn't be flooded with a bunch of small variations of the same notation. When adding presets, make sure that what you're adding is distinct enough from the presets that already exist that it deserves to be its own new preset. As for notations, make sure that the notation you're adding can't already be implemented using another notation that already exists.

If you have an idea for a new preset or notation but don't understand the library well enough to contribute it yourself, feel free to open a new Issue here on the Eternal Notations GitHub page to make your suggestion.