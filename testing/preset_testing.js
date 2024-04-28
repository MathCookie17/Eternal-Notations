let continuousStatus = 0;
let continuousIteration = 0;
let continuousTimer;
let continuousWorker;
let continuousErrors = [];

window.addEventListener('keydown', (e) => {
    if (e.key == "i") output(continuousIteration);
    if (e.key == "e") output(continuousErrors);
}
)

let specialValues = [
    "0", "1", "1.0000000001", "1.01", "1.5", "2", Math.E, "3", "10", "100", "1000", "1e4", "999999", "1e6", "1e9", "1e10", "1e12", "9.9999e15", "1e21", "1e100",
    "2^1024", "2^^5", "F3", "3^^4", "e1e100", "F4", "F4.5", "F5", "F10", "F100", "F1e10", "F1e100", "F1e308",
    "0.5", "0.1", "0.01", "1e-10", "ee-10", "(e^10)-1", "(e^1e308)-1", "-1", "-10", "-1e10", "-(e^1e308)1", "-1e-100"]

// test_preset("Default");
// test_PhysicalScale()
continuousPresetTest();

function test_preset(name, ...args) {
    let TextPreset = (name == "ColoredDominoes") ? null : EternalNotations.Presets[name];
    let HTMLPreset = EternalNotations.HTMLPresets[name];
    if (arguments.length > 1) {
        TextPreset = (name == "ColoredDominoes") ? null : EternalNotations.Presets[name](...args);
        HTMLPreset = EternalNotations.HTMLPresets[name](...args);
    }

    if ((name != "ColoredDominoes") && (TextPreset.name != HTMLPreset.name)) console.log(TextPreset.name + " != " + HTMLPreset.name);
    let formatT, formatH;
    let values = structuredClone(specialValues);
    {
        if (name.includes("Binary") || name.includes("Base2") || name == "Quaternary" || name == "Hexadecimal" || name == "Fours") values = values.concat(["4", "16", "256", "65535", "65536", "1048576", "16^^2", "4^^3", "2^^6", "2^^^4"]);
        if (name.includes("Ternary") || name.includes("Base3")) values = values.concat(["1.4999", "9", "27", "7625597484986", "7625597484987", "3^^^3"])
        if (name == "Seximal" || name == "Brackets") values = values.concat(["6", "36", "46656", "2176782335", "2176782336", "6^^3", "6^^6"])
        if (name == "Octal") values = values.concat(["8", "256", "16777216", "68719476735", "68719476736", "8^^3", "8^^8"])
        if (name == "Duodecimal" || name.includes("Dozenal")) values = values.concat(["12", "144", "1728", "12^^2", "12^^3", "12^^12"])
        if (name == "Septecoman") values = values.concat(["17", 7*17, 17**2, 7 * 17**2, 17**3, 7 * 17**3, 17**4, 7 * 17**4, 17**5, 7 * 17**5, 17**6, 7 * 17**6, 17**7, 17**8, 17**16, 17**17, "17^^3", "17^^17", 7/17, 1/17, 7/289, 1/289, 7/(17**3)])
        if (name.includes("DoubleBinary")) values = values.concat(["2^131072"]);
        if (name == "HyperE") values = values.concat(["9e9999999999", "F10000000001"]);
        if (name == "Dots") values = values.concat([Decimal.pow(254, 6).sub(1), Decimal.pow(254, 6)])
        if (name == "Dominoes") values = values.concat([Decimal.pow(28, 9).sub(0.001), Decimal.pow(28, 9)])
        if (name.includes("Factorial") || name == "Factoradic") values = values.concat([2.0001, 6, 24, 720, 1307674367999, 1307674368000, "2.6012189436e1746", EternalNotations.iteratedfactorial(3, 10), EternalNotations.iteratedfactorial(3, 1e100)])
    }
    if (name.includes("Fraction") || name.includes("MixedNumber")) {
        // These notations work best on fractional numbers, not large ones, so they're getting a different set of values.
        values = [
            0, 1, 1/2, 1/3, 2/3, 3/4, 3/30, 3/2, 500/3, 4000004/5, 400/509, 8493/58492, 192940930/1329, 123456789/777777777777,
            Math.sqrt(2), (1 + Math.sqrt(5)) / 2, Math.E, Math.PI, -1/2, -500/1901, -20/3, 2, 1000, 1e10, 1e100, 0.001, 1e-10, 1e-100,
            "F3", Decimal.recip("F3"), "-ee10", 1.23e-16, 1.0000000001
        ]
        for (i = 0; i < 10; i++) values.push(Math.random()) // 10 random values between 0 and 1
        for (i = 0; i < 5; i++) values.push(Math.pow(10, Math.random() * 3)) // 5 random values between 1 and 1000
        for (i = 0; i < 5; i++) values.push(Math.pow(10, Math.random() * 3 + 3)) // 5 random values between 1000 and 1e6
        for (i = 0; i < 5; i++) values.push(Math.pow(10, Math.random() * 5 - 7)) // 5 random values between 1e-2 and 1e-7
    }
    else {
        for (i = 0; i < 5; i++) values.push(Math.random() * 9 + 1); // 5 random values between 1 and 10
        for (i = 0; i < 5; i++) values.push(Math.pow(10, Math.random() * 14 + 1)); // 5 random values between 10 and 1e15
        for (i = 0; i < 5; i++) values.push(Decimal.iteratedexp(10, 2, Math.random() * 9 + 1, true)); // 5 random values between 1e10 and ee10
        for (i = 0; i < 5; i++) values.push(Decimal.tetrate(10, Math.random() * 7 + 3, 1, true)); // 5 random values between ee10 and F10
        for (i = 0; i < 5; i++) values.push(Decimal.tetrate(10, Math.pow(10, Math.random() * 307 + 1), 1, true)); // 5 random values between F10 and F1e308
        for (i = 0; i < 5; i++) values.push(Math.pow(10, Math.random() * 10 - 10)); // 5 random values between 1e-10 and 1
    }
    output(HTMLPreset.name)
    for (v of values) {
        v = EternalNotations.toDecimal(v)
        let startTime = performance.now();
        formatT = (name == "ColoredDominoes") ? "" : TextPreset.format(v);
        let midTime = performance.now();
        formatH = HTMLPreset.format(v);
        let endTime = performance.now();
        let valueString = (name === "Default") ? v.toString() : EternalNotations.Presets.Default.format(v); // Usually I'd say Default notation is more readable than break_eternity's toString, but obviously we can't use Default to test itself
        let testP = document.createElement("p");
        let textT = document.createTextNode(valueString + ": " + formatT + " ");
        testP.appendChild(textT);
        testP.innerHTML += formatH + " (" + ((name == "ColoredDominoes") ? "" : (midTime - startTime) + " ms, ") + (endTime - midTime) + " ms)";
        testP.classList.add("output");
        document.body.appendChild(testP);
        // console.log(testP.textContent);
    }
}

