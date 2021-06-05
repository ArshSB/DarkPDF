# DarkPDF - dark mode for PDFs in Google Chrome

![Sample image - 2](demo-files/sample-img-2.png)

## General information

I use Chrome's native PDF viewer a lot, especially during the night. As an avid dark mode user, I was disappointed to learn that Chrome does not have a built-in dark mode feature. So I decided to dip my toes into the world of Chrome extensions and implement my own dark mode feature for PDF viewing. This is the result.

The extension is very simple. Here is the interface (please excuse the design):

![Sample image - 1](demo-files/sample-img-1.png)

Have the PDF open in an active tab on Chrome, then simply click the extension icon to turn the dark mode on or off

The extension also offers automatic dark mode. While the feature is on, anytime you visit a PDF during your web browsing, dark mode will automatically be applied without needing to click the extension icon for maximum convenience. Automatic preference will be synced to user's Google account if logged in, otherwise it will only be synced locally.

Here is a demo:

![Sample video](demo-files/sample-video-1.gif)

**Note:** Although this extension is specifically for native PDF viewing in Chrome, it may also enable dark mode for other uses (websites like Stack Overflow or Youtube for example). However, results are not guaranteed. Additonally, automatic dark mode only works for native Chrome PDF documents and may not work for embedded PDF files on a website.

## How to install

I am currently awaiting approval from the Chrome Web Store to upload the extension there. 

Until then, you can add the extension manually. Simply download this repository as a ZIP file, extract it to a folder and load it unpacked to your Chrome browser. 

Here are the [instructions](https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/) in details.

## Feedback

I hope this extension will be as useful to you as it has been to me. If you encounter any bugs, issues or you have feedback in general, please feel free to leave a ticket in the issues section of this repository!

## Built with

* [Chrome Extensions API](https://developer.chrome.com/docs/extensions/reference/) - build your own Chrome extensions using their powerful library
* Vanilla JavaScript - for working with the API
* HTML / CSS - for extension interface

## Attributions

* [Extension icon and interface image](https://iconscout.com) - free, high definition icons and images
* [Fix for an extension bug](https://www.reddit.com/r/chrome_extensions/comments/no7igm/chrometabsonactivatedaddlistener_not_working/) - thanks to user/z0ccc_
