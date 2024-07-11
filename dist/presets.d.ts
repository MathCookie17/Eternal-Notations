import Decimal from "break_eternity.js";
import { Notation } from "./baseline/notation";
/** This object is where all of the notation presets are stored. Use Presets when outputting to plain text. */
declare let Presets: {
    [key: string]: Notation | ((value: number) => Notation) | ((value: Decimal) => Notation);
};
/** This object is where all of the notation presets are stored. Use HTMLPresets when outputting to innerHTML. */
declare let HTMLPresets: {
    [key: string]: Notation | ((value: number) => Notation) | ((value: Decimal) => Notation);
};
export { Presets, HTMLPresets };
