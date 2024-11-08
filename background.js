chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case "ending":
      console.log("Skipping to end...");
      break;
    case "speed_up":
      console.log("Speeding up...");
      break;
    case "speed_down":
      console.log("Slowing down...");
      break;
  }
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0].url.startsWith("https://main.elearning.uni-obuda.hu/pluginfile.php/")) {
      chrome.tabs.sendMessage(tabs[0].id, {action: command});
    }
  });
});