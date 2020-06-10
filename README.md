# Electon App with Robot.js

**Clone and run for a quick way to see Electron in action.**

This is a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start) within the Electron documentation.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/dmahajan980/electron-robot-demo

# Go into the repository
cd electron-robot-demo

# Install dependencies
npm install

# Build Robot.js for your system
./node_modules/.bin/electron-rebuild

# Run the app
electron .
```

## Usage

<p align="center">
  <img src="https://i.imgur.com/djLxzSD.png">
</p>

Below is the list of buttons with their corresponding functionalities specified along:  
(_Please refer to the above diagram for the below mentioned buttons and axes_)

| Keys | Functionality |
| :---: | :---: |
| `Left Joystick` | Move Mouse Cursor |
| `Right Joystick` | Scroll Window |
| `Button 0` | Left Click on Mouse |
| `Button 0` + `Button 7` | Right Click on Mouse |
| `Hold Button 0` + `Left Joystick` | Drag Joystick to Select |
| `Button 2` | Decrease Screen Brightness |
| `Button 3` | Increase Screen Brightness |

The buttons on the app such as 'A', 'B', 'C'. 'D', and 'Type "Divyanshu"' enter the corresponding character or set of characters in a text or input area. It has been set to delay for 3 seconds so that the user can select or focus on the input area before it starts typing.

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
[MIT License (Jason Stallings)](https://github.com/octalmage/robotjs/blob/master/LICENSE.md)
