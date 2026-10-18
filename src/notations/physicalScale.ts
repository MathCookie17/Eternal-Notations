import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { toDecimal, inverse_factorial, factorial_slog } from "../baseline/utils.js";

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
export function physicalScale(value : DecimalSource) : string {
    value = toDecimal(value);
    let negative = false;
    if (value.eq(0)) return "With 0 litres of water, you'll be left thirsty because you have no water."
    if (value.eq(Decimal.dInf) || value.eq(Decimal.dNegInf)) return "There is no scale that can accomodate the infinite."
    if (value.eq(Decimal.dNaN)) return "That is not a number, and so it cannot be measured."
    if (!value.isFinite()) return "There appears to be an error with the input."
    if (value.lt(0)) {
        negative = true;
        value = value.abs();
    }
    let recip = false;
    if (value.lt(2.82e-42)) {
        recip = true;
        value = value.recip();
    }
    if (negative && !recip) return "(Negative numbers are not supported, so using the absolute value instead): " + physicalScale(value);
    if (!negative && recip) return "(That number is too small, so using its reciprocal instead): " + physicalScale(value);
    if (negative && recip) return "(That number is both negative and too small, so using its negative reciprocal instead): " + physicalScale(value);
    let dn = new DefaultNotation();
    let scaleResult = physicalScaleInternal(value);
    if (scaleResult[0] == 0) {
        let amount = value.div(scaleResult[2]);
        return "With " + dn.format(value) + " litres of water, you could fill " + dn.format(amount) + " " + scaleResult[1] + ".";
    }
    else if (scaleResult[0] == 1) {
        let dimension = scaleResult[3];
        let amount = value.div(scaleResult[2].pow(dimension.div(3)));
        return "With " + dn.format(value) + " " + dn.format(dimension) + "D litres of water, you could fill " + dn.format(amount) + " " + dn.format(dimension) + "D " + scaleResult[1] + ".";
    }
    else if (scaleResult[0] == 2) {
        let factorials = scaleResult[3];
        let amount = inverse_factorial(value, factorials).div(scaleResult[2]);
        if (factorials == 0) return dn.format(value) + " atoms would be enough to make " + dn.format(amount) + " " + scaleResult[1] + ".";
        else if (factorials == 1) return dn.format(value) + " is the amount of ways to rearrange all of the atoms in " + dn.format(amount) + " " + scaleResult[1] + ".";
        else if (factorials == 2) return "If you recorded every single way to rearrange all of the atoms in " + dn.format(amount) + " " + scaleResult[1] + ", then the amount of ways to rearrange that set of rearrangements would be " + dn.format(value) + ".";
        else if (factorials == 2) return "If you recorded every single way to rearrange all of the atoms in " + dn.format(amount) + " " + scaleResult[1] + ", then the amount of ways to rearrange that set of rearrangements would be " + dn.format(value) + ".";
        else if (factorials == 3) return "If you recorded every single way to rearrange all of the atoms in " + dn.format(amount) + " " + scaleResult[1] + ", then recorded every way to rearrange that set of rearrangements, then recorded every way to rearrange THAT set, the size of the final resulting set would be " + dn.format(value) + ".";
        else if (factorials == 4) return "If you recorded every single way to rearrange all of the atoms in " + dn.format(amount) + " " + scaleResult[1] + ", then recorded every way to rearrange that set of rearrangements, then recorded every way to rearrange THAT set, and repeat that step 1 more time, the size of the final resulting set would be " + dn.format(value) + ".";
        else return "If you recorded every single way to rearrange all of the atoms in " + dn.format(amount) + " " + scaleResult[1] + ", then recorded every way to rearrange that set of rearrangements, then recorded every way to rearrange THAT set, and repeat that step " + dn.format(factorials - 3) +  " more times, the size of the final resulting set would be " + dn.format(value) + ".";
    }
    else if (scaleResult[0] == 3) {
        let factorials = scaleResult[3];
        let amount = inverse_factorial(value, factorials).log(2).div(scaleResult[2]);
        if (factorials == 0) return "If you started with a single bacteria and the bacteria split in two every second, then with unlimited space and resources, it would take " + dn.format(amount) + " " + scaleResult[1] + " for the colony to reach a population of " + dn.format(value) + ".";
        else if (factorials == 1) return "If you started with a single bacteria and the bacteria split in two every second, then with unlimited space and resources, if you let it grow for " + dn.format(amount) + " " + scaleResult[1] + ", the amount of ways to rearrange all of the bacteria in the colony would be " + dn.format(value) + ".";
        else if (factorials == 2) return "If you started with a single bacteria and the bacteria split in two every second, then with unlimited space and resources, if you let it grow for " + dn.format(amount) + " " + scaleResult[1] + ", then you recorded every single way to rearrange all of the bacteria in the colony, then the amount of ways to rearrange that set of rearrangements would be " + dn.format(value) + ".";
        else if (factorials == 3) return "If you started with a single bacteria and the bacteria split in two every second, then with unlimited space and resources, if you let it grow for " + dn.format(amount) + " " + scaleResult[1] + ", then you recorded every single way to rearrange all of the bacteria in the colony, then recorded every way to rearrange that set of rearrangements, then recorded every way to rearrange THAT set, the size of the final resulting set would be " + dn.format(value) + ".";
        else if (factorials == 4) return "If you started with a single bacteria and the bacteria split in two every second, then with unlimited space and resources, if you let it grow for " + dn.format(amount) + " " + scaleResult[1] + ", then you recorded every single way to rearrange all of the bacteria in the colony, then recorded every way to rearrange that set of rearrangements, then recorded every way to rearrange THAT set, and repeat that step 1 more time, the size of the final resulting set would be " + dn.format(value) + ".";
        else return "If you started with a single bacteria and the bacteria split in two every second, then with unlimited space and resources, if you let it grow for " + dn.format(amount) + " " + scaleResult[1] + ", then you recorded every single way to rearrange all of the bacteria in the colony, then recorded every way to rearrange that set of rearrangements, then recorded every way to rearrange THAT set, and repeat that step " + dn.format(factorials - 3) +  " more times, the size of the final resulting set would be " + dn.format(value) + ".";
    }
    else if (scaleResult[0] == 4 || scaleResult[0] == 5) {
        let nanocosmic = scaleResult[3];
        let amount = value.slog(10, 100, true).div(scaleResult[2]);
        if (nanocosmic == 0) {
            if (scaleResult[0] == 5) return "If " + dn.format(value) + " was written as a power tower of 10s in 12-point font, that tower would be " + dn.format(amount) + " times as tall as " + scaleResult[1] + ".";
            else return "If " + dn.format(value) + " was written as a power tower of 10s in 12-point font, that tower would be as tall as " + dn.format(amount) + " " + scaleResult[1] + ".";
        }
        else if (nanocosmic == 1) {
            if (scaleResult[0] == 5) return "If " + dn.format(value) + " was written as a power tower of 10s in 12-point font, that tower would be " + dn.format(amount) + " times as tall as " + scaleResult[1] + " in a larger universe where each proton is as large as our universe.";
            else return "If " + dn.format(value) + " was written as a power tower of 10s in 12-point font, that tower would be as tall as " + dn.format(amount) + " " + scaleResult[1] + " in a larger universe where each proton is as large as our universe.";
        }
        else if (nanocosmic == 2) {
            if (scaleResult[0] == 5) return "Consider a large universe where each proton is as large as a smaller universe, and each proton in such a smaller universe is itself as large as our universe. If " + dn.format(value) + " was written as a power tower of 10s in 12-point font in our universe, that tower would be " + dn.format(amount) + " times as tall as " + scaleResult[1] + " in that large universe.";
            else return "Consider a large universe where each proton is as large as a smaller universe, and each proton in such a smaller universe is itself as large as our universe. If " + dn.format(value) + " was written as a power tower of 10s in 12-point font in our universe, that tower would be as tall as " + dn.format(amount) + " " + scaleResult[1] + " in that large universe.";
        }
        else {
            if (scaleResult[0] == 5) return "Consider a large universe where each proton is as large as a smaller universe, and each proton in such a smaller universe is itself as another smaller universe, and so on, where our universe is " + dn.format(nanocosmic) + " layers below the largest universe. If " + dn.format(value) + " was written as a power tower of 10s in 12-point font in our universe, that tower would be " + dn.format(amount) + " times as tall as " + scaleResult[1] + " in that large universe.";
            else return "Consider a large universe where each proton is as large as a smaller universe, and each proton in such a smaller universe is itself as another smaller universe, and so on, where our universe is " + dn.format(nanocosmic) + " layers below the largest universe. If " + dn.format(value) + " was written as a power tower of 10s in 12-point font in our universe, that tower would be as tall as " + dn.format(amount) + " " + scaleResult[1] + " in that large universe.";
        }
    }
    else return "There appears to be an error, either in the input or in this function.";
}

