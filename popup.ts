document.addEventListener("DOMContentLoaded", () => {
    const textBox: HTMLDivElement | null = document.getElementById('text-box') as HTMLDivElement | null;
    if (!textBox) return

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs[0].url === undefined || tabs[0].id === undefined) { return }

        if (tabs[0].url.includes("https://www.newscon.org/download/")) {
            textBox.innerText = `window.open(new URL(downloadURL), "_self")`

        } else if (tabs[0].url.includes("https://www.newscon.org/snippet/")) {
            textBox.innerText = `
            remainingTime = 0;
            setTimeout(() => {
                var textContent = document.getElementById("btnCopy")?.querySelector("div")?.innerText;
                textContent ? window.open(new URL(textContent), "_self"): null ;
            
            }, 1000);`
        }
    });

    textBox.addEventListener('click', () => {
        const tempTextarea = document.createElement('textarea');
        if (!textBox.textContent) return

        tempTextarea.value = textBox.textContent;
        document.body.appendChild(tempTextarea);

        // Select the text inside the textarea and copy it to the clipboard
        tempTextarea.select();
        document.execCommand('copy');

        // Remove the temporary textarea
        document.body.removeChild(tempTextarea);

        // Add a class to indicate successful copy
        textBox.classList.add('copied');

        // Remove the class after a delay
        setTimeout(() => {
            textBox.classList.remove('copied');
        }, 2000);
    })
})


// if (window.downloadURL) {
//     window.open(new URL(downloadURL), "_self")
// } else if (window.remainingTime) {
//     remainingTime = 0
//     setTimeout(() => {
//         var textContent = document.getElementById("btnCopy")?.querySelector("div")?.innerText;
//         textContent ? window.open(new URL(textContent), "_self") : null;

//     }, 1000);
// }