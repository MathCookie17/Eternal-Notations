importScripts("../break_eternity stuff/break_eternity.min.js", "../dist/eternal_notations.min.js")

onmessage = function(e) {
    let testedDecimal = e.data;
    formatAll(testedDecimal);
    this.postMessage("");
}

function formatAll(num) {
    for (k in EternalNotations.HTMLPresets) {
        formatOne(k, num);
    }
    EternalNotations.physicalScale(num);
}

function formatOne(key, num) {
    let notation;
    htmlUsed = (Math.random() > 0.5);
    try {
        notation = (htmlUsed) ? EternalNotations.HTMLPresets[key] : EternalNotations.Presets[key];
    }
    catch { return; }
    if (notation === undefined) return;
    if (typeof notation == "function") {
        if (key == "SimplifiedWritten") {
            notation = notation(10);
        }
        else if (key == "ColoredDominoes") {
            for (let i = 6; i < 21; i += 3) {
                notation(i).format(num);
            }
            return;
        }
        else if (key == "Polynomial" || key == "RationalFunction") {
            notation(10).format(num);
            notation(2).format(num);
            notation(3).format(num);
            return;
        }
        else return;
    }
    notation.format(num);
}