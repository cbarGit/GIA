'use strict';

const {app, BrowserWindow} = require('electron');

let mainWindow;

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', createWindow);

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

//disable menu bar
/*app.on('browser-window-created',function(e,window){
    window.setMenu(null);
});*/

function createWindow() {

  mainWindow = new BrowserWindow({width: 500, height: 800, autoHideMenuBar:true, fullscreen:false, resizable:false, backgroundColor:'#313131'});

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on('closed', () => {

    mainWindow = null;
  });
}
