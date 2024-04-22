let openables = document.getElementsByClassName("chapter");
for (let b of openables) {b.addEventListener("click", function(e){toggleBoxChildren(b); e.stopPropagation();})}
openables = document.getElementsByClassName("subchapter");
for (let b of openables) {b.addEventListener("click", function(e){toggleBoxChildren(b); e.stopPropagation();})}

function toggleBoxChildren(elem) {
    let childs = elem.children;
    for (let c of childs) {
        if (c.classList.contains("start_hide")) {
            if (getComputedStyle(c).getPropertyValue("display") == "none") {
                if (c.classList.contains("inline_display")) {c.style.setProperty("display", "inline");}
                else if (c.classList.contains("inline_block_display")) {c.style.setProperty("display", "inline-block");}
                else {c.style.setProperty("display", "block");}
            }
            else {c.style.setProperty("display", "none");}
        }
    }
}