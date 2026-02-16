/** @format */

import { app, BrowserWindow, globalShortcut } from "electron";
import path from "path";

let win: BrowserWindow;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  win.loadURL("http://localhost:5173");

  // Alt + Left to go back
  globalShortcut.register("Alt+Left", () => {
    if (win.webContents.canGoBack()) {
      const token = localStorage.getItem("access_token");
      if (token) {
        win.webContents.goBack();
      }
    }
  });
}

app.whenReady().then(createWindow);
