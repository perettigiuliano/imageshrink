const { app, BrowserWindow, Menu,  Main } = require("electron")

process.env.NODE_ENV = "development"

const isDev = process.env.NODE_ENV !== "production" ? true : false
const isMac = process.platform === "darwin"? true: false

let mainWindow
let aboutWindow

function createMainWindow() {
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: 500,
    title: "ImageShrink",
    height: 600,
    icon: "./assets/icons/Icon_256x256.png",
    resizable: isDev ? true : false,
    backgroundColor: "white"
  })
    
    // mainWindow.loadURL("file://" + __dirname + "/app/index.html");
    mainWindow.loadFile("./app/index.html");
}

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    x: 0,
    y: 0,
    title: "About ImageShrink",
    width: 300,
    height: 300,
    icon: "./assets/icons/Icon_256x256.png",
    resizable: false,
    backgroundColor: "white"
  })
    
    aboutWindow.loadFile('./app/about.html');
}

app.on("ready", () => {
  createMainWindow()
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)
  mainWindow.on("close", () => mainWindow = null)
})
const menu = [
  {
    role: 'fileMenu',
  },
  {
    label: "Help",
    submenu: [
      {
        label: "About",
        click: () => createAboutWindow()
      }
    ]
  },
  ...(isDev
    ? [
        {
          label: 'Developer',
          submenu: [
            {
              role: 'reload',
            },
            {
              role: 'forcereload',
            },
            {
              type: 'separator',
            },
            {
              role: 'toggledevtools',
            },
          ],
        },
      ]
    : []),
];
