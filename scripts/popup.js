// add an event listener that activates whenever the extension icon is clicked once

document.addEventListener("DOMContentLoaded", () => {

    // execute the dark mode script the moment the extension icon is clicked
    chrome.tabs.executeScript(null, {
        file: "scripts/toggle.js"
    });

    // set extension badge as a checkmark to signify dark mode was applied to the user
    chrome.browserAction.setBadgeText({ text: '✓'});

    // allow the extension badge to remain as a checkmark for 1 second before removing it
    setTimeout(function() {
        chrome.browserAction.setBadgeText({});
    }, 1000);

    // holds the state of the automatic dark mode checkbox as a boolean
    let state;

    // retrieve the previous state of the checkbox (if no previous state exists,
    // undefined is returned in which case the state is updated based on whether
    // the user has the checkbox selected or not
    chrome.storage.sync.get(["checkbox-state"], (items) => {

        state = items['checkbox-state'];

        // select the checkbox element dynamically so its state can be updated
        let checkbox = document.getElementById("auto-dark");

        // update the current state of the checkbox based on the previous state retrieved from storage
        if (state === true) {
            checkbox.checked = true;
        }

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