function physicalScaleInternal(value : Decimal) : [number, string, Decimal, ...any[]] {
    if (value.lt(Decimal.pow(2, 86400))) {
        /**
         * For reasonably-sized numbers, gives you how much that many litres of water would fill.
         * The main sources used were the Antimatter Dimensions Statistics page ( list of objects found https://antimatter-dimensions.fandom.com/wiki/Statistics ) and the Wikipedia article on Orders of magnitude (volume), https://en.wikipedia.org/wiki/Orders_of_magnitude_(volume). Note that Antimatter Dimensions itself clearly used that Wikipedia article as its own source.
         * The uranium nucleus volume was found by multiplying the volume of a proton by 238 (uranium's atomic weight, i.e. the amount of particles in its nucleus - protons and neutrons have near-idential volumes, so no need to differentiate between them)
         * The diameter of a water molecule seems to be somewhere from 260 to 280 pm according to various sources; 280 pm was used here since it was the figure I saw the most.
         * When I think of a "large" water bottle, I think of a one-litre bottle, and I feel that a water bottle is a good starting point as an amount of water a person can understand.
         * I've seen several sources claim that car fuel tanks hold on average 12-16 US gallons, so I used 14 US gallons here
         * Type C school bus dimensions taken from https://www.measuringknowhow.com/school-bus-dimensions/, using the mean for all three dimensions
         * Apparently the volume of Sydney Harbor is actually used as a unit sometimes
         * Lake Superior may not be the single largest lake in the world, but I think it counts as the most famous-for-its-size lake.
         * Of course I'm going to use the Pacific Ocean, the largest ocean in the world, here.
         * "Small dwarf galaxies" comes from "Estimated volume of a small dwarf galaxy like NGC 1705" on the Wikipedia article, "galaxies" uses the Milky Way, "galaxy groups" uses the Local Group, and "galactic superclusters" uses the Virgo Supercluster
         * Most of the rest agree with Antimatter Dimensions, but with some names changed
         * Beyond the observable universe, moves to 4D, then 5D, etc.
         */
        let objects = ["protons", "uranium nuclei", "hydrogen atoms", "water molecules", "viruses", "red blood cells", "grains of sand", "grains of rice", "teaspoons", "large water bottles", "car fuel tanks", "fridge-freezers", "school buses", "Olympic-sized swimming pools", "Great Pyramids of Giza", "Sydney Harbors", "Lake Superiors", "Pacific Oceans", "Earths", "Jupiters", "Suns", "red giant stars", "hypergiant stars", "nebulas", "Oort clouds", "small dwarf galaxies", "galaxies", "galaxy groups", "galactic superclusters", "observable universes"];
        let volumes = [2.82e-42, 6.7116e-40, 7.23e-27, 2.1952e-26, 5e-18, 9e-14, 6.2e-8, 5e-5, 3.555e-3, 1, 52.995764976, 1000, 67596.84, 2.5e6, 2.6006e9, 5.62e11, 1.2232e16, 6.6988e20, 1.08321e24, 1.4313e27, 1.412e30, 5e35, 8e39, 1.7e48, 1.7e51, 3e58, 3.3e64, 5e71, 3.5e75, 3.4e83].map(toDecimal);
        let index = 0;
        let dimension = new Decimal(3);
        let rootedValue = value;
        if (value.gte(Decimal.pow(3.3e64, 4/3))) {
            index = 26;
            dimension = value.log(3.4e83).mul(3).floor();
            rootedValue = value.root(dimension.div(3));
            let nextRootedValue = value.root(dimension.plus(1).div(3))
            if ((dimension.lt(6) && nextRootedValue.gte(5e71)) || (dimension.lt(9) && nextRootedValue.gte(3.5e75))) {
                dimension = dimension.plus(1);
                rootedValue = nextRootedValue;
            }
        }
        while (index < objects.length - 1 && volumes[index + 1].lte(rootedValue)) index++;
        if (dimension.eq(3)) return [0, objects[index], volumes[index], dimension];
        else return [1, objects[index], volumes[index], dimension];
    }
    else if (value.lt(Decimal.tetrate(10, 66))) {
        let factorials = factorial_slog(value).sub(factorial_slog(1.00369e14)).floor().max(0).toNumber();
        value = inverse_factorial(value, factorials);
        if (value.lt(Decimal.pow(2, 420))) {
            /**
             * How many atoms are in this object? (I chose to use atoms here rather than the previous litres use because rearranging atoms makes more sense than rearranging litres of water)
             * This time the main source is https://en.wikipedia.org/wiki/Orders_of_magnitude_(mass).
             * For organic things like viruses and cells where I could find their mass but not the amount of atoms in them, I'm pretending they're made entirely of carbon and then doubling the amount that would give me (because of hydrogen atoms contributing less mass) - based on the result I got for a human body, this seems like a good rough estimate.
             * "Viruses" uses the human adenovirus since it's medium-sized, "bacteria" uses E.coli, and "cells" uses Wikipedia's estimate of the average human cell mass
             * I saw lots of different estimates for the amount of atoms in a grain of sand, so I used the grains of sand used by Antimatter Dimensions for volume and then turned that volume into an amount of atoms using sand's density (from https://www.aqua-calc.com/page/density-table/substance/sand-coma-and-blank-dry) and chemical composition (mostly silicon dioxide).
             * For pennies, I used the actual 95% zinc and 5% copper proportions, so that one should be pretty accurate
             * I think most of the material in a baseball is the wool, so I'm going with the carbon estimate again
             * Assuming a mass of 3,200 kg for the elephant - Wikipedia lists between 2,700 and 6,300, but other websites indicate that only the males go above the low end of that range.
             * https://www.britannica.com/animal/blue-whale says that blue whales average 150 (metric) tons
             * The asteroid here is 433 Eros (https://en.wikipedia.org/wiki/433_Eros), which I believe is the asteroid Antimatter Dimensions is comparing to. I'm assuming silicon dioxide for the composition here.
             * Earth's atmosphere is used for the atmosphere example
             * For anything beyond Earth here (Jupiter and upwards), it's assumed that 75% of the mass is hydrogen and 25% of the mass is helium
             * The Milky Way is the galaxy used, and the Laniakea Supercluster is the large galactic supercluster used.
             * After the observable universe, we switch back to the final few volume objects, jam-packing that amount of space with hydrogen atoms.
             */
            let objects = ["atoms", "viruses", "bacteria", "cells", "grains of sand", "pennies", "baseballs", "human bodies", "elephants", "blue whales", "Great Pyramids of Giza", "large asteroids", "atmospheres", "Earths", "Jupiters", "Suns", "star clusters", "galaxies", "large galactic superclusters", "observable universes", "completely filled galaxies", "completely filled galaxy groups", "completely filled galactic superclusters", "completely filled observable universes"]
            let atoms = [1, 2.51e7, 1.00369e11, 1.00369e14, 3.0408e18, 2.306e22, 1.46036e25, 7.02583e27, 3.2118e29, 1.5055e31, 6.02215e35, 4.0216e41, 2.1205e44, 1.33e50, 6.5074e53, 6.81697e56, 3.428e61, 7.8395e68, 6.817e73, 1e80, 4.564e90, 6.916e97, 4.841e101, 4.703e109].map(toDecimal);
            let index = 0;
            while (index < objects.length - 1 && atoms[index + 1].lte(value)) index++;
            return [2, objects[index], atoms[index], factorials];
        }
        else {
            /**
             * How long would a bacteria colony that doubles in size every second take to reach a population this large?
             */
            let units = ["seconds", "minutes", "hours", "days", "weeks", "years", "decades", "centuries", "millennia", "galactic years", "Sun lifespans", "red dwarf lifespans", "bismuth-209 half-lives"];
            let seconds = [1, 60, 3600, 86400, 604800, 31536000, 315360000, 3153600000, 31536000000, 7.0956e15, 3.1536e17, 3.1536e20, 6.338736e26].map(toDecimal);
            let time = value.log(2);
            let index = 0;
            while (index < units.length - 1 && seconds[index + 1].lte(time)) index++;
            return [3, units[index], seconds[index], factorials];
        }
    }
    else {
        /**
         * If the number was written as a power tower of 10s in 12-point font, how tall would the tower be?
         * https://en.wikipedia.org/wiki/Orders_of_magnitude_(length) was used as the source for this one.
         * 12-point font has each character be 1/6 inches tall.
         * Letter paper, which is 11 inches tall, is used for the piece of paper
         * "Adult human" takes the female average and the male average and averages them together
         * The Milky Way is used for "galaxies", and the Virgo Supercluster is used for "galactic superclusters".
         */
        let nanocosmic = 0;
        let length = value.slog(10, 100, true);
        while (length.gte(2.5128216e34)) {
            nanocosmic++;
            length = length.mul(1.12805703456e-42);
        }
        let objects = ["hydrogen atoms", "wavelengths of green light", "grains of sand", "pieces of paper", "adult humans", "American football fields", "Burj Khalifas", "Mount Everests", "the altitude of the International Space Station", "Earths", "the distance from the Earth to the Moon", "the distance from the Earth to the Sun", "the distance from the Sun to Neptune", "the distance from the Sun to Proxima Centauri", "galaxies", "galactic superclusters", "observable universes"];
        let heights = [5.6692908e-8, 0.000125787444, 0.11811024, 66, 399.21258, 21600, 32598.43, 2090281.8, 9.8622e7, 3.009921e9, 9.094488e10, 3.533808e13, 1.0626162e15, 9.430902e18, 1.95348e23, 1.1621016e25, 4.4919702e26, 2.094018e29].map(toDecimal);
        let types = [4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 5, 5, 5, 5, 4, 4, 4];
        let index = 0;
        while (index < objects.length - 1 && heights[index + 1].lte(length)) index++;
        return [types[index], objects[index], heights[index].div(Decimal.pow(1.12805703456e-42, nanocosmic)), nanocosmic];
    }
}