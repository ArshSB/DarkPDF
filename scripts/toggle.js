d = document;

// select the element that simulates the dark mode dynamically
checkToggle = d.getElementById("darkDiv");

// if the dark mode is already applied, remove it to turn the pdf back to normal
if (checkToggle)
    checkToggle.remove();

// otherwise apply the dark mode
else {

    // create a dark mode div so it can be selected dynamically on future toggles
    div = d.createElement('div');
    div.id = "darkDiv";

    let css = `position: fixed;
               pointer-events: none;u
               top: 0;
               left: 0;
               width: 100vw;
               height: 100vh;
               background-color: white;
               mix-blend-mode: difference;
               z-index: 1; `;

    // apply the dark mode to the div and append to the webpage
    div.setAttribute("style", css);
    d.body.appendChild(div);

}