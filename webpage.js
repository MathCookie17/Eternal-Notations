let explanationOpen = "";
let consoleLogging = true;

document.getElementById("number_input").value = "1";
let entered = EternalNotations.toDecimal(document.getElementById("number_input").value);
formatAll(entered);
document.getElementById("number_input_form").addEventListener("change", function(){
    entered = EternalNotations.toDecimal(document.getElementById("number_input").value);
    formatAll(entered);
})
document.getElementById("number_input_form").addEventListener("submit", function(e){
    e.preventDefault();
})
for (e of document.getElementsByClassName("notation_group")) {
    let name = e.id.slice(6);
    e.addEventListener("click", function(){
        if (!explanationOpen) {
            document.getElementById("all_explanations").style.setProperty("display", "flex");
            document.getElementById("explanation_" + name).style.setProperty("display", "block");
            document.getElementById("beneath_explanation").style.setProperty("filter", "blur(2px)");
            explanationOpen = "explanation_" + name;
        }
    })
}
for (e of document.getElementsByClassName("information_group")) {
    let name = e.id.slice(6);
    e.addEventListener("click", function(){
        if (!explanationOpen) {
            document.getElementById("all_explanations").style.setProperty("display", "flex");
            document.getElementById("explanation_" + name).style.setProperty("display", "block");
            document.getElementById("beneath_explanation").style.setProperty("filter", "blur(2px)");
            explanationOpen = "explanation_" + name;
        }
    })
}
document.getElementById("close_explanation").addEventListener("click", function(){
    if (explanationOpen) {
        document.getElementById("all_explanations").style.setProperty("display", "none");
        document.getElementById(explanationOpen).style.setProperty("display", "none");
        document.getElementById("beneath_explanation").style.setProperty("filter", "none");
        explanationOpen = "";
    }
})

function formatAll(num) {
    if (consoleLogging) console.clear();
    for (k in EternalNotations.HTMLPresets) formatOne(k, num);
    let startTime = performance.now();
    formatString = EternalNotations.physicalScale(num)
    document.getElementById("display_physicalScale").innerHTML = formatString;
    let endTime = performance.now();
    if (consoleLogging) console.log("Physical Scale: " + formatString + " (" + (endTime - startTime).toString() + " ms)")
}

function formatOne(key, num) {
    let startTime = performance.now();
    let notation;
    try {
        notation = EternalNotations.HTMLPresets[key];
    }
    catch { return; }
    try {
        if (typeof notation == "function") {
            if (key == "SimplifiedWritten") {
                notation = notation(10);
            }
            else if (key == "ColoredDominoes") {
                for (let i = 6; i < 21; i += 3) {
                    document.getElementById("display_ColoredDominoes" + i).innerHTML = notation(i).name + ": " + notation(i).format(num);
                }
                let endTime = performance.now();
                if (consoleLogging) console.log("All colored Dominoes: (" + (endTime - startTime).toString() + " ms)")
                return;
            }
            else if (key == "Polynomial" || key == "RationalFunction") {
                document.getElementById("display_" + key + 10).innerHTML = notation(10).name + ": " + notation(10).format(num);
                document.getElementById("display_" + key + 2).innerHTML = notation(2).name + ": " + notation(2).format(num);
                document.getElementById("display_" + key + 3).innerHTML = notation(3).name + ": " + notation(3).format(num);
                let endTime = performance.now();
                if (consoleLogging && key == "Polynomial") console.log("All three Polynomials: (" + (endTime - startTime).toString() + " ms)");
                if (consoleLogging && key == "RationalFunction") console.log("All three Rational Functions: (" + (endTime - startTime).toString() + " ms)");
                return;
            }
            else return;
        }
        formatString = notation.name + ": " + notation.format(num);
        document.getElementById("display_" + key).style.setProperty("color", "black");
        document.getElementById("display_" + key).innerHTML = formatString;
        let endTime = performance.now();
        if (consoleLogging) console.log(formatString + " (" + (endTime - startTime).toString() + " ms)")
    }
    catch {
        document.getElementById("display_" + key).style.setProperty("color", "red");
        document.getElementById("display_" + key).innerHTML = notation.name + ": There has been an error with this notation. Please report this to the developer on the Eternal Notations GitHub page.";
    }
}