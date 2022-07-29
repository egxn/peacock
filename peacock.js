import $8Snq5$highlightjs from "highlight.js";


const $20d60770e9a6a26e$var$HIGHLIGHT_CSS = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css";
function $20d60770e9a6a26e$var$addHighlightCSS() {
    return new Promise((resolve, reject)=>{
        const highlightLink = document.createElement("link");
        highlightLink.href = $20d60770e9a6a26e$var$HIGHLIGHT_CSS;
        highlightLink.rel = "stylesheet";
        highlightLink.type = "text/css";
        highlightLink.onload = ()=>resolve();
        highlightLink.onerror = ()=>reject();
        document.head.appendChild(highlightLink);
    });
}
function $20d60770e9a6a26e$var$createPeacockButton() {
    const button = document.createElement("button");
    button.innerText = "\uD83E\uDD9A";
    button.style.alignItems = "center";
    button.style.backgroundColor = "#000";
    button.style.borderBottomRightRadius = "50%";
    button.style.borderTopRightRadius = "50%";
    button.style.display = "flex";
    button.style.height = "25px";
    button.style.justifyContent = "center";
    button.style.position = "absolute";
    button.style.right = "-25px";
    button.style.top = "10px";
    button.style.width = "20px";
    return button;
}
function $20d60770e9a6a26e$var$removeNumbersAtTheStart(str) {
    const numbers = str.match(/^\d+/);
    console.log(numbers);
    if (numbers) return str.replace(numbers[0], "");
    return str;
}
function $20d60770e9a6a26e$var$addClickEvent(button, pre) {
    button.addEventListener("click", ()=>{
        var ref;
        const hasCodeTag = pre.innerText.includes("<code>");
        const newPreNode = document.createElement("pre");
        if (!hasCodeTag) {
            const codeNode = document.createElement("code");
            const code = $20d60770e9a6a26e$var$removeNumbersAtTheStart(pre.innerText).replace(/[^\x00-\x7F]/g, "");
            console.log(code);
            codeNode.innerHTML = code;
            newPreNode.appendChild(codeNode);
        } else newPreNode.innerHTML = pre.innerHTML;
        pre === null || pre === void 0 ? void 0 : (ref = pre.parentNode) === null || ref === void 0 ? void 0 : ref.replaceChild(newPreNode, pre);
        (0, $8Snq5$highlightjs).highlightElement(pre);
    });
}
function $20d60770e9a6a26e$var$wrapCodeNodes() {
    const preNodes = document.getElementsByTagName("pre");
    for(let i = 0; i < preNodes.length; i++){
        var ref;
        const preNode = preNodes[i];
        const divNode = document.createElement("div");
        divNode.style.position = "relative";
        divNode.style.border = "1px solid green";
        const newPreNode = document.createElement("pre");
        const buttonNode = $20d60770e9a6a26e$var$createPeacockButton();
        newPreNode.innerHTML = preNode.innerHTML;
        divNode.appendChild(buttonNode);
        divNode.appendChild(newPreNode);
        if (divNode.firstChild && divNode.lastChild) $20d60770e9a6a26e$var$addClickEvent(divNode.firstChild, divNode.lastChild);
        preNode === null || preNode === void 0 ? void 0 : (ref = preNode.parentNode) === null || ref === void 0 ? void 0 : ref.replaceChild(divNode, preNode);
    }
}
function $20d60770e9a6a26e$var$start() {
    $20d60770e9a6a26e$var$addHighlightCSS().then(()=>console.log("highlight.js CSS loaded")).then(()=>$20d60770e9a6a26e$var$wrapCodeNodes()).catch((err)=>console.error(err));
}
$20d60770e9a6a26e$var$start();


//# sourceMappingURL=peacock.js.map
