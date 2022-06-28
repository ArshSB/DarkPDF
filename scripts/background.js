// string array that holds the ID of all visited chrome tabs that have a PDF file open
// will be later used to prevent dark mode from being applied multiple times to the same tab
let tabs = [];

// listens for keyboard shortcut (CTRL + SHIFT + 9) to toggle dark mode on/off for PDFs only
chrome.commands.onCommand.addListener((command) => {

    if (command === 'run-dark-mode') {
        
        // get the current tab's id and apply the dark mode only if the file is PDF
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {

            if (tabs[0].url.slice(-4) === '.pdf')
                runScriptWithBadge(tabs[0].id);
        });
    }
  });

// applies dark mode to the given tab along with extension badge
runScriptWithBadge = function (tabId) {

    // mark the current tab as visited
    tabs.push(tabId);

    // inject the dark mode script to current tab
    chrome.scripting.executeScript({target: {tabId: tabId}, files: ["scripts/toggle.js"]});

    // set extension badge as a checkmark to signify dark mode was applied to the user
    chrome.action.setBadgeText({text: '✓'});

    // allow the extension badge to remain as a checkmark for 1 second before removing it
    setTimeout(function () {
        chrome.action.setBadgeText({text: ''});
    }, 1250);

};

// callback function pointer for events where a tab with a PDF file is activated
callbackActivated = function (info) {

    // get the ID of the current activated tab
    chrome.tabs.get(info.tabId, function (tab) {

        // retrieve the last 4 letters of the tab URL
        let url = tab.url.slice(-4);

        // get the latest state of the automatic checkbox, and only apply dark mode if checkbox is selected
        chrome.storage.sync.get(["checkbox-state"], (items) => {

            if (url === ".pdf" && items['checkbox-state'] == true) {

                // If the current activated tab has not yet been visited, apply the dark mode script and add the tab ID to tabs array
                if (!tabs.includes(info.tabId))
                    runScriptWithBadge(info.tabId);

            }
        });
    });
};

// callback function pointer for events where an activated tab's URL is updated to a PDF file
callbackUpdated = function (tabid, changeInfo, tab) {

    let url = changeInfo.url.slice(-4);

    chrome.storage.sync.get(["checkbox-state"], (items) => {

        // don't check the tab ID in tabs array when URL is updated so that if the user comes back to the same page
        // it will apply dark mode again instead of only applying once at the start
        if (url === ".pdf" && items['checkbox-state'] == true)
            runScriptWithBadge(tabid);
        
    });
};

// Listen for events on chrome tabs

chrome.tabs.onUpdated.addListener(callbackUpdated);

chrome.tabs.onActivated.addListener(callbackActivated);


