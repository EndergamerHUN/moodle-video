chrome.commands.onCommand.addListener((command) => {
  if (command === "ending") {
    console.log("Skipping to end...")
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0].url.startsWith("https://main.elearning.uni-obuda.hu/pluginfile.php/")) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "ending"});
      }
    });
  }
});