window.addEventListener("DOMContentLoaded", function() {

    for (const type of ['node', 'chrome', 'electron']) {
        ReplaceText(`${type}-version`, process.versions[type]);
    }

});

function ReplaceText(selector, text) {

    const element = document.getElementById(selector);
    if (element) element.innerText = text;
    
}