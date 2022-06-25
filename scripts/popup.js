document.addEventListener("DOMContentLoaded", () => {

    // sets the extension's badge as the given string
    let setBadge = function (text) {
    
        // set extension badge as a checkmark to signify dark mode was applied to the user
        chrome.action.setBadgeText({text: text});
        // or: chrome.action.setBadgeText({tabId: info.tadId, text: '✓'});
    
        // allow the extension badge to remain as a checkmark for 1 second before removing it
        setTimeout(function () {
            chrome.action.setBadgeText({text: ''});
        }, 500);
    
    };

    // get the current tab
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {

        // retrieve the last 4 letters of the tab URL
        let url = tabs[0].url.slice(-4);
        
        if (url === ".pdf") {
                
            // execute the dark mode script the moment the extension icon is clicked
            chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ["scripts/toggle.js"]});
            setBadge('✓');

        }

        else
            setBadge('✕');

        // retrieve the previous state of the checkbox (if no previous state exists,
        // undefined is returned in which case the state is updated based on whether
        // the user has the checkbox selected or not
        chrome.storage.sync.get(["checkbox-state", "slider-state"], (items) => {

            let checkboxState = items['checkbox-state'];
            let sliderState = items['slider-state'];

            // select the checkbox element dynamically so its state can be updated
            let checkbox = document.getElementById("auto-dark");
            let slider = document.getElementById("tint-slider");

            // update the current state of the checkbox based on the previous state retrieved from storage
            if (checkboxState !== undefined)
                checkbox.checked = checkboxState;

            if (sliderState !== undefined && sliderState >= 0 && sliderState <= 2)
                slider.value = sliderState;

            slider.addEventListener('input', (e) => {
                chrome.storage.sync.set({'slider-state': slider.value}, () => {});
            });

            // event listener that listens to a change in state of the checkbox, and updates the storage accordingly
            checkbox.addEventListener('change', (e) => {

                // if the checkbox is checked, store the state as true. Otherwise, store as false

                if (e.target.checked) {
                    chrome.storage.sync.set({'checkbox-state': true}, () => {});
                }
                else
                    chrome.storage.sync.set({'checkbox-state': false}, () => {});
            });
        });
    });
});