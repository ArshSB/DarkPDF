// retrieves the slider input and applies dark mode based on its value
chrome.storage.sync.get(["slider-state"], (items) => {

    // default if slider input fails
    let colorVal = 1;

    if (items['slider-state'] !== undefined)
        colorVal = items['slider-state'];

    // select the element that simulates the dark mode dynamically
    checkToggle = document.getElementById("darkDiv");
    sliderColors = ['#bfbfbf', '#d9d9d9', '#f2f2f2'];

    // if the dark mode is already applied, remove it to turn the pdf back to normal
    if (checkToggle)
        checkToggle.remove();
    
    // otherwise apply the dark mode
    else {
    
        // create a dark mode div so it can be selected dynamically on future toggles
        div = document.createElement('div');
        div.id = "darkDiv";
    
        let css = `position: fixed;
                    pointer-events: none;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: ${sliderColors[colorVal]};
                    mix-blend-mode: difference;
                    z-index: 1; `;
    
        // apply the dark mode to the div and append to the webpage
        div.setAttribute("style", css);
        document.body.appendChild(div);
    
    }
});