function test_PhysicalScale() {
    let values = structuredClone(specialValues);
    for (i = 0; i < 5; i++) values.push(Math.random() * 9 + 1); // 5 random values between 1 and 10
    for (i = 0; i < 5; i++) values.push(Math.pow(10, Math.random() * 14 + 1)); // 5 random values between 10 and 1e15
    for (i = 0; i < 5; i++) values.push(Decimal.iteratedexp(10, 2, Math.random() * 9 + 1, true)); // 5 random values between 1e10 and ee10
    for (i = 0; i < 5; i++) values.push(Decimal.tetrate(10, Math.random() * 7 + 3, 1, true)); // 5 random values between ee10 and F10
    for (i = 0; i < 5; i++) values.push(Decimal.tetrate(10, Math.pow(10, Math.random() * 307 + 1), 1, true)); // 5 random values between F10 and F1e308
    for (i = 0; i < 5; i++) values.push(Math.pow(10, Math.random() * 10 - 10)); // 5 random values between 1e-10 and 1
    output("Physical Scale")
    for (v of values) {
        v = EternalNotations.toDecimal(v)
        let startTime = performance.now();
        let format = EternalNotations.physicalScale(v);
        let endTime = performance.now();
        let valueString = EternalNotations.Presets.Default.format(v);
        let testP = document.createElement("p");
        let textT = document.createTextNode(valueString + ": " + format + " (" + (endTime - startTime) + " ms)");
        testP.appendChild(textT);
        testP.classList.add("output");
        document.body.appendChild(testP);
        // console.log(testP.textContent);
    }
}


// Known "failed" tests (these are bugs and should probably be fixed eventually):
/*
 * 12^12 in Dozenal's variants (returns 10#B instead of 1#10 for Duodecimal, and likewise for the other two)
 * 6 * 5! for 720 in Factorial Scientific
 * There are a lot of +2's in Polynomial Base 2, but I'm not sure how to fix those at this point
 */

/**
 * Runs testAll continuously, logging any "this notation crashes/hangs" errors it finds. Uses a Worker to ensure truly asynchronous running of the presets, so even if a preset hangs, it will be detected rather than killing the program.
 */
async function continuousPresetTest() {
    while (continuousStatus != -1) {
        let decimalSize = Math.floor(Math.random() * 8);
        let negative = (Math.random() > 0.5);
        let recip = (Math.random() > 0.5);
        let testedDecimal;
        if (decimalSize < 4) testedDecimal = Decimal.iteratedexp(Math.random() * 9 + 1, decimalSize);
        else if (decimalSize == 4) testedDecimal = Decimal.tetrate(10, Math.random() * 16 + 4, 1, true);
        else if (decimalSize == 5) testedDecimal = Decimal.tetrate(10, Math.pow(10, Math.random() * 15), 1, true);
        else if (decimalSize == 6) testedDecimal = Decimal.tetrate(10, Math.pow(10, Math.random() + 15), 1, true); // F1e15 to F1e16 deserves special attention - lots of errors occur in this range.
        else if (decimalSize == 7) testedDecimal = Decimal.tetrate(10, Math.pow(10, Math.random() * 308), 1, true);
        else testedDecimal = Decimal.dZero; //This shouldn't happen
        if (recip) testedDecimal = testedDecimal.recip();
        if (negative) testedDecimal = testedDecimal.neg();
        testedDecimal = testedDecimal.toString();
        continuousWorker = new Worker("./preset_testing_worker.js");
        continuousWorker.onmessage = function(e) { if (continuousStatus == 0) continuousStatus = 1; }
        continuousWorker.onerror = function(e) { continuousStatus = -2; }
        continuousWorker.postMessage(testedDecimal);
        continuousTimer = setTimeout(function(){continuousStatus = -1;}, 5000);
        while (continuousStatus == 0) {
            await new Promise(resolve => setTimeout(resolve, 1));
        }
        continuousWorker.terminate();
        clearTimeout(continuousTimer);
        if (continuousStatus < 0) {
            console.log("A failure occured while testing " + testedDecimal + ", of type " + continuousStatus);
            continuousErrors.push(testedDecimal);
        }
        continuousStatus = 0;
        if (continuousIteration % 250 == 0) console.log(continuousIteration + " tests run.")
        continuousIteration++;
    }
}