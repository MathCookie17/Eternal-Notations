import type { DecimalSource } from "break_eternity.js";
/**
 * This function gives a physical description of the Decimal it's given, to get across how large the number is.
 * For reasonably-sized numbers, this function expresses them in terms of how large of a volume you could fill with that many litres of water.
 * Once we get beyond the observable universe, it starts going to 4D versions of galaxies and universes, then 5D, and so on.
 * Then, for numbers where the amount of dimensions gets too large, it switches to considering an endlessly-replicating bacteria colony that doubles every second, and it tells you how long it would take for that exponential growth to reach your number.
 * Once that timespan becomes too long, it switches to considering the amount of possible permutations of the atoms in various objects.
 * Beyond that point, it switches between the atoms and bacteria scenarios, examining permutations, then permutations of the permutations, and so on.
 * Finally, for tetrational numbers, it gives up on representing the number itself and instead considers writing them as a power tower of 10s and how tall that power tower would be.
 *
 * Though this function behaves similarly to a Notation, it is not actually a Notation.
 *
 * @param value ( Decimal ! ) The value to give a description of.
 */
export declare function physicalScale(value: DecimalSource): string;
