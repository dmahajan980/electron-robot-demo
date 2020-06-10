// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const robot = require("robotjs");

function moveMouse() {
  // Speed up the mouse.
  robot.setMouseDelay(2);

  var twoPI = Math.PI * 2.0;
  var screenSize = robot.getScreenSize();
  var height = screenSize.height;
  var width = screenSize.width;
  var position = robot.getMousePos();
  var h2wRatio = (height - position.y) / (width - position.x);

  for (var x = position.x, y = position.y; x < width; x++, y = y + h2wRatio) {
    robot.moveMouseSmooth(x, y);
  }
}

function typeName(arg) {
  setTimeout(function () {
    robot.keyTap("enter");
    robot.typeString(arg);
  }, 2000);
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
    console.log(BrowserWindow);
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("btnclick", function (event, arg) {
  moveMouse();
  // inform the render process that the assigned task finished. Show a message in html
  // event.sender.send in ipcMain will return the reply to renderprocess
  event.sender.send("btnclick-task-finished", "yes");
});

ipcMain.on("typeName", function (event, arg) {
  typeName("Divyanshu");
  event.sender.send("btnclick-task-finished", "yes");
});

ipcMain.on("decBrightness", decBrightness);

function decBrightness() {
  robot.keyTap("lights_mon_down");
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("incBrightness", incBrightness);

function incBrightness() {
  robot.keyTap("lights_mon_up");
}

ipcMain.on("alphabetPress", function (event, arg) {
  typeName(arg);
  event.sender.send("btnclick-task-finished", "yes");
});

ipcMain.on("axes", function (event, axes) {
  let { x, y } = robot.getMousePos();
  let xOffset = axes[0] * 15,
    yOffset = axes[1] * 15;
  robot.dragMouse(x + xOffset, y + yOffset);

  let xScroll = axes[2],
    yScroll = -1 * axes[3];
  robot.scrollMouse(xScroll, yScroll);
});

ipcMain.on("buttons", function (event, buttons) {
  let state = buttons[0] ? "down" : "up";
  let button = buttons[7] ? "right" : "left";
  if (buttons[3]) incBrightness();
  if (buttons[2]) decBrightness();
  robot.mouseToggle(state, button);
});
