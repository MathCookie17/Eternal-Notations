output(EternalNotations.Presets.OmegaLayers.getLayer(new Decimal(9), false));

// let count = 0;
// for (let key in EternalNotations.Presets) count++;
// output(count);
// count = 0;
// for (let key in EternalNotations.HTMLPresets) count++;
// output(count);

// let omegaLayers48 = [];
// let entity = 945;
// for (let i = 0; i < 24; i++) {
//     if (entity == 962) entity++;
//     omegaLayers48.push("&#" + entity + ";");
//     entity++;
// }
// entity = 913;
// for (let i = 0; i < 24; i++) {
//     if (entity == 930) entity++;
//     omegaLayers48.push("&#" + entity + ";");
//     entity++;
// }
// let omegaLayersYes = structuredClone(omegaLayers48);
// let omegaLayersNo = structuredClone(omegaLayers48);
// omegaLayersYes = omegaLayersYes.concat(omegaLayers48.map((str) => ("&#937;<sup>" + str + "</sup>")));
// omegaLayersNo = omegaLayersNo.concat(omegaLayers48.map((str) => ("&#937;^" + str)));
// let subscripts = ["&#968;", "&#989;", "&#987;", "&#881;", "&#1019;", "&#985;", "&#883;", "&#1016;"];
// for (let s = 0; s < subscripts.length; s++) {
//     omegaLayersYes = omegaLayersYes.concat(omegaLayers48.map((str) => ("&#937;<sub>" + subscripts[s] + "</sub><sup>" + str + "</sup>")));
//     omegaLayersNo = omegaLayersNo.concat(omegaLayers48.map((str) => ("&#937;" + subscripts[s] + "^" + str)));
// }
// omegaLayersYes = omegaLayersYes.map((str) => ("\"" + str + "\""));
// omegaLayersNo = omegaLayersNo.map((str) => ("\"" + str + "\""));
// output(omegaLayersYes, true);
// output(omegaLayersNo);

//Testing
function output(output) { //Outputs whatever text is given as a new paragraph on the document
    let literal = false;
    if (arguments.length > 1) literal = arguments[1];
    let testP = document.createElement("p");
    if (literal) {
        let textT = document.createTextNode(boxArrayString(output));
        testP.appendChild(textT);
    }
    else testP.innerHTML = boxArrayString(output);
    testP.classList.add("output");
    document.body.appendChild(testP);
}

function boxArrayString(arr) { // Turns an array into a string, but with brackets aroung it
    let narr = structuredClone(arr);
    if (Array.isArray(narr)) {
        for (let e = 0; e < narr.length; e++) narr[e] = boxArrayString(narr[e]);
        return "[" + narr + "]"; 
    }
    else return String(arr);
}