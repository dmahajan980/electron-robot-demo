// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }

  // include the ipc module to communicate with main process.
  const ipcRenderer = require("electron").ipcRenderer;

  const btnclick = document.getElementById("mouse-button");
  btnclick.addEventListener("click", function () {
    ipcRenderer.send("btnclick", "moveMouse");
  });

  const nameButton = document.getElementById("fill-text");
  nameButton.addEventListener("click", function () {
    ipcRenderer.send("typeName", "Divyanshu");
  });

  const incBrightness = document.getElementById("incBrightness");
  incBrightness.addEventListener("click", function () {
    ipcRenderer.send("incBrightness");
  });

  const decBrightness = document.getElementById("decBrightness");
  decBrightness.addEventListener("click", function () {
    ipcRenderer.send("decBrightness");
  });

  const alphabetArray = document.getElementsByClassName("alphabet");
  for (const button of alphabetArray) {
      console.log(button)
      button.addEventListener("click", function () {
        ipcRenderer.send("alphabetPress", button.innerHTML);
      });
  }
});
