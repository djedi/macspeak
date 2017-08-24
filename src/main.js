const electron = require('electron');

const {app, BrowserWindow} = electron;

let mainWindow = null;

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 460,
        resizable: true,
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', _ => {
        mainWindow = null;
    });
});
